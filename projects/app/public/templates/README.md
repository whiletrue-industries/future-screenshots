# Template Images for Canvas Creator

## Adding Real Template Images

To use the actual template images from the GitHub issue:

1. **Download the template images** from the issue comments
2. **Save them as PNG files** in this directory with these names:
   - `template1-camera.png` - Camera/photo template
   - `template2-messages.png` - Messages/chat template  
   - `template3-map.png` - World map template
   - `template4-simple-map.png` - Simple map with locations
   - `template5-notification.png` - Notification card template

3. **Update the component** (canvas-creator.component.ts) to use .png extensions:
   ```typescript
   templates: Template[] = [
     { id: 'camera', name: 'Camera', url: '/templates/template1-camera.png', preview: '/templates/template1-camera.png' },
     { id: 'messages', name: 'Messages', url: '/templates/template2-messages.png', preview: '/templates/template2-messages.png' },
     { id: 'map', name: 'Map', url: '/templates/template3-map.png', preview: '/templates/template3-map.png' },
     { id: 'simple-map', name: 'Simple Map', url: '/templates/template4-simple-map.png', preview: '/templates/template4-simple-map.png' },
     { id: 'notification', name: 'Notification', url: '/templates/template5-notification.png', preview: '/templates/template5-notification.png' },
   ];
   ```

## Current Placeholder Templates

The current SVG files are simplified placeholders. They should be replaced with the actual phone mockup images from:
- https://github.com/user-attachments/assets/00cd2052-3d94-4ee5-b413-f2ddd011f99d
- https://github.com/user-attachments/assets/9383c20e-2ad7-4930-b498-1c34ee246f0c
- https://github.com/user-attachments/assets/413463e0-04e9-481d-9cd3-ff9c4c13eaac
- https://github.com/user-attachments/assets/a7ae97e1-950e-44cc-9f1f-d97040f6a0be
- https://github.com/user-attachments/assets/694af283-de03-49bb-a7d1-67d91ea0015f

## Template Requirements

- **Format**: PNG or JPG
- **Dimensions**: Should match phone screen aspect ratio (the canvas will scale them)
- **Content**: Phone mockup showing the template layout with TRANSITION section at bottom
- **Background**: Light gray/white for best drawing/text visibility
