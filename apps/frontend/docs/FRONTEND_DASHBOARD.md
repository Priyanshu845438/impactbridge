# ImpactBridge Dashboard Overview

## Purpose
The admin/NGO/company/donor workspaces provide a central home for compliance tasks, campaign oversight, and engagement metrics. The current implementation is a polished skeleton ready to be wired into backend APIs while already conveying the brand look & feel.

## Shared Layout (`app/dashboard/layout.tsx`)
- **Auth guard**: consumes `useAuth()` and redirects to `/login` if token missing
- **Sidebar**: 260px fixed panel on desktop with nav items derived from `lib/nav-menu.ts`; filters links per user role, supports collapsible admin modules, and is fully scrollable (mobile drawer uses the same config). Menu groupings follow a professional sequence (Executive suite → People → Programs → Platform → Guides & support) for faster discovery.
- **Header**: sticky top bar with brand mark (links to `/dashboard/admin`), centered search input, inline activity notifications bell (badge + desktop popover + mobile sheet), keyboard-accessible command palette shortcut (⌘/Ctrl + K) with modal results, and profile drawer trigger (inline dropdown with quick actions + sign out)
- **Main content**: `flex-1` scrollable region with gradient background and responsive padding; global layout now keeps vertical scrolling enabled even on smaller screens, applies a quick fade transition on route swaps, and wraps child routes in `React.Suspense` with skeleton fallbacks so there are no harsh flashes.
- **Mobile**: hamburger toggles a drawer sidebar; desktop view stays fixed; nested sections collapse/expand with Chevron indicators; mobile drawers/tables use overflow wrappers to prevent horizontal clipping.
- **Utilities**: `SectionHeader` for consistent titling, `QuickActionCard` for highlight blocks, root-level `Toaster` for global feedback, `Skeleton` components for polished loading states, a command palette overlay (`CommandPalette`) for mock quick search/navigation, eager route prefetch on sidebar links, and `useTransition` to smooth heavier UI toggles (palette, search filtering). High-traffic routes like `/dashboard/admin`, `/dashboard/users`, and `/dashboard/admin/modules/reports` prefetch on mount for instant swaps. A global progress bar (nprogress-style) now surfaces during route transitions to keep loading feedback consistent across the workspace.

## Admin Dashboard (`app/dashboard/admin/page.tsx`)
- Toast greeting fires once per session (sessionStorage guard + sonner Toaster)
- 650ms skeleton delay on initial load to prevent abrupt flashes before auth/session data settles
- Analytics hero row now pairs a composed weekly bar+line chart (`OverviewChart`) using muted blue/slate tones with three KPI mini-bar cards (new NGOs, CSR funds, active users). Charts mount inside fixed-height wrappers so ResponsiveContainer always receives concrete dimensions. (`OverviewChart`) using muted blue/slate tones with three KPI mini-bar cards (new NGOs, CSR funds, active users).
- CSR submissions visual swaps to a minimal bar chart keeping tooltips subtle while trimming vertical space; colours remain soft and professional.
- Metric grid now uses reusable `StatCard` components (user count, approvals, last login, platform health) each embedding a `MicroBar` visualization for quick trend at-a-glance.
- Quick action grid (`QuickActionCard`) suggests follow-up tasks (verification queue, CSR programmes, analytics) with cards that stack gracefully on mobile; paired with a Smart Suggestions panel offering mock “Take action” nudges.
- **Recent Activity** list with icons, timestamps, statuses (static for now)
- Skeleton variants mirror chart + card layout so transitions stay intentional
- Profile drawer (`components/dashboard/profile-drawer.tsx`) opens from header and links to the dedicated profile page
- `app/dashboard/profile/page.tsx` provides user settings page with editable fields, skeleton loading state, and Sonner success toast
- Profile page guards against null auth state (renders skeleton until `user` ready) ensuring clean build
- Profile drawer trigger now clones the child element to reuse its button instead of nesting buttons, resolving hydration warnings
- Notifications page (`app/dashboard/notifications/page.tsx`) lists pending alerts with per-item read controls, skeleton fallback, and empty state.
- Header bell badge reflects unread count stored in AuthProvider; accessing notifications or marking items read syncs local storage.
- User directory (`app/dashboard/users/page.tsx`) gives super admins a global view with search, filters, pagination, mock view actions, and horizontal scroll fallback for dense columns.
- User detail view (`app/dashboard/users/[id]/page.tsx`) adds tabs for overview/activity/permissions with mock toasts for reset/deactivate actions.

## Skeleton Components
- `Skeleton`, `SkeletonText`, `SkeletonCard`, `SkeletonStat`, `SkeletonActivityItem`
- Shimmer animation defined in `globals.css`
- Ready to reuse across other dashboards once API wiring begins

## Admin Modules (`app/dashboard/admin/modules/*`)
- `ngos/page.tsx`: NGO management workspace with mock dataset, multi-filter controls (search + registration/compliance/region), column sorting, pagination UI, responsive table + card layout, row preview drawer, and detailed tabs for overview/documents/activity + approval toasts; search/filters now stack on small screens and tables gain horizontal scroll wrappers
- `ngos/page.tsx`: NGO management workspace with mock dataset, multi-filter controls (search + registration/compliance/region), column sorting, pagination UI, responsive table + card layout, row preview drawer, and detailed tabs for overview/documents/activity + approval toasts; search/filters now stack on small screens and tables gain horizontal scroll wrappers. Typography has been updated to use the global `text-small` / `text-caption` tokens so the compliance suite matches the system scale.
- Keyboard users can tab through table rows and mobile cards, with the emerald focus ring applied to highlight selection. Row/action buttons expose friendly `aria-label` strings (e.g., "View details for {NGO}") and the results summary announces changes via `aria-live` for screen readers.
- `ngos/[id]/documents/page.tsx`: compliance review surface displaying per-NGO document inventory with status filters, search, a split preview (document pane + metadata/tags panel), lifecycle status badge + dropdown, timeline activity feed, confirmation dialogs, status badge updates, sonner toasts, mock version history, an activity log, and a collaboration sidebar with filters, threaded comments, status-aware disabling when Approved, plus on-demand Access & Permissions modal and a dedicated “Timeline & Status” panel (sticky on desktop, collapsible on smaller screens).
- `admin/companies/page.tsx`: company compliance workspace mirroring the NGO module with search, status/industry filters, responsive table + card layout, add-company modal (UI only), and pagination.
- `admin/company/[companyId]/page.tsx`: detailed company profile view with CSR snapshot, partner NGO list, and activity timeline.
- `admin/company/[companyId]/programmes/page.tsx`: CSR programme listing with filters, progress indicators, view/edit/archive controls, and creation modal.
- `admin/company/[companyId]/programmes/[programmeId]/page.tsx`: CSR programme detail view with summary metrics, compliance note, milestone progress, timeline, documents, assigned NGOs, and comments tabs.
- `programmes/page.tsx`: CSR programme pipeline placeholder
- `reports/page.tsx`: analytics/reporting placeholder
- `settings/page.tsx`: platform-wide settings placeholder
Each module uses `SectionHeader`, divider, frosted card, and can adopt skeletons when data hooks arrive.

## Other Role Pages
- `dashboard/ngo`, `dashboard/company`, `dashboard/donor`
  - Updated headings remove placeholder copy and reflect production messaging ("NGO operations overview", "Company CSR workspace", "Donor engagement hub")
  - Minimal hero card per role remains, ready to host campaign progress, donation summaries, or compliance status once APIs exist

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
