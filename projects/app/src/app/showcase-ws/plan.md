ShowcaseWsComponent refactor.

Current state:
The ShowcaseWsComponent uses the PhotoGrid class to display a grid of photos in a 3D environment using Three.js. 
The photos are fetched from a web service and displayed in a grid layout, using a predefined location-generator.

Desired state:
Refactor the ShowcaseWsComponent so that:
- We have a separate class to hold the data for the different photos:
  - Current/target location
  - Internal implementation details (e.g. Three.js objects)
- The Three.js rendering logic is separated from the data logic.
  It reads from the photo data class and updates the Three.js scene accordingly.

Then we would add different "modes" or "layouts" to the component:
- Current mode, which displays photos in a grid layout in random positions.
- A "tsne" mode, which receives the x,y coordinates for each photo from a web service and positions them accordingly.
- A "background svg" mode. This is a more complex mode, in which the photos can be dragged around. The background svg defines "hotspots" where photos can be dropped. When a photo is dropped on a hotspot, it uses a callback to update properties of the photo in a web service, based on the id of the hotspot.

## TODO

### Step 1: Create PhotoData Class
- Create a new file `photo-data.ts` with a `PhotoData` class that holds:
  - Photo metadata (id, url, created_at, etc.)
  - Current position (x, y, z coordinates)
  - Target position (for animations)
  - Three.js mesh reference
  - Animation state (spawning, floating, positioned, etc.)
- Add methods to update position, set target, and manage state
- This step should be fully compilable and testable in isolation

### Step 2: Create Three.js Renderer Service  
- Create a new file `three-renderer.service.ts` with a service that:
  - Initializes and manages the Three.js scene, camera, renderer
  - Provides methods to add/remove/update meshes in the scene
  - Handles camera positioning and animation
  - Manages the render loop and tweening system
  - Takes PhotoData objects as input and updates the visual representation
- Move all Three.js-specific logic from PhotoGrid to this service
- This step should be compilable and testable with mock PhotoData objects

### Step 3: Create Layout Strategy Interface
- Create a new file `layout-strategy.interface.ts` with an interface defining:
  - `getPosition(photoData: PhotoData, existingPhotos: PhotoData[]): [number, number]`
  - `getName(): string`
  - Optional `initialize()` and `dispose()` methods
- This interface will define how different layout modes calculate photo positions
- This step should be compilable (interface only)

### Step 4: Implement Grid Layout Strategy
- Create `grid-layout-strategy.ts` implementing the `LayoutStrategy` interface
- Move the current grid positioning logic (`getEmptyPosition`, `getRandomEmpty`) from the component
- Move grid occupancy tracking to this strategy
- This step should be fully compilable and testable with PhotoData objects

### Step 5: Refactor PhotoGrid to Use New Architecture
- Refactor `PhotoGrid` class to:
  - Use PhotoData objects instead of internal mesh tracking
  - Use ThreeRendererService for all Three.js operations
  - Accept a LayoutStrategy for positioning logic
  - Focus on orchestrating data flow between PhotoData, LayoutStrategy, and ThreeRendererService
- Update existing methods to work with new architecture
- This step should maintain existing functionality while using new structure

### Step 6: Update ShowcaseWsComponent to Use New Architecture
- Modify `ShowcaseWsComponent` to:
  - Create PhotoData objects from web service responses
  - Initialize PhotoGrid with GridLayoutStrategy
  - Pass PhotoData objects to PhotoGrid instead of raw data
- Ensure all existing functionality works with new architecture
- This step should be fully functional and maintain existing behavior

### Step 7: Implement TSNELayoutStrategy
- Create `tsne-layout-strategy.ts` implementing the `LayoutStrategy` interface
- Add method to fetch x,y coordinates from web service for each photo
- Implement position calculation based on TSNE coordinates
- Add mode parameter to component to switch between grid and tsne layouts
- This step should be compilable and testable with mock TSNE data

### Step 8: Add Background SVG Layout Infrastructure
- Create `svg-background-layout-strategy.ts` implementing the `LayoutStrategy` interface
- Add SVG background rendering capability to the component template
- Implement hotspot detection logic for SVG elements
- Add drag-and-drop event handling infrastructure
- This step should render SVG background and detect hotspots (without drag functionality yet)

### Step 9: Implement Drag and Drop for SVG Layout
- Add mouse/touch event handlers for photo dragging
- Implement collision detection with SVG hotspots
- Add callback mechanism to update photo properties via web service when dropped on hotspots
- Add visual feedback for valid drop zones
- This step should be fully functional for drag-and-drop interactions

### Step 10: Add Mode Switching UI
- Add UI controls to switch between different layout modes
- Implement smooth transitions between modes
- Add URL parameter support for default mode selection
- Update component to properly initialize with selected mode
- This step should provide complete mode switching functionality

Each step should be implemented, tested, and verified to work correctly before moving to the next step.


