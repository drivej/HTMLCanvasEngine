export default class Point {
    x: number;
    y: number;
    z: number;
    constructor(x?: number, y?: number, z?: number);
    length(): number;
    setLength(len: number): Point;
    interpolate(toPoint: Point, p: number): Point;
    normalize(): Point;
    angle(): number;
    clone(): Point;
    apply(p: {
        x: number;
        y: number;
        z: number;
    }): this;
    add(p: {
        x: number;
        y: number;
        z: number;
    }): this;
    subtract(p: {
        x: number;
        y: number;
        z: number;
    }): this;
    multiply(p: {
        x: number;
        y: number;
        z: number;
    }): this;
    scale(s: number): this;
    floor(): this;
    round(): this;
    toString(): string;
    rotateXY(delta: number): this;
    angleXY(a?: number): number;
}
