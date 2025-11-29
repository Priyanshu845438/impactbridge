# Frontend TODO & Roadmap

## High Priority
- Implement real auth wiring once backend endpoints confirmed
- Add middleware-based route guard for `/dashboard/*`
- Connect dashboard stats/activity widgets to backend APIs via React Query

## Medium Priority
- Build dynamic tables for admin programmes / reports modules (NGO management view already scaffolded with sorting + filters + drawer)
- Add charts/visualisations (donation totals, impact metrics)
- Wire profile editor to backend update endpoint with optimistic feedback
- Hook notifications and user directory to backend services (REST/GraphQL) with pagination + actions
- Add backend wiring for user detail view (tabs, status toggles, audit log)
- Introduce notifications/toasts for key actions

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
- Build pipeline cleansed (cache purge + standalone output)
- Super Admin profile view with skeleton loading + toast save confirmation
- Notifications route with badge sync and per-item read controls

Update this file as features ship or priorities shift.
