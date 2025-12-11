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
  offsetX: number = 0;
  offsetY: number = 0;
  z: number = 0;
  zFactor: number = 1;
  rotation: number = 0;
  color: Color = new Color();
  alpha: number = 1;

  constructor(props: ProjectionProps = {}) {
    super();
    Object.assign(this, props);
  }
}
