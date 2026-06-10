"use client";

import Link from "next/link";

export default function About() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center text-base">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-start justify-start py-32 sm:px-16 px-8">
        <div className="w-full flex items-center justify-end">
          <Link
            href="/"
            className="text-[10px] text-zinc-500 hover:text-zinc-400 transition-colors"
          >
            i like cli
          </Link>
        </div>
        <h1 className="font-sans w-full font-bold">Nyx Iskandar</h1>
        <div className="w-full flex flex-row items-center justify-start border-b border-b-orange-300 text-xs gap-4 pb-1">
          <Link
            href="https://github.com/xyntechx"
            target="_blank"
            className="text-zinc-500 hover:text-zinc-400"
          >
            GitHub
          </Link>
          <Link
            href="https://www.linkedin.com/in/nyx-iskandar/"
            target="_blank"
            className="text-zinc-500 hover:text-zinc-400"
          >
            LinkedIn
          </Link>
          <Link
            href="https://orcid.org/0009-0008-4361-3364"
            target="_blank"
            className="text-zinc-500 hover:text-zinc-400"
          >
            ORCID
          </Link>
          <Link
            href="https://scholar.google.com/citations?user=6CbTfzIAAAAJ"
            target="_blank"
            className="text-zinc-500 hover:text-zinc-400"
          >
            Scholar
          </Link>
        </div>
        <div className="w-full flex flex-col items-start justify-center border-b border-b-zinc-500 text-xs gap-4 py-4">
          <p>Hey! I&apos;m Nyx.</p>
          <p>
            I&apos;m currently leading world generation research at{" "}
            <Link
              href="https://ramenvr.com/"
              target="_blank"
              className="border-b border-b-blue-300 hover:text-blue-300"
            >
              Ramen VR
            </Link>{" "}
            /{" "}
            <Link
              href="https://www.tryaura.dev/"
              target="_blank"
              className="border-b border-b-blue-300 hover:text-blue-300"
            >
              Aura
            </Link>{" "}
            as the first member of Ramen Labs (researcher #1). I&apos;m also a
            fellow at{" "}
            <Link
              href="https://velocity11.us/"
              target="_blank"
              className="border-b border-b-blue-300 hover:text-blue-300"
            >
              V11
            </Link>
            .
          </p>
          <p>
            I graduated from UC Berkeley EECS (Honors) in 2.5 years. I spent
            many semesters as an undergrad ML researcher at{" "}
            <Link
              href="https://bair.berkeley.edu/"
              target="_blank"
              className="border-b border-b-blue-300 hover:text-blue-300"
            >
              BAIR
            </Link>{" "}
            and{" "}
            <Link
              href="https://humancompatible.ai/"
              target="_blank"
              className="border-b border-b-blue-300 hover:text-blue-300"
            >
              CHAI
            </Link>
            , VP of{" "}
            <Link
              href="https://ml.berkeley.edu"
              target="_blank"
              className="border-b border-b-blue-300 hover:text-blue-300"
            >
              Machine Learning at Berkeley
            </Link>
            , and avid novice boulderer.
          </p>
          <p>
            I&apos;ve learned that I love solving the hardest puzzles in ML
            alongside the smartest and most driven of them all. I take risks and
            seek new challenges; falling off walls teaches you more than
            reaching the top, though only if you aim to reach the top, and only
            if you pick harder and harder walls to climb.
          </p>
        </div>
        <div className="w-full flex flex-col items-start justify-center border-b border-b-orange-300 text-xs gap-4 py-4">
          <div className="w-full flex flex-col items-start justify-center gap-2">
            <p className="font-sans font-bold text-orange-300">RESEARCH</p>
            <p>
              Curr: Consistent and physically accurate 3D environments (at Ramen
              VR)
            </p>
            <p>Prev:</p>
            <ul className="list-disc pl-4">
              <li>
                Action abstractions for efficient planners (with{" "}
                <Link
                  href="https://camallen.net/"
                  target="_blank"
                  className="border-b border-b-blue-300 hover:text-blue-300"
                >
                  Dr. Cam Allen
                </Link>
                )
              </li>
              <li>
                Language model pre-training, evals, and wargame simulations
                (with{" "}
                <Link
                  href="https://ritwikgupta.me/"
                  target="_blank"
                  className="border-b border-b-blue-300 hover:text-blue-300"
                >
                  Dr. Ritwik Gupta
                </Link>
                )
              </li>
              <li>Inverse RL (as OpenAI Research Fellow)</li>
              <li>
                Emergent symbols/language for communicating abstract concepts
                (pet project)
              </li>
            </ul>
            <p>
              I&apos;ve published workshop papers at NeurIPS and ICML, and
              contributed to a chapter in a technical book. I plan to continue
              publishing.
            </p>
          </div>
          <div className="w-full flex flex-col items-start justify-center gap-2">
            <p className="font-sans font-bold text-orange-300">INDUSTRY</p>
            <p>Curr: Research Engineer @ Ramen VR</p>
            <p>Prev:</p>
            <ul className="list-disc pl-4">
              <li>Founding Engineer @ Foam</li>
              <li>Research Intern @ GovTech Singapore</li>
              <li>AI Engineer Intern @ Ramen VR</li>
            </ul>
          </div>
        </div>
        <div className="w-full flex flex-col items-start justify-center text-xs gap-4 py-4">
          <p className="text-zinc-700">
            [For recruiters] I&apos;m not actively looking for new roles at this
            time, but thank you for considering me!
          </p>
          <p className="text-zinc-700">
            [For VCs/investors] Founding my own startup is a goal of mine, and
            one of the main reasons as to why I choose the founding
            eng/researcher startup life. I&apos;d love to keep in touch!
          </p>
        </div>
      </main>
    </div>
  );
}
