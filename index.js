import Sprite, { IDLE, RUN } from './sprite.js';
import Player from './player.js';
import Canvas from './canvas.js';
import GameLoop from './game-loop.js';

let spriteInstance;
const playerInstance = new Player();
const canvasInstance = new Canvas();

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
  GameLoop(spriteInstance, playerInstance, canvasInstance);
  window.requestAnimationFrame(step);
  return;
};

// init code when sprites are done loading
const init = () => {
  step();
};
spriteInstance = new Sprite(canvasInstance.ctx, init);
