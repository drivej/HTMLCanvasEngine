"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = require("./Utils");
class Color {
    constructor(r = 0, g = 0, b = 0, a = 1) {
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.a = 1;
        Object.assign(this, {
            r: (0, Utils_1.clamp)(r, 0, 255),
            g: (0, Utils_1.clamp)(g, 0, 255),
            b: (0, Utils_1.clamp)(b, 0, 255),
            a: (0, Utils_1.clamp)(a, 0, 1),
        });
    }
    interpolate(toColor, p) {
        return new Color((0, Utils_1.interpolate)(this.r, toColor.r, p), (0, Utils_1.interpolate)(this.g, toColor.g, p), (0, Utils_1.interpolate)(this.b, toColor.b, p), (0, Utils_1.interpolate)(this.a, toColor.a, p));
    }
    toRGB() {
        // tslint:disable-next-line: no-bitwise
        return `rgb(${(this.r + 0.5) | 0},${(this.g + 0.5) | 0},${(this.b + 0.5) | 0})`;
    }
    toRGBA() {
        // tslint:disable-next-line: no-bitwise
        return `rgba(${(this.r + 0.5) | 0},${(this.g + 0.5) | 0},${(this.b + 0.5) | 0},${this.a.toFixed(2)})`;
    }
    clone() {
        return new Color(this.r, this.g, this.b, this.a);
    }
    copy(color) {
        Object.assign(this, color);
    }
    static random() {
        return new Color((0, Utils_1.rand)(0, 255), (0, Utils_1.rand)(0, 255), (0, Utils_1.rand)(0, 255), (0, Utils_1.rand)(0, 1));
    }
}
Color.green = new Color(0, 255, 0);
Color.red = new Color(255, 0, 0);
Color.black = new Color(0, 0, 0);
Color.transparent = new Color(0, 0, 0, 0);
exports.default = Color;
