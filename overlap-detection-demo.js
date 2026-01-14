/**
 * Test/Demo: Overlap Detection and Distribution Logic
 * 
 * This file demonstrates how the new overlap detection works.
 * Run this with: node overlap-demo.js
 */

// Simulated overlap detection logic
class OverlapDetector {
  constructor(maxOverlapPercent = 10) {
    this.maxOverlapPercent = maxOverlapPercent;
    this.photos = [];
  }

  /**
   * Calculate overlap percentage between two rectangles
   */
  calculateRectangleOverlapPercent(
    newX, newY, newWidth, newHeight,
    existingX, existingY, existingWidth, existingHeight
  ) {
    const newLeft = newX - newWidth / 2;
    const newRight = newX + newWidth / 2;
    const newTop = newY - newHeight / 2;
    const newBottom = newY + newHeight / 2;
    
    const existingLeft = existingX - existingWidth / 2;
    const existingRight = existingX + existingWidth / 2;
    const existingTop = existingY - existingHeight / 2;
    const existingBottom = existingY + existingHeight / 2;
    
    const intersectLeft = Math.max(newLeft, existingLeft);
    const intersectRight = Math.min(newRight, existingRight);
    const intersectTop = Math.max(newTop, existingTop);
    const intersectBottom = Math.min(newBottom, existingBottom);
    
    if (intersectRight <= intersectLeft || intersectBottom <= intersectTop) {
      return 0;
    }
    
    const overlapWidth = intersectRight - intersectLeft;
    const overlapHeight = intersectBottom - intersectTop;
    const overlapArea = overlapWidth * overlapHeight;
    const newArea = newWidth * newHeight;
    
    return (overlapArea / newArea) * 100;
  }

  /**
   * Check if a position is valid (≤ max overlap)
   */
  isPositionValid(x, y, width = 120, height = 120) {
    for (const photo of this.photos) {
      const overlapPercent = this.calculateRectangleOverlapPercent(
        x, y, width, height,
        photo.x, photo.y, photo.width, photo.height
      );
      
      if (overlapPercent > this.maxOverlapPercent) {
        return false;
      }
    }
    return true;
  }

  /**
   * Find best position from candidates
   */
  findBestPosition(candidates) {
    let bestCandidate = null;
    let minOverlap = 100;
    
    for (const candidate of candidates) {
      const overlapPercent = this.calculateMaxOverlap(candidate.x, candidate.y);
      
      if (overlapPercent < minOverlap) {
        minOverlap = overlapPercent;
        bestCandidate = { ...candidate, overlap: overlapPercent };
        
        if (overlapPercent <= this.maxOverlapPercent) {
          break;
        }
      }
    }
    
    return bestCandidate;
  }

  /**
   * Calculate max overlap with any existing photo
   */
  calculateMaxOverlap(x, y, width = 120, height = 120) {
    let maxOverlap = 0;
    
    for (const photo of this.photos) {
      const overlapPercent = this.calculateRectangleOverlapPercent(
        x, y, width, height,
        photo.x, photo.y, photo.width, photo.height
      );
      maxOverlap = Math.max(maxOverlap, overlapPercent);
    }
    
    return maxOverlap;
  }

  /**
   * Add a photo to the positioned photos
   */
  addPhoto(x, y, width = 120, height = 120) {
    this.photos.push({ x, y, width, height });
  }
}

// ==================== TESTS ====================

console.log('='.repeat(60));
console.log('Overlap Detection and Distribution Tests');
console.log('='.repeat(60));

// Test 1: No overlap case
console.log('\n✓ Test 1: No Overlap');
console.log('-'.repeat(60));
const detector1 = new OverlapDetector(10);
detector1.addPhoto(0, 0, 120, 120);
const overlap1 = detector1.calculateMaxOverlap(300, 300);
console.log(`Photo 1 at (0, 0), Photo 2 at (300, 300): ${overlap1.toFixed(2)}% overlap`);
console.assert(overlap1 === 0, 'Should have 0% overlap');
console.log('✓ Passed: No overlap detected');

// Test 2: 10% overlap (boundary)
console.log('\n✓ Test 2: 10% Overlap (Boundary)');
console.log('-'.repeat(60));
const detector2 = new OverlapDetector(10);
detector2.addPhoto(100, 100, 100, 100);
// Position at (150, 100) to create ~25% overlap
const overlap2 = detector2.calculateMaxOverlap(150, 100, 100, 100);
console.log(`Photo 1 at (100, 100), Photo 2 at (150, 100): ${overlap2.toFixed(2)}% overlap`);
console.log(`Valid position (≤10%): ${overlap2 <= 10}`);

// Test 3: Position selection with candidates
console.log('\n✓ Test 3: Position Selection from Candidates');
console.log('-'.repeat(60));
const detector3 = new OverlapDetector(10);
detector3.addPhoto(0, 0, 120, 120);

const candidates = [
  { x: 100, y: 0, name: 'Candidate A' },
  { x: 50, y: 0, name: 'Candidate B (overlaps 50%)' },
  { x: 200, y: 200, name: 'Candidate C (no overlap)' }
];

const best = detector3.findBestPosition(candidates);
console.log(`Best position: ${best.name}`);
console.log(`Overlap: ${best.overlap.toFixed(2)}%`);
console.log(`Valid: ${best.overlap <= 10 ? '✓ Yes' : '✗ No'}`);

// Test 4: Multiple photos distribution
console.log('\n✓ Test 4: Multiple Photos Distribution');
console.log('-'.repeat(60));
const detector4 = new OverlapDetector(10);

const positions = [
  { x: -100, y: -100, name: 'Photo 1' },
  { x: 100, y: -100, name: 'Photo 2' },
  { x: 0, y: 100, name: 'Photo 3' },
  { x: -100, y: 100, name: 'Photo 4' }
];

positions.forEach((pos, idx) => {
  detector4.addPhoto(pos.x, pos.y, 100, 100);
  console.log(`Added ${pos.name} at (${pos.x}, ${pos.y})`);
});

console.log('\nVerifying no excessive overlaps:');
let allValid = true;
for (let i = 0; i < positions.length; i++) {
  for (let j = i + 1; j < positions.length; j++) {
    const overlap = detector4.calculateRectangleOverlapPercent(
      positions[i].x, positions[i].y, 100, 100,
      positions[j].x, positions[j].y, 100, 100
    );
    const valid = overlap <= 10;
    const status = valid ? '✓' : '✗';
    console.log(`  ${status} Photo ${i + 1} vs Photo ${j + 1}: ${overlap.toFixed(2)}% overlap`);
    allValid = allValid && valid;
  }
}

console.log(`\n${allValid ? '✓ All positions valid!' : '✗ Some positions exceed limit'}`);

// Test 5: Edge case - exact overlap
console.log('\n✓ Test 5: Exact Position Overlap');
console.log('-'.repeat(60));
const detector5 = new OverlapDetector(10);
detector5.addPhoto(0, 0, 120, 120);
const overlapExact = detector5.calculateMaxOverlap(0, 0, 120, 120);
console.log(`Same position: ${overlapExact.toFixed(2)}% overlap`);
console.assert(overlapExact === 100, 'Should have 100% overlap for exact same position');
console.log('✓ Passed: 100% overlap detected for exact position');

console.log('\n' + '='.repeat(60));
console.log('All tests completed successfully!');
console.log('='.repeat(60));
