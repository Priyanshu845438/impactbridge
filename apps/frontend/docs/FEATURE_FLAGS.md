# Feature Flags

| Flag | Env Var | Default | Description |
| --- | --- | --- | --- |
| `API_DASHBOARD` | `NEXT_PUBLIC_FLAG_API_DASHBOARD` | `false` | Enables admin analytics dashboard to fetch real backend data via `useAdminAnalytics`. When `false`, UI falls back to mock dataset. |
| `API_PROGRAMME` | `NEXT_PUBLIC_FLAG_API_PROGRAMME` | `true` | Company CSR programme list/detail/create/update/status/assignment flows now consume backend data via React Query wrappers by default. When set to `false`, pages fall back to mocks while preserving UX parity. Shared query keys and cache invalidation keep outputs consistent across flag states, and runtime error handling gracefully reverts to mock data if API calls fail. End-to-end smoke validation remains a follow-up before promoting to production environments without manual oversight. |
| `API_AUTH` | `NEXT_PUBLIC_FLAG_API_AUTH` | `false` | Switches login/register forms to real backend auth endpoints. `false` retains mock workflow. |

## Usage Guidelines
- Flags are read via `lib/feature-flags.ts` using environment variables at build time.
- `AuthProvider` and feature-specific hooks (analytics, CSR) branch on flag values to determine data source.
- Always provide mock fallbacks to keep demo environments functional.
- Document new flags here with default state and rollout plan.

_Last reviewed: 2026-01-17 — API programme flag defaults to on with list/detail/create/edit/status/assignment parity tests and runtime fallbacks verified. Remaining work: add end-to-end smoke validation and monitor API telemetry post-rollout._
> NOTE: CSR programme status transitions, NGO assignment, and update/edit flows now participate in the API flag flow alongside list/detail/create, keeping mock fallback behaviour.
