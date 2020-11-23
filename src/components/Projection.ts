import Color from './Color';
import { Rect } from './Rect';

interface ProjectionProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  rotation?: number;
  color?: Color;
}

export default class Projection extends Rect {
  // x: number = 0;
  // y: number = 0;
  z: number = 0;
  // width: number = 1;
  // height: number = 1;
  rotation: number = 0;
  color: Color = new Color();

  constructor(props: ProjectionProps = {}) {
    super();
    Object.assign(this, props);
  }
}
