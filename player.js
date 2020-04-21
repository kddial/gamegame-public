const RUN_X_VELOCITY = 2;

// directions
const D_NONE = 'D_NONE';
const D_LEFT = 'D_LEFT';
const D_RIGHT = 'D_RIGHT';

class Player {
  constructor() {
    this.x = 100;
    this.y = 140;
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.pose = window.sprite.IDLE;
    this.horizontalScale = 1; // 1 means right direction, -1 means left direction
  }

  step() {
    const { IDLE, RUN } = window.sprite;

    // find direction by reading key presses
    const keyPress = window.keyPress;
    let direction = D_NONE;
    if (keyPress['ArrowRight'] || keyPress['d']) {
      direction = D_RIGHT;
    } else if (keyPress['ArrowLeft'] || keyPress['a']) {
      direction = D_LEFT;
    }

    // update velocity, pose, horizontalScale
    if (direction === D_RIGHT) {
      this.xVelocity = RUN_X_VELOCITY;
      this.pose = RUN;
      this.horizontalScale = 1;
      //
    } else if (direction === D_LEFT) {
      this.xVelocity = -RUN_X_VELOCITY;
      this.pose = RUN;
      this.horizontalScale = -1;
      //
    } else {
      this.xVelocity = 0;
      this.pose = IDLE;
    }

    // update position
    this.x += this.xVelocity;
    this.y += this.yVelocity;
  }
}

export default Player;
