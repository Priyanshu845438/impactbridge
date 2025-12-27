# Frontend Architecture

## Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript with strict settings
- **Styling**: Tailwind CSS + component-level CSS modules where needed
- **State**: React Query (server state) + Context for auth/session
- **Build**: Next build outputs static + server bundles; Vercel-style deployment compatible

## Folder Layout
- `app/` — route segments following the App Router conventions. Key areas:
  - `app/(auth)` — public login/register flows
  - `app/dashboard` — protected layouts for NGO/Company/Admin
  - `app/api` — route handlers (limited usage; backend handles majority of APIs)
- `components/` — shared UI primitives (cards, tables, charts, forms)
- `hooks/` — reusable UI/data hooks (`useAdminAnalytics`, feature-flag helpers)
- `lib/` — utilities (`api-client`, `feature-flags`, analytics adapters, RBAC helpers)
- `providers/` — context providers (auth, feature flags)
- `types/` — TypeScript definitions aligned with shared `packages/api-contracts`
- `__tests__/` — Jest + React Testing Library suites covering hooks and pages

## Routing & RBAC
- Middleware enforces role-based access using shared helpers (`types/rbac.ts`).
- `AuthProvider` hydrates session context client-side, redirects on mismatch, and respects feature flags.
- Dashboard routes rely on role-aware layout components controlling navigation visibility.

## Data Fetching
- API calls go through `lib/api-client.ts` (ky wrapper) pointing to `/api/v1` backend base URL.
- React Query handles caching, retries, stale-while-revalidate semantics.
- Feature-flagged endpoints (analytics, CSR programmes) fall back to mock data until backend integration is enabled.

## Error & Loading States
- Skeleton components render during loading.
- Toast notifications surface mutation outcomes; global error boundary wraps dashboards.

## Build & Deployment
- `npm run build` executes Next production build.
- Ensure environment variables: `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_FLAG_*`, auth storage keys.
- Static assets (images) rely on Next image configuration (unoptimized for local development).

Keep this document updated when introducing new cross-cutting layers (server components, streaming, etc.).
