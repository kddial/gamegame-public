const RUN_X_VELOCITY = 2;
const JUMP_Y_VELOCITY = -10;
const GRAVITY_Y_VELOCITY = 6;
const FAKE_FLOOR_Y = 140; // TODO: needs to hit a block, then stop going down

// directions
const D_NONE = 'D_NONE';
const D_LEFT = 'D_LEFT';
const D_RIGHT = 'D_RIGHT';

// jumping
const D_JUMP = 'D_JUMP';
const D_NO_JUMP = 'D_NO_JUMP';

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
    const playerState = window.getPlayerState();
    // TODO: EXPORT TO A CONSTANTS FILE
    const LEFT = 'LEFT';
    const RIGHT = 'RIGHT';
    const RUN = 'RUN';
    const IDLE = 'IDLE';
    const JUMP = 'JUMP';
    // TODO: EXPORT TO A CONSTANTS FILE

    const direction = playerState.includes(RIGHT) ? RIGHT : LEFT;
    this.horizontalScale = direction === RIGHT ? 1 : -1;

    // update velocity and running/idle pose
    if (playerState.includes(RUN)) {
      this.xVelocity = RUN_X_VELOCITY * (direction === RIGHT ? 1 : -1);
      this.pose = window.sprite.RUN;
    }
    if (playerState.includes(IDLE)) {
      this.xVelocity = 0;
      this.pose = window.sprite.IDLE;
    }
    if (playerState.includes(JUMP)) {
      this.yVelocity = JUMP_Y_VELOCITY;
    }

    // update y velocity with gravity
    if (this.yVelocity < 0) {
      this.yVelocity += GRAVITY_Y_VELOCITY;
    } else {
      // TODO: needs to hit a block, then stop going down
      if (this.y > FAKE_FLOOR_Y) {
        this.y = FAKE_FLOOR_Y;
        this.yVelocity = 0;
      }
    }

    // update to jump pose if moving vertically
    if (this.yVelocity !== 0) {
      this.pose = JUMP;
    }

    // update position
    this.x += this.xVelocity;
    this.y += this.yVelocity;
  }
}

export default Player;
