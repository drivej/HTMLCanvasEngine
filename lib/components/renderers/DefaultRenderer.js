"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultRenderer = DefaultRenderer;
function DefaultRenderer(sprite, context, canvas, camera) {
    context.fillStyle = sprite.projection.color.toRGBA();
    context.fillRect(sprite.projection.x, sprite.projection.y, sprite.projection.width, sprite.projection.height);
}
