const GameLoop = ({
  canvas,
  player,
  playerSprite,
  playforms,
  platformSprite,
}) => {
  // update player positions
  player.step();

  // draw
  canvas.resetFrame();
  platformSprite.drawImage();
  playerSprite.drawPlayerSprite(player);
};

export default GameLoop;
