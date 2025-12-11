import { Point } from '..';

export interface UIMouseConfig {
  onDown?(e: UIMouse): void;
  onMove?(e: UIMouse): void;
  onDrag?(e: UIMouse): void;
  onThrow?(e: UIMouse): void;
  onUp?(e: UIMouse): void;
  onLeave?(e: UIMouse): void;
  onWheel?(e: UIMouse): void;
  onClick?(e: UIMouse): void;
  initEvents?(): void;
  normalizeEvent?(evt: any): NormalizedEvent;
}

export interface NormalizedEvent {
  x: number;
  y: number;
}

class MouseData {
  position: Point = new Point();
  maxX: number = 0;
  maxY: number = 0;
  time: number = 0;
}

// tslint:disable-next-line: max-classes-per-file
export class UIMouse {
  target: HTMLElement;
  currentTarget: any;
  onDown?(e: UIMouse): void;
  onMove?(e: UIMouse): void;
  onDrag?(e: UIMouse): void;
  onThrow?(e: UIMouse): void;
  onUp?(e: UIMouse): void;
  onLeave?(e: UIMouse): void;
  onWheel?(e: UIMouse): void;
  onClick?(e: UIMouse): void;
  isDown: boolean = false;
  isClick: boolean = false;
  down = new MouseData();
  move = new MouseData();
  lastMove = new MouseData();
  drag = new MouseData();
  throw = new MouseData();
  up = new MouseData();
  deltaY: number = 0;
  deltaX: number = 0;

  constructor(target: any, config: UIMouseConfig) {
    console.log('const target', target);
    this.target = target;
    Object.assign(this, config);
    this.initEvents = this.initEvents.bind(this);
    this.initEvents();
  }

  initEvents() {
    if ('addEventListener' in this.target) {
      this.target.addEventListener('mousedown', (e) => this.handleMouseDown(this.normalizeEvent(e)));
      this.target.addEventListener('mousemove', (e) => this.handleMouseMove(this.normalizeEvent(e)));
      this.target.addEventListener('mouseup', (e) => this.handleMouseUp(this.normalizeEvent(e)));
      this.target.addEventListener('mouseleave', (e) => this.handleMouseLeave(this.normalizeEvent(e)));
      this.target.addEventListener('wheel', (e) => this.handleMouseWheel(e), { passive: true });
      this.target.addEventListener('touchstart', (e) => this.handleMouseDown(this.normalizeEvent(e)));
      this.target.addEventListener('touchmove', (e) => this.handleMouseMove(this.normalizeEvent(e)));
      this.target.addEventListener('touchend', (e) => this.handleMouseUp(this.normalizeEvent(e)));
      this.target.addEventListener('touchcancel', (e) => this.handleMouseLeave(this.normalizeEvent(e)));
    }
  }

  normalizeEvent(evt: any): NormalizedEvent {
    if (evt.type.indexOf('touch') === 0) {
      return {
        x: evt.changedTouches[0].pageX,
        y: evt.changedTouches[0].pageY,
      };
    } else {
      return {
        x: evt.clientX + window.pageXOffset,
        y: evt.clientY + window.pageYOffset,
      };
    }
    return evt;
  }

  handleMouseDown(e: any) {
    this.isDown = true;
    this.isClick = false;
    this.down.position.x = e.x;
    this.down.position.y = e.y;
    this.down.time = Date.now();
    this.move.position.x = e.x;
    this.move.position.y = e.y;
    this.move.time = Date.now();
    this.drag.maxX = 0;
    this.drag.maxY = 0;
    this?.onDown?.call(null, this);
  }

  handleMouseMove(e: any) {
    if (this.isDown) {
      this.drag.position.x = this.down.position.x - e.x;
      this.drag.position.y = this.down.position.y - e.y;
      this.drag.maxX = Math.max(this.drag.maxX, Math.abs(this.drag.position.x));
      this.drag.maxY = Math.max(this.drag.maxY, Math.abs(this.drag.position.y));
      this.drag.time = Date.now() - this.move.time;
      this?.onDrag?.call(null, this);
    }
    this.lastMove.time = this.move.time;
    this.lastMove.position.apply(this.move.position);
    this.move.position.x = e.x;
    this.move.position.y = e.y;
    this.move.time = Date.now();
    this?.onMove?.call(null, this);
  }

  handleMouseUp(e: any) {
    this.isDown = false;
    this.isClick = this.drag.maxX < 1 && this.drag.maxY < 1;
    this.up.position.x = e.x;
    this.up.position.y = e.y;
    this.up.time = Date.now();

    if (this.isClick) {
      this?.onClick?.call(null, this);
    } else {
      this.throw.position.x = e.x - this.lastMove.position.x;
      this.throw.position.y = e.y - this.lastMove.position.y;
      this.throw.time = this.up.time - this.lastMove.time;
      if (this.throw.position.length() > 2) {
        this?.onThrow?.call(null, this);
      }
    }
    this?.onUp?.call(null, this);
  }

  handleMouseLeave(e: any) {
    this?.onLeave?.call(null, this);
  }

  handleMouseWheel(e: any) {
    this.deltaX = e.deltaX;
    this.deltaY = e.deltaY;
    this?.onWheel?.call(null, this);
  }
}
