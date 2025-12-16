# Frontend TODO & Roadmap

## High Priority

- [ ] Wire NGO finance overview page
- [ ] Wire NGO billing workspace
- [ ] Integrate NGO payout requests
- [ ] Hook NGO compliance center
- [ ] Connect NGO impact reports
- [ ] Wire company dashboard
- [ ] Integrate company NGO directory
- [ ] Wire company CSR programme directory (`/dashboard/company/programmes`) once backend search API is available.
- [ ] Wire company programme detail view (`/dashboard/company/programmes/[id]`) to backend APIs for real milestones, documents, updates, and related listings.
- [ ] Wire company donations overview (`/dashboard/company/donations`) to finance APIs (filters, pagination, receipts, summary metrics).
- [ ] Wire company reports & exports (`/dashboard/company/reports`) to reporting APIs, replace mock rows and export actions.
- [ ] Wire company compliance overview (`/dashboard/company/compliance`) to compliance service once ready.
- [ ] Wire company programme comparison (`/dashboard/company/comparison`) to analytics service for live KPI and insight generation.
- [ ] Wire company impact explorer (`/dashboard/company/impact-explorer`) to beneficiary analytics APIs, replacing mock map, table, and drawer data.
- [ ] Wire company impact forecasting (`/dashboard/company/impact-forecast`) to forecasting engine once analytics service is available.
- [ ] Wire company impact benchmarks (`/dashboard/company/impact-benchmarks`) once benchmarking service exposes sector medians.
- [ ] Wire company impact stories (`/dashboard/company/impact-stories`) to CMS storytelling backend once available.
- [ ] Wire company impact stories management (`/dashboard/company/impact-stories/manage`) to CMS list + moderation APIs.
- [ ] Wire company impact story review mode (`/dashboard/company/impact-stories/review/[id]`) to real narrative payloads, reviewer workflow, and PDF export service.
- [ ] Wire company impact story publishing flow (`/dashboard/company/impact-stories/publish/[id]`) to CMS validation, SEO metadata API, and scheduling queue.
- [ ] Wire company impact story public gallery (`/dashboard/company/impact-stories/gallery`) to live publishing APIs and CDN-backed assets.
- [ ] Wire company impact story builder (`/dashboard/company/impact-stories/create`) to CMS authoring + uploads.
- [ ] Wire company budget planner (`/dashboard/company/budget-planner`) to finance planning APIs and persist allocations.
- [ ] Wire company partner insights (`/dashboard/company/partner-insights`) to analytics/compliance APIs.
- [ ] Wire company vendor directory (`/dashboard/company/vendors`) to vendor management APIs and contact workflows.
- [ ] Wire company audit center (`/dashboard/company/audit-center`) to audit/compliance APIs and document storage.
- [ ] Add RTL coverage for audit filters, table/card toggles, and drawer content.
- [ ] Add RTL coverage for vendor directory filters, card CTA, and drawer interactions.
- [ ] Add RTL coverage for partner insights filters, sorting, and responsive list rendering.
- [ ] Add RTL coverage for budget planner year selector, drawer edits, and modal submission.
- [ ] Add RTL coverage for compliance table/card responsiveness and drawer interactions.
- [ ] Connect company NGO profile (`/dashboard/company/ngos/[ngoId]`) to backend partner data.
  - Replace mock stats, campaigns, and documents with live payloads.
  - Wire quick actions to messaging/workflow endpoints.

(`/dashboard/company/ngos`) with partner management APIs.

- Sync search/filter options with backend metadata.
- Replace mock detail drawer with real compliance + campaign data.

(`/dashboard/company`) to real CSR analytics.

- Replace mock KPI + chart data with backend metrics.
- Connect quick actions and activity feed to programme services.

(`/dashboard/ngo/impact`) to analytics data sources.

- Replace mock KPI/chart data with live API responses.
- Wire impact stories to CMS feed and enable export actions.

(`/dashboard/ngo/compliance`) to compliance service APIs.

- Replace mock checklist data with live statuses and due dates.
- Wire upload flows, alerts, and timeline to server events.

(`/dashboard/ngo/payouts`) with finance service once available.

- Persist new requests, timeline updates, and cancellation via API.
- Replace mock pagination and status filters with server-driven metadata.

(`/dashboard/ngo/billing`) to invoices/payments APIs once ready.

- Replace mock invoice data, status filters, and preview drawer with live responses.
- Hook action buttons to mutation endpoints and introduce optimistic state handling.

(`/dashboard/ngo/finance`) to backend once finance APIs are ready.

- Replace mock transaction data with real GraphQL/REST payloads.
- Swap faux bar/pie chart datasets with API-driven metrics and ensure loading states cover partial fetches.
- Implement real auth wiring once backend endpoints confirmed
- Add middleware-based route guard for `/dashboard/*`
- Connect dashboard stats/activity widgets to backend APIs via React Query
- Instrument global search with real telemetry once backend analytics endpoint is available (temporary toast stays until then)
- Establish Jest/RTL harness for App Router (mock `useAuth`, router, `notFound`, ESM deps) to unblock command palette + Action Center tests
- Expand Storybook/Percy coverage: add stories/snapshots for NGO table, Action Center panel, impact charts, empty states
- Replace optimistic NGO assignment mock with actual API call once backend endpoint ships (keep rollback + toast messaging but hook into real mutation helper).
- Wire offline queue replay to real mutation handlers (currently placeholder clears queue on reconnect).
- Implement offline banner variant that can sit persistently without only using toast (currently toast-only).
- Wire NGO donations overview (`/dashboard/ngo/donations`) to live donation APIs and hook receipt actions/tests once backend lands.
- Wire NGO donor profiles (`/dashboard/ngo/donors`) to CRM analytics APIs; add tests around filters, modal, and amount presets.
- Wire NGO team workspace (`/dashboard/ngo/team`) to user management APIs, include invite/edit flows + permission toggles with tests.

## Medium Priority

- Build dynamic tables for admin programmes / reports modules (NGO management + document review views already scaffolded)
- Stand up company management module with table, filters, modal, and pagination mirroring NGO workspace. ✅ Implemented (`/dashboard/admin/companies`).
- Deliver company profile view with CSR snapshot, partner listing, and timeline. ✅ Implemented (`/dashboard/admin/company/[companyId]`).
- Add CSR programmes listing for company detail view. ✅ Implemented (`/dashboard/admin/company/[companyId]/programmes`).
- Add CSR programme detail view with tabs (overview, timeline, documents, NGOs, milestones list/timeline toggle + timeline visualization + summary insights), comments, assign modal workflow, and Action Center quick actions. ✅ Implemented (`/dashboard/admin/company/[companyId]/programmes/[programmeId]`).
- Add charts/visualisations (donation totals, impact metrics)
- Wire profile editor to backend update endpoint with optimistic feedback
- Hook notifications and user directory to backend services with pagination + actions
- Add backend wiring for user detail view (tabs, status toggles, audit log)
- Introduce notifications/toasts for key actions (command palette items already leverage toasts; extend to future heavy interactions)
- Ensure future header/profile tweaks preserve single-button triggers to avoid hydration warnings
- Audit responsive behaviour whenever new modules land (grids, tables, drawers)
- Maintain accessibility parity when building new modules
- Ensure keyboard activation works on interactive rows/cards (admin NGO rows already updated)

## Low Priority / Nice to Have

- Dark mode toggle using shadcn theme utilities ✅ Implemented
- Animation polish using Framer Motion (e.g., card entry)
- Localization/i18n ✅ Scaffolded with `next-intl`
- Unit tests for command palette + Action Center once Jest harness is ready
- Storybook visual regression workflow via Percy/Chromatic once system libraries installed
- Add behavioural tests for CommandHints once Jest harness is ready (verify inactivity timer & persistence).

## Completed Milestones

- Auth UI with responsive gradients
- Role-aware dashboard layout + quick cards
- Admin module placeholders and collapsible navigation
- Documentation suite refreshed (`project_overview`, `auth_flow`, `style_guide`)
- Client-component conversion for admin dashboard with toast greeting
- Build pipeline cleansed (cache purge + standalone output)
- NGO document lifecycle UI (status badge/dropdown + timeline, access modal, collaboration sidebar, command palette trigger)
- Access control modal UI in place
- Super Admin profile view with skeleton loading + toast save confirmation
- Notifications route with badge sync, per-item read controls, and header popover/sheet
- Route-level prefetch optimisation in dashboard shell
- Dark mode scaffold (next-themes provider + header toggle)
- Impact trend chart placeholder with metric toggle and responsive wrapper
- CSR programme detail Action Center + milestone timeline toggle + assign NGO workflow
- Optimistic NGO assignment (UI hooks live; swap to real API when ready)
- Storybook setup with Button/Input/QuickActionCard stories covering light/dark + hover/disabled states
- Percy CLI added with Storybook command; first run blocked by missing Chromium libraries and config warning

Update this file as features ship or priorities shift.

- [x] Add shared breadcrumb UI and wire across detail views (company, NGO documents, programmes).

## Recently Completed

- Global search spotlight with mock fuzzy results

- ✅ Donor management module UI scaffolded with filters and pagination.

- ✅ Donor detail page scaffolded with mock data and tabs.

- ✅ All Donations ledger scaffolded with mock data and receipt modal.

- ✅ Campaign management module scaffolded with mock data, filters, and create modal placeholder.

- ✅ Campaign detail view scaffolded with mock data, tabs, and modals.

- ✅ Reports dashboard scaffolded with summary tiles and chart placeholders.

- ✅ Donation receipt view scaffolded with mock metadata and preview.

- ✅ Audit logs module scaffolded with filters, drawer, and skeleton states.

- ✅ System settings UI scaffolded with general, security, notifications, branding, and save workflow.
- ✅ NGO dashboard refreshed with stat cards, charts, quick actions, and skeleton/empty states ready for real data.
- ✅ NGO My Campaigns workspace built with filters, responsive list/table, skeleton loaders, and empty state messaging.
- ✅ NGO campaign detail view scaffolded with status header, KPIs, donations table, media placeholder, and settings tab.
- ✅ NGO document center scaffolded with checklist, upload area, notes sidebar, skeletons, and status badges.
- ✅ NGO donations overview built with filters, KPI cards, responsive table, and placeholder states.
- ✅ Company CSR programme directory scaffolded with filters, search, responsive cards, skeletons, and empty states.
- ✅ Company programme detail view scaffolded with hero, tabs, sidebar, skeleton/error states.
- ✅ Company donations overview built with summary tiles, responsive table/cards, sidebar filters, and skeleton/empty/error states.
- ✅ Company reports & exports page built with summary tiles, filters, responsive table/cards, export modal, and skeleton/empty/error states.
- ✅ Company impact forecasting page built with live budget controls, scenario comparisons, insights, and responsive forecast chart (mock data only).
- ✅ Company impact benchmarks page built with dual-value KPIs, comparative charts, and insight guidance (mock data).
- ✅ Company impact stories page built with storytelling cards, filters, and narrative drawer (mock data).
- ✅ Company impact story builder page built with structured form, live preview, mock gallery upload, and CTA controls (UI only).

- [ ] Add Story workflow tests (status transitions Draft ⇄ Submitted ⇄ Published) once RTL harness lands

- [ ] Add analytics snapshot tests (KPI cards + chart render) once mock data replaced with API.
- Reverted the impact stories page to the last passing commit after a malformed memoization edit introduced syntax errors.
