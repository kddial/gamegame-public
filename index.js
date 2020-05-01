import PlatformSprite from './platform-sprite.js';
import Sprite from './sprite.js';
import Player from './player.js';
import Canvas from './canvas.js';
import GameLoop from './game-loop.js';
import KeyPress from './key-press.js';

const canvasInstance = new Canvas();
const playerInstance = new Player();
const platformSpriteInstance = new PlatformSprite(canvasInstance.ctx);
const spriteInstance = new Sprite(canvasInstance.ctx, init);

// step frame
function step() {
  GameLoop(
    canvasInstance,
    playerInstance,
    platformSpriteInstance,
    spriteInstance,
  );
  window.requestAnimationFrame(step);
  return;
}

// init code when sprites are done loading
function init() {
  step();
}
