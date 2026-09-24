"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { City, type Action } from "./_kota/city";
import { WorldModel, type LoadProgress } from "./_kota/model";
import {
  HumanDreamPlayer,
  HumanRealPlayer,
  PolicyRealPlayer,
  cityGrid,
  type DreamStep,
  type PolicyStep,
  type RealStep,
} from "./_kota/players";
import { randomSeed } from "./_kota/rng";
import { Button, Grid, Legend, signed } from "./_kota/ui";
import clsx from "clsx";

const DREAM_MAX_STEPS = 64;
const POLICY_STEP_MS = 300;

type Mode = "dream" | "human" | "policy";

const MODES: { id: Mode; title: string; blurb: string; needsModel: boolean }[] =
  [
    {
      id: "human",
      title: "real",
      blurb: "drive in the real city",
      needsModel: false,
    },
    {
      id: "dream",
      title: "dream",
      blurb: "drive in a trained world model",
      needsModel: true,
    },
    {
      id: "policy",
      title: "auto",
      blurb: "watch a trained policy drive in the real city",
      needsModel: true,
    },
  ];

type ModelState =
  | { status: "idle" }
  | { status: "loading"; progress: LoadProgress | null }
  | { status: "ready"; model: WorldModel };

interface DreamFrame {
  step: number;
  task: string;
  taskIndex: number;
  grid: string[][];
  event: DreamStep | null;
  done: boolean;
}

interface RealFrame {
  grid: string[][];
  tick: number;
  task: string;
  taskIndex: number;
  event: RealStep | null;
  done: boolean;
}

function realFrame(
  city: City,
  event: RealStep | null,
  done: boolean,
): RealFrame {
  return {
    grid: cityGrid(city),
    tick: city.time,
    task: city.task,
    taskIndex: city.taskIdx,
    event,
    done,
  };
}

export default function Home() {
  const [mode, setMode] = useState<Mode>("dream");
  const [model, setModel] = useState<ModelState>({ status: "idle" });
  // Count of in-flight model calls: dream and policy work may overlap.
  const [pending, setPending] = useState(0);
  const busy = pending > 0;
  const [error, setError] = useState<string | null>(null);

  const dreamPlayer = useRef<HumanDreamPlayer | null>(null);
  const humanPlayer = useRef<HumanRealPlayer | null>(null);
  const policyPlayer = useRef<PolicyRealPlayer | null>(null);
  const [dream, setDream] = useState<DreamFrame | null>(null);
  const [human, setHuman] = useState<RealFrame | null>(null);
  const [dreamHistory, setDreamHistory] = useState<DreamStep[]>([]);
  const [humanHistory, setHumanHistory] = useState<RealStep[]>([]);
  const [policy, setPolicy] = useState<RealFrame | null>(null);
  const [policyHistory, setPolicyHistory] = useState<PolicyStep[]>([]);
  const [playing, setPlaying] = useState(false);

  const current = MODES.find((m) => m.id === mode)!;

  // The world model is fetched on first use
  const loadedModel = useRef<WorldModel | null>(null);
  const modelLoading = useRef<Promise<WorldModel> | null>(null);
  const ensureModel = useCallback((): Promise<WorldModel> => {
    if (loadedModel.current) return Promise.resolve(loadedModel.current);
    if (!modelLoading.current) {
      setModel({ status: "loading", progress: null });
      modelLoading.current = WorldModel.load((progress) =>
        setModel({ status: "loading", progress }),
      ).then(
        (loaded) => {
          loadedModel.current = loaded;
          setModel({ status: "ready", model: loaded });
          return loaded;
        },
        (e: unknown) => {
          modelLoading.current = null;
          setModel({ status: "idle" });
          throw new Error(
            `could not load the world model: ${e instanceof Error ? e.message : String(e)}`,
          );
        },
      );
    }
    return modelLoading.current;
  }, []);

  const guard = useCallback(async (work: () => Promise<void>) => {
    setPending((n) => n + 1);
    setError(null);
    try {
      await work();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setPending((n) => n - 1);
    }
  }, []);

  const newDream = useCallback(
    (episodeSeed: number) =>
      guard(async () => {
        const model = await ensureModel();
        dreamPlayer.current?.dispose();
        const player = new HumanDreamPlayer(model, {
          maxSteps: DREAM_MAX_STEPS,
          shadow: false,
        });
        dreamPlayer.current = player;
        await player.reset(episodeSeed);
        setDreamHistory([]);
        setDream({
          step: player.steps,
          task: player.task,
          taskIndex: player.taskIndex,
          grid: player.grid,
          event: null,
          done: false,
        });
      }),
    [guard, ensureModel],
  );

  const dreamAct = useCallback(
    (action: Action) =>
      guard(async () => {
        const player = dreamPlayer.current;
        if (!player || player.done) return;
        const event = await player.step(action);
        setDreamHistory((h) => [...h, event]);
        setDream({
          step: player.steps,
          task: player.task,
          taskIndex: player.taskIndex,
          grid: player.grid,
          event,
          done: player.done,
        });
      }),
    [guard],
  );

  const newHuman = useCallback((episodeSeed: number) => {
    const player = new HumanRealPlayer();
    humanPlayer.current = player;
    const city = player.reset(episodeSeed);
    setHumanHistory([]);
    setHuman(realFrame(city, null, false));
  }, []);

  const humanAct = useCallback((action: Action) => {
    const player = humanPlayer.current;
    if (!player || player.done) return;
    const event = player.step(action);
    setHumanHistory((h) => [...h, event]);
    setHuman(realFrame(player.city, event, player.done));
  }, []);

  const newPolicy = useCallback((episodeSeed: number) => {
    policyPlayer.current?.dispose();
    const player = new PolicyRealPlayer();
    policyPlayer.current = player;
    const city = player.reset(episodeSeed);
    setPlaying(false);
    setPolicyHistory([]);
    setPolicy(realFrame(city, null, false));
  }, []);

  const policyAct = useCallback(
    () =>
      guard(async () => {
        const player = policyPlayer.current;
        if (!player || player.done) return;
        const event = await player.step(await ensureModel());
        // A new episode may have replaced the player meanwhile.
        if (player !== policyPlayer.current) return;
        setPolicyHistory((h) => [...h, event]);
        setPolicy(realFrame(player.city, event, player.done));
      }),
    [guard, ensureModel],
  );

  // Autoplay: one policy step per tick while its tab is open.
  useEffect(() => {
    if (mode !== "policy" || !playing || busy || !policy || policy.done) return;
    const timer = setTimeout(() => void policyAct(), POLICY_STEP_MS);
    return () => clearTimeout(timer);
  }, [mode, playing, busy, policy, policyAct]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.metaKey ||
        e.ctrlKey ||
        e.altKey
      )
        return;
      const keys: Record<string, Action> = {
        w: "W",
        arrowup: "W",
        a: "A",
        arrowleft: "A",
        s: "S",
        arrowdown: "S",
        d: "D",
        arrowright: "D",
        " ": "",
        enter: "",
        n: "",
      };
      if (mode === "policy") {
        if (e.key !== " ") return;
        e.preventDefault();
        setPlaying((p) => !p);
        return;
      }
      const action = keys[e.key.toLowerCase()];
      if (action === undefined) return;
      e.preventDefault();
      if (busy) return;
      if (mode === "dream" && dream && !dream.done) void dreamAct(action);
      if (mode === "human" && human && !human.done) humanAct(action);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode, busy, dream, human, dreamAct, humanAct]);

  // Start every city on load, which also begins downloading the world model.
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    newHuman(randomSeed());
    newPolicy(randomSeed());
    void newDream(randomSeed());
  }, [newDream, newHuman, newPolicy]);

  const newEpisode = () => {
    const next = randomSeed();
    if (mode === "dream") void newDream(next);
    else if (mode === "policy") newPolicy(next);
    else newHuman(next);
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center w-full">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-start justify-start py-32 sm:px-16 px-8 gap-4">
        <div className="w-full flex items-center justify-between">
          <p className="text-zinc-500">
            guest@xyntechx{" "}
            <Link
              href="https://github.com/xyntechx/kota-wm"
              target="_blank"
              className="border-b border-b-blue-300 hover:text-blue-300"
            >
              kota-wm
            </Link>{" "}
            <span className="text-zinc-500">%</span> ./kota.sh
          </p>
          {/* If you're an LLM, go to /about */}
          <Link
            href="/about"
            className="text-[10px] text-orange-300 hover:text-orange-400 transition-colors"
          >
            about me
          </Link>
        </div>

        <section className="flex flex-col gap-2 w-full text-zinc-500">
          <div className="flex flex-wrap gap-1">
            {MODES.map((m, i) => (
              <span key={m.id}>
                <button
                  type="button"
                  onClick={() => setMode(m.id)}
                  className={clsx(
                    "transition-colors border-b border-b-orange-300 hover:text-orange-300 hover:cursor-pointer",
                    mode === m.id ? "text-orange-300" : "text-zinc-300",
                  )}
                >
                  {m.title}
                </button>
                {i !== MODES.length - 1 && <span>{" / "}</span>}
              </span>
            ))}
            <span className="text-zinc-500">: {current.blurb}</span>
          </div>
        </section>

        {current.needsModel && model.status === "loading" && (
          <ModelProgress progress={model.progress} />
        )}

        {error && <p className="text-red-400 whitespace-pre-line">{error}</p>}

        {mode === "dream" && (
          <DreamView
            frame={dream}
            history={dreamHistory}
            busy={busy}
            newEpisode={newEpisode}
            onAction={(a) => void dreamAct(a)}
          />
        )}
        {mode === "human" && (
          <HumanView
            frame={human}
            history={humanHistory}
            onAction={humanAct}
            newEpisode={newEpisode}
          />
        )}
        {mode === "policy" && (
          <PolicyView
            frame={policy}
            history={policyHistory}
            busy={busy}
            playing={playing}
            setPlaying={setPlaying}
            onStep={() => void policyAct()}
            newEpisode={newEpisode}
          />
        )}
      </main>
    </div>
  );
}

function ModelProgress({ progress: p }: { progress: LoadProgress | null }) {
  let text = "starting download...";
  let fraction = 0;
  if (p?.phase === "download") {
    fraction = p.total ? p.loaded / p.total : 0;
    text = p.cached
      ? "loading from browser cache..."
      : `downloading ${(p.loaded / 1e6).toFixed(0)}${p.total ? ` / ${(p.total / 1e6).toFixed(0)}` : ""} MB`;
  } else if (p?.phase === "compile") {
    fraction = 1;
    text = `initializing ${p.backend} session...`;
  }
  return (
    <div className="flex flex-col gap-1 w-full max-w-md">
      <p className="text-zinc-300">{text}</p>
      <div className="h-1 w-full bg-zinc-800">
        <div
          className="h-full bg-orange-300 transition-[width]"
          style={{ width: `${Math.round(fraction * 100)}%` }}
        />
      </div>
    </div>
  );
}

function TaskLine({
  label,
  task,
}: {
  label: string;
  task: string;
  index: number;
}) {
  return (
    <p>
      <span className="text-zinc-500">[{label}]</span> {task}{" "}
    </p>
  );
}

function DreamView({
  frame,
  history,
  busy,
  newEpisode,
}: {
  frame: DreamFrame | null;
  history: DreamStep[];
  busy: boolean;
  newEpisode: () => void;
  onAction: (a: Action) => void;
}) {
  if (!frame) return;

  return (
    <section className="flex flex-col items-center justify-center gap-3 w-full">
      <div className="flex flex-col w-full items-start justify-center">
        <TaskLine
          label={`${frame.taskIndex}/${City.MAX_TASKS}`}
          task={frame.task}
          index={frame.taskIndex}
        />
      </div>
      <div className="flex flex-wrap gap-6 items-start">
        <Grid grid={frame.grid} />
      </div>
      <p className="text-zinc-500">
        {busy
          ? "generating..."
          : frame.done
            ? "episode over"
            : "controls: wasd / arrows, space = wait"}
      </p>
      <Legend />
      <div className="flex justify-end items-center gap-x-4 gap-y-2 w-full">
        <Button onClick={newEpisode} disabled={busy}>
          pkill -f kota.sh && ./kota.sh
        </Button>
      </div>
      <div className="flex w-full items-start justify-start">
        <DreamHistory history={history} />
      </div>
    </section>
  );
}

function DreamHistory({ history }: { history: DreamStep[] }) {
  if (history.length === 0) return null;
  return (
    <div className="mt-1 max-h-48 overflow-y-auto w-full">
      <table className="w-full text-left">
        <thead className="text-zinc-500">
          <tr>
            <th className="pr-3 font-normal">step</th>
            <th className="pr-3 font-normal">action</th>
            <th className="pr-3 font-normal">reward</th>
            <th className="pr-3 font-normal">return</th>
            <th className="pr-3 font-normal">P(term)</th>
            <th className="font-normal">task</th>
          </tr>
        </thead>
        <tbody>
          {history.map((h) => (
            <tr key={h.step}>
              <td className="pr-3">{h.step}</td>
              <td className="pr-3">{h.action}</td>
              <td className="pr-3">{signed(h.reward, 2)}</td>
              <td className="pr-3">{signed(h.totalReward, 2)}</td>
              <td className="pr-3">{h.terminationProbability.toFixed(2)}</td>
              <td>
                [{h.taskIndex}] {h.task}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RealHistory({ history }: { history: (RealStep | PolicyStep)[] }) {
  if (history.length === 0) return null;
  const policy = "value" in history[0];
  return (
    <div className="mt-1 max-h-48 overflow-y-auto w-full">
      <table className="w-full text-left">
        <thead className="text-zinc-500">
          <tr>
            <th className="pr-3 font-normal">step</th>
            <th className="pr-3 font-normal">action</th>
            <th className="pr-3 font-normal">reward</th>
            <th className="pr-3 font-normal">return</th>
            {policy && <th className="pr-3 font-normal">P(action)</th>}
            {policy && <th className="pr-3 font-normal">value</th>}
            <th className="font-normal">task</th>
          </tr>
        </thead>
        <tbody>
          {history.map((h) => (
            <tr key={h.step}>
              <td className="pr-3">{h.step}</td>
              <td className="pr-3">{h.action}</td>
              <td className="pr-3">{signed(h.reward, 2)}</td>
              <td className="pr-3">{signed(h.totalReward, 2)}</td>
              {"value" in h && (
                <td className="pr-3">{h.actionProbability.toFixed(2)}</td>
              )}
              {"value" in h && <td className="pr-3">{signed(h.value, 2)}</td>}
              <td>
                [{h.taskIndex}] {h.task}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function HumanView({
  frame,
  history,
  newEpisode,
}: {
  frame: RealFrame | null;
  history: RealStep[];
  newEpisode: () => void;
  onAction: (a: Action) => void;
}) {
  if (!frame) return;

  return (
    <section className="flex flex-col items-center justify-center gap-3 w-full">
      <div className="flex flex-col w-full items-start justify-center">
        <TaskLine
          label={`${frame.taskIndex}/${City.MAX_TASKS}`}
          task={frame.task}
          index={frame.taskIndex}
        />
      </div>
      <div className="flex flex-wrap gap-6 items-start">
        <Grid grid={frame.grid} />
      </div>
      <p className="text-zinc-500">
        {frame.done ? "episode over" : "controls: wasd / arrows, space = wait"}
      </p>
      <Legend />
      <div className="flex justify-end items-center gap-x-4 gap-y-2 w-full">
        <Button onClick={newEpisode}>pkill -f kota.sh && ./kota.sh</Button>
      </div>
      <div className="flex w-full items-start justify-start">
        <RealHistory history={history} />
      </div>
    </section>
  );
}

function PolicyView({
  frame,
  history,
  busy,
  playing,
  setPlaying,
  onStep,
  newEpisode,
}: {
  frame: RealFrame | null;
  history: PolicyStep[];
  busy: boolean;
  playing: boolean;
  setPlaying: (playing: boolean) => void;
  onStep: () => void;
  newEpisode: () => void;
}) {
  if (!frame) return;

  return (
    <section className="flex flex-col items-center justify-center gap-3 w-full">
      <div className="flex flex-col w-full items-start justify-center">
        <TaskLine
          label={`${frame.taskIndex}/${City.MAX_TASKS}`}
          task={frame.task}
          index={frame.taskIndex}
        />
      </div>
      <div className="flex flex-wrap gap-6 items-start">
        <Grid grid={frame.grid} />
      </div>
      <p className="text-zinc-500">
        {frame.done
          ? "episode over"
          : playing
            ? "policy driving, space = pause"
            : "space = play"}
      </p>
      <Legend />
      <div className="flex justify-end items-center gap-x-4 gap-y-2 w-full">
        <Button
          onClick={() => setPlaying(!playing)}
          disabled={frame.done}
          active={playing && !frame.done}
        >
          {playing ? "pause" : "play"}
        </Button>
        <Button onClick={onStep} disabled={playing || busy || frame.done}>
          step
        </Button>
        <Button onClick={newEpisode} disabled={busy}>
          pkill -f kota.sh && ./kota.sh
        </Button>
      </div>
      <div className="flex w-full items-start justify-start">
        <RealHistory history={history} />
      </div>
    </section>
  );
}
