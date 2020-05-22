import PlatformSprite from './platform-sprite.js';
import PlayerSprite, { OtherPlayersSprite } from './player-sprite.js';
import Player from './player.js';
import Canvas from './canvas.js';
import Platforms from './platforms.js';
import ClientSocket from './client-socket.js';
import KeyPress from './key-press.js';
import CONSTANTS from './constants.js';
const { SHOW_HIT_BOX } = CONSTANTS;

const GameLoop = ({
  canvas,
  player,
  playerSprite,
  otherPlayersSprite,
  platforms,
  platformSprite,
  clientSocket,
  keyPress,
}: {
  canvas: Canvas;
  player: Player;
  playerSprite: PlayerSprite;
  otherPlayersSprite: OtherPlayersSprite;
  platforms: Platforms;
  platformSprite: PlatformSprite;
  clientSocket: ClientSocket;
  keyPress: KeyPress;
}) => {
  // update player positions
  player.step(platforms, keyPress);
  // send updated player position & messages to socket
  clientSocket.stepFrameCounter();
  clientSocket.sendPlayerInfo(player);

  //--- drawing ---
  canvas.resetFrame();

  // draw platforms
  Platforms.drawBottomCanvasBg(canvas.ctx);
  platformSprite.drawPlatforms(platforms);
  SHOW_HIT_BOX && platformSprite.drawPlatformsHitBox(platforms);

  // draw other players
  otherPlayersSprite.renderOtherPlayersSprite(
    clientSocket.otherPlayersInfo,
    clientSocket.otherPlayersNameById,
    clientSocket.otherPlayersMessagesById,
  );

  // draw player last (so it is on top of everything else)
  playerSprite.drawPlayerSprite(player);
  SHOW_HIT_BOX && playerSprite.drawPlayerHitBox(player);
};

export default GameLoop;
