const GameLoop = (canvas, player, platformSprite, sprite) => {
  // update player positions
  player.step();

  // draw
  canvas.resetFrame();
  platformSprite.drawImage();
  sprite.drawPlayerSprite(player);
};

export default GameLoop;
