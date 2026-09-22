"use client";

import { Fragment } from "react";
import { NUM_COLS, NUM_ROWS, type Action } from "./city";

// Traffic direction of each road cell, from graph.py: avenues at columns
// 0/4/8 run north, 3/7/11 south; streets at rows 0/6/12 run east, 3/9/15 west.
function arrowFor(r: number, c: number): string {
  const avenue = c % 4 === 0 ? "↑" : (c + 1) % 4 === 0 ? "↓" : "";
  const street = r % 6 === 0 ? "→" : (r + 3) % 6 === 0 ? "←" : "";
  if (avenue && street) return "";
  return avenue || street;
}

const CELL_CLASS: Record<string, string> = {
  "0": "bg-zinc-900 text-zinc-900",
  "1": "bg-zinc-700 text-zinc-500",
  A: "bg-red-400 text-zinc-950 font-bold",
  S: "bg-red-400 text-zinc-950 font-bold",
  P: "bg-yellow-300 text-zinc-950 font-bold",
};

// Road names as City.generate_task issues them: avenues are numbered from
// the east (4th Avenue is column 0; 3rd and 2nd are two-way pairs), streets
// from the south (6 - row / 3).
const AVENUES: { label: string; col: number; span: number }[] = [
  { label: "4th Ave", col: 0, span: 1 },
  { label: "3rd Ave", col: 3, span: 2 },
  { label: "2nd Ave", col: 7, span: 2 },
  { label: "1st Ave", col: 11, span: 1 },
];
const STREET_ROWS = [0, 3, 6, 9, 12, 15];
const ordinal = (k: number) =>
  `${k}${k === 1 ? "st" : k === 2 ? "nd" : k === 3 ? "rd" : "th"}`;
const streetLabel = (r: number) =>
  STREET_ROWS.includes(r) ? `${ordinal(6 - r / 3)} St` : "";

export function Grid({
  grid,
  reference,
  label,
}: {
  grid: readonly (readonly string[])[];
  reference?: readonly (readonly string[])[] | null;
  label?: string;
}) {
  const axis =
    "flex items-center text-[9px] leading-none text-zinc-500 whitespace-nowrap";
  return (
    <div className="flex flex-col gap-1">
      {label && <p className="text-zinc-500">{label}</p>}
      <div
        className="grid w-fit select-none"
        style={{
          gridTemplateColumns: `auto repeat(${NUM_COLS}, 1.1rem)`,
          gridTemplateRows: `auto repeat(${NUM_ROWS}, 1.1rem)`,
          columnGap: 1,
          rowGap: 1,
        }}
      >
        {/* Header row: avenue names over their columns */}
        <div />
        {AVENUES.map((a) => (
          <div
            key={a.label}
            className={`${axis} justify-center pb-0.5`}
            style={{ gridColumn: `${a.col + 2} / span ${a.span}` }}
          >
            {a.label}
          </div>
        ))}
        {grid.map((row, r) => (
          <Fragment key={r}>
            <div
              className={`${axis} justify-end pr-1`}
              style={{ gridRow: r + 2, gridColumn: 1 }}
            >
              {streetLabel(r)}
            </div>
            {row.map((cell, c) => {
              const mismatch = reference != null && reference[r][c] !== cell;
              const text =
                cell === "1" ? arrowFor(r, c) : cell === "0" ? "" : cell;
              return (
                <div
                  key={c}
                  style={{ gridRow: r + 2, gridColumn: c + 2 }}
                  className={`flex items-center justify-center text-[10px] leading-none ${CELL_CLASS[cell] ?? "bg-fuchsia-500"} ${
                    mismatch
                      ? "outline outline-2 -outline-offset-2 outline-white"
                      : ""
                  }`}
                >
                  {text}
                </div>
              );
            })}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export function Legend() {
  const swatch = (cls: string, text: string) => (
    <span
      className={`inline-flex items-center justify-center w-4 h-4 text-[10px] leading-none align-middle ${cls}`}
    >
      {text}
    </span>
  );
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 text-zinc-500">
      <span>{swatch(CELL_CLASS.P, "P")} you</span>
      <span>{swatch(CELL_CLASS["1"], "")} road</span>
      <span>{swatch(CELL_CLASS["0"], "")} building</span>
      <span>{swatch(CELL_CLASS.A, "A")} avenue red light</span>
      <span>{swatch(CELL_CLASS.S, "S")} street red light</span>
    </div>
  );
}

export function ActionPad({
  onAction,
  disabled,
}: {
  onAction: (a: Action) => void;
  disabled: boolean;
}) {
  const button = (action: Action, text: string, extra = "") => (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onAction(action)}
      className={`h-8 min-w-8 px-2 border border-zinc-700 text-zinc-300 hover:border-orange-300 hover:text-orange-300 disabled:opacity-40 disabled:hover:border-zinc-700 disabled:hover:text-zinc-300 transition-colors ${extra}`}
    >
      {text}
    </button>
  );
  return (
    <div className="flex flex-col items-center gap-1 w-fit">
      {button("W", "w")}
      <div className="flex gap-1">
        {button("A", "a")}
        {button("", "wait", "min-w-16")}
        {button("D", "d")}
      </div>
      {button("S", "s")}
    </div>
  );
}

export function Button({
  children,
  onClick,
  disabled,
  active,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`px-2 py-1 border transition-colors disabled:opacity-40 hover:cursor-pointer ${
        active
          ? "border-orange-300 text-orange-300"
          : "border-zinc-700 text-zinc-300 hover:border-zinc-400 disabled:hover:border-zinc-700"
      }`}
    >
      {children}
    </button>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex items-center gap-1 text-zinc-500">
      {label}
      {children}
    </label>
  );
}

export function NumberInput({
  value,
  onChange,
  step,
  min,
  width = "w-20",
}: {
  value: number;
  onChange: (v: number) => void;
  step?: number;
  min?: number;
  width?: string;
}) {
  return (
    <input
      type="number"
      value={value}
      step={step}
      min={min}
      onChange={(e) => {
        const v = Number(e.target.value);
        if (Number.isFinite(v)) onChange(v);
      }}
      className={`${width} bg-transparent border border-zinc-800 px-1 py-0.5 text-zinc-300 outline-none focus:border-zinc-500`}
    />
  );
}

export const signed = (x: number, digits = 1) =>
  `${x >= 0 ? "+" : ""}${x.toFixed(digits)}`;
