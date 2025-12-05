# Frontend TODO & Roadmap

## High Priority
- Implement real auth wiring once backend endpoints confirmed
- Add middleware-based route guard for `/dashboard/*`
- Connect dashboard stats/activity widgets to backend APIs via React Query
- Instrument global search with real telemetry once backend analytics endpoint is available (temporary toast stays until then)
- Establish Jest/RTL harness for App Router (mock `useAuth`, router, `notFound`, ESM deps) to unblock command palette + Action Center tests
- Install system packages needed for Percy/Chromium (`libgobject-2.0.so.0`, `libgtk-3-0`, `libgdk-pixbuf2.0-0`, etc.) so `npm run snapshot:ui` succeeds
- Expand Storybook/Percy coverage: add stories/snapshots for NGO table, Action Center panel, impact charts, empty states

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
- Storybook setup with Button/Input/QuickActionCard stories covering light/dark + hover/disabled states
- Percy CLI added with Storybook command; first run blocked by missing Chromium libraries and config warning

Update this file as features ship or priorities shift.
