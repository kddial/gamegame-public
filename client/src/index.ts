import PlatformSprite from './platform-sprite.js';
import PlayerSprite, { OtherPlayersSprite } from './player-sprite.js';
import Player from './player.js';
import Canvas from './canvas.js';
import GameLoop from './game-loop.js';
import KeyPress from './key-press.js';
import Platform from './platform.js';
import Platforms from './platforms.js';
import ClientSocket from './client-socket.js';

const canvasInstance = new Canvas();
const playerInstance = new Player();
const platformSpriteInstance = new PlatformSprite(canvasInstance.ctx);
const playerSpriteInstance = new PlayerSprite(canvasInstance.ctx, init);
const otherPlayersSpriteInstance = new OtherPlayersSprite(canvasInstance.ctx);
const platformsInstance = new Platforms();
const clientSocketInstance = new ClientSocket();

// step frame
function step() {
  GameLoop({
    canvas: canvasInstance,
    player: playerInstance,
    playerSprite: playerSpriteInstance,
    otherPlayersSprite: otherPlayersSpriteInstance,
    platforms: platformsInstance,
    platformSprite: platformSpriteInstance,
    clientSocket: clientSocketInstance,
  });
  window.requestAnimationFrame(step);
  return;
}

// init code when sprites are done loading
function init() {
  step();
}
