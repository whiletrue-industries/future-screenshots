# Settings Panel (Experimental)

A removable control panel component for adjusting camera and visualization parameters in real-time.

## Features

- **Real-time Parameter Adjustment**: Sliders for FOV, Zoom, Fisheye effect, and more
- **URL Sharing**: Generate shareable URLs that auto-load your settings
- **One-Click Hardcoding**: Copy JSON to hardcode settings once you're happy
- **Fully Removable**: Delete 3 lines of code to remove completely

## Usage

### Accessing the Panel

The settings panel appears in the bottom-right corner of the screen (collapsed by default).

Click the **⚙️ Settings** header to expand it.

### Available Controls

1. **Field of View** (20°-120°)
   - Controls the camera's viewing angle
   - Lower = zoomed in, Higher = wider angle

2. **Fisheye Effect** (0%-200%)
   - Distortion effect intensity
   - 0% = no distortion, 100% = standard fisheye

3. **Zoom Level** (0.5x-3x)
   - Camera magnification
   - 1.0x = normal size

4. **Rotation Speed** (0.1x-2x)
   - How fast the view rotates during interactions
   - 1.0x = normal speed

5. **Pan Sensitivity** (0.1x-2x)
   - How sensitive panning is to mouse movement
   - 1.0x = normal sensitivity

6. **Depth of Field** (0%-100%)
   - Focus blur effect intensity
   - 0% = sharp, 100% = maximum blur

### Workflow

#### 1. Experiment with Settings
Adjust sliders until you like how it feels. Changes apply in real-time.

#### 2. Share Your Settings
- Click **📋 Copy Settings URL** 
- Share the URL with team members
- They'll automatically load your exact settings

#### 3. Hardcode When Ready
Once you've found your ideal settings:
1. Copy the JSON from "Current settings (for hardcoding)"
2. Send it to your developer or add it to `showcase-ws.component.ts`
3. Set the defaults in `cameraSettings` signal

### Example Hardcoding

**Current settings JSON:**
```json
{
  "fov": 60,
  "fisheye": 0.3,
  "zoom": 1.2,
  "rotationSpeed": 1.5,
  "panSensitivity": 1.0,
  "depthOfField": 0.15
}
```

**To hardcode, update this in `showcase-ws.component.ts`:**
```typescript
cameraSettings = signal<CameraSettings>({
  fov: 60,          // Changed from 75
  fisheye: 0.3,     // Changed from 0
  zoom: 1.2,        // Changed from 1
  rotationSpeed: 1.5, // Changed from 1
  panSensitivity: 1.0,  // Unchanged
  depthOfField: 0.15    // Changed from 0
});
```

## Removal

To completely remove the settings panel:

### Option 1: Remove from Template (Quick)
In `showcase-ws.component.html`, delete these lines (around line 150):
```html
<!-- Settings Panel (Removable - Delete these 3 lines and the component to remove) -->
<app-settings-panel 
  [isCollapsed]="settingsPanelOpen() === false"
  (settingsChange)="onSettingsChange($event)">
</app-settings-panel>
```

Also remove from imports in `showcase-ws.component.ts`:
```typescript
imports: [QrcodeComponent] // Remove SettingsPanelComponent
```

### Option 2: Complete Removal
Delete these files entirely:
- `projects/app/src/app/showcase-ws/settings-panel.component.ts`

And update:
- Remove `SettingsPanelComponent` import from `showcase-ws.component.ts`
- Remove the panel HTML from template
- Remove `settingsPanelOpen` and `cameraSettings` signals
- Remove `onSettingsChange()` method

## Technical Details

### Component Architecture
- **SettingsPanelComponent**: Standalone Angular component
- **No external dependencies**: Uses native sliders, only Angular built-ins
- **Signal-based**: Reactive state management with Angular signals
- **URL Persistence**: Automatically loads settings from query parameters

### How URL Params Work
```
?fov=60&fisheye=0.30&zoom=1.20&rotationSpeed=1.50&panSensitivity=1.00&depthOfField=0.15
```

Settings are read on component initialization and applied immediately.

### Integration Points
- `onSettingsChange(settings)` in showcase-ws.component.ts
- `updateCameraFov()` in three-renderer.service.ts
- `updateCameraZoom()` in three-renderer.service.ts

## Styling

The panel uses:
- Fixed positioning (bottom-right)
- Terminal/hacker aesthetic (green-on-black)
- Z-index: 9999 (always on top)
- Responsive scrolling for long lists
- Custom slider styling

To adjust appearance, modify the `styles` array in `settings-panel.component.ts`.

## Future Enhancements

Potential additions:
- Add slider for rotation speed parameter
- Add pan sensitivity control
- Integrate with fisheye effect shader
- Add preset configurations
- Export/import settings files
- Camera reset to default position
