"use client";

import { Fragment } from "react";
import { NUM_COLS, NUM_ROWS } from "./city";
import clsx from "clsx";

function arrowFor(r: number, c: number): string {
  const avenue = c % 4 === 0 ? "\u2191" : (c + 1) % 4 === 0 ? "\u2193" : "";
  const street = r % 6 === 0 ? "\u2192" : (r + 3) % 6 === 0 ? "\u2190" : "";
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
                    mismatch ? "outline-2 -outline-offset-2 outline-white" : ""
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
      className={clsx(
        "px-2 py-1 border transition-colors disabled:opacity-40 hover:cursor-pointer",
        active
          ? "border-orange-300 text-orange-300"
          : "border-zinc-700 text-zinc-300 hover:border-zinc-400 disabled:hover:border-zinc-700",
      )}
    >
      {children}
    </button>
  );
}

export const signed = (x: number, digits = 1) =>
  `${x >= 0 ? "+" : ""}${x.toFixed(digits)}`;
