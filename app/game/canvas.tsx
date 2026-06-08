"use client";

import { useRef } from "react";

export const drawCircle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  fillStyle = "#0070f3",
) => {
  ctx.fillStyle = fillStyle;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
};

export const drawTriangle = (
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
  fillStyle = "#0070f3",
) => {
  ctx.fillStyle = fillStyle;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.closePath();
  ctx.fill();
};

export const drawRectangle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  fillStyle = "#0070f3",
) => {
  ctx.fillStyle = fillStyle;
  ctx.fillRect(x, y, width, height);
};

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getCtx = () => canvasRef.current?.getContext("2d");

  return (
    <>
      <canvas ref={canvasRef} width={500} height={500} className="border" />

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => {
            const ctx = getCtx();
            if (ctx) drawCircle(ctx, Math.ceil(Math.random() * 500), 250, 50);
          }}
        >
          Circle
        </button>
        <button
          onClick={() => {
            const ctx = getCtx();
            if (ctx) drawTriangle(ctx, 250, 180, 200, 320, 300, 320);
          }}
        >
          Triangle
        </button>
        <button
          onClick={() => {
            const ctx = getCtx();
            if (ctx) drawRectangle(ctx, 200, 200, 100, 100);
          }}
        >
          Rectangle
        </button>
      </div>
    </>
  );
};

export default Canvas;
