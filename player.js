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
} = window.gamegame.CONSTANTS;

class Player {
  constructor() {
    this.x = 100;
    this.y = 140;
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.pose = IDLE;
    this.horizontalScale = 1; // 1 means right direction, -1 means left direction
    this.isJumping = false;

    // these are offests from local origin (this.x, this.y)
    this.xHitBoxLocal = 20;
    this.yHitBoxLocal = 12;
    this.widthHitBox = 10;
    this.heightHitBox = 24;
  }

  // TODO: i might have to make hit boxes PER pose frame
  getHitBoxProps() {
    const { xHitBoxLocal, yHitBoxLocal, widthHitBox, heightHitBox } = this;
    // in reference to canvas (so we add local origin)
    const xHitBox = xHitBoxLocal + this.x;
    const yHitBox = yHitBoxLocal + this.y;
    return {
      xHitBox,
      yHitBox,
      widthHitBox,
      heightHitBox,
    };
  }

  calculateLandingOnPlatform(platforms, yPrev) {
    const { instances } = platforms;
    const {
      xHitBox,
      yHitBox,
      widthHitBox,
      heightHitBox,
    } = this.getHitBoxProps();

    const isFalling = yPrev < this.y;
    const prevPlayerYBottom = yPrev + this.yHitBoxLocal + this.heightHitBox;

    const playerYBottom = yHitBox + heightHitBox;
    const playerXLeft = xHitBox;
    const playerXRight = xHitBox + widthHitBox;

    for (let i = 0; i < instances.length; i++) {
      const {
        xHitBox: platXHitBox,
        yHitBox: platYHitBox,
        widthHitBox: platWidthHitBox,
      } = instances[i];

      if (
        isFalling &&
        prevPlayerYBottom < platYHitBox &&
        platYHitBox <= playerYBottom
      ) {
        // calulate new standing position of player
        return platYHitBox - this.yHitBoxLocal - this.heightHitBox;
      }
    }
    return null;
  }

  step(platforms) {
    const playerButtonState = window.gamegame.getPlayerButtonState();
    const direction = playerButtonState.includes(RIGHT) ? RIGHT : LEFT;
    this.horizontalScale = direction === RIGHT ? 1 : -1;

    // update velocity and running/idle pose
    if (playerButtonState.includes(RUN)) {
      this.xVelocity = RUN_X_VELOCITY * (direction === RIGHT ? 1 : -1);
      this.pose = RUN;
    }
    if (playerButtonState.includes(IDLE)) {
      this.xVelocity = 0;
      this.pose = IDLE;
    }
    if (playerButtonState.includes(JUMP) && this.isJumping === false) {
      this.isJumping = true;
      this.yVelocity = JUMP_Y_VELOCITY;
      window.gamegame.resetJumpKeyDownForNextFrame();
    }

    // TODO: i need to create a platform, and find out if player.isStanding
    // Right now, i will hardcode the platform y coordinates

    // update y velocity with gravity
    if (this.y < FAKE_FLOOR_Y) {
      // keep applying gravity until it hits platform
      this.yVelocity += GRAVITY_Y_VELOCITY;
      this.pose = JUMP;
    }

    // update position
    const yPrev = this.y;
    this.x += this.xVelocity;
    this.y += this.yVelocity;

    // calculate if about to land on a platform
    const newLandingPlatformY = this.calculateLandingOnPlatform(
      platforms,
      yPrev,
    );
    if (newLandingPlatformY !== null) {
      this.y = newLandingPlatformY;
      this.yVelocity = 0;
      this.isJumping = false;
    }

    // ensure this.y does not go past the platform floor and reset gravity velocity
    // if (this.y > FAKE_FLOOR_Y) {
    //   this.y = FAKE_FLOOR_Y;
    //   this.yVelocity = 0;
    //   this.isJumping = false;
    // }
  }
}

export default Player;
