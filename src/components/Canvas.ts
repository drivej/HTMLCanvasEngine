export class Canvas {
  $canvas: HTMLCanvasElement = document.createElement('canvas');
  context: CanvasRenderingContext2D = this.$canvas.getContext('2d')!;

  constructor(width: number, height: number) {
    this.setSize(width, height);
  }

  setSize(width: number, height: number) {
    this.$canvas.width = width;
    this.$canvas.height = height;
  }
}
