import { NextRequest } from "next/server";
import {
  AutoProcessor,
  Gemma4ForConditionalGeneration,
  TextStreamer,
} from "@huggingface/transformers";

const model_id = "onnx-community/gemma-4-E2B-it-ONNX";

export async function GET(request: NextRequest) {
  const text = request.nextUrl.searchParams.get("text");
  if (!text) {
    return new Response("Missing text parameter", { status: 400 });
  }

  const processor = await AutoProcessor.from_pretrained(model_id);
  const model = await Gemma4ForConditionalGeneration.from_pretrained(model_id, {
    dtype: "q4f16",
    device: "webgpu",
  });

  const eosTokenId = BigInt(processor.tokenizer.eos_token_id);

  const vocab: Record<string, number> | undefined =
    processor.tokenizer.get_vocab?.();
  const endOfTurnId: bigint = BigInt(vocab["<end_of_turn>"]); // 106n

  const stopTokenIds = new Set<bigint>([eosTokenId, endOfTurnId]);

  const messages = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: text },
  ];

  const prompt = processor.apply_chat_template(messages, {
    enable_thinking: true,
    add_generation_prompt: true,
  });

  const inputs = processor.tokenizer(prompt, { add_special_tokens: true });

  const stream = new ReadableStream({
    async start(controller) {
      let current_input_ids = inputs.input_ids;
      let finished = false;

      try {
        while (!finished) {
          const streamer = new TextStreamer(processor.tokenizer, {
            skip_prompt: true,
            skip_special_tokens: false,
            callback_function: (chunk: string) => {
              controller.enqueue(new TextEncoder().encode(chunk));
            },
          });

          const outputs = await model.generate({
            input_ids: current_input_ids,
            max_new_tokens: 512,
            do_sample: false,
            streamer,
          });

          const input_len = current_input_ids.dims.at(-1)!;
          const generated = outputs.slice(null, [input_len, null]);
          // last token comes back as BigInt from the underlying TypedArray
          const last_token_id = generated.data[
            generated.data.length - 1
          ] as bigint;

          if (stopTokenIds.has(last_token_id)) {
            finished = true;
          } else {
            // Hit max_new_tokens — feed full sequence back to continue.
            current_input_ids = outputs;
          }
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
