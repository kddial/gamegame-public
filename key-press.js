window.keyPress = {};
window.addEventListener('keydown', keyDownListener, false);
function keyDownListener(event) {
  window.keyPress[event.key.toLowerCase()] = Date.now();
}

window.addEventListener('keyup', keyUpListener, false);
function keyUpListener(event) {
  window.keyPress[event.key.toLowerCase()] = 0;
}

// reset window key down buttons after 2 seconds
function resetKeyPressedDown() {
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
  if (window.keyPress['arrowright'] || window.keyPress['d']) {
    buttons.push(BUTTON_RIGHT);
  }
  if (window.keyPress['arrowleft'] || window.keyPress['a']) {
    buttons.push(BUTTON_LEFT);
  }
  if (
    window.keyPress['arrowup'] ||
    window.keyPress['w'] ||
    window.keyPress[' ']
  ) {
    buttons.push(BUTTON_JUMP);
  }
  return buttons;
}

// finite state machine for players state
// input is keyboard keys and previous state
// output is player's state

// possible states
const IDLE_RIGHT = 'IDLE_RIGHT';
const IDLE_LEFT = 'IDLE_LEFT';
const JUMP_RIGHT = 'JUMP_RIGHT';
const JUMP_LEFT = 'JUMP_LEFT';
const RUN_RIGHT = 'RUN_RIGHT';
const RUN_LEFT = 'RUN_LEFT';

const RIGHT = 'RIGHT';
const LEFT = 'LEFT';

// find player state based on buttons and previous state
function getPlayerButtonState() {
  const previousState = window.playerState || IDLE_RIGHT;
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

  window.playerState = state;
  return state;
}
window.getPlayerButtonState = getPlayerButtonState;

// reset jump button key down in the immediate next frame
function resetJumpKeyDownForNextFrame() {
  window.keyPress['arrowup'] = 0;
  window.keyPress['w'] = 0;
  window.keyPress[' '] = 0;
}
window.resetJumpKeyDownForNextFrame = resetJumpKeyDownForNextFrame;

export default window.keyPress;
