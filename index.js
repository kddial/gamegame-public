import PlatformSprite from './platform-sprite.js';
import PlayerSprite from './player-sprite.js';
import Player from './player.js';
import Canvas from './canvas.js';
import GameLoop from './game-loop.js';
import KeyPress from './key-press.js';

const canvasInstance = new Canvas();
const playerInstance = new Player();
const platformSpriteInstance = new PlatformSprite(canvasInstance.ctx);
const playerSpriteInstance = new PlayerSprite(canvasInstance.ctx, init);

// step frame
function step() {
  GameLoop(
    canvasInstance,
    playerInstance,
    platformSpriteInstance,
    playerSpriteInstance,
  );
  window.requestAnimationFrame(step);
  return;
}

// init code when sprites are done loading
function init() {
  step();
}
