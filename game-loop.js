const { SHOW_HIT_BOX } = window.gamegame.CONSTANTS;

const GameLoop = ({
  canvas,
  player,
  playerSprite,
  platforms,
  platformSprite,
}) => {
  // update player positions
  player.step(platforms);

  //--- drawing ---
  canvas.resetFrame();

  // draw platforms
  platformSprite.drawPlatforms(platforms);
  SHOW_HIT_BOX && platformSprite.drawPlatformsHitBox(platforms);

  // draw player
  playerSprite.drawPlayerSprite(player);
  SHOW_HIT_BOX && playerSprite.drawPlayerHitBox(player);
};

export default GameLoop;
