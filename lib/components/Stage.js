"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Camera_1 = require("./Camera");
const Color_1 = require("./Color");
const Point_1 = require("./Point");
const UIMouse_1 = require("./UIMouse");
let sortTimeout = setTimeout(() => 1, 1);
class Stage {
    constructor(config) {
        this.children = [];
        this.camera = new Camera_1.default();
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d') || new CanvasRenderingContext2D();
        this.color = Color_1.default.black;
        this.cameraPosition = new Point_1.default();
        Object.assign(this, config);
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.camera.viewport.width = window.innerWidth;
        this.camera.viewport.height = window.innerHeight;
        this.context.imageSmoothingEnabled = true;
        this.mouse = new UIMouse_1.UIMouse(this.canvas, {
            onDown: (e) => this.handleDown(e),
            onDrag: (e) => this.handleDrag(e),
            onWheel: (e) => this.handleWheel(e),
            onThrow: (e) => this.handleThrow(e),
            onClick: (e) => this.handleClick(e),
            onUp: (e) => this.handleUp(e),
        });
    }
    sort(instant) {
        if (instant === false) {
            if (sortTimeout) {
                clearTimeout(sortTimeout);
            }
            sortTimeout = setTimeout(() => this.sort(true), 10);
            return;
        }
        let az;
        let bz;
        this.children.sort((a, b) => {
            az = a.position.z;
            bz = b.position.z;
            return az < bz ? -1 : az > bz ? 1 : 0;
        });
    }
    addChild(sprite) {
        this.children.push(sprite);
        this.sort();
        return sprite;
    }
    removeChild(child) {
        child.__REMOVE = true;
    }
    clear() {
        const w = this.canvas.width;
        const h = this.canvas.height;
        this.context.globalAlpha = 1;
        this.context.fillStyle = this.color.toRGBA();
        this.context.fillRect(0, 0, w, h);
        return this;
    }
    tick() {
        this.clear();
        const cvs = this.canvas;
        const ctx = this.context;
        const cam = this.camera;
        const vw = cam.viewport.width;
        const vh = cam.viewport.height;
        let proj;
        cam.tick();
        let child;
        let i = this.children.length;
        while (i--) {
            child = this.children[i];
            if (child.__REMOVE === true) {
                this.children.splice(i, 1);
                continue;
            }
            child.tick();
            child.project(cam);
            if (child.alwaysRender) {
                child.onstage = true;
            }
            else {
                if (child.onstage === true) {
                    proj = child.projection;
                    child.onstage = proj.x + proj.width > 0 && proj.x < vw && proj.y + proj.height > 0 && proj.y < vh;
                }
            }
            if (child.onstage) {
                child.render(ctx, cvs, cam);
            }
        }
        return this;
    }
    //
    // User Controls
    //
    getSpriteAt(point) {
        for (const child of this.children) {
            if (child.mouseEnabled === true && child.onstage === true && child.projection.containsPoint(point)) {
                return child;
            }
        }
        return null;
    }
    handleDown(e) {
        var _a, _b, _c;
        this.cameraPosition = this.camera.position.clone();
        this.camera.vector.setLength(0);
        e.currentTarget = (_a = this.getSpriteAt(new Point_1.default(e.down.position.x, e.down.position.y))) !== null && _a !== void 0 ? _a : this.camera;
        (_c = (_b = e === null || e === void 0 ? void 0 : e.currentTarget) === null || _b === void 0 ? void 0 : _b.onDown) === null || _c === void 0 ? void 0 : _c.call(null, e);
    }
    handleDrag(e) {
        var _a, _b;
        if (e.currentTarget === this.camera) {
            this.camera.position.x = this.cameraPosition.x + e.drag.position.x;
            this.camera.position.y = this.cameraPosition.y + e.drag.position.y;
        }
        else {
            (_b = (_a = e === null || e === void 0 ? void 0 : e.currentTarget) === null || _a === void 0 ? void 0 : _a.onDrag) === null || _b === void 0 ? void 0 : _b.call(null, e);
        }
    }
    handleClick(e) {
        var _a, _b;
        (_b = (_a = e === null || e === void 0 ? void 0 : e.currentTarget) === null || _a === void 0 ? void 0 : _a.onClick) === null || _b === void 0 ? void 0 : _b.call(null, e);
    }
    handleUp(e) {
        e.currentTarget = null;
    }
    handleWheel(e) {
        this.camera.position.z += e.deltaY;
    }
    handleThrow(e) {
        var _a, _b;
        if (e.currentTarget === this.camera) {
            this.camera.vector.x = -e.throw.position.x;
            this.camera.vector.y = -e.throw.position.y;
        }
        else {
            (_b = (_a = e === null || e === void 0 ? void 0 : e.currentTarget) === null || _a === void 0 ? void 0 : _a.onThrow) === null || _b === void 0 ? void 0 : _b.call(null, e);
        }
    }
}
exports.default = Stage;
