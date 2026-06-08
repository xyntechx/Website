"use client";

import { useState } from "react";

const Chat = () => {
  // Keep track of the classification result and the model loading status.
  const [result, setResult] = useState<string | null>(null);
  const [ready, setReady] = useState<boolean | null>(null);
  const [userMessage, setUserMessage] = useState<string | null>(null);

  const classify = async (text: string) => {
    if (!text) return;
    if (ready === null) setReady(false);

    setResult("");

    const response = await fetch(`/api/chat?text=${encodeURIComponent(text)}`);

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

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      setResult((prev) => (prev || "") + chunk);
    }
  };
  return (
    <>
      <div className="w-1/2 flex flex-row items-center justify-center gap-4">
        <input
        type="text"
        className="w-full max-w-xs p-2 border border-gray-300 rounded mb-4"
        placeholder="Enter text here"
        onInput={(e: React.FormEvent<HTMLInputElement>) => setUserMessage((e.target as HTMLInputElement).value)}
        // onInput={(e) => {
        //   console.log(e.target.value)
        //   classify(e.target.value);
        // }}
      />
      <button onClick={() => classify(userMessage ?? "")}>Go</button>
      </div>
      {ready !== null && (
        <div className="w-full border p-4">
          <p>
          {!ready || !result ? "Loading..." : result}
        </p>
        </div>
      )}
    </>
  );
};

export default Chat;
