import { Rect } from './Rect';
import { Sprite } from './Sprite';
export default class Camera extends Sprite {
    focalLength: number;
    focalPower: number;
    viewport: Rect;
    tick(): void;
    zFactor(z: number): number;
}
