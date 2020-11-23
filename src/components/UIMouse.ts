export interface UIMouseConfig {
  onDown?(e: UIMouse): void;
  onMove?(e: UIMouse): void;
  onDrag?(e: UIMouse): void;
  onUp?(e: UIMouse): void;
  onLeave?(e: UIMouse): void;
  onWheel?(e: UIMouse): void;
  onClick?(e: UIMouse): void;
}

class MouseData {
  x: number = 0;
  y: number = 0;
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
  isDown: boolean = false;
  down = new MouseData();
  move = new MouseData();
  drag = new MouseData();
  up = new MouseData();
  deltaY: number = 0;
  deltaX: number = 0;

  constructor(el: HTMLElement, config: UIMouseConfig) {
    this.target = document.body;
    Object.assign(this, config);
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

  normalizeEvent(evt: any) {
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
    this.down.x = e.x;
    this.down.y = e.y;
    this.down.time = Date.now();
    this.move.x = e.x;
    this.move.y = e.y;
    this.move.time = Date.now();
    this?.onDown?.call(null, this);
  }

  handleMouseMove(e: any) {
    if (this.isDown) {
      this.drag.x = this.down.x - e.x;
      this.drag.y = this.down.y - e.y;
      this.drag.time = Date.now() - this.move.time;
      this?.onDrag?.call(null, this);
    }
    this.move.x = e.x;
    this.move.y = e.y;
    this.move.time = Date.now();
    this?.onMove?.call(null, this);
  }

  handleMouseUp(e: any) {
    this.isDown = false;
    this.up.x = e.x;
    this.up.y = e.y;
    this.up.time = Date.now();
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
