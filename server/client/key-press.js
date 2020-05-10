const {
  IDLE_RIGHT,
  IDLE_LEFT,
  JUMP_RIGHT,
  JUMP_LEFT,
  RUN_RIGHT,
  RUN_LEFT,
  RIGHT,
  LEFT,
} = window.gamegame.CONSTANTS;

// define glocal variables used in this file
const _keyPress = {};
let _playerButtonState;
let _shouldPreventContinuousJump = false;

window.addEventListener('keydown', keyDownListener, false);
function keyDownListener(event) {
  _keyPress[event.key.toLowerCase()] = Date.now();
}

window.addEventListener('keyup', keyUpListener, false);
function keyUpListener(event) {
  const eventKey = event.key.toLowerCase();
  _keyPress[eventKey] = 0;

  if (eventKey === 'arrowup' || eventKey === 'w' || eventKey === ' ') {
    _shouldPreventContinuousJump = false;
  }
}

// reset window key down buttons after 2 seconds
function reset_KeyPressedDown() {
  // todo
  // fixes the problem when you hold down the button, then lose focus of window
}

// possible button keys
const BUTTON_LEFT = 'BUTTON_LEFT';
const BUTTON_RIGHT = 'BUTTON_RIGHT';
const BUTTON_JUMP = 'BUTTON_JUMP';

// find buttons pressed
function buttonsPressed() {
  const buttons = [];
  if (_keyPress['arrowright'] || _keyPress['d']) {
    buttons.push(BUTTON_RIGHT);
  }
  if (_keyPress['arrowleft'] || _keyPress['a']) {
    buttons.push(BUTTON_LEFT);
  }
  if (
    _shouldPreventContinuousJump === false &&
    (_keyPress['arrowup'] || _keyPress['w'] || _keyPress[' '])
  ) {
    buttons.push(BUTTON_JUMP);
  }
  return buttons;
}

// find player state based on buttons and previous state
function getPlayerButtonState() {
  const previousState = _playerButtonState || IDLE_RIGHT;
  const prevDirection = previousState.includes(RIGHT) ? RIGHT : LEFT;
  const buttons = buttonsPressed();
  let state = IDLE_RIGHT;
  let direction = prevDirection;

  if (buttons.includes(BUTTON_LEFT)) {
    direction = LEFT;
    state = RUN_LEFT;
  }
  if (buttons.includes(BUTTON_RIGHT)) {
    direction = RIGHT;
    state = RUN_RIGHT;
  }
  if (buttons.includes(BUTTON_JUMP)) {
    state = direction === LEFT ? JUMP_LEFT : JUMP_RIGHT;
  }
  if (buttons.length === 0) {
    state = direction === LEFT ? IDLE_LEFT : IDLE_RIGHT;
  }

  _playerButtonState = state;
  return state;
}
window.gamegame.getPlayerButtonState = getPlayerButtonState;

// reset jump button key down in the immediate next frame
function resetJumpKeyDownForNextFrame() {
  _shouldPreventContinuousJump = true;
  _keyPress['arrowup'] = 0;
  _keyPress['w'] = 0;
  _keyPress[' '] = 0;
}
window.gamegame.resetJumpKeyDownForNextFrame = resetJumpKeyDownForNextFrame;

export default _keyPress;
