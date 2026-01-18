# Fisheye Effect Hierarchy & Relationships

## Effect Interaction Model

```
┌─────────────────────────────────────────────────────────────┐
│                   FISHEYE LENS EFFECT                       │
│  (Creates magnifying lens that follows mouse cursor)        │
└─────────────────────────────────────────────────────────────┘
        ↓            ↓                ↓                ↓
    ┌────────┐  ┌──────────┐  ┌─────────────┐  ┌──────────────┐
    │Magnify │  │  Radius  │  │ Distortion  │  │Zoom Relative │
    │  1-5×  │  │ 100-2000 │  │   0-100%    │  │    0-100%    │
    │        │  │   px     │  │             │  │              │
    └────────┘  └──────────┘  └─────────────┘  └──────────────┘
         │           │               │               │
         └─────┬─────┴───────┬───────┴───────┬───────┘
               │             │               │
        ┌──────▼─────────────▼──┬────────────▼──────┐
        │ FISHEYE EFFECT        │                    │
        │ SERVICE CALCULATES    │  Scale factor:    │
        │ PER-MESH EFFECTS      │  1.0 + (mag-1)*f  │
        │                       │                    │
        │ Returns for each      │  Position offset:  │
        │ photo under lens:     │  (distortion * f)  │
        │                       │                    │
        │ - Scale (size)        │  Render order:     │
        │ - Position offset     │  f * 1000          │
        │ - Render order        │  (f = falloff)     │
        └───┬───────────────────┴────────────────────┘
            │
            └──▶ Applied every frame in animation loop
                ▶ Updates each photo's transform
                ▶ Visible immediately on cursor move
```

## Slider Effect Relationships

### Primary Effects (Directly Control Lens Behavior)
```
Magnification ──┐
                ├──▶ Size of enlargement under lens
Radius ────────┤
                ├──▶ Area affected by lens
Distortion ────┤
                └──▶ Radial displacement amount
```

### Modifiers (Adjust Primary Effects)
```
Zoom Relative ──▶ Reduces magnification as you zoom in
                  (Prevents hyper-magnification)

Falloff Function (cubic ease-out, automatic)
                ──▶ Smooth transition from lens center to edge
                    (Not user-configurable, built into math)
```

### Camera Settings (Change View, Not Lens)
```
FOV ────────────▶ Perspective narrowness
                  (doesn't affect lens shape, affects view angle)

Zoom Level ─────▶ Camera distance from scene
                  (affects overall size, lens scales with scene)

Depth of Field ─▶ Blur distant objects
                  (post-processing, independent of lens)
```

### Control Settings (Change Interaction, Not Visuals)
```
Rotation Speed ─▶ How fast camera rotates with mouse
                  (subjective feel, doesn't change scene)

Pan Sensitivity ▶ How fast camera pans with mouse
                  (subjective feel, doesn't change scene)
```

## Default Configuration

```typescript
const DEFAULT_SETTINGS = {
  // Fisheye Lens Effect (Visible, Important)
  maxMagnification: 2.0,    // 2× enlargement
  radius: 800,              // 800px lens size
  fisheye: 0.6,            // 30% distortion (0.6 * 0.5)
  zoomRelative: 0.5,       // Magnification reduces 50% when zoomed
  
  // Camera (Affects View, Moderate Importance)
  fov: 75,                 // Standard perspective
  zoom: 1.0,               // No zoom
  depthOfField: 0,         // Disabled by default
  
  // Controls (Feel & Responsiveness, Low Importance)
  rotationSpeed: 1.0,      // Normal speed
  panSensitivity: 1.0,     // Normal sensitivity
};
```

## Visual Combinations

### "Smooth Magnifying Glass"
```
Settings:
  - Max Magnification: 3.0 (large magnification)
  - Lens Radius: 600 (medium, focused)
  - Lens Distortion: 0% (no distortion)
  - Zoom Relative: 1.0 (full reduction when zoomed)

Result: Pure magnification without visual distortion,
        like a magnifying glass held over dense areas
```

### "Artistic Fisheye Lens"
```
Settings:
  - Max Magnification: 4.0 (strong enlargement)
  - Lens Radius: 1200 (large, wide area)
  - Lens Distortion: 100% (strong displacement)
  - Zoom Relative: 0 (magnification always strong)

Result: Pronounced "bulging" fisheye effect,
        items pushed outward dramatically
```

### "Subtle Exploration Lens"
```
Settings:
  - Max Magnification: 1.5 (gentle magnification)
  - Lens Radius: 400 (tight, focused)
  - Lens Distortion: 20% (light displacement)
  - Zoom Relative: 0.8 (mostly maintains magnification)

Result: Gentle magnification for exploring details,
        minimal distortion, readable text
```

### "Details & Precision"
```
Settings:
  - Max Magnification: 5.0 (maximum magnification)
  - Lens Radius: 300 (very tight focus)
  - Lens Distortion: 50% (moderate displacement)
  - Zoom Relative: 1.0 (full zoom reduction)
  - FOV: 90 (wider view)

Result: Super-magnified center with wider field of view,
        ideal for reading text or examining details
```

## Mathematical Model

The fisheye effect uses these formulas (in FisheyeEffectService):

### Distance Calculation
```
distance = √[(mesh.x - lens.x)² + (mesh.y - lens.y)²]
```

### Falloff Function (Cubic Ease-Out)
```
normalizedDistance = distance / radius
falloff = 1 - normalizedDistance³

// At center (distance=0):   falloff = 1.0 (full effect)
// At edge (distance=radius): falloff = 0.0 (no effect)
// Smooth transition between
```

### Scale Magnification
```
scale = 1.0 + (magnification - 1.0) × falloff

// With zoom reduction:
magnification_adjusted = 1.0 + (magnification - 1.0) × (1 - zoomRelative × (zoom - 1))
```

### Position Distortion
```
angle = atan2(dy, dx)  // Direction from lens center
distortion_strength = distortion × falloff
push_distance = distance × distortion_strength

offset.x = cos(angle) × push_distance
offset.y = sin(angle) × push_distance

// Items pushed radially outward from lens center
```

### Render Order (Z-Index)
```
renderOrder = floor(falloff × 1000)

// Items under lens (falloff > 0) render on top (z=1000)
// Items outside lens (falloff = 0) render normally (z=0)
```

## Performance Considerations

### Calculation Frequency
- **Per-frame**: Falloff function calculated for each photo
- **On slider change**: Configuration updated once
- **Efficient**: Only 4 multiplications + 1 sqrt per photo

### Optimization Opportunities
- Precompute falloff for common radii (cached lookup tables)
- Use distance-based LOD (stop calculations for far items)
- Batch mesh updates (update all fisheye meshes in one pass)

## Troubleshooting Guide

### Problem: Lens has no visible effect
- Check: Max Magnification > 1.0
- Check: Lens Radius > 100
- Check: Cursor over photo area (lens position = cursor)

### Problem: Magnification disappears when zooming
- Check: Zoom Relative < 1.0
- Set: Zoom Relative = 0 to maintain effect
- Note: This is intentional for "realistic" zoom behavior

### Problem: Distortion looks unnatural
- Reduce: Lens Distortion (try 20-40%)
- Increase: Lens Radius (wider area, smoother effect)
- Note: High distortion (80%+) is intentionally extreme

### Problem: Performance lag with many photos
- Reduce: Lens Radius (fewer photos affected)
- Reduce: Max Magnification (minor impact)
- Note: Actual bottleneck is usually rendering, not calculation

### Problem: Effect "cuts off" at screen edges
- Increase: Lens Radius (wider area)
- Check: CSS z-index of canvas (should be lower than controls)
- Note: Effect is correctly clipped to canvas bounds
