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
- Shows avatar initials, name, role badge, contact info, "My Profile" shortcut, and logout button.
- Re-uses Drawer primitive for responsive full-screen behaviour on mobile.
- Trigger now clones the supplied button so only one `<button>` renders, avoiding nested-button hydration warnings. Quick actions include explicit `aria-label`s (e.g., “Go to my profile”, “Sign out”).

### Notifications UI (page + header pattern)
- Header bell inside `app/dashboard/layout.tsx` shows a badge, desktop popover, and mobile sheet with mock notifications rendered via `NotificationItem` helper.
- `app/dashboard/notifications/page.tsx` consumes SectionHeader, skeletons, and AuthProvider badge state to surface alert history and mark-as-read actions.

### Command palette
- `CommandPalette` component lives inside `app/dashboard/layout.tsx` and is toggled via ⌘/Ctrl + K or the inline shortcut button beside global search.
- Accepts an array of `{ label, actionLabel, icon, keywords }` and filters results client-side.
- Uses modal layout on desktop (centered) and drops full-width overlay on smaller breakpoints; closes on Escape or item select.
- Provides keyboard focus trapping, body scroll lock, prefetch-driven navigation cues, and result hover affordances to mimic a productivity-grade quick search; `useTransition` keeps search/filter + close interactions buttery.
- Dashboard layout also mounts a top progress indicator using `next-nprogress-bar`, giving consistent route feedback alongside per-page skeletons.

### Suggested actions panel
- `SuggestedActionsPanel` (inline component in `app/dashboard/admin/page.tsx`) renders a scrollable list of mock recommendations with icons and “Take action” buttons.
- Used to complement Quick Actions on desktop (as a side card) and stack below analytics on smaller breakpoints.

### User directory (page-level pattern)
- `app/dashboard/users/page.tsx` showcases table layout with search bar, role/status filters, pagination footer, and responsive row design.
- Uses existing Button/Select/Skeleton components to keep interactions consistent until API wiring.

### User detail view (page-level pattern)
- `app/dashboard/users/[id]/page.tsx` demonstrates dynamic routing with tabs (overview/activity/permissions), action toasts, and responsive two-column layout.
- Reuses `Tabs`, `SectionHeader`, skeleton loaders, and toast feedback for mock actions.

### Dashboard visualisations (inline helpers in `admin/page.tsx`)
- `OverviewChart` combines muted bars + line for platform activity, `MicroBar` renders mini bar sets inside KPI cards, and `Sparkline` remains available for other trend contexts. Charts live inside `min-h-[280px]` wrappers and set `ResponsiveContainer` height/minHeight so layouts stabilise before render.
- Recharts BarChart powers CSR submissions with light fills; skeletons keep layout stable before data resolves.

### `components/ui/drawer.tsx`
- Controlled slideover used across admin modules (e.g., NGO detail preview).
- Props: `{ open, onClose, title?, description?, children, footer }`
- Handles Escape key + backdrop clicks; auto-resizes for mobile and supports full-width handset view.

### `app/dashboard/admin/ngos/[id]/documents/page.tsx`
- Page-level pattern for compliance reviews with searchable table, status badges, lifecycle controls (badge + dropdown), and drawer actions (approve/reject/request update) powered by `toast`.
- Drawer now features a split preview (document pane, metadata/tags board, watermark), collaboration sidebar with filters, threaded comments, mock action menus, status-aware disabling when Approved, plus a dedicated “Timeline & Status” panel (sticky on desktop) and Access & Permissions modal for managing mock roles.
- Demonstrates reuse of `Drawer`, `Badge`, `SectionHeader`, `Textarea`, and skeleton components for load states.

### `components/ui/tabs.tsx`
- Lightweight tabs primitive (list/trigger/content) for app router client components.
- NGO drawer uses it to switch between overview, documents, and activity views.

### `components/ui/skeleton.tsx`
- Suite of shimmer placeholders (`Skeleton`, `SkeletonText`, `SkeletonCard`, `SkeletonStat`, etc.).
- Keeps dashboards polished during async loads and mirrors final layout dimensions.

## UI Primitives (shadcn wrappers)
### Buttons – `components/ui/button.tsx`
- Variants: `default`, `outline`, `ghost`
- Accepts `size`, `asChild`
- Ships with unified emerald focus ring (`focus-visible:ring-brand/70` with light/dark offsets) so keyboard users get consistent feedback.

### Input – `components/ui/input.tsx`
- Standard form input with Tailwind styling
- Works with `FormField` wrappers for validation
- Emerald focus ring mirrors button styling.

### Card – `components/ui/card.tsx`
- Composition of `Card`, `CardHeader`, `CardContent`, etc.
- Handy for grouping forms or dashboard content

### Select – `components/ui/select.tsx`
- Wraps Radix UI select; used in register form for role selection
- Defaults to the same focus styling; pair with `<label htmlFor>` for accessibility.

## Patterns
- Forms use `react-hook-form` + `Form` components
- Dashboard uses grid utilities for responsive layout (`grid gap-6 sm:grid-cols-2 xl:grid-cols-4` etc.)
- For new modules, follow `admin/modules` pages: SectionHeader + divider + content box
- Document preview pane empty state copy now reads “Select a document to review its secure preview” to align with tone guidelines.
- `admin/companies/page.tsx` demonstrates the shared table/card pattern, filter row, and modal scaffolding for entity management pages.
- `admin/company/[companyId]/page.tsx` shows the detail layout pattern (overview + snapshot + related entities + timeline) for company records.
- `admin/company/[companyId]/programmes/page.tsx` demonstrates the programme grid with progress bars, filter bar, and modal scaffold.
- `admin/company/[companyId]/programmes/[programmeId]/page.tsx` highlights the full programme detail experience with summary metrics, milestone timeline, documents, assigned NGOs (assign modal workflow), dedicated milestones tab with list/timeline toggle, and comments tabs.

## Adding New Components
1. Build new shared components under `components/`
2. Prefer composition over ad-hoc Tailwind in pages
3. Document reusable pieces here to help future contributors
4. Update `docs/STYLE_GUIDE.md` if new visual tokens introduced

- Prefetch behaviour: sidebar `Link` components use `prefetch={true}` and the layout proactively prefetches `/dashboard/admin`, `/dashboard/users`, and `/dashboard/admin/modules/reports` so navigation stays instant.
