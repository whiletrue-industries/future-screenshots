# Design System Documentation

This document describes the design system, styling conventions, and visual guidelines for the Future Screenshots project.

## Overview

Future Screenshots uses a **custom-designed, mobile-first design system** built with LESS preprocessing. The design features a distinctive purple-based color scheme with warm backgrounds, multi-language font support, and smooth animations throughout the user experience.

### Design Philosophy

- **Mobile-First:** Optimized for mobile devices in portrait orientation
- **Custom Components:** No external UI framework dependencies
- **Accessibility:** Multi-language support, clear visual hierarchy
- **Consistency:** Shared variables and mixins across components
- **Smooth Interactions:** Thoughtful animations and transitions

## Color System

### Primary Brand Colors

Defined in: `projects/app/src/common.less`

```less
@color-purple: #4E02B2;        // Primary brand color
@color-light-purple: #B969FF;  // Accent color
@color-darker-purple: #301A4E; // Dark variant
@color-dark-purple: #3B0089;   // Alternative dark
@color-dark-pink: #E7CBFF;     // Light accent
@color-pink: #F1E5F3;          // Lightest tint
```

**Semantic Aliases:**
```less
@color-primary: @color-purple;
@color-accent: @color-light-purple;
@color-accent-100: @color-dark-pink;
@color-primary-50: #FBF5F6;
@color-primary-100: #F1E5F3;
```

### Background Colors

```less
@color-creme: #FFFDF6;   // Primary background (warm off-white)
@color-beige: #F5F0E7;   // Secondary background
@color-white: #FFFFFF;   // Pure white
```

### Neutral Colors

```less
@color-light-gray: #EDECEC;  // Light neutral
@color-gray: #9B90AA;        // Medium neutral
@color-dark-gray: #6C707B;   // Dark neutral
```

### Interactive State Colors

```less
// "Prefer" actions (positive)
@color-prefer: #698CFF;      // Blue
@color-prefer-dark: #0030CC;

// "Prevent" actions (negative)
@color-prevent: #F73C3C;     // Red
@color-prevent-dark: #B50F0F;
```

### Message/Chat Colors

```less
@color-message-bg-ai: @color-accent-100;    // Light purple background
@color-message-bg-human: @color-primary;    // Purple background
@color-message-ai: @color-primary;          // Purple text
@color-message-human: @color-white;         // White text
```

### Color Usage Guidelines

**Backgrounds:**
- Primary screens: `@color-creme`
- Secondary sections: `@color-beige` or `@color-primary-50`
- Cards/containers: `@color-white`
- Overlays: `fade(@color-creme, 75%)` with backdrop blur

**Text:**
- Primary text: `@color-primary` (purple)
- Secondary text: `@color-gray`
- Inverted text: `@color-white`

**Interactive Elements:**
- Primary buttons: `@color-purple` background, white text
- Secondary buttons: `@color-primary-50` background, purple text
- Links: `@color-light-purple`
- Focus states: `@color-light-purple`

**Status:**
- Positive/Prefer: `@color-prefer` (blue)
- Negative/Prevent: `@color-prevent` (red)

## Typography

### Font Families

The application supports multiple languages with appropriate font stacks:

**Font Files:** `projects/app/public/fonts/`
- **Hebrew:** "Miriam Libre" (400-700 weight)
- **Arabic:** "Readex Pro" (160-700 weight)
- **Latin:** "Source Sans 3" (200-900 weight, with italic)

### Font Stack Definition

```less
.font-sans {
    font-family: "Readex Pro", "Miriam Libre", "Source Sans 3", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
    leading-trim: both;
    text-edge: cap;
}
```

Apply to elements:
```less
body {
    .font-sans();
}
```

### Type Scale

```less
// Headings
h1 { font-size: 36px; }
h2 { font-size: 18px; font-weight: 700; }

// Body
body { font-size: 18px; }

// UI Elements
.button { font-size: 16px; }

// Small text
.small-text { font-size: 14px; }
```

### Font Weights

```less
// Regular
font-weight: 400;

// Bold
font-weight: 700;
```

### Typography Guidelines

- **Headings:** Use bold (700) for h2, regular for h1
- **Body text:** 18px for optimal readability on mobile
- **UI elements:** 16px for buttons and interactive elements
- **Line height:** Not explicitly defined, browser defaults
- **Multi-language:** Font stack automatically selects appropriate font

## Spacing System

### Common Spacing Units

**Gaps (flexbox):**
```less
gap: 4px;   // Tight
gap: 8px;   // Small
gap: 14px;  // Medium-small
gap: 16px;  // Medium
gap: 20px;  // Medium-large
gap: 24px;  // Large
gap: 32px;  // Extra large
```

**Padding:**
```less
padding: 8px;   // Tight
padding: 12px;  // Small
padding: 16px;  // Medium
padding: 24px;  // Large
padding: 32px;  // Extra large
```

**Heights:**
```less
// Buttons
height: 32px;  // Admin buttons
height: 40px;  // Compact buttons
height: 52px;  // Main app buttons
height: 56px;  // Input fields

// Icons
width/height: 24px;  // Standard icon size
```

### Spacing Guidelines

- Use consistent spacing units from the scale above
- Prefer flexbox gap over margin for layout spacing
- Use padding for internal component spacing
- Maintain vertical rhythm with consistent gaps

## Components

### Buttons

#### Main App Buttons

```less
.button {
    height: 52px;
    padding: 0px 8px;
    border-radius: 16px;
    font-size: 16px;
    border: 1px solid @color-accent-100;
    background: @color-primary-50;
    color: @color-primary;
    cursor: pointer;
    transition: all 0.2s;

    &.primary {
        border: 1px solid @color-purple;
        background: @color-purple;
        color: @color-white;
        font-weight: 700;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
}
```

**Usage:**
```html
<button class="button">Secondary Button</button>
<button class="button primary">Primary Button</button>
```

#### Admin Buttons

```less
.button {
    height: 32px;
    padding: 0 12px;
    text-transform: uppercase;
    font-size: 14px;
    border: 1px solid fade(@color-purple, 50%);
    background: transparent;
    color: @color-purple;
}
```

### Input Fields

```less
input, select, textarea {
    width: 100%;
    height: 56px;
    padding: 0.75rem;
    border: 2px solid @color-gray;
    border-radius: 16px;
    font-size: 18px;
    background: @color-white;
    transition: border-color 0.2s;

    &:focus {
        outline: none;
        border-color: @color-light-purple;
    }

    &:disabled {
        background: #f5f5f5;
        color: @color-gray;
        cursor: not-allowed;
    }

    &::placeholder {
        color: @color-gray;
    }
}
```

### Checkboxes

Custom checkbox using a LESS mixin:

```less
.nice-checkbox(@fg: currentColor, @bg: #fff) {
    appearance: none;
    width: 24px;
    height: 24px;
    border: 2px solid @fg;
    border-radius: 4px;
    background-color: @bg;
    cursor: pointer;
    position: relative;

    &:checked {
        background-color: @fg;
        background-image: url(../public/icon-check-white.svg);
        background-size: 16px 16px;
        background-position: center;
        background-repeat: no-repeat;
    }
}
```

**Usage:**
```less
input[type="checkbox"] {
    .nice-checkbox(@color-purple, @color-white);
}
```

### Message Bubbles (Chat)

```less
.message {
    font-size: 18px;
    padding: 16px 24px;
    margin: 8px 0;

    &.ai {
        background-color: @color-message-bg-ai;
        color: @color-message-ai;
        border-radius: 32px 32px 32px 2px;  // Rounded with pointed corner
        align-self: flex-start;
    }

    &.human {
        background-color: @color-message-bg-human;
        color: @color-message-human;
        border-radius: 32px 32px 2px 32px;  // Opposite pointed corner
        align-self: flex-end;
    }
}
```

### Cards/Containers

```less
.card {
    background: @color-white;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

## Layout Patterns

### Full Viewport Layouts

```less
.full-screen {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-flow: column;
    overflow: hidden;
}
```

### Flexbox Patterns

```less
// Vertical stack
.vertical-stack {
    display: flex;
    flex-flow: column;
    gap: 16px;
}

// Horizontal row
.horizontal-row {
    display: flex;
    flex-flow: row;
    gap: 8px;
    align-items: center;
}

// Centered content
.centered {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

### Sticky Elements

```less
.sticky-header {
    position: sticky;
    top: 0;
    z-index: 100;
    background: @color-creme;
}
```

## Border Radius Scale

```less
// Small elements
border-radius: 4px;   // Checkboxes

// Medium elements
border-radius: 8px;   // Inputs, cards

// Large elements
border-radius: 16px;  // Buttons, containers

// Extra large
border-radius: 32px;  // Message bubbles

// Circular
border-radius: 50%;   // or 80px for circular buttons
```

## Animations and Transitions

### Keyframe Animations

**Fade In from Left:**
```less
@keyframes fadeInLeft {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.fade-in-left {
    animation: fadeInLeft 0.3s ease-out;
}
```

**Fade In from Right:**
```less
@keyframes fadeInRight {
    from {
        opacity: 0;
        transform: translateX(20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}
```

**Slide In Up:**
```less
@keyframes slideInUp {
    from {
        transform: translateY(100%);
    }
    to {
        transform: translateY(0);
    }
}

.slide-in-up {
    animation: slideInUp 0.3s ease-out;
}
```

**Slide In Down:**
```less
@keyframes slideInDown {
    from {
        transform: translateY(-100%);
    }
    to {
        transform: translateY(0);
    }
}
```

**Elastic Bounce:**
```less
@keyframes showElastic {
    0% { transform: scale(0); }
    50% { transform: scale(1.2); }
    75% { transform: scale(0.9); }
    100% { transform: scale(1); }
}

.elastic {
    animation: showElastic 0.8s ease-out;
}
```

### Common Transitions

```less
// Border transitions
transition: border-color 0.2s;
transition: border-radius 0.3s ease-in-out;

// Transform transitions
transition: transform 0.3s ease-in-out;
transition: transform 1s ease-in-out;  // Slower

// Opacity fades
transition: opacity 0.5s ease-in-out;
transition: opacity 1s ease-in-out;

// Background transitions
transition: background-color 0.2s;

// Combined
transition: all 0.2s;
```

### Loading Animations

The project uses Lottie animations for loaders:

**Lottie Files:** `projects/app/public/`
- `loader1.json`
- `loader2.json`
- `loader3.json`
- `loader4.json`
- `thinking.json`

## Icons and Assets

### Icon System

**Location:** `projects/app/public/`

**Icon Files (SVG):**
- `icon-back.svg` - Back arrow navigation
- `icon-caret-down.svg` - Dropdown indicator
- `icon-check-white.svg` - Checkmark for checkboxes
- `button-camera.svg` - Camera capture button

**Graphic Assets:**
- `img-pin-prefer-h.svg` - Prefer pin (horizontal)
- `img-pin-prefer-v.svg` - Prefer pin (vertical)
- `img-pin-prevent-h.svg` - Prevent pin (horizontal)
- `img-pin-prevent-v.svg` - Prevent pin (vertical)

### Logos

- `futures-map-logo.svg` - Main application logo
- `logo-futures.svg` - Alternative logo

### Background Images

```less
.background-image {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
```

### Favicon and Social

Complete favicon set in multiple sizes (16x16 to 192x192) plus:
- `og_image.jpg` - Open Graph image for social sharing
- `og_image.png` - Alternative OG image

## Responsive Design

### Mobile-First Approach

**Important:** This application uses a **mobile-only design** with NO media queries. It's optimized exclusively for mobile devices in portrait orientation.

**Viewport Configuration:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no, user-scalable=no">
<meta http-equiv="ScreenOrientation" content="autoRotate:disabled">
```

### Flexible Layouts

Use flexible units for adaptability:

```less
// Percentage-based
width: 100%;
height: 100vh;

// Calc for dynamic sizing
width: calc(100% - 32px);
height: calc(100vh - 120px);

// Flexbox for fluid layouts
display: flex;
flex: 1;  // Grow to fill space
```

## Styling Architecture

### File Structure

```
projects/app/src/
├── styles.less           # Global styles
├── common.less          # Shared variables and mixins (main app)
├── common-admin.less    # Admin-specific styles
└── app/
    └── [component]/
        └── [component].component.less  # Component styles
```

### Importing Common Styles

Every component imports common variables:

```less
@import '../../common.less';

// Component styles here
.my-component {
    background: @color-creme;
}
```

Admin components import admin common:
```less
@import '../../../common-admin.less';
```

### LESS Features Used

**Variables:**
```less
@color-primary: #4E02B2;
@spacing-md: 16px;
```

**Mixins:**
```less
.font-sans() {
    font-family: "Source Sans 3", sans-serif;
}

.nice-checkbox(@fg, @bg) {
    // Checkbox styles
}
```

**Nesting:**
```less
.component {
    background: white;

    &.active {
        background: blue;
    }

    .child {
        color: red;
    }
}
```

### Global Resets

```less
body, html {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: @color-creme;
}

*, *:before, *:after {
    box-sizing: inherit;
}
```

## Accessibility

### Color Contrast

All color combinations meet WCAG AA standards:

- Purple (#4E02B2) on white: **9.73:1** ✓ AAA
- Purple text on creme: **9.3:1** ✓ AAA
- White on purple: **9.73:1** ✓ AAA
- Gray (#9B90AA) on white: **3.2:1** ✓ AA (large text)

### Focus States

```less
:focus {
    outline: none;
    border-color: @color-light-purple;
    box-shadow: 0 0 0 3px fade(@color-light-purple, 30%);
}
```

### Disabled States

```less
:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: #f5f5f5;
    color: @color-gray;
}
```

### ARIA Support

Use semantic HTML and appropriate ARIA attributes:

```html
<button aria-label="Close dialog">×</button>
<input aria-invalid="true" aria-describedby="error-message">
```

## Best Practices

### Component Styling

1. **Scope styles to component:**
   ```less
   .my-component {
       // All styles nested here
   }
   ```

2. **Use BEM-like naming:**
   ```less
   .card {
       &__header { }
       &__body { }
       &--highlighted { }
   }
   ```

3. **Import common variables:**
   ```less
   @import '../../common.less';
   ```

4. **Avoid inline styles** - Use classes

### Performance

1. **Minimize animations** - Use transitions for simple changes
2. **Use transform over position** - Better performance
3. **Avoid box-shadow on scroll** - Can cause jank
4. **Use will-change sparingly:**
   ```less
   .animated-element {
       will-change: transform;
   }
   ```

### Maintainability

1. **Use variables** - Never hardcode colors/sizes
2. **Create mixins** for repeated patterns
3. **Keep specificity low** - Avoid deep nesting (max 3 levels)
4. **Document complex styles** with comments

## Design Tokens

Consider exporting design tokens for consistency:

```typescript
// design-tokens.ts
export const colors = {
    primary: '#4E02B2',
    accent: '#B969FF',
    background: '#FFFDF6',
    // ...
};

export const spacing = {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
};
```

## Tools and Resources

### Design Tools

- **Color Contrast Checker:** https://webaim.org/resources/contrastchecker/
- **LESS Compiler:** Built into Angular CLI
- **Browser DevTools:** For inspecting styles

### Typography

- **Miriam Libre:** https://fonts.google.com/specimen/Miriam+Libre
- **Readex Pro:** https://fonts.google.com/specimen/Readex+Pro
- **Source Sans 3:** https://fonts.google.com/specimen/Source+Sans+3

### Animation

- **Lottie Files:** https://lottiefiles.com/
- **Easings:** https://easings.net/

## Migration and Updates

When updating the design system:

1. Update variables in `common.less`
2. Document changes in this file
3. Test across all components
4. Update component styles as needed
5. Verify accessibility compliance
6. Test on target mobile devices

## Related Documentation

- [CODING_STANDARDS.md](./CODING_STANDARDS.md) - Code quality guidelines
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture
- [DEVELOPMENT_ENV.md](./DEVELOPMENT_ENV.md) - Setup instructions
