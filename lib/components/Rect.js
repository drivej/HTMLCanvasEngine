"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rect = void 0;
class Rect {
    constructor(x = 0, y = 0, width = 1, height = 1) {
        this._x = 0;
        this._y = 0;
        this._width = 1;
        this._height = 1;
        this.right = 1;
        this.bottom = 1;
        this.centerX = 0.5;
        this.centerY = 0.5;
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
    set x(val) {
        this._x = val;
        this.updateWidth();
    }
    get x() {
        return this._x;
    }
    set y(val) {
        this._y = val;
        this.updateHeight();
    }
    get y() {
        return this._y;
    }
    get width() {
        return this._width;
    }
    set width(val) {
        this._width = val;
        this.updateWidth();
    }
    get height() {
        return this._height;
    }
    set height(val) {
        this._height = val;
        this.updateHeight();
    }
    clone() {
        return new Rect(this.x, this.y, this.height, this.width);
    }
    static add(r1, r2) {
        let x = Math.min(r2.x, r1.x);
        let y = Math.min(r2.y, r1.y);
        let width = Math.max(r2.right, r1.right) - x;
        let height = Math.max(r2.bottom, r1.bottom) - y;
        return new Rect(x, y, width, height);
    }
    add(rect) {
        this.x = Math.min(rect.x, this.x);
        this.y = Math.min(rect.y, this.y);
        this.width = Math.max(rect.right, this.right) - this.x;
        this.height = Math.max(rect.bottom, this.bottom) - this.y;
        return this;
    }
    containsPoint(point) {
        return point.x >= this.x && point.y >= this.y && point.x < this.right && point.y < this.bottom;
    }
    intersectsRect(rect) {
        return this.x <= rect.right && this.right >= rect.x && this.y <= rect.bottom && this.bottom >= rect.y;
        // return this.containsPoint(new Point(rect.x, rect.y)) && this.containsPoint(new Point(rect.right, rect.bottom));
    }
}
exports.Rect = Rect;
