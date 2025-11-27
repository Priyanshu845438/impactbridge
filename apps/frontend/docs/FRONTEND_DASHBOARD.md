# ImpactBridge Dashboard Overview

## Purpose
The admin/NGO/company/donor workspaces provide a central home for compliance tasks, campaign oversight, and engagement metrics. The current implementation is a polished skeleton ready to be wired into backend APIs while already conveying the brand look & feel.

## Shared Layout (`app/dashboard/layout.tsx`)
- **Auth guard**: consumes `useAuth()` and redirects to `/login` if token missing
- **Sidebar**: 260px fixed panel with nav items derived from `lib/nav-menu.ts`; filters links per user role and supports collapsible admin modules
- **Header**: sticky top bar with brand mark, breadcrumb slot, and logout button
- **Main content**: `flex-1` scrollable region with gradient background and responsive padding
- **Mobile**: hamburger toggles a drawer sidebar; desktop view stays fixed; nested sections collapse/expand with Chevron indicators
- **Utilities**: uses `SectionHeader` for consistent titling and `QuickActionCard` for highlight blocks

## Admin Dashboard (`app/dashboard/admin/page.tsx`)
- Welcome hero with role-aware greeting
- Quick metrics row featuring:
  - `Total Users`
  - `Pending Approvals`
  - `Last Login Activity`
- Quick action grid (`QuickActionCard`) suggesting follow-up tasks (verification queue, CSR programmes, analytics)
- **Recent Activity** list with icons, timestamps, statuses (static for now)
- Ready for future data hooks (see TODO comment inside file)

## Admin Modules (`app/dashboard/admin/modules/*`)
- `ngos/page.tsx`: NGO management placeholder
- `programmes/page.tsx`: CSR programme pipeline placeholder
- `reports/page.tsx`: analytics/reporting placeholder
- `settings/page.tsx`: platform-wide settings placeholder
Each module uses `SectionHeader`, divider, and frosted card with “Coming soon” copy.

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

## Next Steps
1. Move static metrics to hooks (e.g., `useAdminStats`) that call backend microservices
2. Add charts (shadcn chart components) for donation distribution and impact metrics
3. Introduce role-specific notifications center and task lists
4. Integrate breadcrumbs and tabbed sub-navigation inside the content area

## Dev Tips
- Keep sections responsive by leveraging Tailwind grid utilities (`grid-cols-1 sm:grid-cols-2 xl:grid-cols-3`)
- When adding new dashboard widgets, document them in this file for stakeholders
- Ensure data fetching hooks handle loading/empty/error states gracefully to preserve polished UX
