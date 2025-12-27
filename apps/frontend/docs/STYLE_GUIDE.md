# Frontend Style Guide

## Design System
- Uses Tailwind CSS tokens and custom utility classes defined in `tailwind.config.js`.
- Shared components (`components/ui/*`) encapsulate typography, spacing, and theme variants.

## Layout Conventions
- Dashboards follow a responsive grid (three columns on desktop, single column on small screens).
- Modals and drawers reuse shared primitives; avoid bespoke overlays without accessibility review.

## Accessibility
- Follow WAI-ARIA best practices: meaningful `aria-*` attributes, focus management, keyboard navigation.
- Prefer semantic HTML elements; use screen-reader only text for icons.
- Run Axe or similar tooling before releases.

## Typography & Colour
- Typography scale defined via CSS variables (`--font-display`, etc.).
- Palette aligns with ImpactBridge brand tokens (Tailwind theme). Maintain contrast ratio ≥ 4.5:1.

## Testing Expectations
- React Testing Library assertions should cover class toggles, ARIA roles, and flag states.
- When possible, add visual regression coverage (planned Storybook integration).

## Linting & Formatting
- `npm run lint` leverages ESLint with Next + accessibility plugins.
- Prettier handles code formatting; follow import ordering rules enforced via lint.

Update this guide when introducing new theming primitives or layout systems.
