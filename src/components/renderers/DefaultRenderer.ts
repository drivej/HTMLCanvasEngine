import Sprite from '../Sprite';

export function DefaultRenderer(sprite: Sprite, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
  context.drawImage(
    sprite.canvas,
    sprite.projection.x,
    sprite.projection.y,
    sprite.projection.width,
    sprite.projection.height,
  );
}
