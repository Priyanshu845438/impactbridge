# Component Catalog

This catalog lists the key reusable components in the frontend, their purpose, and usage hints.

## Dashboard Components
### `components/dashboard/section-header.tsx`
- Consistently handles spacing + CTA placement across pages.
- Props: `{ title: string; subtitle?: string; action?: ReactNode }`
- Usage: Place at the top of sections to keep consistent typography & optional CTA.

### `components/dashboard/quick-action-card.tsx`
- Props: `{ title, description, ctaLabel, href, icon, className }`
- Highlight next steps (e.g., Review NGOs, Open reports).
- Storybook example available (light/dark, hover, disabled) with Percy snapshot coverage planned.

### `components/charts/impact-trend-chart.tsx`
- Recharts line chart with metric toggle and first-load animation.
- Ensure parent sets `min-h-[280px]` wrapper.

### Command palette
- Inline component inside `app/dashboard/layout.tsx`; provides global quick actions (⌘/Ctrl+K) with fuzzy search.
- Unit tests pending harness work.

### Action Center
- Sidebar quick actions (`ActionItem` helper within programme detail page).
- Toast-driven placeholders; ready for wiring to backend.
- Assigned NGO tab now leverages an optimistic assignment flow with graceful rollback and offline messaging.
- Dashboard onboarding overlay cleaned: ensures stable JSX and memoised handlers.

### `Breadcrumb`
- Path: `components/ui/breadcrumb.tsx`
- Props: `items: { label: string; href?: string }[]`, optional `className`.
- Handles truncation for long labels, highlights current page, supports keyboard focus and dark mode.

### `CommandHints`
- Path: `components/ui/command-hints.tsx`
- Props: `{ hint?: { message: string }; routeKey?: string; delay?: number }`
- Shows subtle, timed hints after inactivity with per-route dismissal persisted in `localStorage`.

## UI Primitives (shadcn wrappers)
- Buttons, Inputs, Cards, Selects, Tabs, Drawer, Skeletons.
- Storybook stories cover Button and Input in light/dark modes.

### `Button`
- Variants: `default`, `outline`, `ghost`.
- Storybook: `Components/Button` – default/hover/disabled states; expect Percy snapshot warnings until Chromium libs installed.

### `Input`
- Standard text input.
- Storybook: `Components/Input` – default/focus/disabled for both light/dark themes.

### `QuickActionCard`
- Dashboard CTA card with icon + link (see Storybook).

### Offline UX helpers
- `hooks/use-online-status.ts`: centralised online/offline signal with event listeners.
- `providers/offline-status-provider.tsx`: surfaces status context, queues offline actions, and emits toasts on reconnect.
- `components/ui/tooltip.tsx`: Radix-backed tooltip provider used to explain disabled actions when offline.

## Storybook & Percy
- Stories reside in `/stories/`.
- Percy config: `tests/percy.config.json` (includes `include` glob per spec). Percy CLI currently fails because headless Chromium system libraries (`libgobject-2.0.so.0` etc.) are missing; install via apt before expecting green runs.

## Adding New Components
1. Build shared components under `components/`.
2. Document usage here and add Storybook story.
3. Update docs when components appear in dashboards.
4. Add Percy snapshots once Storybook story exists and system libraries are ready.

Refer to `docs/STYLE_GUIDE.md` for typography/spacing tokens.

### GlobalSearchSpotlight
- Full-screen spotlight search overlay supporting keyboard navigation, fuzzy matching, and recents.


### Donor management table
- Reuses SectionHeader, filters, table, and skeleton components for donor listings.


### Donor Detail Components
- Reused summary cards, tab panels, and tables for donor profiles with skeleton states.

### Donation history table
- Uses shared filters, table, modal, and skeleton components for platform-wide donation tracking.


### Campaign management table
- Mirrors donor/campaign tables with status badges, modal triggers, and skeleton fallsbacks.


### Campaign detail components
- Summary cards, donations table, media placeholders, and settings controls tailored for campaign workflows.


### Reports dashboard components
- Summary tiles, chart skeleton wrapper, and analytics card helper for the reporting module.

### Donation receipt components
- Detail rows, preview card, and action controls for the donation receipt screen.

### Audit log surface
- Route: `/dashboard/admin/audit-logs`.
- Shares SectionHeader, filters, table, skeleton, and Sheet drawer.
- Includes contextual badges, device/IP metadata, and export CTA placeholder.

### System settings surface
- Route: `/dashboard/admin/settings`.
- Combines SectionHeader, Card, Select, custom Switch, summary sidebar, and toast-driven Save action.
- Includes skeleton loader and upload placeholders for branding assets.
