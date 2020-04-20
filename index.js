import Sprite from './sprite.js';

const canvas = document.getElementById('canvas');
const { width, height } = canvas;
const ctx = canvas.getContext('2d');
let spriteInstance;

// draw frame
const drawFrame = () => {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = 'orange';
  ctx.fillRect(0, 0, width, height);
  spriteInstance.drawSpritePose();
};

// game loop
const step = () => {
  drawFrame();

  window.requestAnimationFrame(step);
};

// init code when sprites are done loading
const init = () => {
  step();
};
spriteInstance = new Sprite(ctx, init);
