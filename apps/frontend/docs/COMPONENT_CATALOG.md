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

### NGO dashboard widgets

- Route: `/dashboard/ngo`.
- Warm gradient hero with `SectionHeader`, `Skeleton`, and CTA buttons.
- `StatCard` helper for four KPI tiles, LineChart + PieChart for donation insights, and QuickActionCard grid for NGO-specific shortcuts.
- Includes empty state helper to handle upcoming data wiring.

### NGO campaigns workspace

- Route: `/dashboard/ngo/campaigns`.
- Reuses SectionHeader CTA, filter toolbar with search + selects, responsive list/table hybrid, status badges, and pagination controls.
- Skeleton loaders and empty state helper maintain a friendly experience while data loads or when no campaigns exist.

### NGO campaign detail surface

- Route: `/dashboard/ngo/campaigns/[id]`.
- Breadcrumb-led layout with action buttons (edit/pause/close/share), stat tiles, and tabs for overview, donations table, media placeholder, and settings form (UI only).
- Skeleton placeholders cover header, KPIs, and tab content while fetching real data.

### NGO document center

- Route: `/dashboard/ngo/documents`.
- Checklist card summarises required uploads with status badges, upload/replace/preview actions, and mock progress indicator.
- Drag-and-drop upload surface and compliance notes sidebar help NGOs stay audit-ready; skeleton and empty/success states included.

### NGO finance components

- Route: `/dashboard/ngo/finance` (NGO finance overview).
- `SummaryCard` helper renders tone-based KPI tiles with Lucide icons across the finance page.
- Finance charts reuse Recharts `BarChart` + `PieChart` with shared tooltip styling and responsive containers.
- `TransactionTable` component provides both desktop table and mobile card presentation with status badges and action menu.

### NGO donations workspace

- Route: `/dashboard/ngo/donations`.
- KPI cards surface total/verified/pending donation metrics using reusable Card helpers.
- Filters include campaign select, status select, full-text search, and mock date range actions.
- Responsive table collapses to stacked cards on mobile with status badges and receipt CTA.
- Includes loading skeleton, empty state CTA, and simulated error state for offline/sync scenarios.

### NGO donor profiles grid

- Route: `/dashboard/ngo/donors`.
- `DonorGrid` cards use Card, Button, Table-like stats to highlight donations, campaign, frequency, and status.
- `AmountRangeControl` offers preset quick filters until slider wiring lands.
- Modal leverages shared `Modal` component with timeline mock, preferred method, average donation, and notes textarea.
- Skeleton + empty state components maintain UX parity during loading.

### NGO team workspace

- Route: `/dashboard/ngo/team`.
- `TeamTable` renders desktop table + mobile cards using Button, Card, and Table primitives.
- `InviteMemberModal` and `EditMemberModal` reuse shared Modal, Select, Switch, Textarea components with tone maps for badges.
- Skeleton + empty state maintain onboarding UX while real data loads.
