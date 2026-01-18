# Future Screenshots User Guide

This guide provides instructions for using the Future Screenshots platform, including how to navigate the 3D showcase views.

## Table of Contents

- [Getting Started](#getting-started)
- [Navigating Showcase Views](#navigating-showcase-views)
- [Understanding Layouts](#understanding-layouts)
- [Tips and Tricks](#tips-and-tricks)

## Getting Started

Future Screenshots (Chronomaps) is a participatory mapping platform that allows you to capture and share visions of the future. The platform includes:

1. **Scanner** - Capture images with your camera
2. **Discuss** - Chat with AI about your vision
3. **Showcase** - View all contributions in immersive 3D visualizations

## Navigating Showcase Views

The Showcase WS view provides an interactive 3D visualization of all submitted photos. You can navigate this space using multiple input methods.

### Mouse Controls

**Panning (Moving Around):**
- Click and hold on empty space (not on a photo)
- Drag your mouse to move the view in any direction
- The cursor will change to a "grabbing" hand icon while panning

**Zooming:**
- Scroll your mouse wheel up to zoom in
- Scroll your mouse wheel down to zoom out
- Zoom is centered on your cursor position, making it easy to focus on specific areas
- **Double-click** to zoom in at the cursor
- **Shift + double-click** to zoom out at the cursor

**Photo Interaction (SVG Layout Only):**
- Click and drag photos to reposition them on the canvas
- Photos can be dropped on designated hotspots for categorization

### Keyboard Controls

**Arrow Keys:**
- `↑` (Up Arrow) - Pan the view upward
- `↓` (Down Arrow) - Pan the view downward
- `←` (Left Arrow) - Pan the view left
- `→` (Right Arrow) - Pan the view right

**Zoom Keys:**
- `+` or `=` - Zoom in (centered on viewport)
- `-` or `_` - Zoom out (centered on viewport)

**View Reset:**
- `R` - Reset the view to automatically fit all photos

### Touch Controls (Mobile/Tablet)

**Panning:**
- Use two fingers to drag the view

**Zooming:**
- Pinch two fingers together to zoom out
- Spread two fingers apart to zoom in

**Photo Interaction (SVG Layout Only):**
- Tap and drag a single photo to move it

### UI Controls

**Zoom Buttons (+/−):**
- Located in the camera controls at the bottom-right
- Click `+` to zoom in and `−` to zoom out
- Zoom uses your cursor position as the focal point (or center if the cursor isn’t over the canvas)

**Reset View Button:**
- Located at the bottom-right of the screen
- Click the circular arrow icon to return to auto-fit mode
- The view will smoothly animate to show all photos

**Layout Selection:**
- Located at the bottom-right of the screen
- Four buttons to switch between different layouts:
  - **G** - Grid Layout
  - **T** - TSNE Layout (AI-powered clustering)
  - **S** - SVG Layout (interactive placement)
  - **C** - Circle Packing Layout

**Random Showcase Toggle:**
- Located at the bottom-right of the screen
- Toggle to enable/disable random photo highlighting

**Fisheye Lens Effect:**
- Located at the bottom-right of the screen (purple circular icon)
- When enabled, creates a magnifying lens effect that follows your cursor
- Photos under the cursor are magnified and slightly displaced, making it easier to explore dense areas without zooming
- Click the fisheye icon to toggle the effect on/off
- The effect is particularly useful when exploring compositions with many overlapping photos

### Configuration Options

The fisheye effect can be customized using URL query parameters:

- `fisheye=1` - Enable fisheye effect by default
- `fisheye_radius=800` - Set the radius of the lens effect (default: 800, in world units)
- `fisheye_magnification=2.0` - Set magnification strength (default: 2.0, where 1.0 = no magnification)
- `fisheye_distortion=0.3` - Set radial displacement strength (default: 0.3, where 0 = no distortion)

**Example URL:**
```
?workspace=xxx&api_key=xxx&fisheye=1&fisheye_radius=1000&fisheye_magnification=2.5
```

## Understanding Layouts

### Grid Layout (G)

Photos are arranged in a random grid pattern. This is the default layout and provides a simple, organized view of all submissions.

- Zoom and pan freely
- Photos are evenly spaced
- Good for browsing many photos

### TSNE Layout (T)

Photos are positioned based on AI-powered image similarity analysis. Similar photos appear closer together, creating natural clusters.

- Discover related content by proximity
- Explore thematic groupings
- Zoom in to see clusters in detail

### SVG Layout (S)

Photos can be interactively placed on a custom background with predefined hotspots. This layout is ideal for categorizing photos by specific criteria.

**Features:**
- Drag photos to different locations
- Drop photos on hotspots to assign categories
- Visual feedback shows valid drop zones
- Changes are saved automatically

**How to Use:**
1. Click and drag a photo
2. Move it over a hotspot (you'll see the category info)
3. Release to drop the photo
4. The photo's properties are updated with the category

### Circle Packing Layout (C)

Photos are arranged in circular clusters by group. This creates an organic, visually appealing arrangement.

- Groups are clearly separated
- Photos within groups are packed tightly
- Zoom to explore individual photos

## Camera Modes

### Auto-Fit Mode (Default)

When you first load the showcase, the camera automatically positions itself to show all photos at once. This ensures you never lose track of the content.

**Characteristics:**
- Camera adjusts when new photos are added
- Always shows the full extent of content
- Smooth transitions when content changes

### Manual Mode

As soon as you interact with the view (zoom, pan, or use arrow keys), the camera switches to manual mode.

**Characteristics:**
- Full user control over camera position
- Camera stays where you put it
- New photos don't cause automatic camera movement
- Press `R` or click the reset button to return to auto-fit mode

## Tips and Tricks

### Efficient Navigation

1. **Quick Overview**: Press `R` to reset the view and see all photos
2. **Focus on Details**: Zoom in with mouse wheel on areas of interest
3. **Precise Positioning**: Use arrow keys for fine-tuned panning
4. **Explore Naturally**: Click and drag for intuitive, map-like navigation

### Performance Optimization

When viewing showcases with hundreds of photos:

1. **Zoom In**: Performance is better when fewer photos are visible
2. **Use Keyboard/Buttons**: Arrow keys and +/- (or on-screen +/−) are efficient for navigation
3. **Dynamic Image Resolution**: Images automatically upgrade to higher resolution when you zoom in close, and downgrade when zoomed out to save memory and improve performance
4. **Reset View**: Press `R` if the view feels sluggish to recalculate optimal framing

### Layout Selection

- **Grid**: Best for quick browsing and finding specific photos
- **TSNE**: Best for discovering patterns and related content
- **SVG**: Best for categorizing and organizing photos
- **Circle Packing**: Best for visualizing group relationships

### Mobile Optimization

On mobile devices:
- Two-finger gestures work best for navigation
- Tap the reset button frequently to reframe the view
- Portrait orientation provides better vertical space for photos

## Accessibility

The showcase supports keyboard-only navigation:
- Use `Tab` to focus on UI buttons
- Use `Enter` or `Space` to activate buttons
- Use arrow keys for panning
- Use `+`, `-`, and `R` keys for zoom and reset

## Troubleshooting

**Photos appear too small:**
- Zoom in using mouse wheel or `+` key
- Click reset button to auto-frame all content

**Can't see any photos:**
- Press `R` to reset the view
- Check that you're viewing a workspace with submitted photos

**Camera is moving on its own:**
- New photos are being added - the camera auto-adjusts in auto-fit mode
- Press `R` or interact with the view to take manual control

**Photos won't drag (SVG layout):**
- Ensure you're clicking directly on a photo, not empty space
- Try clicking the center of the photo

**Performance is slow:**
- Zoom in to reduce the number of visible photos
- Close other browser tabs to free up memory
- Try a different layout (Grid is often fastest)

## Keyboard Shortcuts Quick Reference

| Action | Keyboard Shortcut |
|--------|-------------------|
| Pan Up | `↑` (Up Arrow) |
| Pan Down | `↓` (Down Arrow) |
| Pan Left | `←` (Left Arrow) |
| Pan Right | `→` (Right Arrow) |
| Zoom In | `+` or `=` |
| Zoom Out | `-` or `_` |
| Double-click Zoom In | Double-click |
| Double-click Zoom Out | Shift + Double-click |
| Reset View | `R` |

## Getting Help

If you encounter issues or have questions:
1. Check this user guide first
2. Try the reset button (`R` key) to return to a known state
3. Reload the page if problems persist
4. Contact support through the platform's about page

---

*Last Updated: January 2026*
