import Point from './Point';
export declare class Rect {
    _x: number;
    _y: number;
    _width: number;
    _height: number;
    right: number;
    bottom: number;
    centerX: number;
    centerY: number;
    constructor(x?: number, y?: number, width?: number, height?: number);
    updateWidth(): void;
    updateHeight(): void;
    set x(val: number);
    get x(): number;
    set y(val: number);
    get y(): number;
    get width(): number;
    set width(val: number);
    get height(): number;
    set height(val: number);
    clone(): Rect;
    static add(r1: Rect, r2: Rect): Rect;
    add(rect: Rect): this;
    containsPoint(point: Point): boolean;
    intersectsRect(rect: Rect): boolean;
}
