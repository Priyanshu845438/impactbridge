# ImpactBridge Dashboard Overview

## Purpose
The admin/NGO/company/donor workspaces provide a central home for compliance tasks, campaign oversight, and engagement metrics. The current implementation is a polished skeleton ready to be wired into backend APIs while already conveying the brand look & feel.

## Shared Layout (`app/dashboard/layout.tsx`)
- **Auth guard**: consumes `useAuth()` and redirects to `/login` if token missing
- **Sidebar**: 260px fixed panel with nav items derived from `lib/nav-menu.ts`; filters links per user role and supports collapsible admin modules
- **Header**: sticky top bar with brand mark, breadcrumb slot, and logout button
- **Main content**: `flex-1` scrollable region with gradient background and responsive padding
- **Mobile**: hamburger toggles a drawer sidebar; desktop view stays fixed; nested sections collapse/expand with Chevron indicators
- **Utilities**: `SectionHeader` for consistent titling, `QuickActionCard` for highlight blocks, root-level `Toaster` for global feedback, and `Skeleton` components for polished loading states

## Admin Dashboard (`app/dashboard/admin/page.tsx`)
- Toast greeting fires once per session (sessionStorage guard + sonner Toaster)
- 650ms skeleton delay on initial load to prevent abrupt flashes before auth/session data settles
- Quick metrics row featuring:
  - `Total Users`
  - `Pending Approvals`
  - `Last Login Activity`
- Quick action grid (`QuickActionCard`) suggesting follow-up tasks (verification queue, CSR programmes, analytics)
- **Recent Activity** list with icons, timestamps, statuses (static for now)
- Skeleton variants mirror stats/cards/activity design so transitions feel intentional

## Skeleton Components
- `Skeleton`, `SkeletonText`, `SkeletonCard`, `SkeletonStat`, `SkeletonActivityItem`
- Shimmer animation defined in `globals.css`
- Ready to reuse across other dashboards once API wiring begins

## Admin Modules (`app/dashboard/admin/modules/*`)
- `ngos/page.tsx`: NGO management placeholder
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
