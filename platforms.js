const { Platform } = window.gamegame.classes;
const { FAKE_FLOOR_Y, PLATFORM_SPRITE_W } = window.gamegame.CONSTANTS;

class Platforms {
  constructor() {
    this.instances = [
      // Platform args: (x, y, width, seed)
      new Platform(0, FAKE_FLOOR_Y, PLATFORM_SPRITE_W, 'floor-one'),
      new Platform(
        PLATFORM_SPRITE_W,
        FAKE_FLOOR_Y,
        PLATFORM_SPRITE_W,
        'floor-two',
      ),
      new Platform(
        PLATFORM_SPRITE_W * 2,
        FAKE_FLOOR_Y,
        PLATFORM_SPRITE_W,
        'floor-three',
      ),
      new Platform(
        PLATFORM_SPRITE_W * 3,
        FAKE_FLOOR_Y,
        PLATFORM_SPRITE_W,
        'floor-four',
      ),
      new Platform(PLATFORM_SPRITE_W, 80, 100, 'platform-one'),
      new Platform(50, 20, 100, 'test-platform-one'),
    ];
  }
}

export default Platforms;
