import PlatformSprite from './platform-sprite.js';
import PlayerSprite from './player-sprite.js';
import Player from './player.js';
import Canvas from './canvas.js';
import GameLoop from './game-loop.js';
import KeyPress from './key-press.js';
import Platform from './platform.js';
import Platforms from './platforms.js';

const canvasInstance = new Canvas();
const playerInstance = new Player();
const platformSpriteInstance = new PlatformSprite(canvasInstance.ctx);
const playerSpriteInstance = new PlayerSprite(canvasInstance.ctx, init);
const platformsInstance = new Platforms();

// step frame
function step() {
  GameLoop({
    canvas: canvasInstance,
    player: playerInstance,
    playerSprite: playerSpriteInstance,
    platforms: platformsInstance,
    platformSprite: platformSpriteInstance,
  });
  window.requestAnimationFrame(step);
  return;
}

// init code when sprites are done loading
function init() {
  step();
}
