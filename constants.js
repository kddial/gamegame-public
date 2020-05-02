const CONSTANTS = {
  IMG_PATH_PREFIX: '/img/',

  RIGHT: 'RIGHT',
  LEFT: 'LEFT',

  // player sprite poses
  IDLE: 'IDLE',
  RUN: 'RUN',
  JUMP: 'JUMP',

  // finite state machine for player button state
  // input is keyboard keys and previous button state
  // output is new player button state
  IDLE_RIGHT: 'IDLE_RIGHT',
  IDLE_LEFT: 'IDLE_LEFT',
  JUMP_RIGHT: 'JUMP_RIGHT',
  JUMP_LEFT: 'JUMP_LEFT',
  RUN_RIGHT: 'RUN_RIGHT',
  RUN_LEFT: 'RUN_LEFT',

  // player physics
  RUN_X_VELOCITY: 2,
  JUMP_Y_VELOCITY: -8,
  GRAVITY_Y_VELOCITY: 0.5,
  FAKE_FLOOR_Y: 140, // TODO: needs to hit a block, then stop going down
};

window.CONSTANTS = CONSTANTS;

window.gamegame = {
  classes: {},
};
