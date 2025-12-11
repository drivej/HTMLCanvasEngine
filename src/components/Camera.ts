import Point from './Point';
import { Rect } from './Rect';
import { Sprite } from './Sprite';

export default class Camera extends Sprite {
  focalLength = 100;
  focalPower = 0.25;
  viewport: Rect = new Rect();

  tick() {
    super.tick();
  }

  zFactor(z: number) {
    if (z === 0) {
      return 1;
    }
    return Math.pow(this.focalLength / z, this.focalPower);
  }
}
