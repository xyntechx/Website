// Vocabulary and observation encoding from kota-wm/dyna.py, "compact" mode:
// task index (1) + player row/col + stopped road type + task (1 token).
import { City, NUM_COLS, NUM_ROWS, type Action, type Coord } from "./city";
import type { Random } from "./rng";

const range = (n: number) => Array.from({ length: n }, (_, i) => i);

// The road graph is the same in every City; only tasks depend on it.
const STATIC_CITY = new City([0, 0]);

const ROAD_NODES: Coord[] = [];
for (const r of range(NUM_ROWS))
  for (const c of range(NUM_COLS))
    if (STATIC_CITY.graph.hasNode(r, c)) ROAD_NODES.push([r, c]);

const nodeKey = (r: number, c: number) => `${r},${c}`;

// Road node -> every task text City can issue from there.
const REACHABLE_TASKS = new Map<string, ReadonlySet<string>>(
  ROAD_NODES.map(([r, c]) => [
    nodeKey(r, c),
    new Set(STATIC_CITY.taskOptions(r, c).map(([text]) => text)),
  ]),
);

const ordinal = (k: number) =>
  `${k}${k === 1 ? "st" : k === 2 ? "nd" : k === 3 ? "rd" : "th"}`;

// One token per task, in grammar order: Turn left/right in N units, then on
// the Nth Avenue/Street. Only phrasings some road node can actually issue are
// kept (43 of the grammar's 50; the one-way layout rules out the rest).
const ISSUABLE = new Set([...REACHABLE_TASKS.values()].flatMap((s) => [...s]));
export const TASK_TEXTS: readonly string[] = [
  ...["left", "right"].flatMap((side) =>
    range(15).map((i) => `Turn ${side} in ${i + 1} unit${i === 0 ? "" : "s"}.`),
  ),
  ...["left", "right"].flatMap((side) =>
    (
      [
        ["Avenue", 4],
        ["Street", 6],
      ] as const
    ).flatMap(([road, count]) =>
      range(count).map((k) => `Turn ${side} on ${ordinal(k + 1)} ${road}.`),
    ),
  ),
].filter((text) => ISSUABLE.has(text));
if (TASK_TEXTS.length !== ISSUABLE.size)
  throw new Error("City issues a task outside the grammar");

export const TOKENS: readonly string[] = [
  // obs
  "0",
  "1",
  "A",
  "S",
  "P",
  // act
  "W_act",
  "A_act",
  "S_act",
  "D_act",
  "NOOP",
  // task index: "task k" means k tasks have been issued this episode.
  ...range(City.MAX_TASKS).map((k) => `task ${k + 1}`),
  // task: one token per instruction City can issue (City.taskOptions)
  ...TASK_TEXTS,
  // compact observation: player position and the stopped road type
  ...range(NUM_ROWS).map((r) => `row ${r}`),
  ...range(NUM_COLS).map((c) => `col ${c}`),
  "stop A",
  "stop S",
  // pad
  "<PAD>",
];

export const VOCAB: Readonly<Record<string, number>> = Object.fromEntries(
  TOKENS.map((t, i) => [t, i]),
);
export const VOCAB_SIZE = TOKENS.length;
if (VOCAB_SIZE !== 94)
  throw new Error(`Vocabulary drifted from dyna.py: ${VOCAB_SIZE} tokens`);

export const GRID_ROWS = NUM_ROWS;
export const GRID_COLS = NUM_COLS;
// task index (1) + row/col/stop (3) + task (1)
export const OUT_LEN = 1 + 3 + 1;
export const STEP_LEN = OUT_LEN + 1;
// The task is not predicted by the world model, so it comes last: a generated
// observation draws a new task from the ones City can issue at the generated
// player position exactly when the generated task index advances, which needs
// both the index and row/col first.
export const TASK_INDEX_POS = 0;
export const TASK_POS = OUT_LEN - 1;
export const OBS_BODY: readonly [number, number] = [1, OUT_LEN - 1]; // row/col/stop

export const TASK_INDEX_TOKEN_IDS = range(City.MAX_TASKS).map(
  (k) => VOCAB[`task ${k + 1}`],
);
export const TASK_TOKEN_IDS = TASK_TEXTS.map((t) => VOCAB[t]);
export const ROW_TOKEN_IDS = range(NUM_ROWS).map((r) => VOCAB[`row ${r}`]);
export const COL_TOKEN_IDS = range(NUM_COLS).map((c) => VOCAB[`col ${c}`]);
export const STOP_TOKEN_IDS = [VOCAB["stop A"], VOCAB["stop S"]];

export const ACTION_NAMES: readonly Action[] = ["W", "A", "S", "D", ""];
export const ACTION_TOKEN_IDS = [
  "W_act",
  "A_act",
  "S_act",
  "D_act",
  "NOOP",
].map((t) => VOCAB[t]);

export function actionIndex(action: Action): number {
  const index = ACTION_NAMES.indexOf(action);
  if (index < 0) throw new Error(`Unknown action ${JSON.stringify(action)}`);
  return index;
}

export function actionLabel(action: Action): string {
  return action || "NO-OP";
}

/** One token per task; the vocabulary enumerates every task City issues. */
export function tokenizeTask(text: string): number {
  const id = VOCAB[text];
  if (id === undefined || !TASK_TOKEN_IDS.includes(id))
    throw new Error(`Cannot tokenize task: ${text}`);
  return id;
}

/** (row, col) of the player in an observation (the task may be missing). */
export function playerPosition(tokens: readonly number[]): Coord {
  return [ROW_TOKEN_IDS.indexOf(tokens[1]), COL_TOKEN_IDS.indexOf(tokens[2])];
}

/**
 * A task City would issue from `position`, drawn with City's own generator.
 * Tasks are issued by the environment, never predicted. Off the road (a
 * generated position inside a building), any task is drawn.
 */
export function sampleTaskToken(position: Coord, rng: Random): number {
  const [row, col] = position;
  if (REACHABLE_TASKS.has(nodeKey(row, col))) {
    const [text] = STATIC_CITY.generateTask(row, col, rng);
    return VOCAB[text];
  }
  return rng.choice(TASK_TOKEN_IDS);
}

export function observe(city: City): number[] {
  if (!(city.taskIdx >= 1 && city.taskIdx <= City.MAX_TASKS)) {
    throw new Error("Observe after envStep, once the first task exists");
  }
  return [
    VOCAB[`task ${city.taskIdx}`],
    VOCAB[`row ${city.pRow}`],
    VOCAB[`col ${city.pCol}`],
    VOCAB[`stop ${city.stopRoad}`],
    tokenizeTask(city.task),
  ];
}
