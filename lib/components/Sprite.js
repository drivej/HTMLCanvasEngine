"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sprite = void 0;
const Canvas_1 = require("./Canvas");
const Color_1 = require("./Color");
const Point_1 = require("./Point");
const Projection_1 = require("./Projection");
const DefaultRenderer_1 = require("./renderers/DefaultRenderer");
const TransformCenter_1 = require("./TransformCenter");
let UID = 0;
class Sprite {
    constructor(config = {}) {
        this.UID = `u${UID++}`;
        this.__REMOVE = false;
        this.id = '';
        this.className = 'Sprite';
        this.onstage = false;
        this.children = [];
        this.position = new Point_1.default(0, 0, 0);
        this.friction = new Point_1.default(0.99, 0.99, 0.99);
        this.rotation = 0;
        this.scale = 1;
        this.alpha = 1;
        this.vector = new Point_1.default(0, 0, 0);
        this.width = 10;
        this.height = 10;
        this.color = new Color_1.default(0, 0, 0, 0);
        this.physics = true;
        this.smoothing = false;
        this.mouseEnabled = false;
        this._canvas = new Canvas_1.Canvas(10, 10);
        this.canvas = this._canvas.$canvas;
        this.context = this._canvas.context;
        this.transformCenter = new TransformCenter_1.TransformCenter(0.5, 0.5);
        this.projection = new Projection_1.default({ color: this.color.clone() });
        this.alwaysRender = false;
        this.renderer = DefaultRenderer_1.DefaultRenderer;
        Object.assign(this, {}, config);
        this.projection.color.copy(this.color);
        this.context.imageSmoothingEnabled = true;
    }
    tick() {
        var _a;
        if (this.physics === true) {
            this.position.add(this.vector);
            this.vector.multiply(this.friction);
        }
        (_a = this === null || this === void 0 ? void 0 : this.onTick) === null || _a === void 0 ? void 0 : _a.call(this, this);
    }
    project(camera) {
        this.onstage = camera.position.z < this.position.z;
        if (this.onstage === true) {
            this.projection.z = this.position.z - camera.position.z;
            const zf = (this.projection.zFactor = camera.zFactor(this.projection.z));
            const p = camera.position.clone().subtract(this.position);
            this.projection.offsetX = camera.viewport.centerX - p.x;
            this.projection.offsetY = camera.viewport.centerY - p.y;
            this.projection.width = this.width * this.scale * zf;
            this.projection.height = this.height * this.scale * zf;
            this.projection.x = camera.viewport.centerX - p.x * zf - this.transformCenter.x * this.projection.width;
            this.projection.y = camera.viewport.centerY - p.y * zf - this.transformCenter.y * this.projection.height;
            this.projection.alpha = this.alpha;
        }
    }
    render(context, canvas, camera) {
        this.renderer(this, context, canvas, camera);
    }
}
exports.Sprite = Sprite;
