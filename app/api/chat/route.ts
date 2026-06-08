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

  const messages = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: text },
  ];

  const prompt = processor.apply_chat_template(messages, {
    enable_thinking: true,
    add_generation_prompt: true,
  });

  const inputs = processor.tokenizer(prompt, { add_special_tokens: false });

  const stream = new ReadableStream({
    async start(controller) {
      const streamer = new TextStreamer(processor.tokenizer, {
        skip_prompt: true,
        skip_special_tokens: false,
        callback_function: (chunk) => {
          controller.enqueue(new TextEncoder().encode(chunk));
        },
      });

      try {
        await model.generate({
          ...inputs,
          max_new_tokens: 1024,
          do_sample: false,
          streamer,
        });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
