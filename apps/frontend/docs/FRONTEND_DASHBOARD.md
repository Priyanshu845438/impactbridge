# ImpactBridge Dashboard Overview

## Purpose
The admin/NGO/company/donor workspaces provide a central home for compliance tasks, campaign oversight, and engagement metrics. The current implementation is a polished skeleton ready to be wired into backend APIs while already conveying the brand look & feel.

## Shared Layout (`app/dashboard/layout.tsx`)
- **Auth guard**: consumes `useAuth()` and redirects to `/login` if token missing.
- **Sidebar**: 260px fixed panel on desktop with nav items derived from `lib/nav-menu.ts`; filters links per user role, supports collapsible admin modules, and is fully scrollable. Menu groups follow a professional sequence for quicker discovery. Links prefetch routes and trigger a fade animation on navigation.
- **Header**: sticky top bar with brand mark, centered spotlight trigger that opens the full-screen global search (⌘/Ctrl + K) covering users/NGOs/companies/programmes/documents, notification bell (badge + desktop popover + mobile sheet), command palette quick actions, theme toggle (light/dark/system), locale switcher in profile drawer, and profile quick-actions.
- **Smart command hints**: lightweight helper surfaced after 5s of inactivity with contextual guidance (e.g., ⌘K reminder on dashboard, CSR filter prompt on company list, drag/drop tip inside NGO documents). Dismissal is stored per route via `localStorage`.
- **Main content**: `flex-1` scrollable region with gradient background, consistent padding, Suspense wrapper + skeleton fallback, and route progress bar integration (via `next-nprogress-bar`) to prevent white flashes.
- **Command palette**: modal overlay providing quick navigation suggestions with keyboard support. Unit tests pending until Jest harness exists (see docs/TODO).
- **Smart suggestions + action center**: contextual cards and quick-action sidebar exposed on large screens, collapsing gracefully on mobile.
- **Storybook + Percy**: Buttons, Inputs, and QuickActionCards have live stories; Percy snapshots guard against style regressions (currently blocked by missing system libraries—see TODO).
- **Mobile**: hamburger toggles drawer sidebar; notifications open via sheet; Action Center collapses by default.

## Admin Dashboard (`app/dashboard/admin/page.tsx`)
- Session-scoped welcome toast via `sessionStorage` guard.
- 650 ms skeleton delay masking initial data load (swap with real async when APIs arrive).
- Analytics hero row: composed `OverviewChart` (bar + line), KPI stat cards with `MicroBar` sparklines, impact trend chart component, and the new Storybook stories cover these card/button primitives for reference.
- CSR submissions visual: compact bar chart with min-height wrapper to avoid Recharts warnings.
- Quick action grid plus **Smart Suggestions** panel offering mock “Take action” buttons.
- Recent activity timeline and profile drawer integration.
- Dark mode-friendly backgrounds, icons, and text colours using shared tokens.

## Admin Modules (`app/dashboard/admin/modules/*`)
- **NGO management**: search, multi-filter controls, sorting, pagination, responsive table + card layout, detail drawer with tabs (overview, documents, activity), collaboration sidebar, timeline panel, access control modal, action toasts, and accessibility polish.
- **NGO documents (`[id]/documents`)**: full compliance review workspace with split preview, status workflow, tags, comments, timeline, access modal, and activity log.
- **Companies**: list page with filters + modal, profile detail view, programme listing, and programme detail page featuring summary cards, milestones tab (list/timeline toggle + timeline view), assign NGO workflow, documents tab, comments, progress insights, and Action Center sidebar.
- Assigned NGO tab uses optimistic linking (instant UI update, graceful rollback on failure, offline-aware toast messaging).

- Offline toasts warn when connectivity drops; queued assignments replay when the connection returns, and mutation buttons surface tooltips when offline.
- **Reports/Settings modules**: placeholders ready for future wiring.
- Admin onboarding tour cleaned post-integration, ensuring layout structure remains intact and lint/build succeed.

## Other Role Pages
- NGO, Company, Donor dashboards updated with final copy and minimal hero cards. Ready to host future dynamic content (campaigns, budgets, donations).

## Storybook Coverage & Percy Snapshots
- Isolated stories currently exist for Button, Input, QuickActionCard (light/dark, default/hover/disabled states).
- `npm run snapshot:ui` kicks off Percy visual tests once Storybook is running; expect errors until system libraries for headless Chromium are installed.

## Accessibility & Usability
- Emerald focus rings across interactive elements, labelled icons, keyboard activation on table rows/cards, ARIA-live announcements for filter results.
- Command palette and modals trap focus; body scroll locked when overlays open.

## Known Gaps / Next Steps
- Tests for command palette and Action Center require Jest harness (mocking Auth + Next router/notFound and handling ESM modules). This remains on the High Priority TODO list.
- Install system packages (`libgtk-3-0`, `libgdk-pixbuf2.0-0`, `libgobject-2.0-0`, etc.) so Percy snapshots can run; track via TODO.
- Expand Storybook coverage to NGO tables, timeline widgets, and Action Center once harness ready.
- Replace mock metrics/toasts with real backend data using React Query.
- Add middleware-based route protection once backend session strategy finalises.

Maintain this document as modules evolve, Storybook coverage expands, or new dashboards launch.

- Breadcrumbs now highlight page hierarchy on company, programme, and NGO document views.
- Admin dashboard onboarding tour cleaned up (JSX fixed, hooks memoised).

- Added global search spotlight (⌘K / Ctrl+K) for cross-entity discovery with fuzzy matching.


### Donor Management
- Added admin donors module with filters, table view, pagination, and skeletons.


### Donor detail profile
- Added donor profile view with summary cards, tabs, and mock donation history.

### Donations ledger
- Added All Donations admin page with filters, table, pagination, and receipt modal.
