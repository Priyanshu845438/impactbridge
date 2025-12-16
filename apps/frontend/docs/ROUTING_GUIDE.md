# Routing Guide

## App Router Structure

- `app/layout.tsx` defines global providers and metadata
- Root `app/page.tsx` redirects to `/login`
- Each route has a `page.tsx` file (default export React component)

### Public Routes

- `/login`
- `/register`
- `/forgot-password`
- `/reset-password`

### Protected Routes

- `/dashboard` (layout only; actual content renders via nested routes)
- `/dashboard/admin`
- `/dashboard/admin/modules/ngos` + nested tabs for approvals, profiles (UI-only)
- `/dashboard/admin/modules/programmes`
- `/dashboard/admin/reports` (top-level analytics view)
- `/dashboard/admin/modules/reports`
- `/dashboard/admin/audit-logs`
- `/dashboard/admin/settings`
- `/dashboard/notifications`
- `/dashboard/ngo`
- `/dashboard/ngo/campaigns`
- `/dashboard/ngo/campaigns/[id]`
- `/dashboard/ngo/compliance`
- `/dashboard/ngo/documents`
- `/dashboard/ngo/donors`
- `/dashboard/ngo/team`
- `/dashboard/ngo/finance`
- `/dashboard/ngo/billing`
- `/dashboard/ngo/payouts`
- `/dashboard/ngo/impact`
- `/dashboard/ngo/donations`
- `/dashboard/ngo/impact`
- `/dashboard/ngo/payouts`
- `/dashboard/company`
- `/dashboard/company/ngos`
- `/dashboard/company/programmes`
- `/dashboard/company/programmes/[id]`
- `/dashboard/company/donations`
- `/dashboard/company/reports`
- `/dashboard/company/compliance`
- `/dashboard/company/comparison`
- `/dashboard/company/budget-planner`
- `/dashboard/company/partner-insights`
- `/dashboard/company/vendors`
- `/dashboard/company/audit-center`
- `/dashboard/company/impact-benchmarks`
- `/dashboard/company/impact-stories`
  - `/dashboard/company/impact-stories/create`
  - `/dashboard/company/impact-stories/manage` – library view with inline status control + timeline note
    - `/dashboard/company/impact-stories/review/[id]`
    - `/dashboard/company/impact-stories/publish/[id]`
  - `/dashboard/company/impact-stories/review/[id]`
  - `/dashboard/company/impact-stories/publish/[id]`
  - `/dashboard/company/impact-stories/gallery`
    - `/dashboard/company/impact-stories/review/[id]`
    - `/dashboard/company/impact-stories/publish/[id]`
    - `/dashboard/company/impact-stories/manage`
- `/dashboard/company/impact-explorer`
- `/dashboard/company/impact-forecast`
- `/dashboard/company/ngos/[ngoId]`
- `/dashboard/company/engagement-hub`
- `/dashboard/donor`

Protection is enforced client-side in `app/dashboard/layout.tsx` via `useAuth()`. Server-side middleware will be added when backend sessions/cookies are in place.

## Navigation Config

- `lib/nav-menu.ts` returns `NavItem[]`
- Each item supports optional `children` for nesting (used by Admin modules)
- Sidebar component iterates over this config, checking `user.role`
- For new routes, add entries to `navMenu` and ensure `roles` list includes permitted personas

## Route Groups & Layouts

- Currently no `(group)` directories; keep structure flat until feature modules require separation
- To add a shared layout for a subset (e.g., admin-specific), create `app/dashboard/admin/layout.tsx`

## Link Usage

- Use `next/link` `<Link href="...">` for client-side transitions
- When navigation triggers side effects (closing mobile sidebar), pass callbacks down to the Sidebar component as seen in `DashboardLayout`. Sidebar icons are decorative (`aria-hidden`) and toggle buttons expose `aria-expanded` for screen readers.

## Future Plans

- Add `middleware.ts` enforcing `/dashboard` prefix requires auth token
- Introduce dynamic routes for entities (e.g., `/dashboard/admin/ngos/[id]`)
- Use parallel routes for modals if needed (e.g., editing tasks)

- Dashboard shell prefetches `/dashboard/admin`, `/dashboard/users`, `/dashboard/admin/modules/reports`, `/dashboard/admin/audit-logs`, `/dashboard/company`, `/dashboard/company/engagement-hub`, `/dashboard/company/comparison`, and `/dashboard/company/impact-explorer`; keep the list updated when adding new high-traffic sections.
- Documented restoration of /dashboard/company/impact-stories after syntax regression.
