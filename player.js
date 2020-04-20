const RUN_X_VELOCITY = 10;

class Player {
  constructor() {
    this.x = 0;
    this.y = 0;
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
    this.x += this.xVelocity;
    this.y += this.yVelocity;
  }
}

export default Player;
