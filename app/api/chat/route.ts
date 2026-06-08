import { NextRequest } from "next/server";
import { pipeline, TextStreamer } from "@huggingface/transformers";

export async function GET(request: NextRequest) {
  const text = request.nextUrl.searchParams.get("text");
  if (!text) {
    return new Response("Missing text parameter", { status: 400 });
  }

  const generator = await pipeline(
    "text-generation",
    "onnx-community/Qwen3-0.6B-ONNX",
    { device: "webgpu", dtype: "q4f16" },
  );

  const messages = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: text },
  ];

  const stream = new ReadableStream({
    async start(controller) {
      const streamer = new TextStreamer(generator.tokenizer, {
        skip_prompt: true,
        skip_special_tokens: true,
        callback_function: (chunk) => {
          controller.enqueue(new TextEncoder().encode(chunk));
        },
      });

      try {
        await generator(messages, {
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
