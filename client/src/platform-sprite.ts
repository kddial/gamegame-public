import CONSTANTS from './constants.js';
const {
  IMG_PATH_PREFIX,
  PLATFORM_SPRITE_W,
  PLATFORM_SPRITE_H,
  HIT_BOX_COLOR,
  SPRITE_BOX_COLOR,
  SHOW_SPRITE_BOX,
} = CONSTANTS;
import Platforms from './platforms';
import { drawBorderRect } from './draw-helpers.js';
import ImageLoader from './image-loader.js';

class PlatformSprite {
  img: HTMLImageElement;
  ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D, imageLoader: ImageLoader) {
    this.img = imageLoader.platformSpriteImg;
    this.ctx = ctx;
  }

  drawImage(
    sourceXi = 0,
    sourceYi = 0,
    destX = 0,
    destY = 0,
    width = PLATFORM_SPRITE_W,
  ) {
    if (!!this.img?.src === false) {
      console.log('Platform image not loaded yet');
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

  drawPlatforms(platforms: Platforms) {
    const { instances } = platforms;

    instances.forEach((platformInstance) => {
      const { x, y, width } = platformInstance;
      this.drawImage(0, 0, x, y, width);
    });
  }

  drawPlatformsHitBox(platforms: Platforms) {
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
