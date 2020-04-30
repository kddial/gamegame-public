const RUN_X_VELOCITY = 2;
const JUMP_Y_VELOCITY = -12;
const GRAVITY_Y_VELOCITY = 1;
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
    // TODO: needs a this.isJumping, to prevent a double jump
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
      window.resetJumpNextFrame();
    }

    // TODO: i need to create a platform, and find out if player.isStanding
    // Right now, i will hardcode the platform y coordinates

    // update y velocity with gravity
    if (this.y >= FAKE_FLOOR_Y && !playerState.includes(JUMP)) {
      // reset to floor coordinates if NOT in jumping state
      this.y = FAKE_FLOOR_Y;
      this.yVelocity = 0;
    } else {
      // keep applying gravity until it hits platform
      this.yVelocity += GRAVITY_Y_VELOCITY;
      this.pose = window.sprite.JUMP;
    }

    // update position
    this.x += this.xVelocity;
    this.y += this.yVelocity;
  }
}

export default Player;
