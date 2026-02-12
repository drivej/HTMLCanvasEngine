"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformCenter = void 0;
const Utils_1 = require("./Utils");
class TransformCenter {
    constructor(x, y) {
        this._x = 0;
        this._y = 0;
        this.x = x;
        this.y = y;
    }
    get x() {
        return this._x;
    }
    set x(x) {
        this._x = (0, Utils_1.clamp)(x, 0, 1);
    }
    get y() {
        return this._y;
    }
    set y(y) {
        this._y = (0, Utils_1.clamp)(y, 0, 1);
    }
}
exports.TransformCenter = TransformCenter;
