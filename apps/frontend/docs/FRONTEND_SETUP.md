# ImpactBridge Frontend Setup & Architecture

## Tech Stack
- **Next.js 14 (App Router)** with TypeScript
- **TailwindCSS** for responsive utility styling
- **shadcn/ui** components layered with custom tokens
- **React Hook Form + Zod** for validated forms
- **React Query** & custom `AuthProvider` for session state
- **Storybook 10 (Vite builder)** for isolated UI development/documentation
- **Percy visual snapshots** (storybook integration) for change detection
- **sonner** toaster (`components/ui/sonner`) for global notifications
- **Offline status provider** (`providers/offline-status-provider.tsx`) surfaces connectivity toasts, disables risky actions, and queues mutations for replay.
- **Skeleton system** (`components/ui/skeleton.tsx`) for shimmer loading states
- Fetch-based API client scaffold (`lib/api/client.ts`) for upcoming backend wiring

## Directory Overview
- `app/`
  - `layout.tsx` client root shell (fonts, providers, toaster)
  - `page.tsx` root redirect → `/login`
  - `login`, `register`, `forgot-password`, `reset-password`
  - `dashboard/`
    - `layout.tsx` protected workspace + nested sidebar + header notifications popover/sheet
    - role pages: `admin`, `ngo`, `company`, `donor`
    - admin modules: `app/dashboard/admin/modules/{ngos,programmes,reports,settings}` (NGO screen now includes mock table UI with responsive search/filter rows, sorting, pagination, drawer, and multi-filter controls)
    - super admin utilities: `app/dashboard/users` (global user directory), `notifications`, `profile`
- `components/`
  - `dashboard/`
    - `section-header.tsx` shared heading + actions
    - `quick-action-card.tsx` stat/action widgets
    - `profile-drawer.tsx` clones supplied trigger button so only a single `<button>` is rendered
  - `ui/`
    - shadcn primitives (Button, Card, Input, etc.)
    - `sonner.tsx` exposing the Toaster provider
    - `skeleton.tsx` shimmer placeholders for stats/cards/activity
- `providers/`
  - `auth-context.tsx` persistent JWT + auto-redirect handling + notification badge state
  - `query-provider.tsx` React Query wrapper
  - `theme-provider.tsx`, `locale-context.tsx`, `intl-provider.tsx`
- `stories/` Storybook stories (Button, Input, QuickActionCard)
- `tests/percy.config.json` Percy snapshot configuration
- `storybook-static/` build output generated via `npm run build-storybook`
- `lib/`
  - `api-client.ts` fetch wrapper
  - `fetcher.ts` typed fetch helper
  - `nav-menu.ts` role-aware (and nested) sidebar config
- `public/images/` background assets for auth screens
- `docs/` living documentation (setup, dashboard, style, routing)
- `agents.md` running changelog per instruction

## Styling & Theme Layers
- Brand palette anchored on navy `#0A2540` with highlight blue `#4A6DFB`
- `globals.css` applies body gradient, glassmorphism helpers, shimmer keyframes
- Cards use `backdrop-blur`, translucent whites, and responsive padding (`max-[480px]`)
- Dashboard shell uses `flex w-full h-screen` to avoid gaps between sidebar/content

## Auth Flow Lifecycle
1. User hits `/login` or `/register`
2. Forms validate via Zod + RHF, display inline feedback
3. Submit uses `apiClient.post` to `/auth/login` or `/auth/register`
4. Token stored in `AuthProvider` (state + `localStorage`); `setApiClientToken` injects Authorization header
5. Role-based redirect: `SUPER_ADMIN → /dashboard/admin`, `NGO → /dashboard/ngo`, `COMPANY → /dashboard/company`, `DONOR → /dashboard/donor`
6. `middleware.ts` (planned) will gate dashboard routes once server enforcement is required

## Dashboard Shell Highlights
- `dashboard/layout.tsx` guards access using `useAuth()`
- Sidebar sources `navMenu`; collapsible groups render nested admin modules when role is SUPER_ADMIN, and the panel now allows vertical scrolling for large menus. Icons are decorative (`aria-hidden`) and expand/collapse buttons announce their state via `aria-expanded`.
- Sticky header with profile drawer trigger (quick access + sign out) and mirrored mobile menu. Global search provides an `aria-label`, notification bell announces unread items, and the command palette toggle is keyboard accessible with ⌘/Ctrl + K.
- Main pane hosts widgets like quick cards, stats, and activity (documented in `FRONTEND_DASHBOARD.md`)
- Skeleton placeholders provide a smooth transition before real data appears

## Storybook & Percy Usage
- Storybook lives alongside the Next app using the Vite builder and Next integration (`@storybook/nextjs-vite`).
- `npm run storybook` launches the playground (note: CLI attempts to open a browser using `xdg-open`, which is unavailable in the portal container; ignore the ENOENT error and navigate manually if needed).
- `npm run build-storybook` generates static output.
- Percy CLI is installed (`@percy/cli`, `@percy/storybook`). Snapshot config lives at `tests/percy.config.json` (per instructions, includes `include` glob for stories).
- Snapshot command:
  ```bash
  npm run snapshot:ui  # equivalent to: npx percy storybook http://localhost:6006 --config tests/percy.config.json
  ```
  Requirements:
  - Storybook dev server must be running (port 6006).
  - Headless Chromium system deps are needed (`libgobject-2.0.so.0`, etc.). The current container lacks these libraries, so Percy exits with `Failed to launch browser`. Install the relevant apt packages (e.g., `libgtk-3-0`, `libgdk-pixbuf2.0-0`) before re-running snapshots.
  - Percy also warns that `include` is an unknown property; left as-is to honour the requested config.

## Environment Variables
Create `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```
Optional: configure backend CORS to allow `http://localhost:3400`

## Scripts
```bash
npm install                   # install deps
npm run dev -- --port 3400    # start dev server (port 3400, /dashboard redirects → /dashboard/admin)
npm run lint                  # lint check
npm run build                 # production build (standalone output, strict mode off per next.config.js)
npm run start                 # serve built app
npm run storybook             # Storybook playground (port 6006)
npm run build-storybook       # Storybook static export
npm run snapshot:ui           # Percy visual snapshots (requires Storybook + system libs)
# Company CSR programme directory lives at `/dashboard/company/programmes`; mock catalog is in `app/dashboard/company/programmes/mock-data.ts`.
# clean rebuild when chunks mismatch
rm -rf .next node_modules/.cache && npm install && npm run build
```

## Development Notes
- Keep dashboard additions modular; place shared components in `components/dashboard`
- Use skeletons for optimistic UX when wiring future data fetches
- Inherit shared emerald focus rings (`focus-visible:ring-brand/70` + offsets) whenever adding new interactive elements
- When wiring APIs, prefer React Query hooks for caching; place them in `lib/queries`
- Maintain docs alongside feature work so stakeholders stay informed
- Update `agents.md` with a short bullet per major change
- Route prefetch: dashboard layout preloads `/dashboard/admin`, `/dashboard/users`, and `/dashboard/admin/modules/reports` automatically; hook additional hot routes as needed
- Percy snapshots currently blocked by missing system libraries; track in TODO
