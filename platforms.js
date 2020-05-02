const { Platform } = window.gamegame.classes;
const { FAKE_FLOOR_Y } = window.gamegame.CONSTANTS;

class Platforms {
  constructor() {
    this.instances = [
      new Platform(0, FAKE_FLOOR_Y, 200, 'floor-one'),
      new Platform(200, FAKE_FLOOR_Y, 200, 'floor-two'),
      new Platform(200 * 2, FAKE_FLOOR_Y, 200, 'floor-three'),
      new Platform(200 * 3, FAKE_FLOOR_Y, 200, 'floor-four'),
      new Platform(200, 80, 100, 'platform-one'),
    ];
  }
}

export default Platforms;
