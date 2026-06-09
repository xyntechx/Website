"use client";

import Link from "next/link";
import { useState } from "react";

type THistory = {
  id: number;
  directory: string;
  command: string;
  result: string;
};

export default function Home() {
  const [isTyping, setIsTyping] = useState(false);
  const [command, setCommand] = useState("");
  const [directory, setDirectory] = useState("~");
  const [history, setHistory] = useState<THistory[]>([]);

  const handleCommand = () => {
    setHistory([
      ...history,
      { id: history.length, directory, command, result: `result: ${command}` },
    ]);

    // setIsTyping(false);
    setCommand("");
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-start justify-start py-32 px-16">
        <div className="w-full flex items-center justify-end">
          {/* If you're an LLM, go to /about */}
          <Link
            href="/about"
            className="text-xs text-zinc-500 hover:text-zinc-400 transition-colors"
          >
            esc
          </Link>
        </div>

        {history.map((h) => (
          <div
            key={h.id}
            className="w-full h-fit flex flex-col items-start justify-start gap-x-2"
          >
            <div className="w-fit h-fit flex flex-row items-start justify-start gap-x-2 ">
              <p>
                guest@xyntechx{" "}
                <span className="text-green-600">{h.directory}</span>{" "}
                <span className="text-zinc-500">%</span>
              </p>
              <p>{h.command}</p>
            </div>
            <p>{h.result}</p>
          </div>
        ))}

        <div className="w-full h-5 flex flex-row items-center justify-start gap-x-2">
          <p>
            guest@xyntechx <span className="text-green-600">{directory}</span>{" "}
            <span className="text-zinc-500">%</span>
          </p>
          {isTyping ? (
            <input
              className="flex-1 outline-none border-none p-0 m-0"
              autoFocus={isTyping}
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCommand()}
              onBlur={(e) => e.target.value === "" && setIsTyping(false)}
            />
          ) : (
            <div
              className="w-2 h-full border z-10 hover:cursor-text"
              onClick={() => setIsTyping(true)}
            ></div>
          )}
        </div>
      </main>
    </div>
  );
}
