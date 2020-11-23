import Camera from './Camera';
import Color from './Color';
import Point from './Point';
import Sprite from './Sprite';
import { UIMouse } from './UIMouse';

interface StageConfig {
  color?: Color;
}

let sortTimeout: NodeJS.Timeout = setTimeout(() => 1, 1);

export default class Stage {
  children: Sprite[] = [];
  camera: Camera = new Camera();
  canvas = document.createElement('canvas');
  context: CanvasRenderingContext2D = this.canvas.getContext('2d') || new CanvasRenderingContext2D();
  color: Color = Color.black;
  mouse: UIMouse;

  constructor(config: StageConfig) {
    Object.assign(this, config);
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.camera.viewport.width = window.innerWidth;
    this.camera.viewport.height = window.innerHeight;
    this.context.imageSmoothingEnabled = true;

    this.mouse = new UIMouse(this.canvas, {
      onDown: (e) => this.handleDown(e),
      onDrag: (e) => this.handleDrag(e),
      onUp: (e) => this.handleUp(e),
      onWheel: (e) => this.handleWheel(e),
    });
  }

  sort(instant?: boolean) {
    if (instant === false) {
      if (sortTimeout) {
        clearTimeout(sortTimeout);
      }
      sortTimeout = setTimeout(() => this.sort(true), 10);
      return;
    }
    let az;
    let bz;
    this.children.sort((a, b) => {
      az = a.position.z;
      bz = b.position.z;
      return az < bz ? -1 : az > bz ? 1 : 0;
    });
  }

  addChild(sprite: Sprite): Sprite {
    this.children.push(sprite);
    this.sort();
    return sprite;
  }

  clear(): Stage {
    const w = this.canvas.width;
    const h = this.canvas.height;
    this.context.clearRect(0, 0, w, h);
    this.context.fillStyle = this.color.toRGB();
    this.context.fillRect(0, 0, w, h);
    return this;
  }

  tick(): Stage {
    this.clear();
    const cvs = this.canvas;
    const ctx = this.context;
    const cam = this.camera;
    const camZ = cam.position.z;
    const vw = cam.viewport.width;
    const vh = cam.viewport.height;
    let i = this.children.length;
    let child;
    let proj;

    while (i--) {
      child = this.children[i];
      child.tick();
      if (child.position.z > camZ) {
        child.project(cam);
        if (child.onstage === true) {
          proj = child.projection;
          if (proj.x + proj.width > 0 && proj.x < vw && proj.y + proj.height > 0 && proj.y < vh) {
            child.render(ctx, cvs);
          }
        }
      }
    }
    return this;
  }

  //
  // User Controls
  //

  getSpriteAt(point: Point): Sprite | null {
    let child;
    let i = this.children.length;
    while (i--) {
      child = this.children[i];
      if (child.mouseEnabled === true && child.onstage === true && child.projection.containsPoint(point)) {
        return child;
      }
    }
    return null;
  }

  cameraPosition = new Point();
  mouseTarget: Sprite | null = null;

  handleDown(e: UIMouse) {
    this.cameraPosition = this.camera.position.clone();
    this.mouseTarget = this.getSpriteAt(new Point(e.down.x, e.down.y));
    if (this.mouseTarget) {
      e.currentTarget = this.mouseTarget;
      this.mouseTarget?.onDown?.call(null, e);
    }
  }

  handleDrag(e: UIMouse) {
    this.camera.position = this.cameraPosition.clone().subtract(new Point(e.drag.x, e.drag.y));
    this.tick();
  }

  handleUp(e: UIMouse) {
    const upTarget = this.getSpriteAt(new Point(e.up.x, e.up.y));
    if (upTarget === this.mouseTarget && this.mouseTarget) {
      e.currentTarget = upTarget;
      upTarget?.onClick?.call(null, e);
    }
  }

  handleWheel(e: UIMouse) {
    this.camera.position.z += e.deltaY;
    this.tick();
  }
}
