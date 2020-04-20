const GameLoop = (canvas, player, sprite) => {
  // todo:update positions

  // draw
  canvas.resetFrame();
  sprite.drawSpritePose(player.x, player.y);
};

export default GameLoop;
