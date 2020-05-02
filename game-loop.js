const GameLoop = (canvas, player, platformSprite, playerSprite) => {
  // update player positions
  player.step();

  // draw
  canvas.resetFrame();
  platformSprite.drawImage();
  playerSprite.drawPlayerSprite(player);
};

export default GameLoop;
