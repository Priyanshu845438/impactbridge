# Pending Work Audit (Comprehensive)

_All findings are observational; no code was modified during this audit. Items are grouped by scope with each task captured as an individual, detailed point._

## 1. apps/__tests__
1. Only `api-client.test.ts` exists, covering the fetch wrapper in isolation; there are **no integration or contract tests** that exercise backend controllers or shared DTO flows, leaving cross-package regressions undetected.
2. Vitest mocks rely on global fetch overrides without reset helpers, risking test leakage if additional suites are added.
3. There is no coverage for CSR, auth, approvals, or financial journeys—future suites must be planned to validate end-to-end scenarios once routes are stable.

## 2. apps/backend
1. **CSR Programme controller** now exposes company-scoped routes but lacks guards (`@UseGuards`, `@Roles`) so RBAC enforcement currently depends on downstream modules—needs explicit protection before release.
2. `CSRProgrammeController.detail` delegates to `getByIdForCompany`, which returns the raw Prisma entity (no sanitised DTO map); response omits milestone/assignment includes present in list endpoints, creating an inconsistent API surface.
3. Controller methods accept DTOs but do not apply validation pipes locally—ensure global validation is active or add decorators to avoid unchecked payloads.
4. CSR service integration tests exist only as in-memory workflow specs; HTTP contract coverage now exists in `apps/backend/__tests__/csr-programme/csr-programme.routes.spec.ts`, but RBAC permutations and negative paths remain pending.
5. Notifications module remains dispatcher-less: intents are queued but no background worker/provider sends emails/SMS; retry, logging, and metrics workflows are still unimplemented.
6. Financial module exposes core endpoints yet lacks stricter DTO validation, admin analytics, and integration tests for upload/review flows.
7. Activity/Audit logging utilities are present, but CSR, approvals, and financial services do not consistently emit events, creating traceability gaps.
8. Shared docs (API guide, Postman collection) mention CSR routes; they require ongoing sync once guards/tests land to avoid divergence.

## 3. apps/frontend
1. CSR programme list/detail pages now use feature-flagged React Query wrappers that call the live API when `API_PROGRAMME` is enabled, with mocks as fallback; before default-on launch, complete end-to-end validation (loading/error UX, RBAC) and coordinate rollout toggles.
2. Programme adapters introduced to satisfy lint now stub icon/timestamp helpers, altering UI formatting; they must be restored when analytics wiring is completed.
3. Feature flag `API_PROGRAMME` handling is partially in place—ensure env plumbing, tests, and documentation cover both ON/OFF behaviours before rollout.
4. Admin dashboard analytics lint suppression is temporary; follow-up task required to reinstate real helpers once API payloads stabilise.
5. Tests across dashboards are mock-based (Storybook + RTL) and offer no assurance against live API regressions; plan for integration tests once hooks are wired.
6. RBAC is enforced mostly client-side; audit middleware/route protections to ensure unauthorised users cannot hit protected pages when SSR/cache is used.

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
- **CSR Programme UI** — 🟠 Incomplete (feature-flagged mocks); _pending_: API integration, loading/error UX, contract tests.

### Shared / Infrastructure
- **API Contracts** — 🟡 In Progress (core DTOs available); _pending_: add campaign/donation contracts, automate releases, strengthen tests.
- **Testing/CI** — 🟠 Incomplete (per-app pipelines exist but lack cross-app integration, coverage gates, and visual regression enforcement).

---
_Update this document whenever items are closed or new findings emerge to maintain alignment across teams._
