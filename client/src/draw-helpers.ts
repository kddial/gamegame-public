// canvas draw helper functions
export function drawBorderRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  color: string,
) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.rect(x, y, width, height);
  ctx.stroke();
}

export function drawFillRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  color: string,
) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}
