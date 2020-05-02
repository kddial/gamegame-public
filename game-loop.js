const GameLoop = ({
  canvas,
  player,
  playerSprite,
  platforms,
  platformSprite,
}) => {
  // update player positions
  player.step();

  // draw
  canvas.resetFrame();
  platformSprite.drawPlatforms(platforms);
  playerSprite.drawPlayerSprite(player);
};

export default GameLoop;
