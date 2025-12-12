# HTMLCanvasEngine

A lightweight, TypeScript-based 2D canvas rendering engine with 3D-like projection capabilities for creating interactive web graphics, games, and visualizations.

## Features

### 🎨 Core Rendering
- **Stage Management** - Main render loop with automatic sprite sorting by z-depth
- **Sprite System** - Flexible sprite objects with position, rotation, scale, and alpha
- **Multiple Renderers** - Built-in renderers for different drawing techniques:
  - `DefaultRenderer` - Simple colored rectangles
  - `BitmapRenderer` - Image/canvas rendering with transforms
  - `TileRenderer` - Seamless tiling patterns
  - `TileXRenderer` - Horizontal tiling

### 🎥 3D-like Projection
- **Camera System** - Perspective projection with configurable focal length
- **Z-depth Sorting** - Automatic sprite layering based on z-position
- **Viewport Management** - Responsive canvas sizing and camera controls

### 🖱️ Interactive Controls
- **Mouse/Touch Support** - Built-in mouse and touch event handling
- **Camera Controls** - Pan, zoom, and throw gestures
- **Sprite Interaction** - Click, drag, and hover events on individual sprites
- **Physics System** - Optional velocity and friction for smooth motion

### 🎯 Utilities
- **Point** - 3D vector math with interpolation, rotation, and normalization
- **Color** - RGBA color management with interpolation and presets
- **Rect** - Rectangle utilities for bounds and collision detection
- **Utils** - Helper functions for interpolation, clamping, and random values

## Installation

```bash
npm install htmlcanvasengine
```

## Quick Start

### Basic Setup

```typescript
import { Stage, Sprite, Color, Point } from 'htmlcanvasengine';

// Create a stage
const stage = new Stage({
  color: Color.black // Background color
});

// Add canvas to DOM
document.body.appendChild(stage.canvas);

// Start render loop
function animate() {
  stage.tick();
  requestAnimationFrame(animate);
}
animate();
```

### Creating Sprites

```typescript
import { Sprite, Color, Point } from 'htmlcanvasengine';

// Create a simple colored sprite
const sprite = new Sprite({
  position: new Point(0, 0, 100), // x, y, z
  width: 50,
  height: 50,
  color: new Color(255, 100, 50), // RGB
  scale: 1,
  alpha: 1,
  physics: true // Enable velocity/friction
});

// Add to stage
stage.addChild(sprite);
```

### Custom Rendering

```typescript
import { Sprite, BitmapRenderer } from 'htmlcanvasengine';

// Create a sprite with custom canvas content
const sprite = new Sprite({
  position: new Point(100, 100, 200),
  width: 100,
  height: 100,
  renderer: BitmapRenderer
});

// Draw on sprite's canvas
sprite.context.fillStyle = 'red';
sprite.context.fillRect(0, 0, 100, 100);
sprite.context.fillStyle = 'white';
sprite.context.fillText('Hello!', 10, 50);

stage.addChild(sprite);
```

### Physics and Animation

```typescript
const sprite = new Sprite({
  position: new Point(0, 0, 100),
  vector: new Point(2, 1, 0), // Velocity
  friction: new Point(0.99, 0.99, 0.99), // Friction per axis
  physics: true,
  onTick: (sprite) => {
    // Custom animation logic
    sprite.rotation += 0.01;
  }
});

stage.addChild(sprite);
```

### Interactive Sprites

```typescript
const button = new Sprite({
  position: new Point(0, 0, 100),
  width: 100,
  height: 50,
  color: new Color(100, 150, 255),
  mouseEnabled: true,
  onClick: (e) => {
    console.log('Sprite clicked!');
  },
  onDrag: (e) => {
    // Drag the sprite
    button.position.x += e.drag.delta.x;
    button.position.y += e.drag.delta.y;
  }
});

stage.addChild(button);
```

### Camera Controls

```typescript
// Camera is automatically created with the stage
const camera = stage.camera;

// Position camera
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 0; // Distance from sprites

// Adjust perspective
camera.focalLength = 100;
camera.focalPower = 0.25;

// Camera has built-in pan/zoom via mouse:
// - Drag to pan
// - Mouse wheel to zoom
// - Throw gesture for momentum
```

### Tiling Backgrounds

```typescript
import { Sprite, TileRenderer } from 'htmlcanvasengine';

const background = new Sprite({
  position: new Point(0, 0, 0),
  width: 256,
  height: 256,
  renderer: TileRenderer,
  alwaysRender: true // Don't cull when off-screen
});

// Draw pattern on sprite canvas
background.context.fillStyle = '#333';
background.context.fillRect(0, 0, 256, 256);
background.context.strokeStyle = '#555';
background.context.strokeRect(0, 0, 256, 256);

stage.addChild(background);
```

### Working with Colors

```typescript
import { Color } from 'htmlcanvasengine';

// Create colors
const red = new Color(255, 0, 0);
const blue = new Color(0, 0, 255, 0.5); // With alpha

// Use presets
const black = Color.black;
const green = Color.green;

// Interpolate between colors
const purple = red.interpolate(blue, 0.5);

// Random colors
const random = Color.random();

// Convert to CSS
console.log(red.toRGBA()); // "rgba(255,0,0,1.00)"
```

### Working with Points

```typescript
import { Point } from 'htmlcanvasengine';

const p1 = new Point(10, 20, 30);
const p2 = new Point(5, 5, 5);

// Vector operations
p1.add(p2);        // Add
p1.subtract(p2);   // Subtract
p1.scale(2);       // Scale by scalar
p1.multiply(p2);   // Component-wise multiply

// Vector math
const length = p1.length();
p1.normalize();    // Unit vector
p1.setLength(100); // Set specific length

// Interpolation
const midpoint = p1.interpolate(p2, 0.5);

// 2D rotation
p1.rotateXY(45);   // Rotate 45 degrees
const angle = p1.angleXY(); // Get angle in radians
```

## Advanced Examples

### Custom Renderer

```typescript
function MyCustomRenderer(sprite, context, canvas, camera) {
  const proj = sprite.projection;

  context.save();
  context.globalAlpha = proj.alpha;
  context.translate(proj.x + proj.width / 2, proj.y + proj.height / 2);
  context.rotate(sprite.rotation);
  context.scale(proj.zFactor, proj.zFactor);

  // Your custom drawing code
  context.fillStyle = sprite.color.toRGBA();
  context.fillRect(-sprite.width / 2, -sprite.height / 2, sprite.width, sprite.height);

  context.restore();
}

const sprite = new Sprite({
  renderer: MyCustomRenderer
});
```

### Particle System

```typescript
import { Sprite, Color, Point, Utils } from 'htmlcanvasengine';

for (let i = 0; i < 100; i++) {
  const particle = new Sprite({
    position: new Point(
      Utils.rand(-200, 200),
      Utils.rand(-200, 200),
      Utils.rand(100, 500)
    ),
    vector: new Point(
      Utils.rand(-2, 2),
      Utils.rand(-2, 2),
      Utils.rand(-1, 1)
    ),
    width: Utils.rand(2, 10),
    height: Utils.rand(2, 10),
    color: Color.random(),
    friction: new Point(0.99, 0.99, 0.99),
    physics: true
  });

  stage.addChild(particle);
}
```

## API Reference

### Stage
- `addChild(sprite)` - Add sprite to stage
- `removeChild(sprite)` - Remove sprite from stage
- `tick()` - Update and render all sprites
- `clear()` - Clear canvas
- `sort()` - Sort sprites by z-depth

### Sprite
- `position: Point` - 3D position
- `vector: Point` - Velocity (when physics enabled)
- `friction: Point` - Friction per axis
- `rotation: number` - Rotation in radians
- `scale: number` - Uniform scale
- `alpha: number` - Opacity (0-1)
- `physics: boolean` - Enable physics
- `mouseEnabled: boolean` - Enable mouse events
- `renderer: Function` - Custom render function

### Camera
- `position: Point` - Camera position
- `focalLength: number` - Perspective strength
- `focalPower: number` - Perspective curve
- `viewport: Rect` - Viewport dimensions

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Watch mode
npm run dev

# Run tests
npm test

# Format code
npm run format

# Lint
npm run lint
```

## License

ISC

## Author

Jason Contento

## Repository

[https://github.com/drivej/HTMLCanvasEngine](https://github.com/drivej/HTMLCanvasEngine)
