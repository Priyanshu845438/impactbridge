# ImpactBridge Dashboard Overview

## Purpose
The admin/NGO/company/donor workspaces provide a central home for compliance tasks, campaign oversight, and engagement metrics. The current implementation is a polished skeleton ready to be wired into backend APIs while already conveying the brand look & feel.

## Shared Layout (`app/dashboard/layout.tsx`)
- **Auth guard**: consumes `useAuth()` and redirects to `/login` if token missing
- **Sidebar**: 260px fixed panel with nav items derived from `lib/nav-menu.ts`; filters links per user role, supports collapsible admin modules, and is fully scrollable for long menus
- **Header**: sticky top bar with brand mark (links to `/dashboard/admin`), centered search input, breadcrumb slot, and profile drawer trigger (inline dropdown with quick actions + sign out)
- **Main content**: `flex-1` scrollable region with gradient background and responsive padding
- **Mobile**: hamburger toggles a drawer sidebar; desktop view stays fixed; nested sections collapse/expand with Chevron indicators
- **Utilities**: `SectionHeader` for consistent titling, `QuickActionCard` for highlight blocks, root-level `Toaster` for global feedback, and `Skeleton` components for polished loading states

## Admin Dashboard (`app/dashboard/admin/page.tsx`)
- Toast greeting fires once per session (sessionStorage guard + sonner Toaster)
- 650ms skeleton delay on initial load to prevent abrupt flashes before auth/session data settles
- Analytics hero row combines a primary activity area chart with three KPI spark cards (new NGOs, CSR commitments, active users)
- CSR submissions chart powered by Recharts line chart shows 30-day trend with mock data + tooltip
- Metric grid now uses reusable `StatCard` components (user count, approvals, last login, platform health) with sparklines and colour-coded deltas
- Quick action grid (`QuickActionCard`) suggests follow-up tasks (verification queue, CSR programmes, analytics)
- **Recent Activity** list with icons, timestamps, statuses (static for now)
- Skeleton variants mirror chart + card layout so transitions stay intentional
- Profile drawer (`components/dashboard/profile-drawer.tsx`) opens from header and links to the dedicated profile page
- `app/dashboard/profile/page.tsx` provides user settings page with editable fields, skeleton loading state, and Sonner success toast
- Profile page guards against null auth state (renders skeleton until `user` ready) ensuring clean build
- Notifications page (`app/dashboard/notifications/page.tsx`) lists pending alerts with per-item read controls, skeleton fallback, and empty state.
- Header bell badge reflects unread count stored in AuthProvider; accessing notifications or marking items read syncs local storage.
- User directory (`app/dashboard/users/page.tsx`) gives super admins a global view with search, filters, pagination, and mock view actions.
- User detail view (`app/dashboard/users/[id]/page.tsx`) adds tabs for overview/activity/permissions with mock toasts for reset/deactivate actions.

## Skeleton Components
- `Skeleton`, `SkeletonText`, `SkeletonCard`, `SkeletonStat`, `SkeletonActivityItem`
- Shimmer animation defined in `globals.css`
- Ready to reuse across other dashboards once API wiring begins

## Admin Modules (`app/dashboard/admin/modules/*`)
- `ngos/page.tsx`: NGO management workspace with mock dataset, multi-filter controls (search + registration/compliance/region), column sorting, pagination UI, responsive table + card layout, row preview drawer, and detailed tabs for overview/documents/activity + approval toasts
- `programmes/page.tsx`: CSR programme pipeline placeholder
- `reports/page.tsx`: analytics/reporting placeholder
- `settings/page.tsx`: platform-wide settings placeholder
Each module uses `SectionHeader`, divider, frosted card, and can adopt skeletons when data hooks arrive.

## Other Role Pages
- `dashboard/ngo`, `dashboard/company`, `dashboard/donor`
  - Minimal placeholder card per role; adopt same layout once their widgets are defined
  - Ready to host campaign progress, donation summaries, or compliance status once APIs exist

## Reusable Components
- `components/dashboard/section-header.tsx`
  - Accepts `title`, `subtitle`, optional `action`
  - Renders CTA slot on the right (e.g., “Create Campaign”)
- `components/dashboard/quick-action-card.tsx`
  - Accepts icon, title, body, and action label
  - Hover animation and gradient border for interactive feel
- `components/ui/skeleton.tsx`
  - Exported placeholders to keep loading states consistent across modules

## Next Steps
1. Move static metrics to hooks (e.g., `useAdminStats`) that call backend microservices
2. Add charts (shadcn chart components) for donation distribution and impact metrics
3. Introduce role-specific notifications center and task lists
4. Integrate breadcrumbs and tabbed sub-navigation inside the content area
5. Replace skeleton delay with actual async data transitions when APIs are wired

## Dev Tips
- Keep sections responsive by leveraging Tailwind grid utilities (`grid-cols-1 sm:grid-cols-2 xl:grid-cols-3`)
- When adding new dashboard widgets, document them in this file for stakeholders
- Ensure data fetching hooks handle loading/empty/error states gracefully to preserve polished UX
- Use the global Toaster for success/error feedback instead of inline alerts
- Mirror skeleton styling to final components for seamless transitions
