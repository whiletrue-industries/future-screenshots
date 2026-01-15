# Settings Panel Setup - Quick Reference

## What Was Created

A **removable settings control panel** for real-time parameter adjustment, inspired by Three.js dat.GUI pattern.

### Files Added
1. **[settings-panel.component.ts](projects/app/src/app/showcase-ws/settings-panel.component.ts)** - The control panel component
2. **[SETTINGS_PANEL.md](SETTINGS_PANEL.md)** - Full documentation

### Files Modified
1. **showcase-ws.component.ts** - Added settings integration and signal
2. **showcase-ws.component.html** - Added panel to template
3. **three-renderer.service.ts** - Added camera control methods

## How to Use

### 1. Access the Panel
- Bottom-right corner, click **⚙️ Settings** to expand
- Collapsed by default to stay out of the way

### 2. Adjust Sliders
Available controls:
- **FOV** (20°-120°) - Camera viewing angle
- **Fisheye Effect** (0%-200%) - Distortion intensity
- **Zoom** (0.5x-3x) - Camera magnification
- **Rotation Speed** (0.1x-2x) - Pan rotation speed
- **Pan Sensitivity** (0.1x-2x) - Mouse sensitivity
- **Depth of Field** (0%-100%) - Focus blur

### 3. Copy Settings When Perfect
Two options:

**Option A: Share URL**
- Click **📋 Copy Settings URL**
- Share with team: `https://mapfutur.es?fov=60&fisheye=0.3&zoom=1.2...`
- Recipients auto-load your settings

**Option B: Hardcode Settings**
- Copy the JSON from "Current settings (for hardcoding)"
- Send to developer or commit to repo
- Update `cameraSettings` signal in `showcase-ws.component.ts`

### Example Message to Copy Back

```
These settings work great for the fisheye view:
{
  "fov": 65,
  "fisheye": 0.45,
  "zoom": 1.15,
  "rotationSpeed": 1.2,
  "panSensitivity": 0.9,
  "depthOfField": 0.2
}

URL: https://mapfutur.es/showcase?fov=65&fisheye=0.45&zoom=1.15&rotationSpeed=1.20&panSensitivity=0.90&depthOfField=0.20
```

## Removal Steps

### Quick Removal (2 minutes)
1. Delete from `showcase-ws.component.html` (3 lines):
```html
<!-- Settings Panel (Removable - Delete these 3 lines and the component to remove) -->
<app-settings-panel 
  [isCollapsed]="settingsPanelOpen() === false"
  (settingsChange)="onSettingsChange($event)">
</app-settings-panel>
```

2. Remove from imports in `showcase-ws.component.ts`:
```typescript
// Remove: SettingsPanelComponent
imports: [QrcodeComponent] // Only this remains
```

### Complete Removal (5 minutes)
Also delete:
- `projects/app/src/app/showcase-ws/settings-panel.component.ts`
- Remove `cameraSettings` signal from `showcase-ws.component.ts`
- Remove `onSettingsChange()` method
- Remove the two `updateCamera*()` methods from `three-renderer.service.ts`

## Key Features

✅ **Zero External Dependencies** - Uses only Angular built-ins  
✅ **Real-time Updates** - Changes apply instantly  
✅ **URL Persistence** - Share settings via URL parameters  
✅ **Easy Removal** - Delete 3 lines of HTML to disable  
✅ **Terminal Aesthetic** - Hacker-style green-on-black UI  
✅ **Signal-based** - Reactive Angular 19+ patterns  

## Next Steps

1. Expand the settings panel (click ⚙️ Settings)
2. Adjust sliders to your preference
3. Test the fisheye effect, zoom, and camera behavior
4. When satisfied, **copy the JSON back in a message**
5. I'll hardcode the settings for permanent use

## Questions?

See [SETTINGS_PANEL.md](SETTINGS_PANEL.md) for:
- Detailed parameter explanations
- Technical implementation details
- How URL parameter loading works
- Custom styling options
