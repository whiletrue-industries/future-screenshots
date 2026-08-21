# Design Draft

## Status

- **State:** Draft
- **Scope:** UI/UX consistency plan for Future Screenshots
- **Source inputs:** Issue prompt + existing project documentation/code conventions

## Problem Statement

The project has strong existing design guidance (`documentation/DESIGN_SYSTEM.md`), but implementation can still drift across routes and feature surfaces (scanner, discuss, showcase, admin). We need a practical design draft that is easy to apply during implementation and helps harden consistency.

## Goals

1. Keep the visual language consistent across all product areas.
2. Align implementation with existing tokens, spacing, typography, and motion rules.
3. Improve accessibility and reduce style regressions over time.
4. Provide an actionable checklist for feature work and review.

## Non-Goals

- Replacing the current brand palette or typography stack.
- Introducing a new UI framework.
- Redesigning product flows end-to-end in this draft.

## Current Design Baseline (from codebase)

- **Platform:** Angular 19, standalone components, mobile-first styling.
- **Style system:** LESS-based tokens and shared styles (`projects/app/src/common.less`), documented in `documentation/DESIGN_SYSTEM.md`.
- **Primary experience surfaces:** map/scanner/discuss/showcase/admin.
- **Accessibility baseline:** WCAG AA is required in coding standards.

## Design Principles (Implementation-Oriented)

1. **Token-first styling:** Use semantic variables; avoid hardcoded colors/sizes.
2. **Mobile-first layout:** Start with portrait/mobile constraints, then scale up.
3. **Predictable spacing:** Use shared spacing scale and consistent container rhythm.
4. **Motion with restraint:** Short, meaningful transitions; respect reduced-motion.
5. **Accessible by default:** Focus visibility, contrast, readable type, keyboard support.
6. **Cross-surface consistency:** Shared button/form/card behavior across app/showcase/admin.

## Proposed Consistency Contract

All new or updated UI should satisfy:

- Uses existing color/spacing/typography tokens.
- Uses shared component patterns for primary controls (buttons, inputs, cards, modals).
- Meets WCAG AA checks (including keyboard and focus handling).
- Supports i18n layout behavior (LTR/RTL and variable text length).
- Avoids one-off style overrides unless documented and justified.

## Hardening Recommendations

### 1) Token Governance

- Consolidate repeated literal values into semantic tokens when encountered.
- Prefer semantic aliases (`primary`, `surface`, `accent`, etc.) over raw brand constants in feature styles.
- Add a short “new token decision” rule: reuse first, add second, hardcode never.

### 2) Shared UI Pattern Layer

- Ensure common interactive elements (buttons, inputs, empty states, pills, chips) use shared class/mixin patterns.
- Document approved variants and prohibited ad-hoc variants.
- Keep style specificity low to reduce override chains.

### 3) Accessibility Guardrails

- Enforce visible focus states across all interactive controls.
- Validate contrast for text/icons on all semantic backgrounds.
- Apply reduced-motion fallback for all non-essential animations.
- Add explicit review step for keyboard traversal in map/showcase/admin flows.

### 4) Responsive and Localization Hardening

- Verify core screens at mobile breakpoints first, then desktop.
- Add RTL checks for key routes where directional layout matters.
- Avoid fixed-width text containers that break with translated content.

### 5) Design QA and Review Workflow

- Add a lightweight PR checklist item set:
  - Token usage verified
  - Spacing/typography scale respected
  - Focus/contrast checked
  - Mobile + one desktop viewport validated
- Capture before/after screenshots for visible UI changes.

### 6) Regression Prevention

- For high-change surfaces, add visual snapshot coverage over time (prioritized by risk).
- Keep component-level examples (or reference screenshots) for canonical variants.

## Rollout Plan

1. Apply this consistency contract to new feature work immediately.
2. During touchpoints in existing features, opportunistically remove local style drift.
3. Track recurring inconsistencies and promote them into shared tokens/patterns.
4. Revisit this draft after 2–3 feature cycles and convert to a finalized design process doc.

## Success Criteria

- Fewer one-off style exceptions in feature PRs.
- Faster review cycles due to clearer design expectations.
- Reduced accessibility defects in UI changes.
- More uniform look-and-feel across scanner/discuss/showcase/admin surfaces.

