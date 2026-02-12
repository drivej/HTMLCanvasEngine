"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TileXRenderer = TileXRenderer;
function TileXRenderer(sprite, context, canvas, camera) {
    if (sprite.projection.bottom > 0 && sprite.projection.y < canvas.height) {
        const w = sprite.projection.width;
        const h = sprite.projection.height;
        let startX = sprite.projection.x % w;
        if (startX > 0)
            startX -= w;
        const startY = sprite.projection.y;
        const cols = Math.ceil((canvas.width - startX) / w);
        for (let col = 0; col < cols; col++) {
            context.drawImage(sprite.canvas, startX + col * w, startY, w, h);
        }
    }
}
