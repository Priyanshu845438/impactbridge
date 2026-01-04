# Frontend Progress Snapshot

1. App Router & Mock Auth Baseline
- Scaffolded Next.js App Router structure with mock authentication flows for early UX prototyping.
- Introduced shared UI primitives (buttons, cards, tabs) to stabilise visual language across pages.
- Ensured initial routing guards align with planned role-based access patterns.

2. RBAC Middleware & Role Helpers
- Implemented middleware to enforce route-level RBAC using shared `UserRole` enums.
- Added reusable helpers to keep server and client role checks in sync.
- Verified protected routes redirect unauthorised users consistently.

3. Feature Flag Infrastructure
- Added environment-driven feature flag utilities covering dashboards, CSR programmes, and auth flows.
- Documented flag descriptors for consistent usage across teams.
- Defaulted all new API-backed experiences to off to preserve mock behaviour.

4. Admin Analytics API Preparation
- Created analytics contracts and adapters to map backend payloads into existing dashboard props.
- Introduced React Query hook scaffolding for admin analytics with flag-controlled execution.
- Added unit tests ensuring adapters handle core data shapes without regressing mocks.

5. CSR Programme Integration Readiness
- Reviewed company CSR programme list/detail screens to catalogue mock data dependencies.
- Confirmed React Query + feature flag strategy needed once backend endpoints are wired.
- Flagged absence of concrete approval UI, blocking current API integration work.

6. NGO Financial Reporting Gap Identified
- Audited NGO dashboard routes and confirmed only mock finance/compliance views exist with no financial report list or upload screens.
- Recorded dependency on product decision to supply target UI or specs before backend wiring can proceed.

7. NGO Financial Reports UI Implemented
- Added mock-driven reports list and upload pages under `/dashboard/ngo/finance/reports` with loading, empty, and error placeholders.
- Added RTL coverage ensuring list renders correctly and upload flow resets after simulated submission.

8. Stability Cleanup Pending
- Evaluated admin dashboard analytics lint violations blocking builds.
- Deferred intrusive fixes to avoid disturbing mock analytics behaviour before API wiring lands.
- Noted dependency on upcoming analytics refactor for final lint resolution.

9. CSR Programme Hooks Bridge
- Wired company CSR programme hooks to backend API via feature-flagged wrappers while preserving mock fallback.
- Added Jest coverage for flag on/off scenarios and ensured React Query providers are seeded in tests.
- Resolved TypeScript pathing to reuse `@impactbridge/api-contracts` DTOs and verified `npm run build` remains green.

10. CSR Programme Detail Hook Verified
- Strengthened detail hook fallback logic (mock-first, API optional) with null-safe handling.
- Added unit tests covering flag off/on and API-null fallbacks to protect UI behaviour.
- Confirmed frontend build/test flows remain green (`npm run test`, `npm run build`).

11. CSR Programme List Hook Stabilised
- Normalised backend list responses (flag-on) onto mock-equivalent shapes with pagination-safe fallbacks.
- Added Jest coverage for API-enabled, mock-only, and empty-response scenarios ensuring UI parity.
- Re-ran frontend test/build pipelines (`npm run test`, `npm run build`) to validate unchanged behaviour.

12. CSR Programme List Page API Switch
- List page now consumes the flag-aware hook, falling back to mocks when the API is disabled, empty, or errors.
- Added list-page tests covering flag on/off, API payload rendering, mock fallback, loading, and error banner states.
- Verified UI parity with full suite and production build (`npm run test`, `npm run build`).
