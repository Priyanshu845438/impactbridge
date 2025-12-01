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
- Styling: gradient border, subtle hover animation + hover scale.

### `components/dashboard/stat-card.tsx`
- Props: `{ icon, label, value, trend, statusColor, helper?, children? }`
- Displays a metric with trend pill (↑/↓), brand-aware tones, and optional slot (used for sparklines).
- Memoized to avoid unnecessary re-renders when surrounding dashboards refresh.
- Utilised in admin dashboard metric grid for consistent analytics visuals.

### `components/dashboard/activity-feed.tsx`
- Static list of recent events with icon, title, description, and timestamp.
- Memoized; layout stacks items vertically on small screens and uses timeline affordance on md+.
- Planned upgrade: consume real audit/activity API once available.

### `components/dashboard/profile-drawer.tsx`
- Right-side sheet for account quick actions; triggered from dashboard header.
- Shows avatar initials, name, role badge, contact info, "My Profile" shortcut, and logout button.
- Re-uses Drawer primitive for responsive full-screen behaviour on mobile.
- Trigger now clones the supplied button so only one `<button>` renders, avoiding nested-button hydration warnings.

### Notifications UI (page-level pattern)
- `app/dashboard/notifications/page.tsx` consumes SectionHeader, skeletons, and AuthProvider badge state to surface mock alerts.
- Demonstrates list rendering with type badges (info/warning/action) and per-item mark-as-read actions.

### User directory (page-level pattern)
- `app/dashboard/users/page.tsx` showcases table layout with search bar, role/status filters, pagination footer, and responsive row design.
- Uses existing Button/Select/Skeleton components to keep interactions consistent until API wiring.

### User detail view (page-level pattern)
- `app/dashboard/users/[id]/page.tsx` demonstrates dynamic routing with tabs (overview/activity/permissions), action toasts, and responsive two-column layout.
- Reuses `Tabs`, `SectionHeader`, skeleton loaders, and toast feedback for mock actions.

### Dashboard visualisations (inline helpers in `admin/page.tsx`)
- `AreaChart` & `Sparkline` render lightweight SVG trendlines for analytics hero row and KPI cards.
- Recharts LineChart drives CSR submissions view; skeletons keep layout stable before data resolves.

### `components/ui/drawer.tsx`
- Controlled slideover used across admin modules (e.g., NGO detail preview).
- Props: `{ open, onClose, title?, description?, children, footer }`
- Handles Escape key + backdrop clicks; auto-resizes for mobile and supports full-width handset view.

### `app/dashboard/admin/ngos/[id]/documents/page.tsx`
- Page-level pattern for compliance reviews with searchable table, status badges, and drawer actions (approve/reject/request update) powered by `toast`.
- Drawer now features a split preview (document pane, metadata/tags board, watermark) plus collaboration sidebar for threaded comments, filters, quick actions, and add-comment form.
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

### Input – `components/ui/input.tsx`
- Standard form input with Tailwind styling
- Works with `FormField` wrappers for validation

### Card – `components/ui/card.tsx`
- Composition of `Card`, `CardHeader`, `CardContent`, etc.
- Handy for grouping forms or dashboard content

### Select – `components/ui/select.tsx`
- Wraps Radix UI select; used in register form for role selection

## Patterns
- Forms use `react-hook-form` + `Form` components
- Dashboard uses grid utilities for responsive layout (`grid gap-6 sm:grid-cols-2 xl:grid-cols-4` etc.)
- For new modules, follow `admin/modules` pages: SectionHeader + divider + content box

## Adding New Components
1. Build new shared components under `components/`
2. Prefer composition over ad-hoc Tailwind in pages
3. Document reusable pieces here to help future contributors
4. Update `docs/STYLE_GUIDE.md` if new visual tokens introduced
