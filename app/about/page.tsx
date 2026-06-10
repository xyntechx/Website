"use client"

import Link from "next/link";

export default function About() {
  return (
    <div className="font-[TTNormsProSerif] flex flex-col flex-1 items-center justify-center text-base">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-start justify-start py-32 px-16">
        <div className="w-full flex items-center justify-end">
          <Link
            href="/"
            className="text-[10px] text-zinc-500 hover:text-zinc-400 transition-colors"
          >
            i like cli
          </Link>
        </div>
        <h1 className="font-sans">Nyx Iskandar</h1>
      </main>
    </div>
  );
}
