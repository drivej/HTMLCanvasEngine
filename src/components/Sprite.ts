import Camera from './Camera';
import Color from './Color';
import Projection from './Projection';
import Point from './Point';
import { DefaultRenderer } from './renderers/DefaultRenderer';
import { UIMouse, UIMouseConfig } from './UIMouse';

export interface SpriteConfig extends UIMouseConfig {
  id?: string;
  className?: string;
  position?: Point;
  friction?: Point;
  vector?: Point;
  canvas?: OffscreenCanvas;
  width?: number;
  height?: number;
  color?: Color;
  physics?: boolean;
  smoothing?: boolean;
  mouseEnabled?: boolean;
  // bitmapData?: CanvasImageSource;
}

export default class Sprite {
  id = '';
  className = 'Sprite';
  onstage = false;
  children: Sprite[] = [];
  position = new Point(0, 0, 0);
  friction = new Point(0.99, 0.99, 0.99);
  vector = new Point(0, 0, 0);
  width = 10;
  height = 10;
  color = new Color(0, 0, 0, 0);
  physics = true;
  smoothing = false;
  mouseEnabled = false;
  canvas = new OffscreenCanvas(10, 10);
  // context: OffscreenCanvasRenderingContext2D = this.canvas.getContext('2d') || new OffscreenCanvasRenderingContext2D();
  context: OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D; // = this.canvas.getContext('2d') || new OffscreenCanvasRenderingContext2D();
  transformCenter = new Point();
  projection: Projection = new Projection({ color: this.color.clone() });
  // _bitmapData: CanvasImageSource | null = null;
  renderer = DefaultRenderer;
  // onClick?(sprite: Sprite): void;
  // onDown?(sprite: Sprite): void;

  onDown?(e: UIMouse): void;
  onMove?(e: UIMouse): void;
  onDrag?(e: UIMouse): void;
  onUp?(e: UIMouse): void;
  onLeave?(e: UIMouse): void;
  onWheel?(e: UIMouse): void;
  onClick?(e: UIMouse): void;

  constructor(config: SpriteConfig = {}) {
    Object.assign(this, config);
    this.transformCenter.x = this.width * 0.5;
    this.transformCenter.y = this.height * 0.5;
    this.projection.color.copy(this.color);
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext('2d') || new OffscreenCanvasRenderingContext2D();
    // any effect?
    this.context.imageSmoothingEnabled = true;
    this.redraw();
  }

  // set bitmapData(val: CanvasImageSource) {
  //   this._bitmapData = val;
  //   // this.canvas.width = val.width as number;
  //   // this.canvas.height = val.height as number;
  //   this.context.clearRect(0, 0, this.width, this.height);
  //   this.context.drawImage(val, 0, 0, this.width, this.height);
  // }

  redraw() {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.fillStyle = this.color.toRGBA();
    this.context.fillRect(0, 0, this.width, this.height);
  }

  tick() {
    this.position.add(this.vector);
    if (this.physics === true) {
      this.vector.multiply(this.friction);
    }
  }

  project(camera: Camera) {
    this.onstage = camera.position.z < this.position.z;
    if (this.onstage === true) {
      this.projection.z = this.position.z - camera.position.z;
      const zf = camera.zFactor(this.projection.z);
      const p = camera.position.clone().subtract(this.position).subtract(this.transformCenter);
      this.projection.x = camera.viewport.centerX + p.x * zf;
      this.projection.y = camera.viewport.centerY + p.y * zf;
      this.projection.width = this.width * zf;
      this.projection.height = this.height * zf;
    }
  }

  render(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.renderer(this, context, canvas);
  }
}
