"use client";

import { useState, InputEvent } from "react";
import { drawCircle, drawTriangle, drawRectangle } from "./canvas";

function parseToolCalls(text: string) {
  const toolCalls: { name: string; arguments: Record<string, unknown> }[] = [];
  const toolCallRegex = /<\|tool_call>call:(\w+)\{([\s\S]*?)\}<tool_call\|>/g;
  const argRegex = /(\w+):(?:<\|"\|>(.*?)<\|"\|>|([^,}]+))/g;

  let match;
  while ((match = toolCallRegex.exec(text)) !== null) {
    const name = match[1];
    const argsStr = match[2];
    const args: Record<string, unknown> = {};

    let argMatch;
    while ((argMatch = argRegex.exec(argsStr)) !== null) {
      const key = argMatch[1];
      const strVal = argMatch[2];
      const rawVal = argMatch[3];
      if (strVal !== undefined) {
        args[key] = strVal;
      } else if (rawVal !== undefined) {
        const num = Number(rawVal);
        args[key] = Number.isNaN(num) ? rawVal : num;
      }
    }

    toolCalls.push({ name, arguments: args });
  }

  const cleanText = text
    .replace(/<\|tool_call>[\s\S]*?<tool_call\|>/g, "")
    .replace(/<eos>/g, "")
    .trim();

  return { toolCalls, cleanText };
}

function executeToolCalls(
  toolCalls: { name: string; arguments: Record<string, unknown> }[],
) {
  const canvas = document.querySelector("canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  for (const { name, arguments: args } of toolCalls) {
    console.log(name, args);

    switch (name) {
      case "drawCircle":
        drawCircle(
          ctx,
          args.x as number,
          args.y as number,
          args.radius as number,
          args.fillStyle as string | undefined,
        );
        break;
      case "drawTriangle":
        drawTriangle(
          ctx,
          args.x1 as number,
          args.y1 as number,
          args.x2 as number,
          args.y2 as number,
          args.x3 as number,
          args.y3 as number,
          args.fillStyle as string | undefined,
        );
        break;
      case "drawRectangle":
        drawRectangle(
          ctx,
          args.x as number,
          args.y as number,
          args.width as number,
          args.height as number,
          args.fillStyle as string | undefined,
        );
        break;
    }
  }
}

const Chat = () => {
  const [result, setResult] = useState<string | null>(null);
  const [ready, setReady] = useState<boolean | null>(null);
  const [userMessage, setUserMessage] = useState<string | null>(null);

  const generate = async (text: string) => {
    if (!text) return;
    if (ready === null) setReady(false);

    setResult("");

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!ready) setReady(true);

    if (!response.ok) {
      setResult(await response.text());
      return;
    }

    if (!response.body) {
      setResult(await response.text());
      return;
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullText = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      fullText += chunk;
      setResult((prev) => (prev || "") + chunk);
    }

    const { toolCalls, cleanText } = parseToolCalls(fullText);
    if (toolCalls.length > 0) {
      setResult(cleanText);
      executeToolCalls(toolCalls);
    }
  };

  return (
    <>
      <div className="w-1/2 flex flex-row items-center justify-center gap-4">
        <input
          type="text"
          className="w-full max-w-xs p-2 border border-gray-300 rounded mb-4"
          placeholder="Enter text here"
          onInput={(e: InputEvent<HTMLInputElement>) =>
            setUserMessage((e.target as HTMLInputElement).value)
          }
        />
        <button onClick={() => generate(userMessage ?? "")}>Go</button>
      </div>
      {ready !== null && (
        <div className="w-full border p-4">
          <p>{!ready || !result ? "Loading..." : result}</p>
        </div>
      )}
    </>
  );
};

export default Chat;
