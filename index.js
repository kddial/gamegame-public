import Sprite, { IDLE, RUN } from './sprite.js';
import Player from './player.js';
import Canvas from './canvas.js';
import GameLoop from './game-loop.js';
import KeyPress from './key-press.js';

const canvasInstance = new Canvas();
const playerInstance = new Player();
const spriteInstance = new Sprite(canvasInstance.ctx, init);

// slow down the renders to every X
const FRAME_RENDER_COUNT = 8;
let frameIndex = 0;

// step frame
function step() {
  if (frameIndex < FRAME_RENDER_COUNT) {
    frameIndex++;
    window.requestAnimationFrame(step);
    return;
  }

  frameIndex = 0;
  GameLoop(canvasInstance, playerInstance, spriteInstance);
  window.requestAnimationFrame(step);
  return;
}

// init code when sprites are done loading
function init() {
  step();
}
