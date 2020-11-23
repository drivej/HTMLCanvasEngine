import { clamp, interpolate, rand } from './Utils';

export default class Color {
  r = 0;
  g = 0;
  b = 0;
  a = 0;
  static green: Color = new Color(0, 255, 0);
  static red: Color = new Color(255, 0, 0);
  static black: Color = new Color(0, 0, 0);
  static transparent: Color = new Color(0, 0, 0, 0);

  constructor(r: number = 0, g: number = 0, b: number = 0, a: number = 1) {
    Object.assign(this, {
      r: clamp(r, 0, 255),
      g: clamp(g, 0, 255),
      b: clamp(b, 0, 255),
      a: clamp(r, 0, 1),
    });
  }

  interpolate(toColor: { r: number; g: number; b: number }, p: number) {
    return new Color(
      interpolate(this.r, toColor.r, p),
      interpolate(this.g, toColor.g, p),
      interpolate(this.b, toColor.b, p),
    );
  }

  toRGB() {
    // tslint:disable-next-line: no-bitwise
    return `rgb(${(this.r + 0.5) | 0},${(this.g + 0.5) | 0},${(this.b + 0.5) | 0})`;
  }

  toRGBA() {
    // tslint:disable-next-line: no-bitwise
    return `rgba(${(this.r + 0.5) | 0},${(this.g + 0.5) | 0},${(this.b + 0.5) | 0},${this.a.toFixed(2)})`;
  }

  clone() {
    return new Color(this.r, this.g, this.b);
  }

  copy(color: Color) {
    Object.assign(this, color);
  }

  static random() {
    return new Color(rand(0, 255), rand(0, 255), rand(0, 255));
  }
}
