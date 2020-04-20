const IMG_PATH_PREFIX = '/img/';
const IMG_SPRITE_PATH = 'adventurer-v1_5-sheet.png';
const SPRITE_W = 50;
const SPRITE_H = 37;

class Sprite {
  constructor(ctx, loadedCallback) {
    this.loaded = false;
    this.img = new Image();
    this.img.addEventListener('load', () => {
      console.log('image loaded');
      this.loaded = true;
      loadedCallback();
    });
    this.img.src = IMG_PATH_PREFIX + IMG_SPRITE_PATH;
    this.ctx = ctx;
  }

  drawImage() {
    if (this.loaded === false) {
      console.log('image not loaded yet');
      return;
    }

    this.ctx.drawImage(
      this.img,
      0,
      0,
      SPRITE_W,
      SPRITE_H,
      0,
      0,
      SPRITE_W,
      SPRITE_H,
    );
  }
}

export default Sprite;
