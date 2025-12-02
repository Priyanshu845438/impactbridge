# Frontend TODO & Roadmap

## High Priority
- Implement real auth wiring once backend endpoints confirmed
- Add middleware-based route guard for `/dashboard/*`
- Connect dashboard stats/activity widgets to backend APIs via React Query

## Medium Priority
- Build dynamic tables for admin programmes / reports modules (NGO management + document review views already scaffolded with sorting/filtering/drawers)
- Add charts/visualisations (donation totals, impact metrics)
- Wire profile editor to backend update endpoint with optimistic feedback
- Hook notifications and user directory to backend services (REST/GraphQL) with pagination + actions
- Add backend wiring for user detail view (tabs, status toggles, audit log)
- Introduce notifications/toasts for key actions (command palette items already leverage toasts when needed; consider extending useTransition to future heavy interactions)
- Ensure future header/profile tweaks preserve single-button triggers to avoid hydration warnings
- Audit responsive behaviour whenever new modules land (grids, tables, drawers) so mobile/tablet breakpoints stay polished

## Low Priority / Nice to Have
- Dark mode toggle using shadcn theme utilities
- Animation polish using Framer Motion (e.g., card entry)
- Localization/i18n

## Completed Milestones
- Auth UI with responsive gradients
- Role-aware dashboard layout + quick cards
- Admin module placeholders and collapsible navigation
- Documentation suite refreshed (`project_overview`, `auth_flow`, `style_guide`)
- Client-component conversion for admin dashboard with toast greeting
- Build pipeline cleansed (cache purge + standalone output); ensure `.next` is cleared and Next config stays in sync with backend capabilities (strict mode off, server actions disabled for now).
- NGO document lifecycle UI (status badge/dropdown + timeline, access modal, collaboration sidebar, command palette trigger) delivered; core layout now prefetches routes and wraps content in Suspense for quicker client transitions—next step is wiring lifecycle states/comments to backend approvals API.
- Access control modal UI in place; wire actual permissions when backend endpoints arrive.
- Super Admin profile view with skeleton loading + toast save confirmation
- Notifications route with badge sync, per-item read controls, and header popover/sheet for quick access

Update this file as features ship or priorities shift.

- [x] Route-level prefetch optimisation in dashboard shell (sidebar links + router.prefetch).
