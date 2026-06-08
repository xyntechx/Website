import { NextRequest } from "next/server";
import {
  AutoProcessor,
  Gemma4ForConditionalGeneration,
  Tensor,
  TextStreamer,
} from "@huggingface/transformers";

const model_id = "onnx-community/gemma-4-E2B-it-ONNX";

export async function POST(request: NextRequest) {
  const { text } = await request.json();
  if (!text) {
    return new Response("Missing text parameter", { status: 400 });
  }

  const processor = await AutoProcessor.from_pretrained(model_id);
  const model = await Gemma4ForConditionalGeneration.from_pretrained(model_id, {
    dtype: "q4f16",
    device: "webgpu",
  });

  const tokenizer = processor.tokenizer;
  if (!tokenizer) {
    return new Response("Tokenizer not available", { status: 500 });
  }

  const vocab = tokenizer.get_vocab();
  const turn_token = "<turn|>";
  const turn_id_int = vocab.get(turn_token);

  if (!turn_id_int) {
    return new Response(`${turn_token} is not a valid token.`, { status: 500 });
  }

  const turn_id: bigint = BigInt(turn_id_int);
  const eos_id = BigInt(tokenizer.eos_token_id);
  const stop_ids = new Set<bigint>([eos_id, turn_id]);

  const messages = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: text },
  ];

  const prompt = processor.apply_chat_template(messages, {
    enable_thinking: true,
    add_generation_prompt: true,
    tokenize: false,
  } as Parameters<typeof tokenizer.apply_chat_template>[1]) as string;

  const inputs = tokenizer(prompt, { add_special_tokens: true });

  const stream = new ReadableStream({
    async start(controller) {
      let current_input_ids = inputs.input_ids;
      let finished = false;

      try {
        while (!finished) {
          const streamer = new TextStreamer(tokenizer, {
            skip_prompt: true,
            skip_special_tokens: false,
            callback_function: (chunk: string) => {
              controller.enqueue(new TextEncoder().encode(chunk));
            },
          });

          const outputs = (await model.generate({
            input_ids: current_input_ids,
            max_new_tokens: 2048,
            do_sample: false,
            streamer,
          })) as Tensor;

          const input_len = current_input_ids.dims.at(-1)!;
          const generated = outputs.slice(null, [
            input_len,
            outputs.dims.at(-1)!,
          ]);

          const last_token_id = generated.data[
            generated.data.length - 1
          ] as bigint;

          if (stop_ids.has(last_token_id)) {
            finished = true;
          } else {
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
