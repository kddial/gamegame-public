class Platform {
  constructor(x, y, width, spriteSeed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.spriteSeed = spriteSeed; // used to randomize sprites for uniqe look
  }
}

window.gamegame.classes.Platform = Platform;
export default Platform;
