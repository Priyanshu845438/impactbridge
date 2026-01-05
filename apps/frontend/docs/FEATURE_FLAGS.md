# Feature Flags

| Flag | Env Var | Default | Description |
| --- | --- | --- | --- |
| `API_DASHBOARD` | `NEXT_PUBLIC_FLAG_API_DASHBOARD` | `false` | Enables admin analytics dashboard to fetch real backend data via `useAdminAnalytics`. When `false`, UI falls back to mock dataset. |
| `API_PROGRAMME` | `NEXT_PUBLIC_FLAG_API_PROGRAMME` | `false` | Enables company CSR programme list/detail pages and create flow to consume backend data through React Query wrappers. When `false`, all views fall back to mock content; when `true`, list/detail fetch from the API and create submits via the `POST /companies/{id}/csr-programmes` endpoint with mock fallback on failure. |
| `API_AUTH` | `NEXT_PUBLIC_FLAG_API_AUTH` | `false` | Switches login/register forms to real backend auth endpoints. `false` retains mock workflow. |

## Usage Guidelines
- Flags are read via `lib/feature-flags.ts` using environment variables at build time.
- `AuthProvider` and feature-specific hooks (analytics, CSR) branch on flag values to determine data source.
- Always provide mock fallbacks to keep demo environments functional.
- Document new flags here with default state and rollout plan.
