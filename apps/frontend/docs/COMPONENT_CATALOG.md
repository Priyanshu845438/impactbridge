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

### NGO billing components

### NGO payout components

### NGO compliance components

### NGO impact components

### Company dashboard components

### Company compliance components

- Route: `/dashboard/company/compliance`.
- `InsightCard` helper renders tone-mapped pill, metric value, and helper label for compliance highlights.
- `ComplianceList` toggles table vs mobile card layouts while sharing filter/search state and navigation links.
- Drawer composes status badge, missing document list, deadline cards, and notes block with follow-up CTA using shared Card/Button primitives.
### Company budget planner components
### Company partner insights components
### Company vendor directory components
### Company audit center components
### Company programme comparison components
### Company impact explorer components
### Company impact forecasting components

- Route: `/dashboard/company/audit-center`.
- Filter row shares Select/Input controls with reset button similar to other company modules.
- `AuditList` toggles table vs mobile cards, reusing ScoreBadge/StatusBadge helpers.
- Drawer combines summary card, breakdown progress bars, findings/actions lists, and download placeholder.
- Skeleton + empty state reuse Card/Skeleton primitives for loading resilience.


- Route: `/dashboard/company/vendors`.
- Filter row reuses Select/Input primitives with reset button.
- Vendor cards leverage Card with hover elevation, gradient border, badge tags, and rating helper.
- Drawer composes service/client/certification sections plus contact block using shared badges.
- Skeleton grid + empty card maintain loading/empty resilience.






- Route: `/dashboard/company/impact-stories`.
- `StoryCard` uses Card + Button primitives with soft hover lift, badge overlays, and mock image thumbs (to swap for CMS assets later).
- Drawer leverages shared Drawer component, outcome badges, and before/after chips styled via Tailwind utilities.
- FilterPill helper reuses button tokens for theme/NGO toggles with active tones.

- Route: `/dashboard/company/impact-benchmarks`.
- KPI card component extends Card with dual value display, badge delta, and gradient progress indicator.
- Shared `describeMetric` helper formats currency/percent/score units and styles ahead/lagging tones.
- BarChart + RadarChart pair reuse existing Recharts wrappers for company vs industry comparisons.

- Route: `/dashboard/company/comparison`.
- `ComparisonGrid` renders responsive metric columns using grid CSS while `MultiSelect` handles custom multi-select toggle with check indicators.
- Recharts bar/line/radar compositions reuse shared colour palette to visualise budget, progress, and compliance.
- Insights card consumes mock analytics to produce highlight bullets; empty state guides users to select programmes.


- Route: `/dashboard/company/impact-explorer`.
- `FiltersPanel` reuses Button-based custom selects for region/age/gender/outcome controls with Clear action.
- `MapPlaceholder` provides interactive SVG dots, tooltip, and region list for mock geographic impact exploration.
- Detail drawer surfaces outcome distribution bars and recent activities, mirroring other sheet/drawer UX patterns.


- Route: `/dashboard/company/impact-forecast`.
- BudgetControl stack blends preset chip buttons, slider, and numeric input bound to a multiplier state for live recalculation.
- `buildForecast` produces 12-month area chart data; scenario cards share mock metrics across optimistic/expected/guardrail cases.
- Insight blocks and methodology card use shared Card/Button primitives to explain assumptions and highlight action cues.


- Route: `/dashboard/company/partner-insights`.
- KPI row reuses Card with gradient overlays and Lucide icons for quick metrics.
- Filters use Select + range input to keep state local; no backend wiring yet.
- `PartnerList` toggles table/cards with shared LogoPlaceholder, ProgressBar, and ComplianceBadge helpers.
- Skeleton + empty state maintain UX parity with other company modules.


- Route: `/dashboard/company/budget-planner`.
- `SummaryRow` reuses Card + badge styling for CSR totals; tone reacts to remaining budget sign.
- `AllocationList` switches between table and mobile card layouts while reusing ProgressBar helper.
- Drawer leverages numeric input + range slider for mock allocation edits; modal mirrors shared Select/Input UI.


- Route: `/dashboard/company/compliance`.
- Insight cards reuse `Card` + `Badge` primitives with tone classes for quick compliance KPIs.
- `ComplianceList` swaps between table (desktop) and card layout (mobile) using shared Button and Badge components.
- Drawer leverages `components/ui/drawer` to surface status badge header, missing document alerts, deadline cards, and notes summary.
- Upcoming deadlines sidebar is Card-based with icon chips and badge tone hints for fast scanning.

### Company NGO directory components

### Company NGO profile components

- Route: `/dashboard/company/programmes`.
- `CompanyProgrammeCard` component showcases banner imagery, NGO owner initials, SDG tags, and status badge with CTA.
- Includes skeleton grid helper and empty state card for filtered views.
- Hooks include `useDebouncedValue` for search responsiveness.

- Route: `/dashboard/company/programmes/[id]`.
- Uses `StatPill`, tabbed layout, timeline rows, document list, updates feed, and right-rail cards (`ContactCard`, `RelatedProgrammes`, `TagCloud`).
- Shares skeleton + error components with cards for fallback states.

- Route: `/dashboard/company/donations`.
- `SummaryCard`, `DonationsTable`, `FilterSelect`, and sidebar `FilterChip` helpers deliver filters + responsive layouts (table desktop, cards mobile).
- Includes skeleton, empty, and error state cards; ties into mock dataset in `app/dashboard/company/donations/mock-data.ts`.

- Route: `/dashboard/company/reports`.
- `ReportsSummaryCard` component powers KPI tiles; page includes filter selects, table, and export modal overlay.
- Loading skeleton, empty, and error cards align with donation modules for consistent UX.

- Route: `/dashboard/company/ngos/[ngoId]`.
- Reuses SectionHeader, card stats, Tabs, and detail side panel to mirror CSR partner insights.
- Includes skeleton fallback, empty states for campaigns/documents, and modal-ready CTA buttons.

- Route: `/dashboard/company/ngos`.
- Uses Card grid with inline badges, tag chips, and modal detail drawer.
- Search and select filters reuse shadcn Input/Select components.
- Skeleton grid mirrors card layout and empty state aids onboarding guidance.

- Route: `/dashboard/company`.
- Reuses `KpiCard`, QuickActionCard, and Recharts wrappers for CSR-specific analytics.
- Charts share skeleton fallbacks and responsive containers for quarterly spend, category allocation, and programme trend.
- Activity feed leverages timeline styling with CSR-centric metadata.

- Route: `/dashboard/ngo/impact`.
- `KpiCard` helper reused for impact stats with tone-based icons.
- Charts leverage Recharts line/pie/bar wrappers with skeleton placeholders and responsive containers.
- Impact stories grid uses Card + modal for read-more flow with drag zoom image transitions.

- Route: `/dashboard/ngo/compliance`.
- Checklist groups reuse Card + badge styling with modal upload flow and status filter select.
- Alerts card highlights expiring/missing documents; timeline uses icon-tagged list with refresh CTA.
- Modal leverages shared Button + upload placeholder with mock processing state.

- Route: `/dashboard/ngo/payouts`.
- `PayoutTable` reuses Table primitive with status badges, skeletons, and pagination footer.
- Request modal leverages shared Modal + Input/Textarea components with loader state on submit.
- Detail drawer combines timeline list, download card, and destructive CTA using existing button variants.

- Route: `/dashboard/ngo/billing`.
- Billing tabs use shadcn Tabs with glassmorphism styling shared across NGO modules.
- `InvoiceTable` leverages Table + status pills and invokes the shared Modal for invoice preview.
- Skeleton + Empty state helpers mirror other NGO financial surfaces for consistent UX.

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
