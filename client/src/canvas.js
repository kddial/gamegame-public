class Canvas {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
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
