# Component Catalog

This catalog lists the key reusable components in the frontend, their purpose, and usage hints.

## Dashboard Components
### `components/dashboard/section-header.tsx`
- Props: `{ title: string; subtitle?: string; action?: ReactNode }`
- Usage: Place at the top of sections to keep consistent typography & optional CTA.
- Example:
```tsx
<SectionHeader
  title="NGO Management"
  subtitle="Review registrations awaiting approval."
  action={<Button>Create NGO</Button>}
/>
```
- Responsive: stacks on mobile (`flex-col`) and keeps CTAs full-width before sm breakpoint.

### `components/dashboard/quick-action-card.tsx`
- Props: `{ title, description, actionLabel, icon: LucideIcon, onClick?, className? }`
- Usage: Highlight next best steps (e.g., “Review NGOs”, “Open reports”).
- Styling: gradient border, subtle hover animation + hover scale. CTA link now supplies an `aria-label` that combines action + title, and the decorative icon chip is `aria-hidden` to keep screen readers focused on text.

### `components/dashboard/stat-card.tsx`
- Props: `{ icon, label, value, trend, statusColor, helper?, children? }`
- Displays a metric with trend pill (↑/↓), brand-aware tones, and optional slot (used for sparklines).
- Memoized to avoid unnecessary re-renders when surrounding dashboards refresh.
- Utilised in admin dashboard metric grid for consistent analytics visuals.

### `components/dashboard/activity-feed.tsx`
- Static list of recent events with icon, title, description, and timestamp.
- Memoized; layout stacks items vertically on small screens and uses timeline affordance on md+.
- Planned upgrade: consume real audit/activity API once available. Current implementation announces the list via `aria-labelledby` and each entry via an `aria-label` string for screen readers.

### `components/dashboard/profile-drawer.tsx`
- Right-side sheet for account quick actions; triggered from dashboard header.
- Shows avatar initials, name, role badge, contact info, locale switch (EN/HI), "My Profile" shortcut, and logout button.
- Re-uses Drawer primitive for responsive full-screen behaviour on mobile.
- Trigger clones the supplied button so only one `<button>` renders, avoiding nested-button hydration warnings. Quick actions include explicit `aria-label`s (e.g., “Go to my profile”, “Sign out”).

### `components/charts/impact-trend-chart.tsx`
- Lightweight Recharts line chart component with smooth curves, first-load animation, tooltip, and hover glow.
- Metric toggle (`Donations` / `Impact`) swaps the series colour and keeps data local while backend wiring is pending.
- Responsive wrapper ensures full-width desktop layout and stacked mobile presentation when embedded in dashboards.
- Reused in the admin dashboard metrics section; can be dropped into other role dashboards for a quick trend view.

### Command palette
- `CommandPalette` lives in `app/dashboard/layout.tsx`; toggled with ⌘/Ctrl + K or the inline shortcut button beside global search.
- Accepts `{ label, actionLabel, icon, keywords }` array and filters results client-side.
- Uses modal layout on desktop and full-width overlay on smaller breakpoints; closes on Escape or item select.
- Provides keyboard focus trapping, body scroll lock, prefetch-driven navigation cues, and `useTransition` for smooth filtering.
- **Testing note**: unit tests remain pending until Jest harness mocks `useAuth`/router/notFound` and handles ESM modules (see `docs/FRONTEND_TODO.md`).

### Suggested actions panel
- `SuggestedActionsPanel` (inline component in `app/dashboard/admin/page.tsx`) renders a scrollable list of mock recommendations with icons and “Take action” buttons.
- Complements Quick Actions on desktop (side card) and stacks below analytics on smaller breakpoints.

### Action Center helpers
- **ActionItem** (`admin/company/[companyId]/programmes/[programmeId]/page.tsx`): small CTA row combining icon, title, description, and hover feedback; used inside the Action Center sidebar.
- **Action Center Panel**: responsive quick-action sidebar that collapses on mobile and surfaces toast-driven workflows (add milestone, request NGO update, upload compliance document).
- **Testing note**: Action Center tests also pending the Jest harness (mock toast + layout dependencies).

### User directory (page-level pattern)
- `/dashboard/users` showcases table layout with search bar, role/status filters, pagination footer, and responsive row design.
- Uses existing Button/Select/Skeleton components to keep interactions consistent until API wiring.

### User detail view (page-level pattern)
- `/dashboard/users/[id]` demonstrates dynamic routing with tabs (overview/activity/permissions), action toasts, and responsive two-column layout.
- Reuses `Tabs`, `SectionHeader`, skeleton loaders, and toast feedback for mock actions.

### Dashboard visualisations (inline helpers in `admin/page.tsx`)
- `OverviewChart` combines muted bars + line for platform activity, `MicroBar` renders mini bar sets inside KPI cards, and `Sparkline` remains available for other trend contexts. Charts sit inside `min-h-[280px]` wrappers with `ResponsiveContainer` width/height enforced.

### Notifications UI (page + header pattern)
- Header bell inside `app/dashboard/layout.tsx` shows badge, desktop popover, and mobile sheet with `NotificationItem` helper rows.
- `/dashboard/notifications` consumes SectionHeader, skeletons, and AuthProvider badge state to surface alert history and mark-as-read actions.

### Theme utilities
- **ThemeToggle** (`components/ui/theme-toggle.tsx`): header button wired to `next-themes`, cycles light/dark with toast on first activation and stores preference via localStorage.

## UI Primitives (shadcn wrappers)
- Buttons, Inputs, Cards, Selects, Tabs, Drawer, Skeletons – all updated with brand focus rings, dark-mode tokens, and responsive spacing.

## Patterns
- Forms use React Hook Form + Zod.
- Dashboard uses grid utilities for responsive layout.
- NGO document drawer demonstrates status workflow (timeline, comments, access modal).
- Company programme detail page shows control-panel layout with summary cards, assign NGO modal, milestone timeline/list toggle, comments, documents, and Action Center.

## Adding New Components
1. Build shared components under `components/`.
2. Prefer composition over ad-hoc Tailwind in pages.
3. Document reusable pieces here to help future contributors.
4. Update `docs/STYLE_GUIDE.md` if new visual tokens introduced.
5. Consider testing implications—update Jest harness mocks when adding components that depend on App Router or Auth context.
