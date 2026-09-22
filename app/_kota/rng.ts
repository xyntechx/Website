// Seeded PRNG so episodes replay: mulberry32 (32-bit state, good enough for
// task generation and token sampling). Seeds do not line up with Python's
// `random`, so the same seed as play.ipynb yields a different city.
export class Random {
  private state: number;

  constructor(seed: number) {
    this.state = seed >>> 0;
  }

  /** Uniform float in [0, 1), like `random.random()`. */
  random(): number {
    this.state = (this.state + 0x6d2b79f5) >>> 0;
    let t = this.state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  /** Integer in [0, n), like `random.randrange(n)`. */
  randrange(n: number): number {
    return Math.floor(this.random() * n);
  }

  choice<T>(items: readonly T[]): T {
    if (items.length === 0) throw new Error("choice from empty sequence");
    return items[this.randrange(items.length)];
  }

  /** Index drawn from unnormalised non-negative weights. */
  multinomial(weights: ArrayLike<number>): number {
    let total = 0;
    for (let i = 0; i < weights.length; i++) total += weights[i];
    let r = this.random() * total;
    for (let i = 0; i < weights.length; i++) {
      r -= weights[i];
      if (r < 0) return i;
    }
    // Rounding can leave r slightly above zero: last non-zero weight.
    for (let i = weights.length - 1; i >= 0; i--) if (weights[i] > 0) return i;
    throw new Error("multinomial over zero weights");
  }
}

export function randomSeed(): number {
  return Math.floor(Math.random() * 2 ** 31);
}
