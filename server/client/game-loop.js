const { SHOW_HIT_BOX } = window.gamegame.CONSTANTS;

const GameLoop = ({
  canvas,
  player,
  playerSprite,
  otherPlayersSprite,
  platforms,
  platformSprite,
  clientSocket,
}) => {
  // update player positions
  player.step(platforms);
  // send updated player position to socket
  clientSocket.sendPlayerInfo(player);

  //--- drawing ---
  canvas.resetFrame();

  // draw platforms
  platformSprite.drawPlatforms(platforms);
  SHOW_HIT_BOX && platformSprite.drawPlatformsHitBox(platforms);

  // draw player
  playerSprite.drawPlayerSprite(player);
  SHOW_HIT_BOX && playerSprite.drawPlayerHitBox(player);

  // draw other players
  otherPlayersSprite.renderOtherPlayersSprite(clientSocket.otherPlayersInfo);
};

export default GameLoop;
