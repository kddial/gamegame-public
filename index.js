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

// slow down the renders to every X
const FRAME_RENDER_COUNT = 8;
let frameIndex = 0;

// game loop
const step = () => {
  if (frameIndex < FRAME_RENDER_COUNT) {
    frameIndex++;
    window.requestAnimationFrame(step);
    return;
  }

  frameIndex = 0;
  drawFrame();
  window.requestAnimationFrame(step);
  return;
};

// init code when sprites are done loading
const init = () => {
  step();
};
spriteInstance = new Sprite(ctx, init);
