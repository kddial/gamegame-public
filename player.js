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

  // Function returns a new y pixel coordinate if player is landing on a platform
  // based on its current (x, y) position, and new (x, y) position.
  // Two conditions must be met for landing on a platform:
  //
  // 1) If any platform is in inbetween the two y positions
  //
  // 2) If    players right >= platform left
  //          AND
  //          players left <= platform right
  //
  // When both conditions are met, then we return the platforms y position
  // that the player.y should be set to.

  // If the conditions are not met, we return 'null' as we do not
  // expect to land on a platform.
  getNewPlayerYPositionOnPlatform(platforms, xNew, yNew) {
    const { instances: platformsInstances } = platforms;

    // y related values
    const isFalling = this.y < yNew;
    const currentPlayerYBottom = this.y + this.yHitBoxLocal + this.heightHitBox;
    const newPlayerYBottom = yNew + this.yHitBoxLocal + this.heightHitBox;

    // x related values
    const newPlayerXLeft = xNew + this.xHitBoxLocal;
    const newPlayerXRight = xNew + this.xHitBoxLocal + this.widthHitBox;

    for (let i = 0; i < platformsInstances.length; i++) {
      const platformYHitBox = platformsInstances[i].yHitBox;
      const platformXLeft = platformsInstances[i].xHitBox;
      const platformXRight =
        platformsInstances[i].xHitBox + platformsInstances[i].widthHitBox;

      // standing on platform with respect to y (vertically)
      const yIsStandingOnPlatform =
        currentPlayerYBottom <= platformYHitBox &&
        platformYHitBox <= newPlayerYBottom;

      // stadning on platfrom with respect to x (horizontally)
      const xIsStandingOnPlatform =
        newPlayerXRight >= platformXLeft && newPlayerXLeft <= platformXRight;

      if (
        // y related conditions
        isFalling &&
        yIsStandingOnPlatform &&
        xIsStandingOnPlatform
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
      xNew,
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
