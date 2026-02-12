"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Canvas = void 0;
class Canvas {
    constructor(width, height) {
        this.$canvas = document.createElement('canvas');
        this.context = this.$canvas.getContext('2d');
        this.setSize(width, height);
    }
    setSize(width, height) {
        this.$canvas.width = width;
        this.$canvas.height = height;
    }
}
exports.Canvas = Canvas;
