# Visual Guide: Image Overlap Prevention

## Overlap Detection Visualization

### Scenario 1: No Overlap (Valid ✓)
```
Hotspot Area:
┌────────────────────────────────┐
│                                │
│   [Photo A]         [Photo B]   │
│   120×120           120×120     │
│                                │
│                 Distance > 180  │
│              (no intersection)  │
└────────────────────────────────┘

Result: 0% overlap ✓ VALID
```

### Scenario 2: Acceptable Overlap (Valid ✓)
```
Hotspot Area:
┌────────────────────────────────┐
│                                │
│   [Photo A]        [Photo B]    │
│   120×120          120×120      │
│      └─────────┘ 12 pixels      │
│         overlap                 │
│    Overlap Area = 144 sq px     │
│    Photo Area   = 14400 sq px   │
│    Percent      = 1% ✓ VALID    │
└────────────────────────────────┘

Result: 1% overlap ✓ VALID (≤10%)
```

### Scenario 3: Maximum Acceptable (Edge Case ✓)
```
Hotspot Area:
┌────────────────────────────────┐
│                                │
│   [Photo A]  [Photo B overlap]  │
│   120×120    overlap region     │
│    ├──────┤  ├──36 pixels──┤   │
│    │ 1 sq │  │ 1320 sq px  │   │
│    └──────┘  └─────────────┘   │
│              (10% of Photo B)   │
│    Overlap = 1440 sq px        │
│    Percent = 10% ✓ VALID       │
└────────────────────────────────┘

Result: 10% overlap ✓ VALID (at boundary)
```

### Scenario 4: Excessive Overlap (Invalid ✗)
```
Hotspot Area:
┌────────────────────────────────┐
│                                │
│   [Photo A]                     │
│   [Photo B OVERLAP]             │
│   120×120  ├─60─┤              │
│    └─────┘ overlap = 3600 sq px│
│    Photo Area = 14400 sq px    │
│    Percent = 25% ✗ INVALID     │
└────────────────────────────────┘

Result: 25% overlap ✗ REJECTED
Algorithm: Try next candidate position
```

### Scenario 5: Perfect Overlap (Collision ✗)
```
Hotspot Area:
┌────────────────────────────────┐
│                                │
│    [PHOTO A]                   │
│    [PHOTO B] (same position)    │
│    120×120                      │
│    └─────┘ = 14400 sq px       │
│    Overlap = 14400 sq px       │
│    Percent = 100% ✗ COLLISION  │
└────────────────────────────────┘

Result: 100% overlap ✗ REJECTED (worst case)
```

## Position Selection Algorithm

### Candidate Generation (8×8 grid)
```
Hotspot Bounds:
┌──────────────────────────────┐
│ • • • • • • • •              │  • = candidate position
│ • • • • • • • •              │  
│ • • • • • • • •              │  Only positions inside path
│ • • • • • • • •              │  are kept as valid
│ • • • • • • • •              │  candidates
│ • • • • • • • •              │  
│ • • • • • • • •              │  8×8 = 64 total samples
│ • • • • • • • •              │  ~30-50 inside path
└──────────────────────────────┘
```

### Candidate Evaluation
```
For each candidate:
1. Calculate overlap with Photo A → 15%
2. Calculate overlap with Photo B → 8% (MAX)
3. Calculate overlap with Photo C → 2%
   
   Result: max_overlap = 15%
           exceeds 10% limit ✗

   Next candidate...
```

### Selection Decision Tree
```
                    [Generate Candidates]
                            │
                   ┌────────┴────────┐
                   │                 │
        [Candidate A: 5%]   [Candidate B: 15%]
                   │                 │
              ≤10%? ✓           ≤10%? ✗
                   │                 │
            Use This!          Try Next
```

## Overlap Calculation Formula

### Rectangle Intersection
```
Rectangle 1: center (x1, y1), size (w1, h1)
Rectangle 2: center (x2, y2), size (w2, h2)

Bounds:
  R1: left = x1 - w1/2,  right = x1 + w1/2
      top  = y1 - h1/2,  bottom = y1 + h1/2

  R2: left = x2 - w2/2,  right = x2 + w2/2
      top  = y2 - h2/2,  bottom = y2 + h2/2

Intersection:
  int_left   = max(R1.left, R2.left)
  int_right  = min(R1.right, R2.right)
  int_top    = max(R1.top, R2.top)
  int_bottom = min(R1.bottom, R2.bottom)

  if (int_right ≤ int_left) or (int_bottom ≤ int_top):
    overlap_area = 0
  else:
    overlap_width = int_right - int_left
    overlap_height = int_bottom - int_top
    overlap_area = overlap_width × overlap_height

Percentage:
  overlap_percent = (overlap_area / R1_area) × 100
```

## Multi-Photo Distribution Example

### Initial State (1 photo placed)
```
Hotspot:
┌─────────────────────────┐
│                         │
│                         │
│      [PHOTO 1]          │  Position: center
│       120×120           │
│                         │
│                         │
└─────────────────────────┘
```

### Adding Photo 2 (best position selected)
```
Generate 64 candidates, evaluate each:

Candidate positions marked with overlap %:
┌─────────────────────────┐
│ 45% 40% 38% 40% 45%    │
│ 40% 20% 10%* 20% 40%    │  * = 10% (acceptable)
│ 38% 10% 5%  10% 38%     │  ✓ (center better but 5%)
│ 40% 20% 10% 20% 40%     │
│ 45% 40% 38% 40% 45%     │
└─────────────────────────┘

Selected: 10% overlap candidate
(first valid position found)
```

### Final State (2 photos placed)
```
Hotspot:
┌─────────────────────────┐
│                         │
│  [P1]   [P2 overlap]    │  P1: center
│  120×120  10% overlap   │  P2: offset  
│                         │  Gap maintained
│                         │
└─────────────────────────┘

Logging:
[AUTO-POS] Photo index=1 in hotspot S-...:
  overlap=10.0%
```

### Adding Photo 3
```
All positions in same hotspot now evaluated against P1 + P2:

┌─────────────────────────┐
│ 25% 20% 18% 20% 25%    │
│ 20% 8%  5%* 8% 20%      │  * = still acceptable
│ 18% 5%  2%  5% 18%      │
│ 20% 8%  5%* 8% 20%      │
│ 25% 20% 18% 20% 25%    │
└─────────────────────────┘

Selected position prevents excessive clustering
```

## Coordinate System Diagram

### SVG Space → Normalized Space → World Space
```
SVG Coordinates (0-800):
┌──────────────────────────┐
│ (0,0)                    │  400×400 pixel area
│  •••••••••••••••••       │
│ •         •              │
│ • [HOTSPOT]•             │  bounds: (250, 150, 300, 300)
│ •         •              │
│  •••••••••••••••••       │
│                 (800,800)│
└──────────────────────────┘

                    ↓ Normalize
                    
SVG point (400, 300) → normalized (0, -0.25)

                    ↓ Scale
                    
Normalized (0, -0.25) × circleRadius(20000)
= World position (0, -5000)
```

## Summary Table

| Scenario | Overlap % | Status | Action |
|----------|-----------|--------|--------|
| No photos in hotspot | 0% | ✓ Valid | Place photo |
| 1 photo, 500px away | 0% | ✓ Valid | Place photo |
| 1 photo, 12px overlap | 1% | ✓ Valid | Place photo |
| 1 photo, 36px overlap | 10% | ✓ Valid | Place photo (boundary) |
| 1 photo, 50px overlap | 17% | ✗ Invalid | Try next candidate |
| Same position | 100% | ✗ Collision | Reject immediately |

## Debug Output Example

When positioning 3 photos in same hotspot:
```
[AUTO-POS] Matching photo p123: plausibility=75, favorable_future=prevent, transition_bar_position=during

[AUTO-POS] MATCH FOUND for photo p123 in hotspot s-favorable_future=prevent,plausibility=75,transition_bar_position=during

[AUTO-POS] Photo index=0 in hotspot s-favorable_future=prevent,...:
  selected position svg-coords=(450.5, 320.2),
  normalized=(0.123, -0.085),
  overlap=2.1%

[AUTO-POS] Photo index=1 in hotspot s-favorable_future=prevent,...:
  selected position svg-coords=(480.3, 350.1),
  normalized=(0.145, -0.105),
  overlap=8.7%

[AUTO-POS] Photo index=2 in hotspot s-favorable_future=prevent,...:
  selected position svg-coords=(420.7, 290.5),
  normalized=(0.101, -0.065),
  overlap=7.2%
```

All three photos placed successfully with <10% overlaps!
