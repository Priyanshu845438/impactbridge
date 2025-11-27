# ImpactBridge Frontend Setup & Architecture

## Tech Stack
- **Next.js 14 (App Router)** with TypeScript
- **TailwindCSS** for responsive utility styling
- **shadcn/ui** components layered with custom tokens
- **React Hook Form + Zod** for validated forms
- **React Query** & custom `AuthProvider` for session state
- **ky** based API client (`lib/api-client.ts`) with JWT header support

## Directory Overview
- `app/`
  - `layout.tsx` global shell (fonts, providers, metadata)
  - `page.tsx` root redirect → `/login`
  - `login`, `register`, `forgot-password`, `reset-password`
  - `dashboard/`
    - `layout.tsx` protected workspace + nested sidebar
    - role pages: `admin`, `ngo`, `company`, `donor`
    - admin modules: `app/dashboard/admin/modules/{ngos,programmes,reports,settings}`
- `components/`
  - `dashboard/`
    - `section-header.tsx` shared heading + actions
    - `quick-action-card.tsx` stat/action widgets
  - `ui/` shadcn primitives (Button, Card, Input, etc.)
- `context/auth-context.tsx` in-memory auth state
- `providers/QueryProvider.tsx` React Query wrapper
- `lib/`
  - `api-client.ts` fetch wrapper
  - `fetcher.ts` typed fetch helper
  - `nav-menu.ts` role-aware (and nested) sidebar config
- `public/images/` background assets for auth screens
- `docs/` living documentation (setup, dashboard)
- `agents.md` running changelog per instruction

## Styling & Theme Layers
- Brand palette anchored on navy `#0A2540` with violet accent `#5B2BEA`
- `globals.css` applies body gradient, glassmorphism helpers, typography resets
- Cards use `backdrop-blur`, translucent whites, and responsive padding (`max-[480px]`)
- Dashboard shell uses `flex w-full h-screen` to avoid gaps between sidebar/content

## Auth Flow Lifecycle
1. User hits `/login` or `/register`
2. Forms validate via Zod + RHF, display inline feedback
3. Submit uses `apiClient.post` to `/auth/login` or `/auth/register`
4. Token stored in `AuthProvider` (memory only); `setApiClientToken` injects Authorization header
5. Role-based redirect: `SUPER_ADMIN → /dashboard/admin`, `NGO → /dashboard/ngo`, `COMPANY → /dashboard/company`, `DONOR → /dashboard/donor`
6. `middleware.ts` (planned) will gate dashboard routes once server enforcement is required

## Dashboard Shell Highlights
- `dashboard/layout.tsx` guards access using `useAuth()`
- Sidebar sources `navMenu`; collapsible groups render nested admin modules when role is SUPER_ADMIN
- Sticky header for quick actions/log out
- Main pane hosts widgets like quick cards and activity feeds (documented in `FRONTEND_DASHBOARD.md`)

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
```
If static assets or config change: `rm -rf .next` before a rebuild

## Development Notes
- Keep dashboard additions modular; place shared components in `components/dashboard`
- When wiring APIs, prefer React Query hooks for caching; place them in `lib/queries`
- Maintain docs/ alongside feature work so stakeholders stay informed
- Update `agents.md` with a short bullet per major change (timestamp optional)
