"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = require("./Utils");
class Point {
    constructor(x = 0, y = 0, z = 0) {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        Object.assign(this, { x, y, z });
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    setLength(len) {
        return this.normalize().scale(len);
    }
    interpolate(toPoint, p) {
        return new Point((0, Utils_1.interpolate)(this.x, toPoint.x, p), (0, Utils_1.interpolate)(this.y, toPoint.y, p), (0, Utils_1.interpolate)(this.z, toPoint.z, p));
    }
    normalize() {
        const len = this.length();
        return len === 0 ? this : this.scale(1 / len);
    }
    angle() {
        return Math.atan2(this.y, this.x);
    }
    clone() {
        return new Point(this.x, this.y, this.z);
    }
    apply(p) {
        this.x = p.x;
        this.y = p.y;
        this.z = p.z;
        return this;
    }
    add(p) {
        this.x += p.x;
        this.y += p.y;
        this.z += p.z;
        return this;
    }
    subtract(p) {
        this.x -= p.x;
        this.y -= p.y;
        this.z -= p.z;
        return this;
    }
    multiply(p) {
        this.x *= p.x;
        this.y *= p.y;
        this.z *= p.z;
        return this;
    }
    scale(s) {
        this.x *= s;
        this.y *= s;
        this.z *= s;
        return this;
    }
    floor() {
        this.x = this.x | 0;
        this.y = this.y | 0;
        this.z = this.z | 0;
        return this;
    }
    round() {
        this.x = (this.x + 0.5) | 0;
        this.y = (this.y + 0.5) | 0;
        this.z = (this.z + 0.5) | 0;
        return this;
    }
    toString() {
        return ('Point(' +
            this.x.toFixed(2) +
            ', ' +
            this.y.toFixed(2) +
            ', ' +
            this.z.toFixed(2) +
            ') ' +
            Math.round(this.angleXY() * Utils_1._rad));
    }
    rotateXY(delta) {
        const len = this.length();
        const angle = this.angle() + delta * Utils_1.rad;
        this.x = Math.cos(angle) * len;
        this.y = Math.sin(angle) * len;
        return this;
    }
    angleXY(a) {
        if (a) {
            const len = this.length();
            const angle = a * Utils_1.rad;
            this.x = Math.cos(angle) * len;
            this.y = Math.sin(angle) * len;
        }
        return Math.atan2(this.y, this.x);
    }
}
exports.default = Point;
