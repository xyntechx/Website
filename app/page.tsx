"use client";

import Link from "next/link";
import { useState } from "react";
import { THistory } from "./utils/types";
import { directories, files } from "./utils/content";

export default function Home() {
  const [isTyping, setIsTyping] = useState(false);

  const [command, setCommand] = useState("");
  const [user, setUser] = useState("guest");
  const [directory, setDirectory] = useState("~");
  const [history, setHistory] = useState<THistory[]>([]);

  const handleCommand = () => {
    const [prg, ...args] = command.split(" ");
    let result = "";

    if (prg === "whoami") {
      result = user;
    } else if (prg === "ls") {
      if (args.length === 0) {
        result = directories[directory].join("\n");
      } else if (args.length === 1) {
        const arg = args[0];
        try {
          result = directories[arg].join("\n");
        } catch {
          result = `ls: ${arg}: No such file or directory`;
        }
      } else {
        const results: string[] = [];
        for (const arg of args) {
          try {
            results.push(`${arg}:\n${directories[arg].join("\n")}`);
          } catch {
            results.push(`ls: ${arg}: No such file or directory`);
          }
        }
        result = results.join("\n\n");
      }
    } else if (prg === "cd") {
      if (args.length === 0) {
        setDirectory("~");
      } else if (args.length === 1) {
        const arg = args[0];
        if (Object.keys(directories).includes(arg)) {
          setDirectory(arg);
        } else if (arg === ".." || arg === "../") {
          setDirectory("~");
          // This is valid since it's a depth-1 directory structure
          // But expanding this project requires some refactoring here
        } else if (arg === "../about" && directory === "exp") {
          setDirectory("about");
          // This is valid since the only sibling is about/
          // But expanding this project requires some refactoring here
        } else if (arg === "../exp" && directory === "about") {
          setDirectory("exp");
          // This is valid since the only sibling is exp/
          // But expanding this project requires some refactoring here
        } else if (arg.includes(".")) {
          result = `cd: not a directory: ${arg}`;
        } else {
          result = `cd: no such file or directory: ${arg}`;
        }
      } else {
        result = "cd: too many arguments";
      }
    } else {
      result = `fakezsh: command not found: ${command}`;
    }

    setHistory([
      ...history,
      { id: history.length, directory, command, result },
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
            <div className="w-fit h-fit flex flex-row items-start justify-start gap-x-2">
              <p>
                {user}@xyntechx{" "}
                <span className="text-green-600">{h.directory}</span>{" "}
                <span className="text-zinc-500">%</span>
              </p>
              <p>{h.command}</p>
            </div>
            <p className="whitespace-pre-line">{h.result}</p>
          </div>
        ))}

        <div className="w-full h-4 flex flex-row items-center justify-start gap-x-2">
          <p>
            {user}@xyntechx <span className="text-green-600">{directory}</span>{" "}
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
