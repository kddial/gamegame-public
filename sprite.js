const IMG_PATH_PREFIX = '/img/';
const IMG_SPRITE_PATH = 'adventurer-v1_5-sheet.png';
const SPRITE_W = 50;
const SPRITE_H = 37;

// position inside sprite sheet
export const IDLE = 'IDLE';
export const RUN = 'RUN';
const SPRITE_POSES = {
  [IDLE]: [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ],
  [RUN]: [
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 1],
    [5, 1],
    [6, 1],
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
    this.pose = IDLE;
    this.poseIndex = 0;
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

  drawSpritePose(destX = 0, destY = 0) {
    const { pose } = this;
    const poseArray = SPRITE_POSES[pose];
    if (this.poseIndex + 1 > poseArray.length) {
      this.poseIndex = 0;
    }

    const poseX = poseArray[this.poseIndex][0];
    const poseY = poseArray[this.poseIndex][1];
    this.drawImage(poseX, poseY, destX, destY);
    this.poseIndex += 1;
  }

  setSpritePose(pose) {
    this.pose = pose;
    this.poseIndex = 0;
  }
}

export default Sprite;
