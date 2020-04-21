const GameLoop = (canvas, player, sprite) => {
  // update player positions
  player.step();

  // draw
  canvas.resetFrame();
  sprite.drawPlayerSprite(player);
};

export default GameLoop;
