"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIMouse = void 0;
const __1 = require("..");
class MouseData {
    constructor() {
        this.position = new __1.Point();
        this.maxX = 0;
        this.maxY = 0;
        this.time = 0;
    }
}
// tslint:disable-next-line: max-classes-per-file
class UIMouse {
    constructor(target, config) {
        this.isDown = false;
        this.isClick = false;
        this.down = new MouseData();
        this.move = new MouseData();
        this.lastMove = new MouseData();
        this.drag = new MouseData();
        this.throw = new MouseData();
        this.up = new MouseData();
        this.deltaY = 0;
        this.deltaX = 0;
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
    normalizeEvent(evt) {
        if (evt.type.indexOf('touch') === 0) {
            return {
                x: evt.changedTouches[0].pageX,
                y: evt.changedTouches[0].pageY,
            };
        }
        else {
            return {
                x: evt.clientX + window.pageXOffset,
                y: evt.clientY + window.pageYOffset,
            };
        }
        return evt;
    }
    handleMouseDown(e) {
        var _a;
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
        (_a = this === null || this === void 0 ? void 0 : this.onDown) === null || _a === void 0 ? void 0 : _a.call(null, this);
    }
    handleMouseMove(e) {
        var _a, _b;
        if (this.isDown) {
            this.drag.position.x = this.down.position.x - e.x;
            this.drag.position.y = this.down.position.y - e.y;
            this.drag.maxX = Math.max(this.drag.maxX, Math.abs(this.drag.position.x));
            this.drag.maxY = Math.max(this.drag.maxY, Math.abs(this.drag.position.y));
            this.drag.time = Date.now() - this.move.time;
            (_a = this === null || this === void 0 ? void 0 : this.onDrag) === null || _a === void 0 ? void 0 : _a.call(null, this);
        }
        this.lastMove.time = this.move.time;
        this.lastMove.position.apply(this.move.position);
        this.move.position.x = e.x;
        this.move.position.y = e.y;
        this.move.time = Date.now();
        (_b = this === null || this === void 0 ? void 0 : this.onMove) === null || _b === void 0 ? void 0 : _b.call(null, this);
    }
    handleMouseUp(e) {
        var _a, _b, _c;
        this.isDown = false;
        this.isClick = this.drag.maxX < 1 && this.drag.maxY < 1;
        this.up.position.x = e.x;
        this.up.position.y = e.y;
        this.up.time = Date.now();
        if (this.isClick) {
            (_a = this === null || this === void 0 ? void 0 : this.onClick) === null || _a === void 0 ? void 0 : _a.call(null, this);
        }
        else {
            this.throw.position.x = e.x - this.lastMove.position.x;
            this.throw.position.y = e.y - this.lastMove.position.y;
            this.throw.time = this.up.time - this.lastMove.time;
            if (this.throw.position.length() > 2) {
                (_b = this === null || this === void 0 ? void 0 : this.onThrow) === null || _b === void 0 ? void 0 : _b.call(null, this);
            }
        }
        (_c = this === null || this === void 0 ? void 0 : this.onUp) === null || _c === void 0 ? void 0 : _c.call(null, this);
    }
    handleMouseLeave(e) {
        var _a;
        (_a = this === null || this === void 0 ? void 0 : this.onLeave) === null || _a === void 0 ? void 0 : _a.call(null, this);
    }
    handleMouseWheel(e) {
        var _a;
        this.deltaX = e.deltaX;
        this.deltaY = e.deltaY;
        (_a = this === null || this === void 0 ? void 0 : this.onWheel) === null || _a === void 0 ? void 0 : _a.call(null, this);
    }
}
exports.UIMouse = UIMouse;
