# Frontend Style Guide

## Brand Palette
- Primary Blue: `#0A2540`
- Highlight Blue: `#4A6DFB`
- Accent Emerald: `#10B981`
- Supporting Slate tones via Tailwind slate scale

## Typography
- Font: Inter (Next.js default; loaded via global layout)
- Heading Scale via Tailwind tokens:
  - H1: `text-heading-1`
  - H2: `text-heading-2`
  - Section Header / card titles: `text-heading-3`
- Body text: `text-body text-slate-700`
- Supporting text: `text-small` for descriptions, `text-caption` for meta/labels
- When refactoring legacy screens, replace raw `text-sm`/`text-xs` classes with the tokens above to preserve the unified rhythm.

## Layout Rules
- Shell: `flex w-full h-screen` with gradient background
- Cards: `rounded-3xl` or `rounded-2xl`, `bg-white/90`, `backdrop-blur`, subtle shadows
- Responsive Padding:
  - Outer: `p-6 lg:p-10`
  - Cards: `p-6 lg:p-8`
  - Mobile adjustments via `max-[480px]:` utilities

## Components Toolkit
- Buttons: `shadcn/ui` `Button` variants (`default`, `outline`, `ghost`)
- Inputs: `components/ui/input.tsx` + `FormField` wrappers from shadcn
- Select: `components/ui/select.tsx`
- Cards: `components/ui/card.tsx`
- Dashboard specific: `QuickActionCard`, `SectionHeader`

## Imagery
- Auth background: `/images/login_signup_bg.webp`
- Additional imagery should live under `public/images/` and be referenced as `/images/<name>`

## Accessibility
- Ensure color contrast meets WCAG AA (check with accessible palette)
- Buttons/links should include descriptive text (avoid icon-only without `aria-label`)
- Maintain focus states on interactive elements (Tailwind ring utilities)

## Interaction Patterns
- Sidebar: collapsible groups with chevron indicators
- Cards: small hover scale + shadow change to indicate interactivity
- Forms: inline validation messages using shadcn `FormMessage`

## Theming Tips
- Use Tailwind config to extend colors if more tokens needed (`tailwind.config.js`)
- For gradients, prefer `bg-gradient-to-br from-... to-...` patterns seen in `globals.css`
- Keep new components close to existing styling for consistency; reference `QuickActionCard` for guidance

## Interaction Guidelines
- Cards: apply `hover:scale-[1.01] hover:shadow-md transition-all` to provide subtle lift feedback.
- Buttons: base class includes `active:scale-[0.98] active:opacity-90` for consistent press feedback.
- Drawers & dropdowns: use Tailwind `animate-in`, `slide-in-from-right`, and custom accordion animations (`accordion-down`/`accordion-up`) for smooth open/close states.
- Empty states: use `EmptyState` component (icon optional) with title, helper text, and single CTA to maintain consistency across modules.
- Loading: rely on page-level skeletons plus the global top progress bar to signal transitions.
- Focus states: all interactive components should use the shared emerald ring (`focus-visible:ring-brand/70 focus-visible:ring-offset-2`) with dark-mode offset adjustments for consistent keyboard accessibility.
