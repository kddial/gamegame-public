const IMG_PATH_PREFIX = '/img/';
const IMG_SPRITE_PATH = 'adventurer-v1_5-sheet.png';
const SPRITE_W = 50;
const SPRITE_H = 37;

// position inside sprite sheet
const SPRITE_POSES = {
  IDLE: [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ],
};

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

  drawImage(sourceXi = 0, sourceYi = 0, destX = 0, destY = 0) {
    if (this.loaded === false) {
      console.log('image not loaded yet');
      return;
    }

    this.ctx.drawImage(
      this.img,
      SPRITE_W * sourceXi,
      SPRITE_H * sourceYi,
      SPRITE_W,
      SPRITE_H,
      destX,
      destY,
      SPRITE_W,
      SPRITE_H,
    );
  }

  drawSpritePose(pose = 'IDLE') {
    const poseArray = SPRITE_POSES[pose];
    if (!poseArray || poseArray.length <= 0) {
      console.log(`${pose}, pose does not exist`);
      return;
    }

    poseArray.forEach((poseCoord) => {
      const poseX = poseCoord[0];
      const poseY = poseCoord[1];
      this.drawImage(poseX, poseY);
    });
  }
}

export default Sprite;
