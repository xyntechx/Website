"use client";

import { useRef } from "react";
import { drawCircle, drawTriangle, drawRectangle } from "./utils";

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
