"use client";

import { useState, useRef, InputEvent } from "react";
import { drawCircle, drawTriangle, drawRectangle } from "./utils";
import { getShapes } from "./store";

type ToolCall = {
  name: string;
  arguments: Record<string, unknown>;
};

type ToolResponse = {
  name: string;
  response: unknown;
};

type Message = {
  role: "system" | "user" | "assistant";
  content?: string;
  tool_calls?: {
    function: { name: string; arguments: Record<string, unknown> };
  }[];
  tool_responses?: ToolResponse[];
};

const systemMessage: Message = {
  role: "system",
  content:
    "You are a helpful assistant that draws shapes on a canvas. You have access to tools: drawCircle (write), drawTriangle (write), drawRectangle (write), and inspectCanvas (read). When a user asks about the canvas or asks you to draw, first call inspectCanvas to check what is already there, then use the result to decide what to draw.",
};

const PARSED_DELIM = "\n__PARSED__";

function parseStreamText(raw: string) {
  const thinking: string[] = [];
  const toolCalls: string[] = [];
  const toolResponses: string[] = [];

  let display = raw.replace(
    /<\|channel>thought([\s\S]*?)<channel\|>/g,
    (_, t) => {
      thinking.push(t.trim());
      return "";
    },
  );

  display = display.replace(/<\|channel>thought([\s\S]*)$/g, (_, t) => {
    thinking.push(t.trim());
    return "";
  });

  display = display.replace(
    /<\|tool_call>call:(\w+)\{([\s\S]*?)\}<tool_call\|>/g,
    (_, name, args) => {
      toolCalls.push(`${name}(${args})`);
      return "";
    },
  );

  display = display.replace(
    /<\|tool_response>response:(\w+)\{([\s\S]*?)\}<tool_response\|>/g,
    (_, name, result) => {
      toolResponses.push(`${name}: ${result}`);
      return "";
    },
  );

  display = display
    .replace(/<\|turn>/g, "")
    .replace(/<turn\|>/g, "")
    .replace(/<\|channel>/g, "")
    .replace(/<\|channel\|>/g, "")
    .replace(/<eos>/g, "")
    .trim();

  return {
    thinking: thinking.join("\n"),
    toolCalls: toolCalls.join("\n"),
    toolResponses: toolResponses.join("\n"),
    content: display,
  };
}

function parseToolCalls(text: string) {
  const toolCalls: ToolCall[] = [];
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
    .replace(/<\|channel>thought[\s\S]*?<channel\|>/g, "")
    .replace(/<\|turn>/g, "")
    .replace(/<turn\|>/g, "")
    .replace(/<\|tool_response>[\s\S]*?<tool_response\|>/g, "")
    .replace(/<eos>/g, "")
    .trim();

  return { toolCalls, cleanText };
}

function executeToolCalls(toolCalls: ToolCall[]): ToolResponse[] {
  const results: ToolResponse[] = [];
  const canvas = document.querySelector("canvas");
  if (!canvas) return results;
  const ctx = canvas.getContext("2d");
  if (!ctx) return results;

  for (const { name, arguments: args } of toolCalls) {
    switch (name) {
      case "drawCircle": {
        const cx = args.x as number;
        const cy = args.y as number;
        const r = args.radius as number;
        const fill = args.fillStyle as string | undefined;
        drawCircle(ctx, cx, cy, r, fill);
        results.push({
          name: "drawCircle",
          response: `circle at (${cx}, ${cy}) radius ${r} fill ${fill ?? "#0070f3"}`,
        });
        break;
      }
      case "drawTriangle": {
        const fill = args.fillStyle as string | undefined;
        drawTriangle(
          ctx,
          args.x1 as number,
          args.y1 as number,
          args.x2 as number,
          args.y2 as number,
          args.x3 as number,
          args.y3 as number,
          fill,
        );
        results.push({
          name: "drawTriangle",
          response: `triangle (${args.x1},${args.y1})-(${args.x2},${args.y2})-(${args.x3},${args.y3}) fill ${fill ?? "#0070f3"}`,
        });
        break;
      }
      case "drawRectangle": {
        const rx = args.x as number;
        const ry = args.y as number;
        const w = args.width as number;
        const h = args.height as number;
        const fill = args.fillStyle as string | undefined;
        drawRectangle(ctx, rx, ry, w, h, fill);
        results.push({
          name: "drawRectangle",
          response: `rectangle at (${rx}, ${ry}) size ${w}×${h} fill ${fill ?? "#0070f3"}`,
        });
        break;
      }
      case "inspectCanvas": {
        const shapes = getShapes();
        const dims = `Canvas size: ${canvas.width} × ${canvas.height}`;
        const body =
          shapes.length === 0
            ? "No shapes on the canvas."
            : `Shapes (${shapes.length}):\n${shapes
                .map((s) => {
                  switch (s.type) {
                    case "circle":
                      return `  [${s.id}] Circle at (${s.x}, ${s.y}), radius ${s.radius}, fill ${s.fillStyle}`;
                    case "triangle":
                      return `  [${s.id}] Triangle at (${s.x1},${s.y1})-(${s.x2},${s.y2})-(${s.x3},${s.y3}), fill ${s.fillStyle}`;
                    case "rectangle":
                      return `  [${s.id}] Rectangle at (${s.x}, ${s.y}), size ${s.width}×${s.height}, fill ${s.fillStyle}`;
                  }
                })
                .join("\n")}`;
        results.push({ name: "inspectCanvas", response: `${dims}\n${body}` });
        break;
      }
    }
  }
  return results;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([systemMessage]);
  const [thinkingText, setThinkingText] = useState("");
  const [toolCallsText, setToolCallsText] = useState("");
  const [toolResponsesText, setToolResponsesText] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [ready, setReady] = useState<boolean | null>(null);
  const [userInput, setUserInput] = useState("");

  const rawBufferRef = useRef("");

  const flushDisplay = (buffer: string) => {
    const cleaned = buffer.replace(/\n?__PARSED__[\s\S]*$/, "");
    const { thinking, toolCalls, toolResponses, content } =
      parseStreamText(cleaned);
    setThinkingText(thinking);
    setToolCallsText(toolCalls);
    setToolResponsesText(toolResponses);
    setDisplayText(content);
  };

  const generate = async (history: Message[], round = 0) => {
    if (round >= 5) return;

    if (round === 0) {
      rawBufferRef.current = "";
      setThinkingText("");
      setToolCallsText("");
      setToolResponsesText("");
      setDisplayText("");
    }

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: history }),
    });

    if (round === 0 && !ready) setReady(true);

    if (!response.ok) {
      setDisplayText(await response.text());
      return;
    }

    if (!response.body) {
      setDisplayText(await response.text());
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
      rawBufferRef.current += chunk;
      flushDisplay(rawBufferRef.current);
    }

    const delimIdx = fullText.lastIndexOf(PARSED_DELIM);
    let rawForParse = fullText;
    let parsedResult: { content?: string; tool_calls?: ToolCall[] } | null =
      null;

    if (delimIdx >= 0) {
      rawForParse = fullText.slice(0, delimIdx);
      try {
        parsedResult = JSON.parse(
          fullText.slice(delimIdx + PARSED_DELIM.length),
        );
      } catch {
        // ignore parse error
      }
    }

    flushDisplay(rawBufferRef.current);

    let toolCalls: ToolCall[];
    if (parsedResult?.tool_calls) {
      toolCalls = parsedResult.tool_calls;
    } else {
      toolCalls = parseToolCalls(rawForParse).toolCalls;
    }

    if (toolCalls.length > 0) {
      const toolResponses = executeToolCalls(toolCalls);

      const assistantMsg: Message = {
        role: "assistant",
        content: parsedResult?.content ?? "",
        tool_calls: toolCalls.map((c) => ({
          function: { name: c.name, arguments: c.arguments },
        })),
        tool_responses: toolResponses,
      };
      await generate([...history, assistantMsg], round + 1);
      return;
    }

    const finalText =
      parsedResult?.content ?? parseToolCalls(rawForParse).cleanText;
    setMessages((prev) => [
      ...prev,
      history[history.length - 1],
      { role: "assistant", content: finalText || "(shapes drawn)" },
    ]);
  };

  const handleSubmit = async () => {
    const text = userInput.trim();
    if (!text) return;
    if (ready === null) setReady(false);
    setUserInput("");
    const newMessages = [...messages, { role: "user" as const, content: text }];
    await generate(newMessages);
  };

  return (
    <>
      <div className="w-1/2 flex flex-row items-center justify-center gap-4">
        <input
          type="text"
          className="w-full max-w-xs p-2 border border-gray-300 rounded mb-4"
          placeholder="Enter text here"
          value={userInput}
          onInput={(e: InputEvent<HTMLInputElement>) =>
            setUserInput((e.target as HTMLInputElement).value)
          }
        />
        <button onClick={handleSubmit}>Go</button>
      </div>
      {ready !== null && (
        <div className="w-full border p-4 space-y-2">
          {thinkingText && (
            <div className="text-gray-400 italic text-sm whitespace-pre-wrap">
              {thinkingText}
            </div>
          )}
          {toolCallsText && (
            <div className="text-gray-400 font-mono text-xs whitespace-pre-wrap">
              {toolCallsText}
            </div>
          )}
          {toolResponsesText && (
            <div className="text-gray-500 text-xs whitespace-pre-wrap">
              {toolResponsesText}
            </div>
          )}
          <div className="whitespace-pre-wrap">
            {displayText || "Loading..."}
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
