import CONSTANTS from './constants.js';
const {
  IDLE_RIGHT,
  IDLE_LEFT,
  JUMP_RIGHT,
  JUMP_LEFT,
  RUN_RIGHT,
  RUN_LEFT,
  RIGHT,
  LEFT,
} = CONSTANTS;

// define glocal variables used in this file
const _keyPress: { [key: string]: number } = {};
let _playerButtonState: string;
let _shouldPreventContinuousJump = false;

// Function to detect if document is focused/active on
// inputs, so we do not register them as player's movement.
function areInputsActive() {
  const nameInput = document.getElementById('player-name-input');
  return document.activeElement === nameInput;
}

window.addEventListener('keydown', keyDownListener, false);
function keyDownListener(event: KeyboardEvent) {
  if (areInputsActive() === true) {
    return;
  }
  _keyPress[event.key.toLowerCase()] = Date.now();
}

window.addEventListener('keyup', keyUpListener, false);
function keyUpListener(event: KeyboardEvent) {
  const eventKey = event.key.toLowerCase();
  _keyPress[eventKey] = 0;

  if (eventKey === 'arrowup' || eventKey === 'w' || eventKey === ' ') {
    _shouldPreventContinuousJump = false;
  }
}

// TODO reset window key down buttons after 2 seconds
function reset_KeyPressedDown() {
  // fixes the problem when you hold down the button, then lose focus of window
}

// possible button keys
const BUTTON_LEFT = 'BUTTON_LEFT';
const BUTTON_RIGHT = 'BUTTON_RIGHT';
const BUTTON_JUMP = 'BUTTON_JUMP';

// find buttons pressed
function buttonsPressed(): Array<string> {
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
export function getPlayerButtonState() {
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

// reset jump button key down in the immediate next frame
export function resetJumpKeyDownForNextFrame() {
  _shouldPreventContinuousJump = true;
  _keyPress['arrowup'] = 0;
  _keyPress['w'] = 0;
  _keyPress[' '] = 0;
}

export default _keyPress;
