# Pending Work Audit (Comprehensive)

_All findings are observational; no code was modified during this audit. Items are grouped by scope with each task captured as an individual, detailed point._

## 1. apps/__tests__
1. Jest coverage now includes CSR programme list/detail contract tests alongside baseline suites, but there are still **no cross-package integration tests** that exercise backend controllers or shared DTO flows, leaving regression gaps.
2. Vitest mocks rely on global fetch overrides without reset helpers, risking test leakage if additional suites are added.
3. Broader journeys (auth, approvals, financial) still lack end-to-end coverage—plan feature-level integration tests once routes and data contracts stabilise.

## 2. apps/backend
1. **CSR Programme controller** now exposes company-scoped routes with explicit `JwtAuthGuard` + `RolesGuard (COMPANY)` applied; integration tests cover both guard enforcement and happy-path responses.
2. `CSRProgrammeController.detail` now re-fetches with milestones/assignments and maps via `toProgrammeDetailDto`; pending follow-up: audit other service consumers to confirm they include relation data before sanitising.
9. CSR programme activity logging partially delivered: create/update/assign/status actions emit audit logs when actorId is present; negative-path tests now cover ownership/not-found cases, while unassignment, milestone logging, and broader adoption remain outstanding.
3. Controller methods accept DTOs but do not apply validation pipes locally—ensure global validation is active or add decorators to avoid unchecked payloads.
4. CSR service integration tests exist only as in-memory workflow specs; HTTP contract coverage now exists in `apps/backend/__tests__/csr-programme/csr-programme.routes.spec.ts`, the happy-path e2e suite, and RBAC-focused route tests, but negative paths and legacy `/api/v1` e2e suites still fail pending Prisma-backed fixtures.
5. Notifications module remains dispatcher-less: intents are queued but no background worker/provider sends emails/SMS; retry, logging, and metrics workflows are still unimplemented.
6. Financial module exposes core endpoints yet lacks stricter DTO validation, admin analytics, and integration tests for upload/review flows.
7. Activity/Audit logging utilities are present, but CSR, approvals, and financial services do not consistently emit events, creating traceability gaps.
8. Shared docs (API guide, Postman collection) mention CSR routes; they require ongoing sync once guards/tests land to avoid divergence.

## 3. apps/frontend
1. CSR programme list/detail pages use feature-flagged React Query wrappers that call the live API when `API_PROGRAMME` is enabled, with mocks as fallback; newly added RTL contract tests cover flag on/off, loading, error, and fallback states. End-to-end validation (RBAC, pagination parity) and rollout coordination remain pending before enabling the flag by default.
2. CSR programme create flow now routes through the feature-flagged hook: when `API_PROGRAMME` is enabled it calls the backend `POST /companies/{id}/csr-programmes` endpoint, otherwise it falls back to the legacy mock mutation. Follow-up tasks: wire company selection once auth delivers IDs, add integration tests for API path, and monitor backend DTO changes.
3. CSR programme status transition flow now uses a feature-flag-aware mutation (`useProgrammeStatus`) with API fallback logic and dedicated tests. Follow-up: monitor backend contract changes and add end-to-end coverage once programme ownership checks expose real company IDs.
3. Programme adapters introduced to satisfy lint now stub icon/timestamp helpers, altering UI formatting; they must be restored when analytics wiring is completed.
4. Feature flag `API_PROGRAMME` handling is partially in place—ensure env plumbing, tests, and documentation cover both ON/OFF behaviours before rollout.
5. Admin dashboard analytics lint suppression is temporary; follow-up task required to reinstate real helpers once API payloads stabilise.
6. Tests across dashboards are mock-based (Storybook + RTL) and offer no assurance against live API regressions; plan for integration tests once hooks are wired.
7. RBAC is enforced mostly client-side; audit middleware/route protections to ensure unauthorised users cannot hit protected pages when SSR/cache is used.

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
- **CSR Programme** — 🟡 In Progress (service + controller present); _pending_: route guards, DTO-aligned detail response, HTTP integration tests, frontend contract validation.
- **Financial** — 🟡 In Progress (upload/list APIs live); _pending_: stricter validation, admin analytics, UI wiring, comprehensive tests.
- **Analytics** — 🟡 In Progress (aggregations ready); _pending_: CSR data feed, caching, metric expansion.
- **Notifications** — 🟠 Incomplete (intent storage only); _pending_: dispatch workers/providers, retry + metrics pipeline.
- **Activity/Audit Logging** — 🟠 Incomplete (utilities exist); _pending_: consistent adoption across CSR, approvals, financial modules.

### Frontend
- **Auth Experience** — 🟡 In Progress (mock flows, guards); _pending_: real backend integration, token refresh handling.
- **Company Dashboard** — 🟡 In Progress (mock widgets); _pending_: live data via React Query + feature flag validation.
- **NGO Dashboard** — 🟡 In Progress (mock financial/impact sections); _pending_: API wiring, accessibility review.
- **Admin Dashboard** — 🟡 In Progress (analytics with temporary suppressions); _pending_: restore helpers, connect API, add regression tests.
- **Approvals UI** — 🟠 Incomplete (prototype only); _pending_: backend wiring, real-time updates, form validation.
- **CSR Programme UI** — 🟠 Incomplete (feature-flagged mocks); _pending_: production API rollout, RBAC validation, pagination parity, and end-to-end validation before enabling default API mode (status transitions now wired via feature flag with mock fallback).

### Shared / Infrastructure
- **API Contracts** — 🟡 In Progress (core DTOs available); _pending_: add campaign/donation contracts, automate releases, strengthen tests.
- **Testing/CI** — 🟠 Incomplete (per-app pipelines exist but lack cross-app integration, coverage gates, and visual regression enforcement).

---
_Update this document whenever items are closed or new findings emerge to maintain alignment across teams._
