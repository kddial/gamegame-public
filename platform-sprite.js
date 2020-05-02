const { IMG_PATH_PREFIX } = window.gamegame.CONSTANTS;
const IMG_SPRITE_PATH = 'platform_v1.1.png';
const SPRITE_W = 200; // full is 200
const SPRITE_H = 48;

const PLATFORM_SPRITE_X_COORDINATES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

class PlatformSprite {
  constructor(ctx) {
    this.loaded = false;
    this.img = new Image();
    this.img.addEventListener('load', () => {
      console.log('platform image loaded');
      this.loaded = true;
    });
    this.img.src = IMG_PATH_PREFIX + IMG_SPRITE_PATH;
    this.ctx = ctx;
  }

  drawImage(
    sourceXi = 0,
    sourceYi = 0,
    destX = 0,
    destY = 0,
    width = SPRITE_W,
  ) {
    if (this.loaded === false) {
      console.log('image not loaded yet');
      return;
    }
    this.ctx.drawImage(
      this.img,
      sourceXi, // source image x position
      sourceYi, // source image y position
      width, // source image width
      SPRITE_H, // source image height
      destX, // destination canvas x
      destY, // destination canvas y
      width, // destination canvas width (if diff than source img width, then it will stretch or shrink)
      SPRITE_H, // destination canvas height (if diff than source img height, then it will stretch of shrink)
    );
  }

  drawPlatforms(platforms) {
    const { instances } = platforms;

    instances.forEach((platformInstance) => {
      const { x, y, width, spriteSeed } = platformInstance;
      this.drawImage(0, 0, x, y, width);
    });
  }
}

export default PlatformSprite;
