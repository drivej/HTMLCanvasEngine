import Camera from './Camera';
import Color from './Color';
import Point from './Point';
import { Sprite } from './Sprite';
import { UIMouse } from './UIMouse';
interface StageConfig {
    color?: Color;
}
export default class Stage {
    children: Sprite[];
    camera: Camera;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    color: Color;
    mouse: UIMouse;
    cameraPosition: Point;
    constructor(config: StageConfig);
    sort(instant?: boolean): void;
    addChild(sprite: Sprite): Sprite;
    removeChild(child: Sprite): void;
    clear(): Stage;
    tick(): Stage;
    getSpriteAt(point: Point): Sprite | null;
    handleDown(e: UIMouse): void;
    handleDrag(e: UIMouse): void;
    handleClick(e: UIMouse): void;
    handleUp(e: UIMouse): void;
    handleWheel(e: UIMouse): void;
    handleThrow(e: UIMouse): void;
}
export {};
