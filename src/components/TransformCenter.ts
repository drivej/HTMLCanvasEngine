import { clamp } from './Utils';

export class TransformCenter {
  _x: number = 0;
  _y: number = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  get x() {
    return this._x;
  }

  set x(x: number) {
    this._x = clamp(x, 0, 1);
  }

  get y() {
    return this._y;
  }

  set y(y: number) {
    this._y = clamp(y, 0, 1);
  }
}
