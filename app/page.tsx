"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { THistory } from "./utils/types";
import { directories, files } from "./utils/content";

export default function Home() {
  const pwd = "a.ham";
  const router = useRouter();

  const [isTyping, setIsTyping] = useState(false);

  const [command, setCommand] = useState("");
  const [user, setUser] = useState("guest");
  const [directory, setDirectory] = useState("~");
  const [history, setHistory] = useState<THistory[]>([]);

  useEffect(() => {
    console.log(`pwd: ${pwd}`);
  }, []);

  const changeDir = (currentDir: string) => {
    pass
  }

  const handleCommand = () => {
    const [prg, ...args] = command.trim().split(" ");
    let result = "";

    if (prg === "whoami") {
      result = user;
    } else if (prg === "ls") {
      if (args.length === 0) {
        result = directories[directory].children.join("\n");
      } else if (args.length === 1) {
        const arg = args[0];
        try {
          result = directories[arg].children.join("\n");
        } catch {
          result = `ls: ${arg}: No such file or directory`;
        }
      } else {
        const results: string[] = [];
        for (const arg of args) {
          try {
            results.push(`${arg}:\n${directories[arg].children.join("\n")}`);
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
        const components = args[0].trim().split("/");
        let dir = directory;
        let isValidPath = true;

        for (const component of components) {
          if (component === "." || component === "") {
            continue;
          } else if (component === "..") {
            const parent = directories[dir].parent;
            if (!parent) {
              break;
            }
            dir = parent;
          } else {
            if (directories[dir].children.includes(component)) {
              dir = component;
            } else if (component.includes(".")) {
              result = `cd: not a directory: ${component}`;
              isValidPath = false;
            } else {
              result = `cd: no such file or directory: ${component}`;
              isValidPath = false;
            }
          }
        }

        if (isValidPath) setDirectory(dir);
      } else {
        result = "cd: too many arguments";
      }
    } else if (prg === "su") {
      if (args.length > 2) {
        result = "su: too many arguments";
      } else if (args.length === 0) {
        result = "su: username not provided";
      } else {
        if (args[0] === "root") {
          try {
            if (args[1] === pwd) {
              setUser("root");
              result =
                "Welcome impersonator! You've earned the right to contact the real root user at xyntechx@gmail.com if you'd like. Make sure to mention the password in your email.";
            } else {
              result = "su: incorrect pwd";
            }
          } catch {
            result = "su: pwd not provided";
          }
        } else if (args[0] === "guest") {
          setUser("guest");
        } else {
          result = "su: username not found";
        }
      }
    } else if (prg === "cat") {
      try {
        const results = [];
        for (const arg of args) {
          if (directories[directory].children.includes(arg)) {
            if (!arg.includes(".")) {
              results.push(`cat: ${arg}: Is a directory`);
            } else {
              results.push(`${files[arg]}`);
            }
          } else {
            results.push(`cat: ${arg}: No such file or directory`);
          }
        }
        result = results.join("\n");
      } catch {
        result = `cat: ${args[0]}: missing arguments`;
      }
    } else if (prg === "toggle") {
      router.push("/about");
    } else {
      result = `fakezsh: command not found: ${command}`;
    }

    setHistory([
      ...history,
      { id: history.length, user, directory, command, result },
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
            className="text-[10px] text-zinc-500 hover:text-zinc-400 transition-colors"
          >
            i&apos;m a gui user
          </Link>
        </div>

        {history.map((h) => (
          <div
            key={h.id}
            className="w-full h-fit flex flex-col items-start justify-start gap-x-2"
          >
            <div className="w-fit h-fit flex flex-row items-start justify-start gap-x-2">
              <p>
                {h.user}@xyntechx{" "}
                <span className="text-green-600">{h.directory}</span>{" "}
                <span className="text-zinc-500">%</span>
              </p>
              <p>{h.command}</p>
            </div>
            <p className="whitespace-pre-line text-orange-300">{h.result}</p>
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
