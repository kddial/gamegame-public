import CONSTANTS from './constants.js';
import Player from './player.js';
const {
  IDLE_RIGHT,
  IDLE_LEFT,
  JUMP_RIGHT,
  JUMP_LEFT,
  RUN_RIGHT,
  RUN_LEFT,
  RIGHT,
  LEFT,
  PLAYER_NAME_INPUT_ID,
  MESSAGE_INPUT_ID,
} = CONSTANTS;

// possible button keys
const BUTTON_LEFT = 'BUTTON_LEFT';
const BUTTON_RIGHT = 'BUTTON_RIGHT';
const BUTTON_JUMP = 'BUTTON_JUMP';

class KeyPress {
  _keyPress: { [key: string]: number };
  _playerButtonState: string;
  _shouldPreventContinuousJump: boolean;
  player: Player;

  constructor(player: Player) {
    this._keyPress = {};
    this._playerButtonState = '';
    this._shouldPreventContinuousJump = false;
    this.player = player;

    window.addEventListener('keydown', this.keyDownListener, false);
    window.addEventListener('keyup', this.keyUpListener, false);
  }

  // Function to detect if document is focused/active on
  // inputs, so we do not register them as player's movement.
  areInputsActive() {
    const nameInput = document.getElementById(PLAYER_NAME_INPUT_ID);
    const messageInput = document.getElementById(MESSAGE_INPUT_ID);
    return (
      document.activeElement === nameInput ||
      document.activeElement === messageInput
    );
  }

  keyDownListener = (event: KeyboardEvent) => {
    if (this.areInputsActive() === true) {
      if (event.key.toLowerCase() === 'enter') {
        this.sendMessageOnEnter();
      }
      return;
    }
    if (event.key.toLowerCase() === 'enter') {
      document.getElementById(MESSAGE_INPUT_ID).focus();
    }

    this._keyPress[event.key.toLowerCase()] = Date.now();
  };

  keyUpListener = (event: KeyboardEvent) => {
    const eventKey = event.key.toLowerCase();
    this._keyPress[eventKey] = 0;

    if (eventKey === 'arrowup' || eventKey === 'w' || eventKey === ' ') {
      this._shouldPreventContinuousJump = false;
    }
  };

  reset_KeyPressedDown() {
    // TODO reset window key down buttons after 2 seconds
    // fixes the problem when you hold down the button, then lose focus of window
  }

  // find buttons pressed
  buttonsPressed(): Array<string> {
    const buttons = [];
    if (this._keyPress['arrowright'] || this._keyPress['d']) {
      buttons.push(BUTTON_RIGHT);
    }
    if (this._keyPress['arrowleft'] || this._keyPress['a']) {
      buttons.push(BUTTON_LEFT);
    }
    if (
      this._shouldPreventContinuousJump === false &&
      (this._keyPress['arrowup'] || this._keyPress['w'] || this._keyPress[' '])
    ) {
      buttons.push(BUTTON_JUMP);
    }
    return buttons;
  }

  // find player state based on buttons and previous state
  getPlayerButtonState() {
    const previousState = this._playerButtonState || IDLE_RIGHT;
    const prevDirection = previousState.includes(RIGHT) ? RIGHT : LEFT;
    const buttons = this.buttonsPressed();
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

    this._playerButtonState = state;
    return state;
  }

  sendMessageOnEnter() {
    const messageInput = <HTMLInputElement>(
      document.getElementById(MESSAGE_INPUT_ID)
    );
    const message = messageInput.value;
    messageInput.value = ''; // clear value after sending it
    messageInput.blur(); // lose input focus to move player around again
    this.player.addToMessages(message);
  }

  // reset jump button key down in the immediate next frame
  resetJumpKeyDownForNextFrame() {
    this._shouldPreventContinuousJump = true;
    this._keyPress['arrowup'] = 0;
    this._keyPress['w'] = 0;
    this._keyPress[' '] = 0;
  }
}

export default KeyPress;
