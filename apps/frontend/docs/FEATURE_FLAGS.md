# Feature Flags

| Flag | Env Var | Default | Description |
| --- | --- | --- | --- |
| `API_DASHBOARD` | `NEXT_PUBLIC_FLAG_API_DASHBOARD` | `false` | Enables admin analytics dashboard to fetch real backend data via `useAdminAnalytics`. When `false`, UI falls back to mock dataset. |
| `API_PROGRAMME` | `NEXT_PUBLIC_FLAG_API_PROGRAMME` | `false` | Enables company CSR programme list/detail/create/update/status/assignment flows to consume backend data via React Query wrappers. When `true`, pages call `/companies/{id}/csr-programmes` endpoints for reads and mutations (create/update/status/assign); when `false`, all flows fall back to mocks. Shared query keys and cache invalidation keep API and mock payloads shape-identical so UI output remains unchanged for flag on/off, loading, and error states. Runtime fallback handling now ensures API failures revert to mock data automatically; end-to-end smoke validation remains outstanding before enabling this flag by default. |
| `API_AUTH` | `NEXT_PUBLIC_FLAG_API_AUTH` | `false` | Switches login/register forms to real backend auth endpoints. `false` retains mock workflow. |

## Usage Guidelines
- Flags are read via `lib/feature-flags.ts` using environment variables at build time.
- `AuthProvider` and feature-specific hooks (analytics, CSR) branch on flag values to determine data source.
- Always provide mock fallbacks to keep demo environments functional.
- Document new flags here with default state and rollout plan.

_Last reviewed: 2026-01-08 — API programme flag now covers the edit/update flow with hook-level tests; runtime fallback safeguards are in place. Page-level RTL coverage for edit and end-to-end smoke validation remain pending before enabling the flag by default._
> NOTE: CSR programme status transitions, NGO assignment, and update/edit flows now participate in the API flag flow alongside list/detail/create, keeping mock fallback behaviour.
