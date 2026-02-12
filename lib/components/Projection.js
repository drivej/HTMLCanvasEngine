"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = require("./Color");
const Rect_1 = require("./Rect");
class Projection extends Rect_1.Rect {
    constructor(props = {}) {
        super();
        this.offsetX = 0;
        this.offsetY = 0;
        this.z = 0;
        this.zFactor = 1;
        this.rotation = 0;
        this.color = new Color_1.default();
        this.alpha = 1;
        Object.assign(this, props);
    }
}
exports.default = Projection;
