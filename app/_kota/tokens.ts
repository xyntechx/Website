// Vocabulary and observation encoding from kota-wm/dyna.py, "compact" mode:
// task (3 tokens) + task index (1) + player row/col + stopped road type.
import { City, NUM_COLS, NUM_ROWS, type Action } from "./city";

const range = (n: number) => Array.from({ length: n }, (_, i) => i);

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
  // task
  "Turn left",
  "Turn right",
  ...range(15).map((i) => `in ${i + 1} unit${i === 0 ? "" : "s"}.`),
  "on 1st",
  "on 2nd",
  "on 3rd",
  "on 4th",
  "on 5th",
  "on 6th",
  "Avenue.",
  "Street.",
  "EMPTY",
  // task index
  ...range(City.MAX_TASKS).map((k) => `task ${k + 1}`),
  // compact observation
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
if (VOCAB_SIZE !== 77)
  throw new Error(`Vocabulary drifted from dyna.py: ${VOCAB_SIZE} tokens`);

export const GRID_ROWS = NUM_ROWS;
export const GRID_COLS = NUM_COLS;
export const OUT_LEN = 3 + 1 + 3;
export const STEP_LEN = OUT_LEN + 1;

export const TASK_INDEX_TOKEN_IDS = range(City.MAX_TASKS).map(
  (k) => VOCAB[`task ${k + 1}`],
);
export const ROW_TOKEN_IDS = range(NUM_ROWS).map((r) => VOCAB[`row ${r}`]);
export const COL_TOKEN_IDS = range(NUM_COLS).map((c) => VOCAB[`col ${c}`]);
export const STOP_TOKEN_IDS = [VOCAB["stop A"], VOCAB["stop S"]];
export const DISTANCE_TOKEN_IDS = TOKENS.flatMap((t, i) =>
  t.startsWith("in ") ? [i] : [],
);
export const ROAD_TOKEN_IDS = TOKENS.flatMap((t, i) =>
  t.startsWith("on ") ? [i] : [],
);

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

export function tokenizeTask(text: string): number[] {
  const tokens: number[] = [];
  let phrase: string[] = [];
  for (const word of text.split(/\s+/).filter(Boolean)) {
    phrase.push(word);
    const joined = phrase.join(" ");
    if (joined in VOCAB) {
      tokens.push(VOCAB[joined]);
      phrase = [];
    }
  }
  if (phrase.length || tokens.length > 3)
    throw new Error(`Cannot tokenize task: ${text}`);
  while (tokens.length < 3) tokens.push(VOCAB["EMPTY"]);
  return tokens;
}

export function observe(city: City): number[] {
  if (!(city.taskIdx >= 1 && city.taskIdx <= City.MAX_TASKS)) {
    throw new Error("Observe after envStep, once the first task exists");
  }
  return [
    ...tokenizeTask(city.task),
    VOCAB[`task ${city.taskIdx}`],
    VOCAB[`row ${city.pRow}`],
    VOCAB[`col ${city.pCol}`],
    VOCAB[`stop ${city.stopRoad}`],
  ];
}
