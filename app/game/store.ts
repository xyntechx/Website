export interface Shape {
  id: number;
  type: "circle" | "triangle" | "rectangle";
  x?: number;
  y?: number;
  radius?: number;
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
  x3?: number;
  y3?: number;
  width?: number;
  height?: number;
  fillStyle: string;
}

let shapes: Shape[] = [];
let nextId = 1;

export function addShape(shape: Omit<Shape, "id">): Shape {
  const newShape = { ...shape, id: nextId++ };
  shapes.push(newShape);
  return newShape;
}

export function getShapes(): Shape[] {
  return [...shapes];
}

export function clearShapes(): void {
  shapes = [];
  nextId = 1;
}
