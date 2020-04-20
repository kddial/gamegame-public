const RUN_X_VELOCITY = 10;

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
  }

  runRight() {
    this.xVelocity = RUN_X_VELOCITY;
  }

  idle() {
    this.xVelocity = 0;
    this.yVelocity = 0;
  }

  step() {
    // find direction by reading key presses
    const keyPress = window.keyPress;
    let direction = D_NONE;
    if (keyPress['ArrowRight']) {
      direction = D_RIGHT;
    } else if (keyPress['ArrowLeft']) {
      direction = D_LEFT;
    }

    // update velocity
    if (direction === D_RIGHT) {
      this.xVelocity = RUN_X_VELOCITY;
    } else if (direction === D_LEFT) {
      this.xVelocity = -RUN_X_VELOCITY;
    } else {
      this.xVelocity = 0;
    }

    // update position
    this.x += this.xVelocity;
    this.y += this.yVelocity;
  }
}

export default Player;
