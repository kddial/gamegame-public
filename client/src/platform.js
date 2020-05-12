import CONSTANTS from './constants.js';
const { PLATFORM_SPRITE_W, PLATFORM_SPRITE_H } = CONSTANTS;

class Platform {
  constructor(x, y, width, spriteSeed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.spriteSeed = spriteSeed; // used to randomize sprites for uniqe look

    this.xHitBox = 0 + this.x; // in reference to canvas (so we add local origin)
    this.yHitBox = 36 + this.y; // in reference to canvas (so we add local origin)
    this.widthHitBox = this.width;
  }
}

export default Platform;
