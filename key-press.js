window.keyPress = {};

window.addEventListener('keydown', keyDownListener, false);
function keyDownListener(event) {
  window.keyPress[event.key] = true;
}

window.addEventListener('keyup', keyUpListener, false);
function keyUpListener(event) {
  window.keyPress[event.key] = false;
}

export default window.keyPress;
