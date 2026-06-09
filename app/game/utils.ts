import { addShape } from "./store";

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
  addShape({ type: "circle", x, y, radius, fillStyle });
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
  addShape({ type: "triangle", x1, y1, x2, y2, x3, y3, fillStyle });
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
  addShape({ type: "rectangle", x, y, width, height, fillStyle });
};