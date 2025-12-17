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

### Company dashboard

### Company partnered NGOs

### Company NGO profile view

- Route: `/dashboard/company/ngos/[ngoId]`.
- Header highlights logo initials, mission, categories, verification, and CSR alignment score.
- Stat tiles summarise donations, active campaigns, alignment, and compliance status.
- Tabbed overview/campaigns/documents sections with empty-state messaging plus side panel covering contact info and quick actions.

- Route: `/dashboard/company/ngos`.
- Provides search, category, and status filters with responsive card grid for CSR-approved partners.
- Cards display mission, category tags, verification badge, and profile CTA; drawer reveals compliance status and key campaigns.
- Includes skeleton loaders and empty-state messaging for filter combinations.

- Route: `/dashboard/company/programmes`.
- CSR programme marketplace with top-level category/status/region filters, search, skeleton loaders, and empty state messaging.
- Cards surface banner imagery, NGO owner, SDG tags, and status badge with CTA to detailed view.
- `hooks/use-debounced-value.ts` introduced for directory search responsiveness.

- Route: `/dashboard/company/programmes/[id]`.
- Detail view adds banner hero, quick stat pills, overview tabs (Overview/NGO/Milestones/Documents/Updates), and right rail with contacts, related programmes, and tag cloud (desktop).
- Includes skeleton loader, error placeholder, empty updates state, and responsive stacking for mobile (sidebar hidden).

- Route: `/dashboard/company/donations`.
- Donations overview page with hero filters, summary tiles, responsive table-to-card view, desktop sidebar filters, and skeleton/empty/error fallbacks.

- Route: `/dashboard/company/reports`.
- Reports & Exports page with summary cards, filters, export modal, responsive table/cards, and skeleton/empty/error states.

### Company compliance overview

- Route: `/dashboard/company/compliance`.
- Insight chips summarise compliant, pending, missing document, and expiring registration counts at a glance.
- Searchable table (desktop) and responsive cards (mobile) share pill filters and link directly to NGO profiles for deeper review.
- Upcoming deadlines sidebar highlights imminent filings with status tags, while drawer view surfaces missing documents, due dates, notes, and follow-up CTA.
- Skeleton loaders and empty state keep UX steady until real compliance APIs plug in.

### Company budget planner
### Company partnership insights

- Route: `/dashboard/company/partner-insights`.
- KPI row surfaces programme progress, milestone timeliness, compliance score, and engagement rating via gradient cards.
- Filters (compliance, performance slider, sort) refine the NGO performance list backed by mock dataset.
- Responsive list renders table on desktop and stacked cards on mobile with progress bars, compliance badges, and profile CTA.
- Includes skeleton and empty-state messaging; ready to wire into future analytics APIs.

### Company vendor directory
### Company audit & compliance center
### Company programme comparison
### Company impact explorer
### Company impact forecasting

- Route: `/dashboard/company/audit-center`.
- Filters combine NGO select, compliance status, year, and search to refine audit records.
- Desktop table + mobile cards present audit metadata with status and score badges plus report CTA.
- Drawer summarises audit objective/scope, score breakdown bars, key findings, recommended actions, and download placeholder.
- Skeleton + empty states keep review flow resilient prior to wiring real data.


- Route: `/dashboard/company/vendors`.
- Filters combine free-text search, service type, and rating thresholds with reset control.
- Vendor grid uses mock data with gradient logo placeholders, rating stars, and profile CTA opening detail drawer.
- Drawer highlights services, past clients, certifications, and contact info; skeleton/empty states keep UX resilient.




- Route: `/dashboard/company/impact-stories/create`.
- Builder pairs structured form (title, NGO/programme selectors, summary, narrative, outcomes, mock upload preview) with live card preview.
- Auto-expanding narrative textarea, skeleton preview init, and CTA pair (Draft/Publish) keep the UX polished for future CMS wiring.

- Route: `/dashboard/company/impact-stories`.
- Story cards pair programme/NGO branding with warm imagery, snippets, and CTAs while filters slice by theme, partner, and newly added tags.
- Drawer expands stories with extended narrative, before/after stats, gallery chips, outcome badges, and tagged focus areas (mock data today).
- Designed for storytelling-first layout with soft shadows, rounded corners, and mobile-friendly stacking.
- Status badge now reuses the shared component to reflect Draft → Submitted → Published workflow, with inline status selector and local state transitions.
- Drawer header shows the current status with contextual actions (Submit for review / Publish story) that update only client-side for now.
- Drawer now includes an analytics snapshot row with mock KPIs, micro chart, and download CTA for quick story performance context.


- Route: `/dashboard/company/impact-stories/manage`.
- Repository view for all stories with search, NGO/status/tag filters, sort controls, skeletons, and responsive card grid.
- Cards now surface cover, summary, status badge, timeline note, tag chips, and mock actions (Review/Publish/Edit/Delete) alongside a change-status dropdown that updates local state instantly.
- Empty-state encourages authors to draft narratives when filters yield no results.
- Publishing workflow mirrors the main page: Draft, Submitted, and Published states are reflected in badges, filter options, and the change-status dropdown, each animating softly to keep the handoffs friendly.

- Route: `/dashboard/company/impact-stories/review/[id]`.
- Review mode mirrors donor-facing presentation with hero cover, anchored sections, reading progress bar, and sidebar metadata.
- Mock actions let reviewers approve, request changes, or download a placeholder PDF while tracking status/version/notes.

- Route: `/dashboard/company/impact-stories/publish/[id]`.
- Final publishing workspace with validation checklist, SEO tuning, listing preview, visibility controls, scheduling, and mock publish modal.
- Publish CTA remains disabled until all checklist items pass, matching expected CMS safeguards.

- Route: `/dashboard/company/impact-stories/gallery`.
- Public-facing gallery preview with NGO/programme/year/topic filters, responsive card grid, modal preview, and pagination mock.
- Mirrors supporter exploration experience while keeping data mock-only for now.

- Route: `/dashboard/company/impact-benchmarks`.
- KPI cards juxtapose company vs industry values with delta badges and progress bars to highlight relative performance.
- Dual Recharts (bar + radar) surfaces efficiency, compliance, and outreach strengths against sector medians.
- Insight stack narrates where the company leads or trails and suggests next steps until live benchmarking APIs arrive.

- Route: `/dashboard/company/comparison`.
- Multi-select dropdown allows choosing up to four programmes; requires at least two selections to render the grid.
- KPI grid compares budget utilisation, milestone completion, beneficiaries, and compliance score side-by-side with responsive layout.
- Chart trio (bar, line, radial) visualises budget vs utilisation, monthly progress, and compliance snapshot while insights list calls out key differences.


### Company impact forecasting

- Route: `/dashboard/company/impact-forecast`.
- Budget controls combine preset chips, slider, and numeric input to recalculate projections live.
- Summary cards highlight projected beneficiaries, cost efficiency range, outcome uplift, and timeline adjustments with tone-mapped icons.
- Forecast chart uses a Recharts area visualization, scenario stack compares optimistic/expected/guardrail cases, and insight panels narrate the mock methodology.

- Route: `/dashboard/company/impact-explorer`.
- Filters for region, age, gender, and outcome provide contextual slicing with clear button.
- Summary cards highlight total beneficiaries, average outcome score, high-impact regions, and recent growth using tone-mapped icons.
- Interactive map placeholder with tooltips, beneficiary table, and detail drawer deliver mock beneficiary-level insights; empty state guides filter adjustments.

- Route: `/dashboard/company/budget-planner`.
- Year selector swaps mock datasets for 2024–2026 while breadcrumb + badge contextualise planning mode.
- Summary row highlights total budget, allocated, and remaining funds with tone-mapped cards.
- Responsive allocation table/cards support edit drawer with slider + numeric input and modal for adding allocations.
- Skeleton state keeps UX steady before data appears; all interactions remain mock-only until APIs land.


- Insight tiles surface compliant, pending, missing-document, and expiring-registration counts using live badge tones.
- Status filters and search power a responsive table-to-card list with profile links and “View details” drawer showing deadlines, notes, and actions.
- Right-hand deadline column highlights upcoming renewals; skeleton placeholders and empty state keep UX steady while loading.


- Route: `/dashboard/company`.
- KPI tiles highlight CSR budget, allocations, disbursements, and active programmes with tone-mapped icons.
- Analytics suite includes quarterly spend bar chart, category pie split, and programme progress line chart with skeleton fallbacks.
- Quick action grid points to NGO partners, proposal reviews, disbursement tracking, and compliance reports.
- Recent activity feed surfaces CSR disbursements, partnership renewals, and compliance uploads.

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

### NGO impact & reports

- Route: `/dashboard/ngo/impact`.
- KPI tiles summarise beneficiaries, active projects, fund utilisation, and volunteer hours.
- Recharts-powered line/pie/bar visuals highlight monthly reach, category split, and campaign impact with skeleton fallbacks.
- Impact story cards showcase narrative highlights with preview modal and export controls (PDF/CSV/Print).

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
- Impact stories page restored from regression; future refactor should reapply memoization carefully.
- Impact stories page restored to clean state after the memoization regression; future refactors should branch from this baseline.
- Company dashboard now has baseline RTL coverage for NGO cards and impact stories drawer (2025-12-17).
