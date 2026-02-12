import Color from './Color';
import { Rect } from './Rect';
interface ProjectionProps {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    rotation?: number;
    alpha?: number;
    color?: Color;
}
export default class Projection extends Rect {
    offsetX: number;
    offsetY: number;
    z: number;
    zFactor: number;
    rotation: number;
    color: Color;
    alpha: number;
    constructor(props?: ProjectionProps);
}
export {};
