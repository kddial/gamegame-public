const { IMG_PATH_PREFIX, IDLE, RUN, JUMP } = window.CONSTANTS;
const IMG_SPRITE_PATH = 'adventurer-v1_5-sheet.png';
const SPRITE_W = 50;
const SPRITE_H = 37;

const SPRITE_POSES = {
  [IDLE]: {
    // frames to wait before rendering next pose picture
    framesPerPicture: 8,
    // sprite sheet coordinates
    coordinates: [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
    ],
  },
  [RUN]: {
    framesPerPicture: 8,
    coordinates: [
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 1],
      [5, 1],
      [6, 1],
    ],
  },
  [JUMP]: {
    // TODO:i dont like all the frames, play with the number
    framesPerPicture: 12,
    coordinates: [
      // [0, 2],
      [1, 2],
      [2, 2],
      [3, 2],
    ],
  },
};

// export to window
window.sprite = {
  IDLE,
  RUN,
  JUMP,
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
    this.frameCounter = 0;
    this.horizontalScale = 1; // 1 means right direction, -1 means left direction
  }

  drawImage(sourceXi = 0, sourceYi = 0, destX = 0, destY = 0) {
    if (this.loaded === false) {
      console.log('image not loaded yet');
      return;
    }

    if (this.horizontalScale === 1) {
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
    } else {
      // draw facing left direction by flipping horizontally
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(
        this.img,
        SPRITE_W * sourceXi,
        SPRITE_H * sourceYi,
        SPRITE_W,
        SPRITE_H,
        -1 * (destX + SPRITE_W),
        destY,
        SPRITE_W,
        SPRITE_H,
      );
      this.ctx.scale(-1, 1); // revert scale transformation
    }
  }

  drawSpritePose(destX = 0, destY = 0) {
    const { pose } = this;
    const { coordinates, framesPerPicture } = SPRITE_POSES[pose];

    const drawPose = () => {
      const poseX = coordinates[this.poseIndex][0];
      const poseY = coordinates[this.poseIndex][1];
      this.drawImage(poseX, poseY, destX, destY);
    };

    // if in jump pose, stay on the last frame until post changes
    if (this.pose === JUMP && this.poseIndex === coordinates.length - 1) {
      drawPose();
      return;
    }

    // do not render new pose frame until numOfFrames have past
    if (this.frameCounter < framesPerPicture) {
      this.frameCounter++;
      drawPose();
      return;
    }

    // render a new pose frame and increment poseIndex
    this.frameCounter = 0;
    if (this.poseIndex + 1 >= coordinates.length) {
      this.poseIndex = 0;
    } else {
      this.poseIndex++;
    }
    drawPose();
  }

  setSpritePose(pose) {
    if (pose !== this.pose) {
      this.pose = pose;
      this.poseIndex = 0;
    }
  }

  setHorizontalScale(horizontalScale) {
    // render the sprite as is, or horizontally flipped
    if (horizontalScale !== this.horizontalScale) {
      this.horizontalScale = horizontalScale;
    }
  }

  drawPlayerSprite(player) {
    const { x, y, pose, horizontalScale } = player;
    this.setHorizontalScale(horizontalScale);
    this.setSpritePose(pose);
    this.drawSpritePose(x, y);
  }
}

export default Sprite;
