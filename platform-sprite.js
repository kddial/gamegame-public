const {
  IMG_PATH_PREFIX,
  PLATFORM_SPRITE_W,
  PLATFORM_SPRITE_H,
  HIT_BOX_COLOR,
  SPRITE_BOX_COLOR,
  SHOW_SPRITE_BOX,
} = window.gamegame.CONSTANTS;
const { drawBorderRect } = window.gamegame;
const IMG_SPRITE_PATH = 'platform_v1.1.png';

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
    width = PLATFORM_SPRITE_W,
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
      PLATFORM_SPRITE_H, // source image height
      destX, // destination canvas x
      destY, // destination canvas y
      width, // destination canvas width (if diff than source img width, then it will stretch or shrink)
      PLATFORM_SPRITE_H, // destination canvas height (if diff than source img height, then it will stretch of shrink)
    );
  }

  drawPlatforms(platforms) {
    const { instances } = platforms;

    instances.forEach((platformInstance) => {
      const { x, y, width, spriteSeed } = platformInstance;
      this.drawImage(0, 0, x, y, width);
    });
  }

  drawPlatformsHitBox(platforms) {
    const { instances } = platforms;
    instances.forEach((platformInstance) => {
      const { x, y, width, xHitBox, yHitBox, widthHitBox } = platformInstance;

      // sprite box
      SHOW_SPRITE_BOX &&
        drawBorderRect(
          this.ctx,
          x,
          y,
          width,
          PLATFORM_SPRITE_H,
          SPRITE_BOX_COLOR,
        );

      // hit box
      drawBorderRect(this.ctx, xHitBox, yHitBox, widthHitBox, 0, HIT_BOX_COLOR);
    });
  }
}

export default PlatformSprite;
