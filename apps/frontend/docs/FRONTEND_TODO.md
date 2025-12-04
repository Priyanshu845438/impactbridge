# Frontend TODO & Roadmap

## High Priority
- Implement real auth wiring once backend endpoints confirmed
- Add middleware-based route guard for `/dashboard/*`
- Connect dashboard stats/activity widgets to backend APIs via React Query
- Instrument global search with real telemetry once backend analytics endpoint is available (temporary toast stays until then)
- Establish Jest/RTL harness for App Router: mock `useAuth`, router, and suppress `notFound()` so command palette & Action Center tests can ship.

## Medium Priority
- Build dynamic tables for admin programmes / reports modules (NGO management + document review views already scaffolded with sorting/filtering/drawers)
- Stand up company management module with table, filters, modal, and pagination mirroring NGO workspace. ✅ Implemented (`/dashboard/admin/companies`).
- Deliver company profile view with CSR snapshot, partner listing, and timeline. ✅ Implemented (`/dashboard/admin/company/[companyId]`).
- Add CSR programmes listing for company detail view. ✅ Implemented (`/dashboard/admin/company/[companyId]/programmes`).
- Add CSR programme detail view with tabs for overview, timeline, documents, NGOs, milestones (list/timeline toggle + timeline visualization + summary insights), comments, assign modal workflow, and Action Center quick actions. ✅ Implemented (`/dashboard/admin/company/[companyId]/programmes/[programmeId]`).
- Add charts/visualisations (donation totals, impact metrics)
- Wire profile editor to backend update endpoint with optimistic feedback
- Hook notifications and user directory to backend services (REST/GraphQL) with pagination + actions
- Add backend wiring for user detail view (tabs, status toggles, audit log)
- Introduce notifications/toasts for key actions (command palette items already leverage toasts; extend to future heavy interactions)
- Ensure future header/profile tweaks preserve single-button triggers to avoid hydration warnings
- Audit responsive behaviour whenever new modules land (grids, tables, drawers) so mobile/tablet breakpoints stay polished
- Maintain accessibility parity when building new modules: apply shared focus-ring utilities, label icon-only controls, and ensure tables/cards expose `aria` annotations like the NGO module
- Ensure keyboard activation works on interactive table rows/cards (admin NGO rows already updated)

## Low Priority / Nice to Have
- Dark mode toggle using shadcn theme utilities ✅ Implemented
- Animation polish using Framer Motion (e.g., card entry)
- Localization/i18n ✅ Scaffolded with `next-intl`
- Unit tests for command palette + Action Center once Jest harness is ready

## Completed Milestones
- Auth UI with responsive gradients
- Role-aware dashboard layout + quick cards
- Admin module placeholders and collapsible navigation
- Documentation suite refreshed (`project_overview`, `auth_flow`, `style_guide`)
- Client-component conversion for admin dashboard with toast greeting
- Build pipeline cleansed (cache purge + standalone output); ensure `.next` is cleared and Next config stays in sync with backend capabilities (strict mode off, server actions disabled for now)
- NGO document lifecycle UI (status badge/dropdown + timeline, access modal, collaboration sidebar, command palette trigger) delivered; core layout now prefetches routes and wraps content in Suspense for quicker client transitions—next step is wiring lifecycle states/comments to backend approvals API
- Access control modal UI in place; wire actual permissions when backend endpoints arrive
- Super Admin profile view with skeleton loading + toast save confirmation
- Notifications route with badge sync, per-item read controls, and header popover/sheet for quick access
- Route-level prefetch optimisation in dashboard shell (sidebar links + router.prefetch)
- Dark mode scaffold (next-themes provider + header toggle + dark palette tokens) in production
- Impact trend chart placeholder with metric toggle and responsive wrapper
- CSR programme detail Action Center + milestone timeline toggle + assign NGO workflow

Update this file as features ship or priorities shift.
