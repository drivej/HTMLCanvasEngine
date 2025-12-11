import Camera from '../Camera';
import { Sprite } from '../Sprite';

export function BitmapRenderer(
  sprite: Sprite,
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  camera: Camera,
): void {
  // sprite.projection.color = new Color(100, 0, 200, 0.5);
  // DefaultRenderer(sprite, context, canvas);

  /*
  // method 1
  context.save();
  context.scale(sprite.projection.zFactor, sprite.projection.zFactor);
  context.translate(
    sprite.projection.offsetX - sprite.width * sprite.transformCenter.x,
    sprite.projection.offsetY - sprite.height * sprite.transformCenter.y,
  );
  context.rotate(sprite.rotation * rad);
  context.drawImage(
    sprite.canvas,
    0, // -sprite.width * sprite.transformCenter.x,
    0, // -sprite.height * sprite.transformCenter.y,
    // sprite.width,
    // sprite.height,
  );
  context.restore();
  */

  // method 2
  // context.save();
  // context.globalAlpha = sprite.projection.alpha;
  // const zf = sprite.projection.zFactor;
  // let cosR = zf;
  // let sinR = 0;

  // if (sprite.rotation !== 0) {
  //   cosR = Math.cos(rad * sprite.rotation) * zf;
  //   sinR = Math.sin(rad * sprite.rotation) * zf;
  // }
  // const tx = sprite.projection.x - sprite.projection.width; // * sprite.transformCenter.x;
  // const ty = sprite.projection.y - sprite.projection.height; // * sprite.transformCenter.y;

  // context.setTransform(cosR, sinR, -sinR, cosR, tx, ty);
  // context.drawImage(sprite.canvas, 0, 0, sprite.width, sprite.height);
  // context.restore();

  // method 3
  context.save();
  context.globalAlpha = sprite.projection.alpha;
  context.drawImage(
    sprite.canvas,
    sprite.projection.x,
    sprite.projection.y,
    sprite.projection.width,
    sprite.projection.height,
  );
  context.restore();
}
