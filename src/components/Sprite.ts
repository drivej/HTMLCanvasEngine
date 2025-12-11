import Camera from './Camera';
import { Canvas } from './Canvas';
import Color from './Color';
import Point from './Point';
import Projection from './Projection';
import { DefaultRenderer } from './renderers/DefaultRenderer';
import { TransformCenter } from './TransformCenter';
import { UIMouse, UIMouseConfig } from './UIMouse';

export interface SpriteConfig extends UIMouseConfig {
  id?: string;
  className?: string;
  position?: Point;
  friction?: Point;
  rotation?: number;
  scale?: number;
  alpha?: number;
  vector?: Point;
  canvas?: Canvas;
  transformCenter?: TransformCenter;
  width?: number;
  height?: number;
  color?: Color;
  physics?: boolean;
  smoothing?: boolean;
  mouseEnabled?: boolean;
  alwaysRender?: boolean;
  onTick?(e: Sprite): void;
  renderer?(sprite: Sprite, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, camera?: Camera): void;
}

let UID = 0;

export class Sprite {
  UID = `u${UID++}`;
  __REMOVE = false;
  id = '';
  className = 'Sprite';
  onstage = false;
  children: Sprite[] = [];
  position = new Point(0, 0, 0);
  friction = new Point(0.99, 0.99, 0.99);
  rotation = 0;
  scale = 1;
  alpha = 1;
  vector = new Point(0, 0, 0);
  width = 10;
  height = 10;
  color = new Color(0, 0, 0, 0);
  physics = true;
  smoothing = false;
  mouseEnabled = false;
  _canvas = new Canvas(10, 10);
  canvas = this._canvas.$canvas;
  context = this._canvas.context;
  transformCenter = new TransformCenter(0.5, 0.5);
  projection: Projection = new Projection({ color: this.color.clone() });
  alwaysRender = false;
  data: any;
  renderer = DefaultRenderer;
  onTick?(e: Sprite): void;
  onDown?(e: UIMouse): void;
  onMove?(e: UIMouse): void;
  onDrag?(e: UIMouse): void;
  onUp?(e: UIMouse): void;
  onLeave?(e: UIMouse): void;
  onWheel?(e: UIMouse): void;
  onClick?(e: UIMouse): void;

  constructor(config: SpriteConfig = {}) {
    Object.assign(this, {}, config);
    this.projection.color.copy(this.color);
    this.context.imageSmoothingEnabled = true;
  }

  tick() {
    if (this.physics === true) {
      this.position.add(this.vector);
      this.vector.multiply(this.friction);
    }
    this?.onTick?.call(this, this);
  }

  project(camera: Camera) {
    this.onstage = camera.position.z < this.position.z;
    if (this.onstage === true) {
      this.projection.z = this.position.z - camera.position.z;
      const zf = (this.projection.zFactor = camera.zFactor(this.projection.z));
      const p = camera.position.clone().subtract(this.position);
      this.projection.offsetX = camera.viewport.centerX - p.x;
      this.projection.offsetY = camera.viewport.centerY - p.y;
      this.projection.width = this.width * this.scale * zf;
      this.projection.height = this.height * this.scale * zf;
      this.projection.x = camera.viewport.centerX - p.x * zf - this.transformCenter.x * this.projection.width;
      this.projection.y = camera.viewport.centerY - p.y * zf - this.transformCenter.y * this.projection.height;
      this.projection.alpha = this.alpha;
    }
  }

  render(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, camera: Camera) {
    this.renderer(this, context, canvas, camera);
  }
}
