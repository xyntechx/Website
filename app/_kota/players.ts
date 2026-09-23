import { City, type Action, type Coord } from "./city";
import {
  CachedContext,
  CTX_LEN,
  DEFAULT_GRID_TEMPERATURE,
  DEFAULT_TEMPERATURE,
  MAX_EPISODE_STEPS,
  WorldModel,
  detokenizeObservation,
  generateObservation,
  taskIndexOf,
} from "./model";
import { Random } from "./rng";
import {
  ACTION_NAMES,
  ACTION_TOKEN_IDS,
  actionIndex,
  actionLabel,
  observe,
} from "./tokens";

export type TaskStatus = "wip" | "done" | "failed" | "stopped";

function taskStatusAfter(
  city: City,
  action: Action,
  expected: Action | undefined,
  terminated: boolean,
): TaskStatus {
  if (city.needNewTask) return action === expected ? "done" : "failed";
  if (terminated) return "stopped";
  return "wip";
}

export function cityGrid(city: City): string[][] {
  return city.grid.map((row) => row.map(String));
}

export interface RealStep {
  step: number;
  action: string;
  reward: number;
  totalReward: number;
  terminated: boolean;
  truncated: boolean;
  tick: number;
  taskIndex: number;
  task: string;
  taskStatus: TaskStatus;
  nextTaskIndex: number;
  nextTask: string;
}

abstract class RealCityPlayer {
  city!: City;
  done = true;
  steps = 0;
  totalReward = 0;

  constructor(readonly maxSteps: number) {
    if (maxSteps < 1) throw new Error("maxSteps must be positive");
  }

  protected spawn(rng: Random, spawnPoint: Coord | null): City {
    return spawnPoint ? new City(spawnPoint, rng) : City.random(rng);
  }

  protected apply(action: Action): RealStep {
    const city = this.city;
    const tick = city.time;
    const taskIndex = city.taskIdx;
    const task = city.task;
    const expected = city.taskDirections[city.dirIdx];
    const [reward, terminated] = city.step(action);
    const taskStatus = taskStatusAfter(city, action, expected, terminated);
    this.steps += 1;
    this.totalReward += reward;
    const truncated = !terminated && this.steps >= this.maxSteps;
    this.done = terminated || truncated;
    if (!this.done) city.envStep();
    return {
      step: this.steps,
      action: actionLabel(action),
      reward,
      totalReward: this.totalReward,
      terminated,
      truncated,
      tick,
      taskIndex,
      task,
      taskStatus,
      nextTaskIndex: city.taskIdx,
      nextTask: city.task,
    };
  }
}

/** A human drives the real city. */
export class HumanRealPlayer extends RealCityPlayer {
  constructor(maxSteps = MAX_EPISODE_STEPS) {
    super(maxSteps);
  }

  reset(seed: number, spawnPoint: Coord | null = null): City {
    this.city = this.spawn(new Random(seed), spawnPoint);
    this.city.envStep();
    this.steps = 0;
    this.totalReward = 0;
    this.done = false;
    return this.city;
  }

  step(action: Action): RealStep {
    if (this.done)
      throw new Error("Call reset() before starting another episode");
    return this.apply(action);
  }
}

/** One human action judged by the world model, with the real outcome if shadowed. */
export interface DreamStep {
  step: number;
  action: string;
  reward: number;
  totalReward: number;
  terminationProbability: number;
  terminated: boolean;
  truncated: boolean;
  task: string;
  taskIndex: number;
  grid: string[][];
  realReward: number | null;
  realTotalReward: number | null;
  realTerminated: boolean | null;
  realTask: string | null;
  realTaskIndex: number | null;
  realGrid: string[][] | null;
  gridMismatches: number | null;
}

export interface DreamOptions {
  temperature?: number;
  gridTemperature?: number;
  maxSteps?: number;
  shadow?: boolean;
  sampleTermination?: boolean;
}

/** A human acts while the world model plays the environment. */
export class HumanDreamPlayer {
  readonly temperature: number;
  readonly gridTemperature: number;
  readonly maxSteps: number;
  readonly shadow: boolean;
  readonly sampleTermination: boolean;

  city!: City;
  task = "";
  grid: string[][] = [];
  taskIndex = 0;
  realTask: string | null = null;
  realGrid: string[][] | null = null;
  realTaskIndex: number | null = null;
  realDone = true;
  steps = 0;
  totalReward = 0;
  realTotalReward = 0;
  done = true;

  private session: CachedContext | null = null;
  private rng = new Random(0);

  constructor(
    private readonly model: WorldModel,
    options: DreamOptions = {},
  ) {
    this.temperature = options.temperature ?? DEFAULT_TEMPERATURE;
    this.gridTemperature = options.gridTemperature ?? DEFAULT_GRID_TEMPERATURE;
    this.maxSteps = options.maxSteps ?? MAX_EPISODE_STEPS;
    this.shadow = options.shadow ?? true;
    this.sampleTermination = options.sampleTermination ?? false;
    if (this.temperature <= 0 || this.gridTemperature <= 0)
      throw new Error("temperature must be positive");
    if (this.maxSteps < 1) throw new Error("maxSteps must be positive");
  }

  async reset(seed: number, spawnPoint: Coord | null = null): Promise<this> {
    this.rng = new Random(seed);
    this.city = spawnPoint
      ? new City(spawnPoint, this.rng)
      : City.random(this.rng);
    this.city.envStep();
    const observation = observe(this.city);
    this.session?.dispose();
    this.session = await CachedContext.create(this.model, observation);
    ({ task: this.task, grid: this.grid } = detokenizeObservation(observation));
    this.taskIndex = taskIndexOf(observation);
    this.realDone = !this.shadow;
    this.realTask = this.shadow ? this.task : null;
    this.realGrid = this.shadow ? this.grid : null;
    this.realTaskIndex = this.shadow ? this.taskIndex : null;
    this.steps = 0;
    this.totalReward = 0;
    this.realTotalReward = 0;
    this.done = false;
    return this;
  }

  async step(action: Action): Promise<DreamStep> {
    if (this.done || !this.session)
      throw new Error("Call reset() before starting another episode");
    const actionIdx = actionIndex(action);
    await this.session.append([ACTION_TOKEN_IDS[actionIdx]]);
    const { reward, termination: terminationProbability } =
      this.session.outputs;
    const terminated = this.sampleTermination
      ? this.rng.random() < terminationProbability
      : terminationProbability > 0.5;
    this.steps += 1;
    this.totalReward += reward;
    const truncated = !terminated && this.steps >= this.maxSteps;
    this.done = terminated || truncated;
    if (!this.done) {
      // Dream the next turn from the action alone; no real state is used.
      const generated = await generateObservation(
        this.session,
        this.temperature,
        this.gridTemperature,
        this.rng,
      );
      await this.session.crop(CTX_LEN - 1);
      ({ task: this.task, grid: this.grid } = detokenizeObservation(generated));
      this.taskIndex = taskIndexOf(generated);
    }

    let real: Pick<
      DreamStep,
      | "realReward"
      | "realTotalReward"
      | "realTerminated"
      | "realTask"
      | "realTaskIndex"
      | "realGrid"
      | "gridMismatches"
    > = {
      realReward: null,
      realTotalReward: null,
      realTerminated: null,
      realTask: null,
      realTaskIndex: null,
      realGrid: null,
      gridMismatches: null,
    };
    if (this.realDone) {
      this.realTask = this.realGrid = this.realTaskIndex = null;
    } else {
      const [realReward, realTerminated] = this.city.step(
        ACTION_NAMES[actionIdx],
      );
      this.realTotalReward += realReward;
      if (!realTerminated) this.city.envStep();
      else this.realDone = true;
      const realObservation = observe(this.city);
      ({ task: this.realTask, grid: this.realGrid } =
        detokenizeObservation(realObservation));
      this.realTaskIndex = taskIndexOf(realObservation);
      let gridMismatches = 0;
      for (let r = 0; r < this.grid.length; r++) {
        for (let c = 0; c < this.grid[r].length; c++)
          if (this.grid[r][c] !== this.realGrid[r][c]) gridMismatches++;
      }
      real = {
        realReward,
        realTotalReward: this.realTotalReward,
        realTerminated,
        realTask: this.realTask,
        realTaskIndex: this.realTaskIndex,
        realGrid: this.realGrid,
        gridMismatches,
      };
    }
    return {
      step: this.steps,
      action: actionLabel(ACTION_NAMES[actionIdx]),
      reward,
      totalReward: this.totalReward,
      terminationProbability,
      terminated,
      truncated,
      task: this.task,
      taskIndex: this.taskIndex,
      grid: this.grid,
      ...real,
    };
  }

  dispose() {
    this.session?.dispose();
    this.session = null;
  }
}
