// TypeScript port of kota-wm/envs/full/env.py and graph.py: the real
// environment. Rewards, termination and task generation follow the Python
// source line for line; only the random source differs (see rng.ts).
import { Random } from "./rng";

export type Cell = 0 | 1 | "P" | "A" | "S";
export type Action = "W" | "A" | "S" | "D" | "";
export type StopRoad = "A" | "S";
export type Coord = readonly [number, number];
type Edge = readonly [Coord, Coord];

export const NUM_ROWS = 16;
export const NUM_COLS = 12;
const BUILDING_COLS = new Set([1, 2, 5, 6, 9, 10]);

const key = (r: number, c: number) => r * NUM_COLS + c;

/** Directed traffic graph over road cells (envs/full/graph.py). */
export class CityGraph {
  private readonly nodes = new Set<number>();
  // Out-edges keep insertion order (avenues first, then streets), as networkx does.
  private readonly out = new Map<number, Coord[]>();
  private readonly inDegree = new Map<number, number>();

  constructor(grid: readonly (readonly Cell[])[]) {
    for (let i = 0; i < NUM_ROWS; i++) {
      for (let j = 0; j < NUM_COLS; j++) {
        if (grid[i][j] === 1) this.addNode(i, j);
      }
    }
    // Avenues
    for (let j = 0; j < NUM_COLS; j++) {
      if (j % 4 === 0) {
        for (let i = 1; i < NUM_ROWS; i++) this.addEdge([i, j], [i - 1, j]); // North-bound
      } else if ((j + 1) % 4 === 0) {
        for (let i = 0; i < NUM_ROWS - 1; i++) this.addEdge([i, j], [i + 1, j]); // South-bound
      }
    }
    // Streets
    for (let i = 0; i < NUM_ROWS; i++) {
      if (i % 6 === 0) {
        for (let j = 0; j < NUM_COLS - 1; j++) this.addEdge([i, j], [i, j + 1]); // East-bound
      } else if ((i + 3) % 6 === 0) {
        for (let j = 1; j < NUM_COLS; j++) this.addEdge([i, j], [i, j - 1]); // West-bound
      }
    }
  }

  private addNode(r: number, c: number) {
    const k = key(r, c);
    if (!this.nodes.has(k)) {
      this.nodes.add(k);
      this.out.set(k, []);
      this.inDegree.set(k, 0);
    }
  }

  private addEdge(from: Coord, to: Coord) {
    this.addNode(from[0], from[1]);
    this.addNode(to[0], to[1]);
    this.out.get(key(from[0], from[1]))!.push(to);
    const k = key(to[0], to[1]);
    this.inDegree.set(k, this.inDegree.get(k)! + 1);
  }

  hasNode(r: number, c: number): boolean {
    return (
      r >= 0 &&
      r < NUM_ROWS &&
      c >= 0 &&
      c < NUM_COLS &&
      this.nodes.has(key(r, c))
    );
  }

  hasEdge(from: Coord, to: Coord): boolean {
    if (!this.hasNode(from[0], from[1])) return false;
    return this.out
      .get(key(from[0], from[1]))!
      .some(([r, c]) => r === to[0] && c === to[1]);
  }

  outEdges(node: Coord): Coord[] {
    return this.hasNode(node[0], node[1])
      ? this.out.get(key(node[0], node[1]))!
      : [];
  }

  /** Nodes with in-degree 2, in row-major order: the traffic lights. */
  lightNodes(): Coord[] {
    const lights: Coord[] = [];
    for (let i = 0; i < NUM_ROWS; i++) {
      for (let j = 0; j < NUM_COLS; j++) {
        if (this.inDegree.get(key(i, j)) === 2) lights.push([i, j]);
      }
    }
    return lights;
  }
}

export class InvalidSpawn extends Error {}

/**
 * City with 6 streets and 4 avenues; streets cut horizontally and are one-way,
 * avenues cut vertically and are two-way (envs/full/env.py).
 */
export class City {
  static readonly NORMAL_REW = 1;
  static readonly MEDIUM_REW = 5;
  static readonly SEVERE_REW = 10;
  static readonly MAX_TASKS = 10;

  readonly grid: Cell[][];
  readonly graph: CityGraph;
  readonly lights: Coord[];
  stopRoad: StopRoad = "S";
  time = -1;
  pRow: number;
  pCol: number;
  prevCell: Cell = 1;
  task = "";
  taskDirections: Action[] = [];
  taskIdx = 0;
  dirIdx = 0;
  needNewTask = true;
  noops = 0;
  readonly rng: Random;

  constructor(spawnPoint: Coord = [0, 0], rng: Random = new Random(0)) {
    this.rng = rng;
    if (
      !(
        spawnPoint[0] >= 0 &&
        spawnPoint[0] < NUM_ROWS &&
        spawnPoint[1] >= 0 &&
        spawnPoint[1] < NUM_COLS
      )
    ) {
      throw new InvalidSpawn(
        "Player cannot spawn off-grid; grid has 16 rows, 12 cols.",
      );
    }
    this.grid = [];
    for (let j = 0; j < NUM_ROWS; j++) {
      const row: Cell[] = [];
      for (let i = 0; i < NUM_COLS; i++)
        row.push(j % 3 && BUILDING_COLS.has(i) ? 0 : 1);
      this.grid.push(row);
    }
    this.graph = new CityGraph(this.grid);
    this.lights = this.graph.lightNodes();
    for (const [r, c] of this.lights) this.grid[r][c] = this.stopRoad;
    if (this.grid[spawnPoint[0]][spawnPoint[1]] !== 1) {
      throw new InvalidSpawn(
        "Player must spawn on a free road, not in a building or at a traffic light.",
      );
    }
    [this.pRow, this.pCol] = spawnPoint;
    this.grid[this.pRow][this.pCol] = "P";
  }

  /** A city at a random valid road cell, as play.py's reset() does. */
  static random(rng: Random): City {
    for (;;) {
      try {
        return new City(
          [rng.randrange(NUM_ROWS), rng.randrange(NUM_COLS)],
          rng,
        );
      } catch (error) {
        if (!(error instanceof InvalidSpawn)) throw error;
      }
    }
  }

  /** Natural environment changes not caused by player actions. */
  envStep() {
    this.time += 1;
    if (this.time % 2 === 0) {
      this.stopRoad = this.stopRoad === "S" ? "A" : "S";
      for (const [r, c] of this.lights) {
        if (this.grid[r][c] === "P") continue;
        this.grid[r][c] = this.stopRoad;
      }
    }
    if (this.needNewTask) {
      const [task, directions] = this.generateTask(this.pRow, this.pCol);
      this.task = task;
      this.taskDirections = directions;
      this.taskIdx += 1;
      this.dirIdx = 0;
      this.needNewTask = false;
    }
  }

  /** Consequences of a player action: [reward, terminated]. */
  step(action: Action): [number, boolean] {
    let futureRow = this.pRow;
    let futureCol = this.pCol;
    switch (action) {
      case "W":
        futureRow -= 1;
        break;
      case "A":
        futureCol -= 1;
        break;
      case "S":
        futureRow += 1;
        break;
      case "D":
        futureCol += 1;
        break;
    }

    let rew = 0;
    let termination = false;

    if (!this.graph.hasNode(futureRow, futureCol)) {
      // exit road / off grid / into a building: severe punishment, terminate
      rew -= City.SEVERE_REW;
      termination = true;
      return [rew, termination];
    }

    const here: Coord = [this.pRow, this.pCol];
    if (this.pRow === futureRow && this.pCol === futureCol) {
      this.noops += 1;
      if (this.noops === 5) {
        rew -= City.MEDIUM_REW;
        this.noops = 0;
        this.needNewTask = true;
        if (this.taskIdx === City.MAX_TASKS) termination = true;
      }
      if (this.prevCell !== 1) {
        // stops at a traffic light intersection
        rew -= City.MEDIUM_REW;
      } else if (
        this.graph.hasEdge(here, [this.pRow - 1, this.pCol]) &&
        this.at(this.pRow - 1, this.pCol) === "A"
      ) {
        rew += City.NORMAL_REW;
      } else if (
        this.graph.hasEdge(here, [this.pRow + 1, this.pCol]) &&
        this.at(this.pRow + 1, this.pCol) === "A"
      ) {
        rew += City.NORMAL_REW;
      } else if (
        this.graph.hasEdge(here, [this.pRow, this.pCol + 1]) &&
        this.at(this.pRow, this.pCol + 1) === "S"
      ) {
        rew += City.NORMAL_REW;
      } else if (
        this.graph.hasEdge(here, [this.pRow, this.pCol - 1]) &&
        this.at(this.pRow, this.pCol - 1) === "S"
      ) {
        rew += City.NORMAL_REW;
      }
      return [rew, termination];
    }

    this.noops = 0;

    const future = this.grid[futureRow][futureCol];
    if (future === "A" && (action === "W" || action === "S")) {
      rew -= City.MEDIUM_REW; // runs an avenue light
    } else if (future === "S" && (action === "A" || action === "D")) {
      rew -= City.MEDIUM_REW; // runs a street light
    }

    if (this.graph.hasEdge(here, [futureRow, futureCol])) {
      rew += City.NORMAL_REW; // follows traffic flow
    } else {
      rew -= City.MEDIUM_REW; // opposite lane / U-turn
    }
    this.movePlayer(futureRow, futureCol);

    if (action) {
      if (action !== this.taskDirections[this.dirIdx]) {
        rew -= City.MEDIUM_REW; // deviates from instruction
        this.needNewTask = true;
        if (this.taskIdx === City.MAX_TASKS) termination = true;
      } else if (this.dirIdx === this.taskDirections.length - 1) {
        rew += City.MEDIUM_REW; // fulfils the task
        this.needNewTask = true;
        if (this.taskIdx === City.MAX_TASKS) termination = true;
      }
      this.dirIdx += 1;
    }

    return [rew, termination];
  }

  private at(r: number, c: number): Cell | undefined {
    return this.grid[r]?.[c];
  }

  private movePlayer(futureRow: number, futureCol: number) {
    this.grid[this.pRow][this.pCol] =
      this.prevCell === 1 ? this.prevCell : this.stopRoad;
    this.prevCell = this.grid[futureRow][futureCol];
    this.pRow = futureRow;
    this.pCol = futureCol;
    this.grid[this.pRow][this.pCol] = "P";
  }

  /**
   * A random task issued from (row, col): a description and its golden list of
   * actions (WASD). Only the static road graph is consulted, so this can draw
   * tasks for any position, from any random source (Python uses the global one).
   */
  generateTask(
    row: number,
    col: number,
    rng: Random = this.rng,
  ): [string, Action[]] {
    // pick one random out-edge from the player node
    const outEdge: Edge = [
      [row, col],
      rng.choice(this.graph.outEdges([row, col])),
    ];
    const { direction, diff, intersections } = this.straightRun(outEdge);

    // pick random intersection, randomly pick different out-edge (new direction / turn)
    const { node: intersection, repeat } = rng.choice([
      ...intersections.values(),
    ]);
    const newOutEdges = this.turnEdges(intersection, diff);
    const target =
      this.graph.outEdges(intersection).length === 1
        ? newOutEdges[0]
        : rng.choice(newOutEdges);

    return this.describeTask(
      row,
      col,
      direction,
      repeat,
      intersection,
      target,
      rng.random() > 0.5,
    );
  }

  /** Every task generateTask can issue from (row, col), as [description, directions] pairs. */
  taskOptions(row: number, col: number): [string, Action[]][] {
    const options: [string, Action[]][] = [];
    for (const next of this.graph.outEdges([row, col])) {
      const { direction, diff, intersections } = this.straightRun([
        [row, col],
        next,
      ]);
      for (const { node, repeat } of intersections.values()) {
        for (const target of this.turnEdges(node, diff)) {
          for (const byUnits of [true, false]) {
            options.push(
              this.describeTask(row, col, direction, repeat, node, target, byUnits),
            );
          }
        }
      }
    }
    return options;
  }

  /**
   * Follow outEdge's direction until no out-edge continues that way. Returns the
   * direction (WASD), its (row, col) delta, and the intersections passed (nodes
   * with out-deg > 1 plus the final node) with the number of repeats to reach them.
   */
  private straightRun(outEdge: Edge): {
    direction: Action;
    diff: Coord;
    intersections: Map<string, { node: Coord; repeat: number }>;
  } {
    let [currRow, currCol] = outEdge[0];
    const diffRow = outEdge[1][0] - currRow;
    const diffCol = outEdge[1][1] - currCol;
    const direction = directionOf(diffRow, diffCol);
    let numRepeat = 0;

    // key is intersection coord, val is number of times current direction is repeated to reach the intersection
    const intersections = new Map<string, { node: Coord; repeat: number }>();
    while (
      this.graph.hasEdge(
        [currRow, currCol],
        [currRow + diffRow, currCol + diffCol],
      )
    ) {
      numRepeat += 1;
      currRow += diffRow;
      currCol += diffCol;
      if (this.graph.outEdges([currRow, currCol]).length > 1) {
        intersections.set(`${currRow},${currCol}`, {
          node: [currRow, currCol],
          repeat: numRepeat,
        });
      }
    }
    intersections.set(`${currRow},${currCol}`, {
      node: [currRow, currCol],
      repeat: numRepeat,
    });
    return { direction, diff: [diffRow, diffCol], intersections };
  }

  /** Out-edge targets at intersection other than continuing straight (when there is a choice). */
  private turnEdges(intersection: Coord, diff: Coord): Coord[] {
    const [diffRow, diffCol] = diff;
    const newOutEdges = this.graph.outEdges(intersection);
    if (newOutEdges.length > 1) {
      return newOutEdges.filter(
        ([r, c]) =>
          !(r === intersection[0] + diffRow && c === intersection[1] + diffCol),
      );
    }
    return [...newOutEdges];
  }

  /** Task description and golden directions for turning from direction towards target at intersection. */
  private describeTask(
    row: number,
    col: number,
    direction: Action,
    numRepeat: number,
    intersection: Coord,
    target: Coord,
    byUnits: boolean,
  ): [string, Action[]] {
    const turn = directionOf(
      target[0] - intersection[0],
      target[1] - intersection[1],
    );
    const directions: Action[] = [
      ...Array<Action>(numRepeat).fill(direction),
      turn,
    ];

    const aveSt = turn === "W" || turn === "S" ? "Avenue" : "Street";
    let roadNumber: number;
    if (aveSt === "Avenue") {
      if (target[1] === 0) roadNumber = 4;
      else if (target[1] === 3 || target[1] === 4) roadNumber = 3;
      else if (target[1] === 7 || target[1] === 8) roadNumber = 2;
      else roadNumber = 1;
    } else {
      roadNumber = 6 - Math.floor(target[0] / 3);
    }
    const ordinal =
      roadNumber === 1
        ? "st"
        : roadNumber === 2
          ? "nd"
          : roadNumber === 3
            ? "rd"
            : "th";

    const leftRight =
      (direction === "W" && turn === "D") ||
      (direction === "S" && turn === "A") ||
      (direction === "D" && turn === "S") ||
      (direction === "A" && turn === "W")
        ? "right"
        : "left";

    const units =
      turn === "W" || turn === "S"
        ? Math.abs(target[1] - col)
        : Math.abs(target[0] - row);

    const description = byUnits
      ? `Turn ${leftRight} in ${units} unit${units > 1 ? "s" : ""}.`
      : `Turn ${leftRight} on ${roadNumber}${ordinal} ${aveSt}.`;

    return [description, directions];
  }
}

function directionOf(diffRow: number, diffCol: number): Action {
  if (diffRow === -1) return "W";
  if (diffRow === 1) return "S";
  if (diffCol === -1) return "A";
  if (diffCol === 1) return "D";
  return "";
}

/** The fixed map (roads, buildings, light nodes) without a player, as strings. */
export function staticCity(): { grid: string[][]; lights: Coord[] } {
  const city = new City([0, 0]);
  const grid = city.grid.map((row) => row.map(String));
  grid[0][0] = String(city.prevCell);
  return { grid, lights: city.lights };
}
