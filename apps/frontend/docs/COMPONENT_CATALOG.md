# Component Catalog

This catalog lists the key reusable components in the frontend, their purpose, and usage hints.

## Dashboard Components
### `components/dashboard/section-header.tsx`
- Props: `{ title: string; subtitle?: string; action?: ReactNode }`
- Usage: Place at the top of sections to keep consistent typography & optional CTA.
- Example:
```tsx
<SectionHeader
  title="NGO Management"
  subtitle="Review registrations awaiting approval."
  action={<Button>Create NGO</Button>}
/>
```

### `components/dashboard/quick-action-card.tsx`
- Props: `{ title, description, actionLabel, icon: LucideIcon, onClick?, className? }`
- Usage: Highlight next best steps (e.g., “Review NGOs”, “Open reports”).
- Styling: gradient border, subtle hover animation + hover scale.

### Dashboard visualisations (inline helpers in `admin/page.tsx`)
- `AreaChart` & `Sparkline` render lightweight SVG trendlines for analytics hero row and KPI cards.
- Both accept mock data arrays; replace with service results once analytics APIs exist.

### `components/ui/drawer.tsx`
- Controlled slideover used across admin modules (e.g., NGO detail preview).
- Props: `{ open, onClose, title?, description?, children, footer }`
- Handles Escape key + backdrop clicks; auto-resizes for mobile.

### `components/ui/tabs.tsx`
- Lightweight tabs primitive (list/trigger/content) for app router client components.
- NGO drawer uses it to switch between overview, documents, and activity views.

## UI Primitives (shadcn wrappers)
### Buttons – `components/ui/button.tsx`
- Variants: `default`, `outline`, `ghost`
- Accepts `size`, `asChild`

### Input – `components/ui/input.tsx`
- Standard form input with Tailwind styling
- Works with `FormField` wrappers for validation

### Card – `components/ui/card.tsx`
- Composition of `Card`, `CardHeader`, `CardContent`, etc.
- Handy for grouping forms or dashboard content

### Select – `components/ui/select.tsx`
- Wraps Radix UI select; used in register form for role selection

## Patterns
- Forms use `react-hook-form` + `Form` components
- Dashboard uses grid utilities for responsive layout (`grid gap-6 sm:grid-cols-2 xl:grid-cols-4` etc.)
- For new modules, follow `admin/modules` pages: SectionHeader + divider + content box

## Adding New Components
1. Build new shared components under `components/`
2. Prefer composition over ad-hoc Tailwind in pages
3. Document reusable pieces here to help future contributors
4. Update `docs/STYLE_GUIDE.md` if new visual tokens introduced
