"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Rect_1 = require("./Rect");
const Sprite_1 = require("./Sprite");
class Camera extends Sprite_1.Sprite {
    constructor() {
        super(...arguments);
        this.focalLength = 100;
        this.focalPower = 0.25;
        this.viewport = new Rect_1.Rect();
    }
    tick() {
        super.tick();
    }
    zFactor(z) {
        if (z === 0) {
            return 1;
        }
        return Math.pow(this.focalLength / z, this.focalPower);
    }
}
exports.default = Camera;
