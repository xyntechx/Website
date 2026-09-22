// Copy the onnxruntime-web WebAssembly runtime into public/ort/ so the world
// model page can load it from this origin (see app/kota/model.ts).
import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";

// The package's "exports" map hides package.json, so resolve from node_modules directly.
const dist = join(process.cwd(), "node_modules", "onnxruntime-web", "dist");
const target = join(process.cwd(), "public", "ort");
mkdirSync(target, { recursive: true });
for (const file of [
  "ort-wasm-simd-threaded.jsep.wasm",
  "ort-wasm-simd-threaded.jsep.mjs",
]) {
  const source = join(dist, file);
  const destination = join(target, file);
  try {
    if (statSync(destination).size === statSync(source).size) continue;
  } catch {
    // not copied yet
  }
  copyFileSync(source, destination);
}
