import Camera from '../Camera';
import { Sprite } from '../Sprite';

export function TileRenderer(
  sprite: Sprite,
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  camera: Camera,
): void {
  const w = sprite.projection.width;
  const h = sprite.projection.height;
  let startX = sprite.projection.x % w;
  if (startX > 0) startX -= w;
  let startY = sprite.projection.y % h;
  if (startY > 0) startY -= h;
  const cols = Math.ceil((canvas.width - startX) / w);
  const rows = Math.ceil((canvas.height - startY) / h);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      context.drawImage(sprite.canvas, startX + col * w, startY + row * h, w, h);
    }
  }
}
