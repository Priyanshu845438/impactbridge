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
- `/dashboard/admin/modules/reports`
- `/dashboard/admin/modules/settings`
- `/dashboard/notifications`
- `/dashboard/ngo`
- `/dashboard/company`
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
- When navigation triggers side effects (closing mobile sidebar), pass callbacks down to the Sidebar component as seen in `DashboardLayout`

## Future Plans
- Add `middleware.ts` enforcing `/dashboard` prefix requires auth token
- Introduce dynamic routes for entities (e.g., `/dashboard/admin/ngos/[id]`)
- Use parallel routes for modals if needed (e.g., editing tasks)

- Dashboard shell prefetches `/dashboard/admin`, `/dashboard/users`, and `/dashboard/admin/modules/reports`; keep the list updated when adding new high-traffic sections.
