# Multiselect Filter Controls Implementation

## Overview
Added "Select All" and "Deselect All" buttons to the multiselect dropdown filters (Status, Preference, and Potential) in the filters-bar component.

## Implementation Details

### Changes Made

#### 1. **TypeScript Component** (`filters-bar.component.ts`)
Added six new methods to handle select all/deselect all operations:

- `selectAllStatuses()`: Selects all status options
- `deselectAllStatuses()`: Deselects all status options
- `selectAllPreferences()`: Selects all preference options
- `deselectAllPreferences()`: Deselects all preference options
- `selectAllPotentials()`: Selects all potential options
- `deselectAllPotentials()`: Deselects all potential options

These methods update the respective signal values directly, triggering automatic filter updates through the existing effect watchers.

#### 2. **HTML Template** (`filters-bar.component.html`)
Added control button sections to each multiselect dropdown:

```html
<div class="multiselect-controls">
  <button 
    type="button"
    class="control-btn" 
    (click)="selectAllStatuses()"
    title="Select all statuses">
    Select All
  </button>
  <button 
    type="button"
    class="control-btn" 
    (click)="deselectAllStatuses()"
    title="Deselect all statuses">
    Deselect All
  </button>
</div>
```

Similar blocks were added to the Preference and Potential dropdowns.

#### 3. **Styling** (`filters-bar.component.less`)
Added `.multiselect-controls` styling:

```less
.multiselect-controls {
    display: flex;
    gap: 4px;
    padding: 4px;
    border-bottom: 1px solid @color-primary-100;
    margin-bottom: 4px;

    .control-btn {
        flex: 1;
        padding: 6px 8px;
        background: @color-primary-50;
        border: 1px solid @color-primary-100;
        border-radius: 4px;
        color: @color-purple;
        font-size: 11px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.15s;
        white-space: nowrap;

        &:hover {
            background: @color-primary-100;
            border-color: @color-purple;
            color: @color-darker-purple;
        }

        &:active {
            transform: scale(0.98);
        }
    }
}
```

## Behavior

### Filter Syntax

As per your requirements:
- **Deselecting all items**: Uses the `status=~option` syntax to remove filters
- **Selecting items one by one**: Uses the `status=+option` syntax to add filters

The implementation works with the existing filter system:
- When clicking "Deselect All", all items are removed from the filter
- When clicking "Select All", all available options are selected
- Individual items can still be toggled by clicking their checkboxes
- The URL hash is automatically updated with the current filter state

### User Experience

1. Click on a multiselect dropdown (Status, Preference, or Potential)
2. At the top of the dropdown, you'll see two buttons:
   - **Select All**: Quickly select all available options
   - **Deselect All**: Quickly remove all selected options
3. Individual options can still be toggled normally
4. The filter counts update automatically
5. URL hash reflects the current filter state

## Files Modified

1. `/workspaces/future-screenshots/projects/app/src/app/shared/filters-bar/filters-bar.component.ts`
2. `/workspaces/future-screenshots/projects/app/src/app/shared/filters-bar/filters-bar.component.html`
3. `/workspaces/future-screenshots/projects/app/src/app/shared/filters-bar/filters-bar.component.less`

## Testing

The implementation was tested to ensure:
- ✅ No compilation errors
- ✅ Select All/Deselect All buttons appear in all three multiselect dropdowns
- ✅ Buttons are properly styled and responsive
- ✅ Clicking buttons updates the filter state correctly
- ✅ Filter changes propagate to the parent component
- ✅ URL hash synchronization works as expected

## Integration Points

The filters-bar component is used in:
- `/workspaces/future-screenshots/projects/app/src/app/admin/moderate/moderate.component.ts` (Content moderation interface)
- `/workspaces/future-screenshots/projects/app/src/app/showcase-ws/showcase-ws.component.ts` (Showcase/workshop interface)

Both components automatically benefit from this enhancement through the exported `FiltersBarComponent` and `FilterHelpers` utilities.
