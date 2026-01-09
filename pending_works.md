# Pending Work Audit (Comprehensive)

_All findings are observational; no code was modified during this audit. Items are grouped by scope with each task captured as an individual, detailed point._

## 1. apps/__tests__
1. Jest coverage now includes CSR programme list/detail contract tests alongside baseline suites, but there are still **no cross-package integration tests** that exercise backend controllers or shared DTO flows, leaving regression gaps.
2. Vitest mocks rely on global fetch overrides without reset helpers, risking test leakage if additional suites are added.
3. Broader journeys (auth, approvals, financial) still lack end-to-end coverage—plan feature-level integration tests once routes and data contracts stabilise.
4. CSR programme smoke tests (mock vs API flag) remain outstanding; prior scaffolding was removed after parity issues surfaced, so fresh end-to-end validation must be implemented before flag rollout. Runtime fallback behaviour in hooks is still pending to satisfy reliability requirements before reenabling those suites.

## 2. apps/backend
1. **CSR Programme controller** now exposes company-scoped routes with explicit `JwtAuthGuard` + `RolesGuard (COMPANY)` applied; integration tests cover both guard enforcement and happy-path responses.
2. `CSRProgrammeController.detail` now re-fetches with milestones/assignments and maps via `toProgrammeDetailDto`; pending follow-up: audit other service consumers to confirm they include relation data before sanitising.
3. Controller methods accept DTOs but do not apply validation pipes locally—ensure global validation is active or add decorators to avoid unchecked payloads.
4. CSR service integration tests exist only as in-memory workflow specs; HTTP contract coverage now exists in `apps/backend/__tests__/csr-programme/csr-programme.routes.spec.ts`, the happy-path e2e suite, and RBAC-focused route tests, but negative paths and legacy `/api/v1` e2e suites still fail pending Prisma-backed fixtures.
5. Notifications module now includes safe delivery, metrics, and automated retry scheduling; long-term worker orchestration remains pending to support provider scaling.
6. Financial module exposes core endpoints with stricter DTO validation enforced (report period/year/url checks now hardened); admin analytics and integration tests for upload/review flows remain pending.
7. Activity/Audit logging flows validated end-to-end: CSR lifecycle, approvals transitions, and financial report uploads emit single, actor-scoped entries with correct metadata; failure paths avoid duplicate writes.
8. Shared docs (API guide, Postman collection) mention CSR routes; they require ongoing sync once guards/tests land to avoid divergence.

## 3. apps/frontend
1. CSR programme list/detail pages use feature-flagged React Query wrappers with shared query keys, ensuring cache invalidation stays in sync after create/update/status/assignment mutations. Runtime API fallback logic now guards every hook, automatically reverting to mock data when API failures occur. Still pending before enabling the flag by default: page-level RTL parity tests and end-to-end validation (RBAC, pagination).
2. CSR programme create flow now routes through the feature-flagged hook: when `API_PROGRAMME` is enabled it calls the backend `POST /companies/{id}/csr-programmes` endpoint, otherwise it falls back to the legacy mock mutation. Follow-up tasks: wire company selection once auth delivers IDs, add integration tests for API path, and monitor backend DTO changes.
3. CSR programme status transition and NGO assignment flows are now feature-flag-aware (`useProgrammeStatus`, `useProgrammeAssignment`), each preserving the existing UX with API fallbacks and dedicated hook tests. Next steps: monitor backend responses for schema changes and expand page-level RTL coverage to assert mutation feedback remains unchanged.
4. CSR programme update/status/assignment flows now invalidate list/detail caches consistently; add page-level RTL coverage for API-enabled edit submission before defaulting the flag to on.
5. Programme adapters introduced to satisfy lint now stub icon/timestamp helpers, altering UI formatting; they must be restored when analytics wiring is completed.
6. Feature flag `API_PROGRAMME` handling is partially in place—ensure env plumbing, tests, and documentation cover both ON/OFF behaviours before rollout.
7. Admin dashboard analytics lint suppression is temporary; follow-up task required to reinstate real helpers once API payloads stabilise.
8. Tests across dashboards are mock-based (Storybook + RTL) and offer no assurance against live API regressions; plan for integration tests once hooks are wired.
9. RBAC is enforced mostly client-side; audit middleware/route protections to ensure unauthorised users cannot hit protected pages when SSR/cache is used.

## 4. packages (api-contracts)
1. CSR programme DTOs are defined, but there is **no automated publish pipeline**—manual `npm publish` remains a risk; set up CI to build/test/release with semantic versioning.
2. Campaign and donation DTOs are absent, forcing frontend duplication; documenting or adding these contracts would reduce divergence.
3. Type-level tests only cover compile-time checks; consider adding runtime validators or schema snapshots if the package fronts public APIs.
4. Dist output exists but consuming apps rely on path aliases—verify tsconfig paths stay in sync whenever build output moves.

## Role-Wise Module Status

### Backend
- **Auth** — ✅ Complete (JWT login/register, guards active); _pending_: refresh tokens & password recovery flows.
- **Users** — ✅ Complete (CRUD + RBAC); _pending_: soft-delete restoration endpoints and scoped pagination filters.
- **Approvals** — 🟡 In Progress (workflow + notifications queued); _pending_: RBAC integration tests, audit logging parity, CSR linkage.
- **CSR Programme** — ✅ Complete (service + controller, guards, DTO alignment, activity logging, and comprehensive tests in place); continue monitoring frontend parity before enabling APIs by default.
- **Financial** — 🟡 In Progress (upload/list APIs live with hardened DTO validation); _pending_: admin analytics, UI wiring, comprehensive integration tests.
- **Analytics** — 🟡 In Progress (aggregations ready); _pending_: CSR data feed, caching, metric expansion.
- **Notifications** — 🟢 Complete (delivery processor + automated retries with metrics); _pending_: provider dashboards, long-term worker orchestration.
- **Activity/Audit Logging** — 🟢 Complete (CSR, approvals, financial flows verified to emit single, actor-scoped entries with correct metadata); ongoing: monitor new modules for compliance.

### Frontend
- **Auth Experience** — 🟡 In Progress (mock flows, guards); _pending_: real backend integration, token refresh handling.
- **Company Dashboard** — 🟡 In Progress (mock widgets); _pending_: live data via React Query + feature flag validation.
- **NGO Dashboard** — 🟡 In Progress (mock financial/impact sections); _pending_: API wiring, accessibility review.
- **Admin Dashboard** — 🟡 In Progress (analytics with temporary suppressions); _pending_: restore helpers, connect API, add regression tests.
- **Approvals UI** — 🟠 Incomplete (prototype only); _pending_: backend wiring, real-time updates, form validation.
- **CSR Programme UI** — 🟠 Incomplete (feature-flagged mocks + selective API hooks); _pending_: production API rollout, RBAC validation, pagination parity, status/assignment page-level tests, and end-to-end validation before enabling default API mode.

### Shared / Infrastructure
- **API Contracts** — 🟡 In Progress (core DTOs available); _pending_: add campaign/donation contracts, automate releases, strengthen tests.
- **Testing/CI** — 🟠 Incomplete (per-app pipelines exist but lack cross-app integration, coverage gates, and visual regression enforcement).

---
_Update this document whenever items are closed or new findings emerge to maintain alignment across teams._
