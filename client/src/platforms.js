import Platform from './platform.js';
import CONSTANTS from './constants.js';
const { PLATFORM_FLOOR_Y, PLATFORM_SPRITE_W } = CONSTANTS;

class Platforms {
  constructor() {
    this.instances = [
      // Platform args: (x, y, width, seed)

      new Platform(200, 500, 200, 'stage-1-1'),
      new Platform(400, 450, 170, 'stage-1-2'),
      new Platform(600, 400, 50, 'stage-1-3'),

      new Platform(550, 350, 20, 'stage-2-1'),
      new Platform(500, 300, 20, 'stage-2-2'),
      new Platform(440, 250, 20, 'stage-2-3'),
      new Platform(370, 200, 20, 'stage-2-4'),
      new Platform(293, 150, 20, 'stage-2-5'),

      // floor instances
      new Platform(0, PLATFORM_FLOOR_Y, PLATFORM_SPRITE_W, 'floor-one'),
      new Platform(
        PLATFORM_SPRITE_W,
        PLATFORM_FLOOR_Y,
        PLATFORM_SPRITE_W,
        'floor-two',
      ),
      new Platform(
        PLATFORM_SPRITE_W * 2,
        PLATFORM_FLOOR_Y,
        PLATFORM_SPRITE_W,
        'floor-three',
      ),
      new Platform(
        PLATFORM_SPRITE_W * 3,
        PLATFORM_FLOOR_Y,
        PLATFORM_SPRITE_W,
        'floor-four',
      ),
    ];
  }
}

export default Platforms;
