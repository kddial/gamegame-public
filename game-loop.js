const GameLoop = (canvas, player, sprite) => {
  // update player positions
  player.step();

  // draw
  canvas.resetFrame();
  sprite.drawSpritePose(player.x, player.y);
};

export default GameLoop;
