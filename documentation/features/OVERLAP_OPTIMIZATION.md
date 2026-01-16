# Image Overlap Optimization Implementation

## Overview
Implemented overlap detection and distribution logic to prevent images in hotspot areas from overlapping by more than 10%, ensuring better visual organization and distribution within hit areas.

## Changes Made

### 1. **Enhanced SvgBackgroundLayoutStrategy** ([svg-background-layout-strategy.ts](projects/app/src/app/showcase-ws/svg-background-layout-strategy.ts))

#### New Properties
- `photoSizes`: Maps photo IDs to their dimensions for accurate overlap calculation
- `MAX_OVERLAP_PERCENT`: Hard limit set to 10% maximum overlap
- `PHOTO_WIDTH` & `PHOTO_HEIGHT`: Default photo dimensions (120x120 pixels)

#### Updated Methods

##### `distributePhotoInHotspot(hotspot, photoIndex)`
**Before:** Selected positions based only on photoIndex and distance from center.

**After:** 
- Evaluates all candidate positions
- Calculates overlap percentage with existing photos in the hotspot
- Prioritizes positions with minimal overlap
- Returns first position meeting ≤10% overlap threshold, or best available if none found
- Logs actual overlap percentage for debugging

##### `getPositionForPhoto(photoData, existingPhotos, enableAutoPositioning)`
**New Feature:** Tracks photo dimensions from metadata during positioning
- Extracts `width` and `height` from photo metadata
- Falls back to default 120x120 if not provided
- Stores in `photoSizes` map for overlap calculations

##### `async dispose()`
**Enhancement:** Added cleanup for `photoSizes` map

#### New Methods

##### `calculateOverlapWithExistingPhotos(normalizedX, normalizedY, hotspot): number`
Calculates maximum overlap percentage between a candidate position and all existing photos in the hotspot:
- Collects all photos currently assigned to the hotspot
- Gets photo dimensions (from metadata or defaults)
- Calls `calculateRectangleOverlapPercent` for each existing photo
- Returns the maximum overlap percentage (worst case)

##### `calculateRectangleOverlapPercent(newX, newY, newWidth, newHeight, existingX, existingY, existingWidth, existingHeight): number`
Low-level overlap calculation:
- Converts rectangle positions and dimensions to bounds (left, right, top, bottom)
- Calculates intersection rectangle
- Returns `(intersectionArea / newPhotoArea) * 100` as percentage
- Handles non-overlapping rectangles (returns 0)

## Algorithm Details

### Overlap Detection Flow
1. **Generate candidates**: Grid of 8×8 = 64 sample points within hotspot bounds
2. **Filter valid positions**: Keep only points inside SVG path geometry
3. **Calculate overlaps**: For each candidate, compute overlap with existing photos
4. **Select position**:
   - If any candidate has ≤10% overlap: use first one found
   - Otherwise: use candidate with minimum overlap percentage
5. **Log results**: Include overlap % in console output for debugging

### Coordinate Systems
- **SVG coordinates**: Original hotspot space (from SVG viewBox)
- **Normalized coordinates**: [-1, 1] range for cross-resolution compatibility
- **World coordinates**: Actual scene space = normalized × circleRadius

### Overlap Calculation
- Photos modeled as rectangles centered at their position
- Overlap = (intersection area) / (new photo area)
- Only considers photos in the same hotspot
- Percentage-based for scale-independent comparison

## Configuration

### Constants (Adjustable)
```typescript
MAX_OVERLAP_PERCENT = 10      // Maximum allowed overlap (%)
PHOTO_WIDTH = 120             // Default width (pixels)
PHOTO_HEIGHT = 120            // Default height (pixels)
```

### Dynamic Dimensions
Photos can specify their dimensions via metadata:
```typescript
photoData.metadata['width'] = 150;
photoData.metadata['height'] = 150;
```

## Debugging

### Console Output
Each auto-positioned photo logs:
```
[AUTO-POS] Photo index=X in hotspot Y: selected position svg-coords=(A, B), normalized=(C, D), overlap=E%
```

### Overlap Monitoring
- If overlap % exceeds threshold, consider:
  1. Increasing hotspot size in SVG
  2. Reducing `PHOTO_WIDTH`/`PHOTO_HEIGHT` constants
  3. Increasing grid sample density (`samplesPerRow`, `samplesPerCol`)

## Benefits

1. **Visual Clarity**: Images don't overlap excessively, improving usability
2. **Smart Distribution**: Prioritizes central positions while minimizing overlap
3. **Scalable**: Works with any photo size via metadata
4. **Debug-Friendly**: Console logs show overlap percentages for each placement
5. **Configurable**: Easy to adjust MAX_OVERLAP_PERCENT as needed

## Testing Recommendations

1. Add multiple photos with same metadata to trigger auto-positioning
2. Monitor console for overlap percentages
3. Verify no photos overlap by >10%
4. Test with different photo sizes via metadata
5. Validate with various hotspot geometries (different plausibility levels)

## Future Enhancements

1. **Spatial Hash**: Use spatial partitioning for faster overlap lookups in dense scenes
2. **Force-Directed Layout**: Repulsion-based positioning for zero-overlap guarantee
3. **Adaptive Grid**: Adjust sample density based on hotspot size
4. **Metrics**: Track and report average/max overlap across all hotspots
5. **UI Feedback**: Visual indicators when overlap threshold exceeded
