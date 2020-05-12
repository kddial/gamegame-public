import {
  getPlayerButtonState,
  resetJumpKeyDownForNextFrame,
} from './key-press.js';
import CONSTANTS from './constants.js';
const {
  LEFT,
  RIGHT,
  IDLE,
  RUN,
  JUMP,
  RUN_X_VELOCITY,
  JUMP_Y_VELOCITY,
  GRAVITY_Y_VELOCITY,
  PLATFORM_FLOOR_Y,
} = CONSTANTS;

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

  // Function returns true if standing on a platform based on
  // given player position (x, y). Function will also calculate
  // if a player is going to fall onto a platform.
  getIsStandingOnPlatform(
    platformInstance,
    xPlayer,
    yPlayer,
    yNewPlayer = yPlayer,
  ) {
    // player hit box values
    const playerXLeft = xPlayer + this.xHitBoxLocal;
    const playerXRight = xPlayer + this.xHitBoxLocal + this.widthHitBox;
    const isPlayerFalling = yPlayer < yNewPlayer;
    const playerYBottom = yPlayer + this.yHitBoxLocal + this.heightHitBox;
    const newPlayerYBottom = yNewPlayer + this.yHitBoxLocal + this.heightHitBox;

    // platform hitbox values
    const platformYHitBox = platformInstance.yHitBox;
    const platformXLeft = platformInstance.xHitBox;
    const platformXRight =
      platformInstance.xHitBox + platformInstance.widthHitBox;

    // is standing on platfrom with respect to x (horizontally)
    // true when (players right >= platform left AND players left <= platform right) (AABB collision)
    const xIsStandingOnPlatform =
      playerXRight >= platformXLeft && playerXLeft <= platformXRight;

    // is standing on platform with respect to y (vertically)
    let yIsStandingOnPlatform;
    if (isPlayerFalling) {
      // platform y must be inbetween payers previous y and new y
      yIsStandingOnPlatform =
        playerYBottom <= platformYHitBox && platformYHitBox <= newPlayerYBottom;
    } else {
      yIsStandingOnPlatform = playerYBottom === platformYHitBox;
    }

    return xIsStandingOnPlatform && yIsStandingOnPlatform;
  }

  // Function returns a new y pixel coordinate if player is landing on a platform
  // based on its current (x, y) position, and new (x, y) position.
  // Return 'null' if we are not landing on a platform.
  getNewPlayerYPositionOnPlatform(platforms, xNew, yNew) {
    const { instances: platformsInstances } = platforms;

    for (let i = 0; i < platformsInstances.length; i++) {
      const isStandingOnPlatform = this.getIsStandingOnPlatform(
        platformsInstances[i],
        xNew,
        this.y,
        yNew,
      );
      const platformYHitBox = platformsInstances[i].yHitBox;

      if (isStandingOnPlatform) {
        // player has fallen onto a plaform, return its new y position
        return platformYHitBox - this.yHitBoxLocal - this.heightHitBox;
      }
    }
    // player did not fall on a new platform, return null
    return null;
  }

  getIsPlayerStandingOnAnyPlatform(platforms) {
    const { instances: platformsInstances } = platforms;
    for (let i = 0; i < platformsInstances.length; i++) {
      if (this.getIsStandingOnPlatform(platformsInstances[i], this.x, this.y)) {
        return true;
      }
    }
    return false;
  }

  step(platforms) {
    const playerButtonState = getPlayerButtonState();
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
      resetJumpKeyDownForNextFrame();
    }

    // apply gravity to yVelocity if:
    // - player is jumping OR
    // - player is not standing on a platform
    if (
      this.isJumping === true ||
      this.getIsPlayerStandingOnAnyPlatform(platforms) === false
    ) {
      this.yVelocity += GRAVITY_Y_VELOCITY;
      this.pose = JUMP;
    }

    // calculate new positions
    const xNew = this.x + this.xVelocity;
    const yNew = this.y + this.yVelocity;
    const isPlayerFalling = this.y < yNew;

    // calculate if about to land on a platform
    const newPlayerYPositionOnPlatform = isPlayerFalling
      ? this.getNewPlayerYPositionOnPlatform(platforms, xNew, yNew)
      : null;

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
