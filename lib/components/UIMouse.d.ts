import { Point } from '..';
export interface UIMouseConfig {
    onDown?(e: UIMouse): void;
    onMove?(e: UIMouse): void;
    onDrag?(e: UIMouse): void;
    onThrow?(e: UIMouse): void;
    onUp?(e: UIMouse): void;
    onLeave?(e: UIMouse): void;
    onWheel?(e: UIMouse): void;
    onClick?(e: UIMouse): void;
    initEvents?(): void;
    normalizeEvent?(evt: any): NormalizedEvent;
}
export interface NormalizedEvent {
    x: number;
    y: number;
}
declare class MouseData {
    position: Point;
    maxX: number;
    maxY: number;
    time: number;
}
export declare class UIMouse {
    target: HTMLElement;
    currentTarget: any;
    onDown?(e: UIMouse): void;
    onMove?(e: UIMouse): void;
    onDrag?(e: UIMouse): void;
    onThrow?(e: UIMouse): void;
    onUp?(e: UIMouse): void;
    onLeave?(e: UIMouse): void;
    onWheel?(e: UIMouse): void;
    onClick?(e: UIMouse): void;
    isDown: boolean;
    isClick: boolean;
    down: MouseData;
    move: MouseData;
    lastMove: MouseData;
    drag: MouseData;
    throw: MouseData;
    up: MouseData;
    deltaY: number;
    deltaX: number;
    constructor(target: any, config: UIMouseConfig);
    initEvents(): void;
    normalizeEvent(evt: any): NormalizedEvent;
    handleMouseDown(e: any): void;
    handleMouseMove(e: any): void;
    handleMouseUp(e: any): void;
    handleMouseLeave(e: any): void;
    handleMouseWheel(e: any): void;
}
export {};
