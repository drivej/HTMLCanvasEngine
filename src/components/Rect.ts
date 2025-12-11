import Point from './Point';

export class Rect {
  _x: number = 0;
  _y: number = 0;
  _width: number = 1;
  _height: number = 1;
  right: number = 1;
  bottom: number = 1;
  centerX: number = 0.5;
  centerY: number = 0.5;

  constructor(x: number = 0, y: number = 0, width: number = 1, height: number = 1) {
    Object.assign(this, { x, y, width, height });
  }

  updateWidth() {
    this.right = this._x + this._width;
    this.centerX = this._width * 0.5;
  }

  updateHeight() {
    this.bottom = this._y + this._height;
    this.centerY = this._height * 0.5;
  }

  set x(val: number) {
    this._x = val;
    this.updateWidth();
  }

  get x() {
    return this._x;
  }

  set y(val: number) {
    this._y = val;
    this.updateHeight();
  }

  get y() {
    return this._y;
  }

  get width() {
    return this._width;
  }

  set width(val: number) {
    this._width = val;
    this.updateWidth();
  }

  get height() {
    return this._height;
  }

  set height(val: number) {
    this._height = val;
    this.updateHeight();
  }

  clone() {
    return new Rect(this.x, this.y, this.height, this.width);
  }

  static add(r1: Rect, r2: Rect) {
    let x = Math.min(r2.x, r1.x);
    let y = Math.min(r2.y, r1.y);
    let width = Math.max(r2.right, r1.right) - x;
    let height = Math.max(r2.bottom, r1.bottom) - y;
    return new Rect(x, y, width, height);
  }

  add(rect: Rect) {
    this.x = Math.min(rect.x, this.x);
    this.y = Math.min(rect.y, this.y);
    this.width = Math.max(rect.right, this.right) - this.x;
    this.height = Math.max(rect.bottom, this.bottom) - this.y;
    return this;
  }

  containsPoint(point: Point) {
    return point.x >= this.x && point.y >= this.y && point.x < this.right && point.y < this.bottom;
  }

  intersectsRect(rect: Rect) {
    return this.x <= rect.right && this.right >= rect.x && this.y <= rect.bottom && this.bottom >= rect.y;
    // return this.containsPoint(new Point(rect.x, rect.y)) && this.containsPoint(new Point(rect.right, rect.bottom));
  }
}
