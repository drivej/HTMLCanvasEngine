import { BitmapRenderer } from './renderers/BitmapRenderer';
import Sprite, { SpriteConfig } from './Sprite';

interface BitmapSpriteConfig extends SpriteConfig {
  src?: string;
}

export default class BitmapSprite extends Sprite {
  image: HTMLImageElement = new Image();

  constructor(config: BitmapSpriteConfig) {
    super(config);
    // Object.assign(this, { className: 'BitmapSprite' }, config);
    this.image.onload = () => this.redraw();
    console.log('src', config?.src ?? '');
    this.image.src = config?.src ?? '';
    this.renderer = BitmapRenderer;
  }

  redraw() {
    super.redraw();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage(this.image, 0, 0, this.width, this.height);
  }

  render(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.renderer(this as Sprite, context, canvas);
  }
}
