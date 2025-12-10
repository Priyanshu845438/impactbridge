# ImpactBridge Dashboard Overview

## Purpose

The admin/NGO/company/donor workspaces provide a central home for compliance tasks, campaign oversight, and engagement metrics. The current implementation is a polished skeleton ready to be wired into backend APIs while already conveying the brand look & feel.

## Shared Layout (`app/dashboard/layout.tsx`)

- **Auth guard**: consumes `useAuth()` and redirects to `/login` if token missing.
- **Sidebar**: 260px fixed panel on desktop with nav items derived from `lib/nav-menu.ts`; filters links per user role, supports collapsible admin modules, and is fully scrollable. Menu groups follow a professional sequence for quicker discovery. Links prefetch routes and trigger a fade animation on navigation.
- **Header**: sticky top bar with brand mark, centered spotlight trigger that opens the full-screen global search (⌘/Ctrl + K) covering users/NGOs/companies/programmes/documents, notification bell (badge + desktop popover + mobile sheet), command palette quick actions, theme toggle (light/dark/system), locale switcher in profile drawer, and profile quick-actions.
- **Smart command hints**: lightweight helper surfaced after 5s of inactivity with contextual guidance (e.g., ⌘K reminder on dashboard, CSR filter prompt on company list, drag/drop tip inside NGO documents). Dismissal is stored per route via `localStorage`.
- **Main content**: `flex-1` scrollable region with gradient background, consistent padding, Suspense wrapper + skeleton fallback, and route progress bar integration (via `next-nprogress-bar`) to prevent white flashes.
- **Command palette**: modal overlay providing quick navigation suggestions with keyboard support. Unit tests pending until Jest harness exists (see docs/TODO).
- **Smart suggestions + action center**: contextual cards and quick-action sidebar exposed on large screens, collapsing gracefully on mobile.
- **Storybook + Percy**: Buttons, Inputs, and QuickActionCards have live stories; Percy snapshots guard against style regressions (currently blocked by missing system libraries—see TODO).
- **Mobile**: hamburger toggles drawer sidebar; notifications open via sheet; Action Center collapses by default.

## Admin Dashboard (`app/dashboard/admin/page.tsx`)

- Session-scoped welcome toast via `sessionStorage` guard.
- 650 ms skeleton delay masking initial data load (swap with real async when APIs arrive).
- Analytics hero row: composed `OverviewChart` (bar + line), KPI stat cards with `MicroBar` sparklines, impact trend chart component, and the new Storybook stories cover these card/button primitives for reference.
- CSR submissions visual: compact bar chart with min-height wrapper to avoid Recharts warnings.
- Quick action grid plus **Smart Suggestions** panel offering mock “Take action” buttons.
- Recent activity timeline and profile drawer integration.
- Dark mode-friendly backgrounds, icons, and text colours using shared tokens.

## Admin Modules (`app/dashboard/admin/modules/*`)

### NGO workspace

- Search, multi-filter controls, sorting, pagination, and responsive layouts for both table and card views.
- Detail drawer with overview/documents/activity tabs, collaboration sidebar, due-diligence timeline, and access control modal hooks.
- Command palette shortcuts and action toasts help reviewers move faster.

### NGO document review (`app/dashboard/admin/ngos/[id]/documents`)

- Split document preview with status workflow, comment stream, tags, activity log, and access modal.
- Drag-and-drop hint surfaced via smart command hints; breadcrumb clarifies navigation depth.

### Company workspace (`app/dashboard/admin/companies`)

- Filterable company roster, modal stub for onboarding, and profile pages with CSR contribution snapshot, linked NGOs, and breadcrumbs.

### Company programme detail (`app/dashboard/admin/company/[companyId]/programmes/[programmeId]`)

- Summary cards, milestones tab with list/timeline toggle, assign NGO workflow (optimistic + offline aware), documents/comments tabs, progress insights, and Action Center sidebar.

### Donor management (`/dashboard/admin/donors`)

- Admin list with search, filters (status/location), pagination, skeleton loaders, and responsive mobile cards.

### Donor profile (`/dashboard/admin/donors/[id]`)

- Header with status badge, contribution summary cards, tabs for profile info, donation history, and relationship notes with draft-saving affordances.

### Donations ledger (`/dashboard/admin/donations`)

- Platform-wide donation tracker with search, multi-filters (status/mode/donor/NGO/company), pagination, skeleton state, and receipt modal placeholder.

### Campaign management (`/dashboard/admin/campaigns`)

- Campaign roster mirroring donor/NGO list UX with quick filters, search, pagination, skeleton rows, and create-campaign modal stub.

### Campaign detail (`/dashboard/admin/campaigns/[id]`)

- Header actions (pause/close/duplicate), summary cards, overview/donations/media/settings tabs, attachments placeholder, and confirmation modals.

### Offline-aware UX

- Global offline detector surfaces warnings, disables risky actions with tooltips, queues mutations, and replays them on reconnect.

## Other Role Pages

- **NGO dashboard (`/dashboard/ngo`)** now delivers a warm, campaign-first experience with welcome hero, KPI stat cards, donation trend + supporter-mix charts, quick actions, and skeleton/empty states for loading resilience.
- **My Campaigns (`/dashboard/ngo/campaigns`)** lets NGOs manage only the campaigns they created with search, quick filters, responsive table/list, skeleton loaders, empty state, and pagination.
- **Campaign Detail (`/dashboard/ngo/campaigns/[id]`)** gives NGOs a dedicated management view with status-aware header controls, KPI tiles, tabbed overview/donations/media/settings panels, breadcrumb, and skeleton fallbacks.
- **Document Center (`/dashboard/ngo/documents`)** tracks compliance paperwork via status checklist, drag-&-drop uploads, mock progress, and notes sidebar to guide verifications.
- Company and Donor dashboards retain concise hero cards and will inherit similar enhancements as backend data matures.

## Storybook Coverage & Percy Snapshots

- Isolated stories currently exist for Button, Input, QuickActionCard (light/dark, default/hover/disabled states).
- `npm run snapshot:ui` kicks off Percy visual tests once Storybook is running; expect errors until system libraries for headless Chromium are installed.

## Accessibility & Usability

- Emerald focus rings across interactive elements, labelled icons, keyboard activation on table rows/cards, ARIA-live announcements for filter results.
- Command palette and modals trap focus; body scroll locked when overlays open.

## Known Gaps / Next Steps

- Tests for command palette and Action Center require Jest harness (mocking Auth + Next router/notFound and handling ESM modules). This remains on the High Priority TODO list.
- Install system packages (`libgtk-3-0`, `libgdk-pixbuf2.0-0`, `libgobject-2.0-0`, etc.) so Percy snapshots can run; track via TODO.
- Expand Storybook coverage to NGO tables, timeline widgets, and Action Center once harness ready.
- Replace mock metrics/toasts with real backend data using React Query.
- Add middleware-based route protection once backend session strategy finalises.

Maintain this document as modules evolve, Storybook coverage expands, or new dashboards launch.

- Breadcrumbs now highlight page hierarchy on company, programme, and NGO document views.
- Admin dashboard onboarding tour cleaned up (JSX fixed, hooks memoised).

- Added global search spotlight (⌘K / Ctrl+K) for cross-entity discovery with fuzzy matching.

### Donor Management

- Added admin donors module with filters, table view, pagination, and skeletons.

### Donor detail profile

- Added donor profile view with summary cards, tabs, and mock donation history.

### Donations ledger

- Added All Donations admin page with filters, table, pagination, and receipt modal.

### Campaign Management

- Added admin campaign workspace with filters, table actions, skeletons, and create modal placeholder.

### Campaign detail view

- Added full campaign overview page with summary cards, tabs, settings UI, and modal actions.

### Reports dashboard

- New /dashboard/admin/reports screen with filters, summary tiles, charts placeholders, and export actions.

### Donation receipt view

- Added /dashboard/admin/donations/[id] UI with detailed metadata and receipt preview.

### Audit logs module

- Introduced /dashboard/admin/audit-logs page capturing cross-platform activity with filters, CSV export stub, drawer details, and skeleton loaders.

### System settings

- Added /dashboard/admin/settings screen covering general info, security toggles, notification preferences, and branding placeholders with summary sidebar.

### NGO finance overview

### NGO billing workspace

### NGO payout workspace

### NGO compliance center

- Route: `/dashboard/ngo/compliance`.
- Groups compliance tasks into CSR, audit, and identity categories with status badges, last-updated metadata, and action buttons.
- Alert sidebar surfaces expiring documents and missing forms; timeline lists recent compliance activity.
- Includes status filter, skeleton placeholders, empty states, and responsive layout.

- Route: `/dashboard/ngo/payouts`.
- Provides table view with search, status filters, pagination, and action menu to inspect or cancel requests.
- New payout modal captures amount, purpose, and optional supporting document with inline loading feedback.
- Detail drawer surfaces timeline, receipt download placeholder, and cancellation controls.

- Route: `/dashboard/ngo/billing`.
- Tabs for invoices, payout requests, and downloadables keep financial records organised.
- Invoice tab includes search, status/date filters, table with action menu, skeleton placeholder, and empty state messaging.
- Preview modal surfaces invoice metadata, line items, and PDF placeholder while CTA buttons mirror final workflow.

- Route: `/dashboard/ngo/finance`.
- Provides KPI cards for donations, utilisation, balance, and upcoming allocations with tone-mapped icons.
- Includes Recharts bar + pie visuals for donation trends and fund allocation, filter toolbar, and responsive transactions table with mobile cards.
- Detail modal surfaces transaction metadata; skeleton and empty placeholders keep UX steady before data loads.

### NGO donations overview

- Route: `/dashboard/ngo/donations`.
- Includes breadcrumb, KPI cards for total/verified/pending/average donation metrics, and export CTA.
- Top filter bar provides campaign select, status filter, free-text search, and mock date-range controls.
- Responsive donation table with status badges, receipt CTA, and mobile-friendly stacking.
- Supports skeleton loading, empty state messaging, and error placeholder with retry action.

### NGO donor profiles

- Route: `/dashboard/ngo/donors`.
- Grid-based donor explorer with search, frequency/status filters, preset amount ranges, and CSV export stub.
- Cards surface avatar initials, totals, donation counts, top campaign, and status badge with modal for detailed timeline + notes.
- Includes skeleton loaders, empty messaging, and responsive layout (1–3 columns).

### NGO team members

- Route: `/dashboard/ngo/team`.
- Manage staff with invite modal, table + mobile cards, role/status badges, edit modal with role toggle placeholder, and sonner toasts.
- Skeleton rows and empty state cover loading/new NGOs; responsive layout shifts between grid/table.
