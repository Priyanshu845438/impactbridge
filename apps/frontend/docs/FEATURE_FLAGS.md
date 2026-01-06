# Feature Flags

| Flag | Env Var | Default | Description |
| --- | --- | --- | --- |
| `API_DASHBOARD` | `NEXT_PUBLIC_FLAG_API_DASHBOARD` | `false` | Enables admin analytics dashboard to fetch real backend data via `useAdminAnalytics`. When `false`, UI falls back to mock dataset. |
| `API_PROGRAMME` | `NEXT_PUBLIC_FLAG_API_PROGRAMME` | `false` | Enables company CSR programme list/detail/create/status/assignment flows to consume backend data via React Query wrappers. When `true`, list/detail fetch from the API and create/status/assign mutations call `/companies/{id}/csr-programmes` endpoints; when `false`, all flows fall back to mocks. Contract tests guarantee identical UI output for flag on/off, loading, and error states. |
| `API_AUTH` | `NEXT_PUBLIC_FLAG_API_AUTH` | `false` | Switches login/register forms to real backend auth endpoints. `false` retains mock workflow. |

## Usage Guidelines
- Flags are read via `lib/feature-flags.ts` using environment variables at build time.
- `AuthProvider` and feature-specific hooks (analytics, CSR) branch on flag values to determine data source.
- Always provide mock fallbacks to keep demo environments functional.
- Document new flags here with default state and rollout plan.

_Last reviewed: 2026-01-07 — CSR lifecycle logging + negative-path tests landed; API programme flag is backed by list/detail/create/status/assignment UX contract tests across flag on/off modes._

> NOTE: CSR programme status transitions and NGO assignment now participate in the API flag flow alongside list/detail/create, keeping mock fallback behaviour.
