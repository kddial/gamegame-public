class Canvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;

  constructor() {
    this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
    this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }

  resetFrame() {
    const { width, height } = this;
    this.ctx.clearRect(0, 0, width, height);
    this.ctx.fillStyle = '#d9ded7';
    this.ctx.fillRect(0, 0, width, height);
  }
}

export default Canvas;
