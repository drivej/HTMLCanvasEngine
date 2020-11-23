import { interpolate, _rad, rad } from './Utils';

export default class Point {
  x: number = 0;
  y: number = 0;
  z: number = 0;

  constructor(x: number = 0, y: number = 0, z: number = 0) {
    Object.assign(this, { x, y, z });
  }

  length(len?: number): number {
    if (len) {
      return this.normalize().scale(len).length();
    }
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  setLength(len: number) {
    return this.normalize().scale(len);
  }

  interpolate(toPoint: Point, p: number) {
    return new Point(
      interpolate(this.x, toPoint.x, p),
      interpolate(this.y, toPoint.y, p),
      interpolate(this.z, toPoint.z, p),
    );
  }

  normalize(): Point {
    const len = this.length();
    return len === 0 ? this : this.scale(1 / len);
  }

  angle(): number {
    return Math.atan2(this.y, this.x);
  }

  clone(): Point {
    return new Point(this.x, this.y, this.z);
  }

  // set(x: number, y: number, z: number): Point {
  //   this.x = x;
  //   this.y = y;
  //   this.z = z;
  //   return this;
  // }

  // setX(x: number) {
  //   this.x = x;
  //   return this;
  // }

  // setY(y: number) {
  //   this.y = y;
  //   return this;
  // }

  // setZ(z: number) {
  //   this.z = z;
  //   return this;
  // }

  apply(p: { x: number; y: number; z: number }) {
    this.x = p.x;
    this.y = p.y;
    this.z = p.z;
    return this;
  }

  add(p: { x: number; y: number; z: number }) {
    this.x += p.x;
    this.y += p.y;
    this.z += p.z;
    return this;
  }

  subtract(p: { x: number; y: number; z: number }) {
    this.x -= p.x;
    this.y -= p.y;
    this.z -= p.z;
    return this;
  }

  multiply(p: { x: number; y: number; z: number }) {
    this.x *= p.x;
    this.y *= p.y;
    this.z *= p.z;
    return this;
  }

  scale(s: number) {
    this.x *= s;
    this.y *= s;
    this.z *= s;
    return this;
  }

  floor() {
    /* tslint:disable:no-bitwise */
    this.x = this.x | 0;
    this.y = this.y | 0;
    this.z = this.z | 0;
    /* tslint:enable:no-bitwise */
    return this;
  }

  round() {
    /* tslint:disable:no-bitwise */
    this.x = (this.x + 0.5) | 0;
    this.y = (this.y + 0.5) | 0;
    this.z = (this.z + 0.5) | 0;
    /* tslint:enable:no-bitwise */
    return this;
  }

  toString() {
    return (
      'Point(' +
      this.x.toFixed(2) +
      ', ' +
      this.y.toFixed(2) +
      ', ' +
      this.z.toFixed(2) +
      ') ' +
      Math.round(this.angleXY() * _rad)
    );
  }

  rotateXY(delta: number) {
    const len = this.length();
    const angle = this.angle() + delta * rad;
    this.x = Math.cos(angle) * len;
    this.y = Math.sin(angle) * len;
    return this;
  }

  angleXY(a?: number): number {
    if (a) {
      const len = this.length();
      const angle = a * rad;
      this.x = Math.cos(angle) * len;
      this.y = Math.sin(angle) * len;
    }
    return Math.atan2(this.y, this.x);
  }
}
