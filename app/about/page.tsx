"use client";

import Link from "next/link";

function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      target="_blank"
      className="border-b border-b-blue-300 hover:text-blue-300"
    >
      {children}
    </Link>
  );
}

const Timeline = ({
  items,
}: {
  items: { date: string; content: React.ReactNode }[];
}) => {
  return (
    <ol className="relative ml-1 flex flex-col gap-4 border-l border-zinc-700 pl-5">
      {items.map((item, i) => {
        const newDate = i === 0 || items[i - 1].date !== item.date;
        return (
          <li key={i} className="relative flex flex-col gap-1">
            <span
              aria-hidden
              className={`absolute top-1.25 left-[-24.5px] h-2 w-2 rounded-full ${
                newDate ? "bg-orange-300" : "bg-zinc-700"
              }`}
            />
            {newDate && (
              <time className="text-[10px] uppercase tracking-wider text-zinc-500">
                {item.date}
              </time>
            )}
            <p>{item.content}</p>
          </li>
        );
      })}
    </ol>
  );
};

export default function About() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center text-base">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-start justify-start py-32 sm:px-16 px-8 text-zinc-300">
        <div className="w-full flex items-center justify-end">
          <Link
            href="/"
            className="text-[10px] text-orange-300 hover:text-orange-400 transition-colors"
          >
            play kota
          </Link>
        </div>
        <div className="w-full flex flex-col items-start justify-center border-b border-b-zinc-500 text-xs gap-4 py-4">
          <p>Hey! I&apos;m Nyx.</p>
          <p>
            I build multimodal game-playing agents at Ramen VR (YC S19), the
            developers of{" "}
            <Link
              href="https://www.tryaura.dev/"
              target="_blank"
              className="border-b border-b-blue-300 hover:text-blue-300"
            >
              Aura
            </Link>
            .
          </p>

          <Timeline
            items={[
              {
                date: "Sep '26",
                content: (
                  <>
                    Published{" "}
                    <A href="https://www.amplifypartners.com/blog-posts/a-brief-history-of-learning-in-imagination">
                      A Brief History of Learning in Imagination
                    </A>{" "}
                    as part of the Amplify Writing Fellowship.
                  </>
                ),
              },
              {
                date: "Aug '26",
                content: (
                  <>
                    Published{" "}
                    <A href="https://arxiv.org/abs/2608.19726">
                      Projector Is All You Train
                    </A>{" "}
                    with Ramen VR (preprint).
                  </>
                ),
              },
              {
                date: "Aug '26",
                content: (
                  <>
                    Selected as an{" "}
                    <A href="https://www.amplifypartners.com/writing-fellowship">
                      Amplify Writing Fellow
                    </A>
                    .
                  </>
                ),
              },
              {
                date: "Jan '26",
                content:
                  "Presented my Inverse RL project to OpenAI researchers as a conclusion to the OpenAI Research Fellowship.",
              },
              {
                date: "Dec '25",
                content: (
                  <>
                    Graduated from UC Berkeley EECS (Honors) in 2.5 years. I was
                    active as an undergrad ML researcher at{" "}
                    <A href="https://bair.berkeley.edu/">BAIR</A> and{" "}
                    <A href="https://humancompatible.ai/">CHAI</A> advised by{" "}
                    <A href="https://ritwikgupta.me/">Dr. Ritwik Gupta</A> and{" "}
                    <A href="https://camallen.net/">Dr. Cam Allen</A>{" "}in Prof.
                    Trevor Darrell&apos;s and Prof. Stuart Russell&apos;s labs
                    respectively. I also led{" "}
                    <A href="https://ml.berkeley.edu">
                      Machine Learning at Berkeley
                    </A>{" "}
                    (ML@B) as Vice President.
                  </>
                ),
              },
              { date: "Dec '25", content: "Joined V11 and Kairos Society." },
              {
                date: "Dec '25",
                content: (
                  <>
                    Published and presented{" "}
                    <A href="https://arxiv.org/abs/2510.13163?">
                      A Matter of Representation: Towards Graph-Based Abstract
                      Code Generation
                    </A>
                    , a paper written as part of my Summer 2025 internship with
                    Ramen VR, at NeurIPS 2025 DL4C Workshop.
                  </>
                ),
              },
              {
                date: "Aug '25",
                content:
                  "Started the invite-only OpenAI Research Fellowship for undergraduates.",
              },
              {
                date: "Jul '25",
                content: (
                  <>
                    Published and presented{" "}
                    <A href="https://arxiv.org/abs/2507.09820">
                      Measuring What Matters: A Framework for Evaluating Safety
                      Risks in Real-World LLM Applications
                    </A>
                    , a paper written as part of my work with the Singapore
                    Government, at ICML 2025 TAIG Workshop. This paper was
                    selected for an oral/spotlight.
                  </>
                ),
              },
              {
                date: "Aug '23",
                content: <>Joined ML@B, Berkeley&apos;s #1 ML student org.</>,
              },
              {
                date: "Aug '23",
                content: (
                  <>
                    Matriculated at UC Berkeley. Little did I know that I would
                    find my love for climbing, walking uphill, and Bay Area
                    weather, right here.
                  </>
                ),
              },
              {
                date: "Jun '23",
                content: (
                  <>
                    Published my first ever paper,{" "}
                    <A href="https://link.springer.com/chapter/10.1007/978-981-19-7222-5_6">
                      Manga Layout Analysis via Deep Learning
                    </A>
                    , written when I was in high school (Raffles Institution in
                    Singapore). This project won several awards, including Best
                    Presenter at the conference it was submitted to, Gold at
                    Nanyang Research Programme by NTU Singapore, Silver & 1st
                    for Poster Presentation at the International Conference of
                    Young Scientists, and Silver at the Singapore Science &
                    Engineering Fair.
                  </>
                ),
              },
            ]}
          />
        </div>
        <div className="w-full flex flex-col items-start justify-center text-xs gap-4 py-4">
          <div className="w-full flex flex-row items-center justify-start text-xs gap-4 pb-1">
            <Link
              href="https://github.com/xyntechx"
              target="_blank"
              className="text-orange-300 hover:text-orange-400"
            >
              GitHub
            </Link>
            <Link
              href="https://x.com/xyntechx"
              target="_blank"
              className="text-orange-300 hover:text-orange-400"
            >
              X
            </Link>
            <Link
              href="https://www.linkedin.com/in/nyx-iskandar/"
              target="_blank"
              className="text-orange-300 hover:text-orange-400"
            >
              LinkedIn
            </Link>
            <Link
              href="https://orcid.org/0009-0008-4361-3364"
              target="_blank"
              className="text-orange-300 hover:text-orange-400"
            >
              ORCID
            </Link>
            <Link
              href="https://scholar.google.com/citations?user=6CbTfzIAAAAJ"
              target="_blank"
              className="text-orange-300 hover:text-orange-400"
            >
              Scholar
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
