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
            I&apos;m currently leading research at{" "}
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
            as the first member of Ramen Labs. I&apos;m also an <Link
              href="https://www.amplifypartners.com/writing-fellowship"
              target="_blank"
              className="border-b border-b-blue-300 hover:text-blue-300"
            >
              Amplify Writing Fellow
            </Link> and a proud member of{" "}
            <Link
              href="https://velocity11.us/"
              target="_blank"
              className="border-b border-b-blue-300 hover:text-blue-300"
            >
              V11
            </Link> and Kairos Society.
          </p>
          <p>
            I graduated from UC Berkeley EECS (Honors) in 2.5 years. I was
            active as an undergrad ML researcher at{" "}
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
            , as well as VP of{" "}
            <Link
              href="https://ml.berkeley.edu"
              target="_blank"
              className="border-b border-b-blue-300 hover:text-blue-300"
            >
              Machine Learning at Berkeley
            </Link>
            . I was also a Research Fellow at OpenAI as part of their exclusive invite-only 6-month undergraduate research program.
          </p>
          <p>
            I&apos;ve learned that I love solving the hardest puzzles in ML
            alongside the smartest and most driven of them all. I take risks and
            seek new challenges. Proof: I left behind a US$300,000 Singapore government scholarship to pursue frontier AI research in the US.
          </p>
        </div>
        <div className="w-full flex flex-col items-start justify-center border-b border-b-zinc-500 text-xs gap-4 py-4">
          <div className="w-full flex flex-col items-start justify-center gap-2">
            <h2 className="font-sans font-bold text-orange-300">RESEARCH</h2>
            <p>Curr: 3D unified multimodal models</p>
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
                LLM agent tool usage strategies for concise context (as Foam
                Founding Engineer)
              </li>
              <li>
                Emergent symbols/language for communicating abstract concepts
                (pet project)
              </li>
            </ul>
            <p>
              I&apos;ve published workshop papers at NeurIPS and ICML, and
              contributed to a chapter in a technical book. More papers on multimodal model architectures coming up!
            </p>
          </div>
          <div className="w-full flex flex-col items-start justify-center gap-2">
            <h2 className="font-sans font-bold text-orange-300">INDUSTRY</h2>
            <p>Curr: Research Engineer @ Ramen VR</p>
            <p>Prev:</p>
            <ul className="list-disc pl-4">
              <li>Founding Engineer @ Foam</li>
              <li>Research Intern @ GovTech Singapore</li>
              <li>AI Engineer Intern @ Ramen VR</li>
            </ul>
          </div>
        </div>
        <div className="w-full flex flex-col items-start justify-center border-b border-b-orange-300 text-xs gap-4 py-4">
          <h2 className="font-sans font-bold text-orange-300">
            SELECTED PUBLICATIONS
          </h2>
          <ol className="list-decimal pl-6">
            <li>
              Eta Given Delta: Defining LLM Tool Efficiency With Marginal Tool
              Utility [
              <Link
                href="https://arxiv.org/abs/2607.14108"
                target="_blank"
                className="border-b border-b-blue-300 hover:text-blue-300"
              >
                Preprint
              </Link>
              ]
            </li>
            <li>
              A Matter of Representation: Towards Graph-Based Abstract Code
              Generation [
              <Link
                href="https://arxiv.org/abs/2510.13163?"
                target="_blank"
                className="border-b border-b-blue-300 hover:text-blue-300"
              >
                NeurIPS 2025 DL4C Workshop
              </Link>
              ]
            </li>
            <li>
              Measuring what matters: A framework for evaluating safety risks in
              real-world LLM applications [
              <Link
                href="https://arxiv.org/abs/2507.09820"
                target="_blank"
                className="border-b border-b-blue-300 hover:text-blue-300"
              >
                ICML 2025 TAIG Workshop
              </Link>
              ]
            </li>
          </ol>
        </div>
        <div className="w-full flex flex-col items-start justify-center text-xs gap-4 py-4">
          <p className="text-zinc-700">Thanks for stopping by!</p>
        </div>
      </main>
    </div>
  );
}
