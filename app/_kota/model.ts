// Browser inference for the exported world model (kota-wm/export_onnx.py):
// one ONNX graph holding the GPT backbone with a KV cache, the reward and
// termination heads and the actor-critic. Mirrors dyna.CachedContext,
// dyna.generate_observation and play.detokenize_observation.
import * as ort from "onnxruntime-web";
import { staticCity } from "./city";
import type { Random } from "./rng";
import {
  COL_TOKEN_IDS,
  DISTANCE_TOKEN_IDS,
  OUT_LEN,
  ROAD_TOKEN_IDS,
  ROW_TOKEN_IDS,
  STEP_LEN,
  STOP_TOKEN_IDS,
  TASK_INDEX_TOKEN_IDS,
  TOKENS,
  VOCAB,
  VOCAB_SIZE,
} from "./tokens";

export const MODEL_URL =
  process.env.NEXT_PUBLIC_KOTA_MODEL_URL ?? "/models/kota-wm.onnx";
const CACHE_NAME = "kota-wm";

// From the checkpoint's DynaConfig / GPT config; the export writes them into the
// ONNX metadata, which onnxruntime-web does not expose, so they are repeated here.
export const CONTEXT_STEPS = 64;
export const CTX_LEN = CONTEXT_STEPS * STEP_LEN;
export const BLOCK_SIZE = CTX_LEN + OUT_LEN;
export const DEFAULT_TEMPERATURE = 1.0;
export const DEFAULT_GRID_TEMPERATURE = 0.5;
export const MAX_EPISODE_STEPS = 256;
const N_LAYER = 12;
const N_HEAD = 12;
const HEAD_SIZE = 64;

export type Backend = "webgpu" | "wasm";

export type LoadProgress =
  | { phase: "download"; loaded: number; total: number; cached: boolean }
  | { phase: "compile"; backend: Backend };

export interface ModelOutputs {
  logits: Float32Array;
  reward: number;
  termination: number;
  piLogits: Float32Array;
  value: number;
}

// One key and one value tensor per layer, (1, n_head, P, hs), as the graph's
// past_k_{i} / past_v_{i} inputs and present_k_{i} / present_v_{i} outputs.
interface KVCache {
  tensors: Record<string, ort.Tensor>;
  length: number;
}

const PAST_NAMES = Array.from({ length: N_LAYER }, (_, i) => [
  `past_k_${i}`,
  `past_v_${i}`,
]).flat();

function disposeCache(cache: KVCache) {
  for (const tensor of Object.values(cache.tensors)) tensor.dispose();
}

async function fetchModelBytes(
  url: string,
  onProgress: (p: LoadProgress) => void,
): Promise<ArrayBuffer> {
  let cache: Cache | null = null;
  try {
    cache = await caches.open(CACHE_NAME);
    const hit = await cache.match(url);
    if (hit) {
      const total = Number(hit.headers.get("content-length") ?? 0);
      onProgress({ phase: "download", loaded: total, total, cached: true });
      return await hit.arrayBuffer();
    }
  } catch {
    cache = null; // Cache API unavailable (private mode, quota); download every visit.
  }
  const response = await fetch(url);
  if (!response.ok || !response.body)
    throw new Error(
      `Could not fetch the model (${response.status}) from ${url}`,
    );
  const total = Number(response.headers.get("content-length") ?? 0);
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let loaded = 0;
  onProgress({ phase: "download", loaded, total, cached: false });
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    loaded += value.length;
    onProgress({ phase: "download", loaded, total, cached: false });
  }
  const bytes = new Uint8Array(loaded);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.length;
  }
  if (cache) {
    try {
      await cache.put(
        url,
        new Response(bytes, { headers: { "content-length": String(loaded) } }),
      );
    } catch {
      // Not enough storage; the model still works for this visit.
    }
  }
  return bytes.buffer;
}

export class WorldModel {
  private constructor(
    private readonly session: ort.InferenceSession,
    readonly backend: Backend,
  ) {}

  static async load(
    onProgress: (p: LoadProgress) => void,
    url = MODEL_URL,
  ): Promise<WorldModel> {
    ort.env.wasm.wasmPaths = "/ort/";
    const bytes = await fetchModelBytes(url, onProgress);
    const attempts: Backend[] =
      typeof navigator !== "undefined" && "gpu" in navigator
        ? ["webgpu", "wasm"]
        : ["wasm"];
    let lastError: unknown = null;
    for (const backend of attempts) {
      onProgress({ phase: "compile", backend });
      try {
        const session = await ort.InferenceSession.create(bytes, {
          executionProviders: [backend],
          graphOptimizationLevel: "all",
          // ORT prints benign notices (shape ops assigned to CPU) through
          // console.error; only real errors (severity 3) are worth surfacing.
          logSeverityLevel: 3,
          // Keep the cache on the GPU between calls instead of copying it back.
          ...(backend === "webgpu"
            ? {
                preferredOutputLocation: Object.fromEntries(
                  PAST_NAMES.map((name) => [
                    name.replace("past", "present"),
                    "gpu-buffer",
                  ]),
                ),
              }
            : {}),
        });
        return new WorldModel(session, backend);
      } catch (error) {
        lastError = error;
      }
    }
    throw lastError instanceof Error ? lastError : new Error(String(lastError));
  }

  private static emptyCache(): KVCache {
    const tensors: Record<string, ort.Tensor> = {};
    for (const name of PAST_NAMES)
      tensors[name] = new ort.Tensor("float32", new Float32Array(0), [
        1,
        N_HEAD,
        0,
        HEAD_SIZE,
      ]);
    return { tensors, length: 0 };
  }

  /** Run `ids` after `past` (or from scratch); the previous cache is released. */
  async forward(
    ids: number[],
    past: KVCache | null,
  ): Promise<{ outputs: ModelOutputs; cache: KVCache }> {
    if (ids.length === 0) throw new Error("Forward needs at least one token");
    const previous = past ?? WorldModel.emptyCache();
    if (previous.length + ids.length > BLOCK_SIZE) {
      throw new Error("Crop the context before appending beyond block_size");
    }
    const results = await this.session.run({
      ids: new ort.Tensor("int64", BigInt64Array.from(ids, BigInt), [
        1,
        ids.length,
      ]),
      ...previous.tensors,
    });
    disposeCache(previous);
    const tensors: Record<string, ort.Tensor> = {};
    for (const name of PAST_NAMES)
      tensors[name] = results[name.replace("past", "present")];
    const scalar = (name: string) =>
      Number((results[name].data as Float32Array)[0]);
    return {
      outputs: {
        logits: results.logits.data as Float32Array,
        reward: scalar("reward"),
        termination: scalar("termination"),
        piLogits: results.pi_logits.data as Float32Array,
        value: scalar("value"),
      },
      cache: { tensors, length: previous.length + ids.length },
    };
  }
}

/** One inference session over a growing token sequence (dyna.CachedContext, B = 1). */
export class CachedContext {
  tokens: number[] = [];
  outputs!: ModelOutputs;
  private cache: KVCache | null = null;

  private constructor(private readonly model: WorldModel) {}

  static async create(
    model: WorldModel,
    tokens: number[],
  ): Promise<CachedContext> {
    const session = new CachedContext(model);
    await session.reset(tokens);
    return session;
  }

  get length(): number {
    return this.tokens.length;
  }

  /** Rebuild from scratch: cropping changes rotary positions and history. */
  async reset(tokens: number[]) {
    if (tokens.length === 0) throw new Error("Context rows must be non-empty");
    this.dispose();
    const { outputs, cache } = await this.model.forward(tokens, null);
    this.tokens = [...tokens];
    this.outputs = outputs;
    this.cache = cache;
  }

  async append(tokens: number[]) {
    if (tokens.length === 0) return;
    const { outputs, cache } = await this.model.forward(tokens, this.cache);
    this.tokens.push(...tokens);
    this.outputs = outputs;
    this.cache = cache;
  }

  async crop(length: number) {
    if (this.tokens.length > length)
      await this.reset(this.tokens.slice(-length));
  }

  /** Sample one token from `allowed` ids at `temperature` (masked softmax over the last logits). */
  sample(allowed: readonly number[], temperature: number, rng: Random): number {
    if (temperature <= 0) throw new Error("temperature must be positive");
    const logits = this.outputs.logits;
    let max = -Infinity;
    for (const id of allowed) max = Math.max(max, logits[id] / temperature);
    const weights = new Float64Array(allowed.length);
    for (let i = 0; i < allowed.length; i++)
      weights[i] = Math.exp(logits[allowed[i]] / temperature - max);
    return allowed[rng.multinomial(weights)];
  }

  dispose() {
    if (this.cache) {
      disposeCache(this.cache);
      this.cache = null;
    }
  }
}

/**
 * Generate task, task index, then row/col/stop, masking token types only
 * (dyna.generate_observation). Each sample is appended to the context.
 */
export async function generateObservation(
  session: CachedContext,
  temperature: number,
  gridTemperature: number,
  rng: Random,
): Promise<number[]> {
  const generated: number[] = [];
  const take = async (allowed: readonly number[], t: number) => {
    const token = session.sample(allowed, t, rng);
    generated.push(token);
    await session.append([token]);
  };
  await take([VOCAB["Turn left"], VOCAB["Turn right"]], temperature);
  await take([...DISTANCE_TOKEN_IDS, ...ROAD_TOKEN_IDS], temperature);
  const isDistance = DISTANCE_TOKEN_IDS.includes(generated[1]);
  await take(
    isDistance ? [VOCAB["EMPTY"]] : [VOCAB["Avenue."], VOCAB["Street."]],
    temperature,
  );
  await take(TASK_INDEX_TOKEN_IDS, temperature);
  for (const ids of [ROW_TOKEN_IDS, COL_TOKEN_IDS, STOP_TOKEN_IDS])
    await take(ids, gridTemperature);
  return generated;
}

const STATIC = staticCity();

/** Task text and a 16x12 grid rebuilt from the static map plus position and light phase. */
export function detokenizeObservation(tokens: readonly number[]): {
  task: string;
  grid: string[][];
} {
  if (tokens.length !== OUT_LEN)
    throw new Error(
      `Expected ${OUT_LEN} observation tokens, got ${tokens.length}`,
    );
  const task = tokens
    .slice(0, 3)
    .map((t) => TOKENS[t])
    .filter((t) => t !== "EMPTY")
    .join(" ");
  const [row, col, stop] = tokens
    .slice(4, 7)
    .map((t) => TOKENS[t].split(" ")[1]);
  const grid = STATIC.grid.map((r) => [...r]);
  for (const [r, c] of STATIC.lights) grid[r][c] = stop;
  grid[Number(row)][Number(col)] = "P";
  return { task, grid };
}

export function taskIndexOf(tokens: readonly number[]): number {
  const name = TOKENS[tokens[3]];
  if (!name.startsWith("task "))
    throw new Error(`Expected a task index token at position 3, got ${name}`);
  return Number(name.split(" ")[1]);
}

export function softmax(logits: Float32Array): number[] {
  const max = Math.max(...logits);
  const exps = Array.from(logits, (l) => Math.exp(l - max));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map((e) => e / sum);
}

export { VOCAB_SIZE };
