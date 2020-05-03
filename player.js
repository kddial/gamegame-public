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

  // Function returns a new y pixel if player is landing on a platform
  // based on its current y position, and new y position. If any platform
  // in inbetween the two y positions, then we will return the platform's
  // y position.
  // Otherwise, function will return null when it expects to not land on a
  // platform.
  getNewPlayerYPositionOnPlatform(platforms, yNew) {
    const { instances } = platforms;
    const { yHitBox, heightHitBox } = this.getHitBoxProps();

    const isFalling = this.y < yNew;
    const currentPlayerYBottom = this.y + this.yHitBoxLocal + this.heightHitBox;
    const newPlayerYBottom = yNew + this.yHitBoxLocal + this.heightHitBox;

    for (let i = 0; i < instances.length; i++) {
      const { yHitBox: platformYHitBox } = instances[i];

      if (
        isFalling &&
        currentPlayerYBottom <= platformYHitBox &&
        platformYHitBox <= newPlayerYBottom
      ) {
        // player has fallen onto a plaform, return its new y position
        return platformYHitBox - this.yHitBoxLocal - this.heightHitBox;
      }
    }
    // player did not fall on a new platform, return null
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

    // apply gravity to yVelocity only if player is jumping
    if (this.isJumping === true) {
      this.yVelocity += GRAVITY_Y_VELOCITY;
      this.pose = JUMP;
    }

    // calculate new positions
    const xNew = this.x + this.xVelocity;
    const yNew = this.y + this.yVelocity;

    // calculate if about to land on a platform
    const newPlayerYPositionOnPlatform = this.getNewPlayerYPositionOnPlatform(
      platforms,
      yNew,
    );
    if (newPlayerYPositionOnPlatform !== null) {
      // set new player position on platform
      this.x = xNew;
      this.y = newPlayerYPositionOnPlatform;
      this.yVelocity = 0;
      this.isJumping = false;
    } else {
      // otherwise, set new player position based on velocity
      this.y = yNew;
      this.x = xNew;
    }
  }
}

export default Player;
