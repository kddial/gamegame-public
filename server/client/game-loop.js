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

  // draw other players
  otherPlayersSprite.renderOtherPlayersSprite(clientSocket.otherPlayersInfo);

  // draw player last (so it is on top of everything else)
  playerSprite.drawPlayerSprite(player);
  SHOW_HIT_BOX && playerSprite.drawPlayerHitBox(player);
};

export default GameLoop;
