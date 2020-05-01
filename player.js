const {
  LEFT,
  RIGHT,
  IDLE,
  RUN,
  JUMP,
  RUN_X_VELOCITY,
  JUMP_Y_VELOCITY,
  GRAVITY_Y_VELOCITY,
  FAKE_FLOOR_Y,
} = window.CONSTANTS;

class Player {
  constructor() {
    this.x = 100;
    this.y = 140;
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.pose = window.sprite.IDLE;
    this.horizontalScale = 1; // 1 means right direction, -1 means left direction
    this.isJumping = false;
  }

  step() {
    const playerButtonState = window.getPlayerButtonState();
    const direction = playerButtonState.includes(RIGHT) ? RIGHT : LEFT;
    this.horizontalScale = direction === RIGHT ? 1 : -1;

    // update velocity and running/idle pose
    if (playerButtonState.includes(RUN)) {
      this.xVelocity = RUN_X_VELOCITY * (direction === RIGHT ? 1 : -1);
      this.pose = window.sprite.RUN;
    }
    if (playerButtonState.includes(IDLE)) {
      this.xVelocity = 0;
      this.pose = window.sprite.IDLE;
    }
    if (playerButtonState.includes(JUMP) && this.isJumping === false) {
      this.isJumping = true;
      this.yVelocity = JUMP_Y_VELOCITY;
      window.resetJumpKeyDownForNextFrame();
    }

    // TODO: i need to create a platform, and find out if player.isStanding
    // Right now, i will hardcode the platform y coordinates

    // update y velocity with gravity
    if (this.y < FAKE_FLOOR_Y) {
      // keep applying gravity until it hits platform
      this.yVelocity += GRAVITY_Y_VELOCITY;
      this.pose = window.sprite.JUMP;
    }

    // update position
    this.x += this.xVelocity;
    this.y += this.yVelocity;

    // ensure this.y does not go past the platform floor and reset gravity velocity
    if (this.y > FAKE_FLOOR_Y) {
      this.y = FAKE_FLOOR_Y;
      this.yVelocity = 0;
      this.isJumping = false;
    }
  }
}

export default Player;
