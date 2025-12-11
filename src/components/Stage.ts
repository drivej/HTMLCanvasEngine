import Camera from './Camera';
import Color from './Color';
import Point from './Point';
import { Sprite } from './Sprite';
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
  cameraPosition = new Point();

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
      onWheel: (e) => this.handleWheel(e),
      onThrow: (e) => this.handleThrow(e),
      onClick: (e) => this.handleClick(e),
      onUp: (e) => this.handleUp(e),
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

  removeChild(child: Sprite) {
    child.__REMOVE = true;
  }

  clear(): Stage {
    const w = this.canvas.width;
    const h = this.canvas.height;
    this.context.globalAlpha = 1;
    this.context.fillStyle = this.color.toRGBA();
    this.context.fillRect(0, 0, w, h);
    return this;
  }

  tick(): Stage {
    this.clear();
    const cvs = this.canvas;
    const ctx = this.context;
    const cam = this.camera;
    const vw = cam.viewport.width;
    const vh = cam.viewport.height;
    let proj;
    cam.tick();

    let child;
    let i = this.children.length;

    while (i--) {
      child = this.children[i];
      if (child.__REMOVE === true) {
        this.children.splice(i, 1);
        continue;
      }

      child.tick();
      child.project(cam);

      if (child.alwaysRender) {
        child.onstage = true;
      } else {
        if (child.onstage === true) {
          proj = child.projection;
          child.onstage = proj.x + proj.width > 0 && proj.x < vw && proj.y + proj.height > 0 && proj.y < vh;
        }
      }

      if (child.onstage) {
        child.render(ctx, cvs, cam);
      }
    }
    return this;
  }

  //
  // User Controls
  //

  getSpriteAt(point: Point): Sprite | null {
    for (const child of this.children) {
      if (child.mouseEnabled === true && child.onstage === true && child.projection.containsPoint(point)) {
        return child;
      }
    }
    return null;
  }

  handleDown(e: UIMouse) {
    this.cameraPosition = this.camera.position.clone();
    this.camera.vector.setLength(0);
    e.currentTarget = this.getSpriteAt(new Point(e.down.position.x, e.down.position.y)) ?? this.camera;
    e?.currentTarget?.onDown?.call(null, e);
  }

  handleDrag(e: UIMouse) {
    if (e.currentTarget === this.camera) {
      this.camera.position.x = this.cameraPosition.x + e.drag.position.x;
      this.camera.position.y = this.cameraPosition.y + e.drag.position.y;
    } else {
      e?.currentTarget?.onDrag?.call(null, e);
    }
  }

  handleClick(e: UIMouse) {
    e?.currentTarget?.onClick?.call(null, e);
  }

  handleUp(e: UIMouse) {
    e.currentTarget = null;
  }

  handleWheel(e: UIMouse) {
    this.camera.position.z += e.deltaY;
  }

  handleThrow(e: UIMouse) {
    if (e.currentTarget === this.camera) {
      this.camera.vector.x = -e.throw.position.x;
      this.camera.vector.y = -e.throw.position.y;
    } else {
      e?.currentTarget?.onThrow?.call(null, e);
    }
  }
}
