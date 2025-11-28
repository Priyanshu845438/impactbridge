# ImpactBridge Frontend Setup & Architecture

## Tech Stack
- **Next.js 14 (App Router)** with TypeScript
- **TailwindCSS** for responsive utility styling
- **shadcn/ui** components layered with custom tokens
- **React Hook Form + Zod** for validated forms
- **React Query** & custom `AuthProvider` for session state
- **sonner** toaster (`components/ui/sonner`) for global notifications
- **Skeleton system** (`components/ui/skeleton.tsx`) for shimmer loading states
- **ky** based API client (`lib/api-client.ts`) with JWT header support

## Directory Overview
- `app/`
  - `layout.tsx` client root shell (fonts, providers, toaster)
  - `page.tsx` root redirect → `/login`
  - `login`, `register`, `forgot-password`, `reset-password`
  - `dashboard/`
    - `layout.tsx` protected workspace + nested sidebar
    - role pages: `admin`, `ngo`, `company`, `donor`
    - admin modules: `app/dashboard/admin/modules/{ngos,programmes,reports,settings}` (NGO screen now includes mock table UI with sorting, pagination, drawer, and multi-filter controls)
- `components/`
  - `dashboard/`
    - `section-header.tsx` shared heading + actions
    - `quick-action-card.tsx` stat/action widgets
  - `ui/`
    - shadcn primitives (Button, Card, Input, etc.)
    - `sonner.tsx` exposing the Toaster provider
    - `skeleton.tsx` shimmer placeholders for stats/cards/activity
- `providers/`
  - `auth-context.tsx` persistent JWT + auto-redirect handling
  - `query-provider.tsx` React Query wrapper
- `lib/`
  - `api-client.ts` fetch wrapper
  - `fetcher.ts` typed fetch helper
  - `nav-menu.ts` role-aware (and nested) sidebar config
- `public/images/` background assets for auth screens
- `docs/` living documentation (setup, dashboard, style, routing)
- `agents.md` running changelog per instruction

## Styling & Theme Layers
- Brand palette anchored on navy `#0A2540` with violet accent `#5B2BEA`
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
- Sidebar sources `navMenu`; collapsible groups render nested admin modules when role is SUPER_ADMIN, and the panel now allows vertical scrolling for large menus
- Sticky header with profile drawer trigger (quick access + sign out) and mirrored mobile menu
- Main pane hosts widgets like quick cards, stats, and activity (documented in `FRONTEND_DASHBOARD.md`)
- Skeleton placeholders provide a smooth transition before real data appears

## Environment Variables
Create `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```
Optional: configure backend CORS to allow `http://localhost:3400`

## Scripts
```bash
npm install                   # install deps
npm run dev -- --port 3400    # start dev server (port 3400)
npm run lint                  # lint check
npm run build                 # production build
npm run start                 # serve built app
# clean rebuild when chunks mismatch
rm -rf .next node_modules/.cache && npm install && npm run build
```
If static assets or config change: `rm -rf .next` before a rebuild

## Development Notes
- Keep dashboard additions modular; place shared components in `components/dashboard`
- Use skeletons for optimistic UX when wiring future data fetches
- When wiring APIs, prefer React Query hooks for caching; place them in `lib/queries`
- Maintain docs/ alongside feature work so stakeholders stay informed
- Update `agents.md` with a short bullet per major change (timestamp optional)
- Use the global `Toaster` for user feedback (`import { Toaster } from '@/components/ui/sonner'`)
