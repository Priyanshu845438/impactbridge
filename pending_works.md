# Pending Work Audit (Comprehensive)

_All findings are observational; no code was modified during this audit. Items are grouped by scope with each task captured as an individual, detailed point._

## Task Overview
- [x] Perform deep-dive audit of target folders
- [x] Summarise connections, missing pieces, and incorrect implementations
- [x] Update role-wise module status with completion/pending markers
- [x] Re-verify coverage so no pending item is omitted
- [x] Reconfirm CSR Programme backend scope (company CRUD only) with no new v1/admin wiring until requirements finalised

---

## 1. apps/__tests__ (Shared Test Harness)
**Current Coverage**
- Contains a single `api-client.test.ts` focused on fetch wrapper utilities; no suites validate shared DTOs, feature flags, or integration flows.
- Relies on relative imports (`../lib/api/client`) that break if relocated; no CI reference ensures execution.

**Connections & Gaps**
- Tests should mirror cross-app contracts (`@impactbridge/api-contracts`) but currently do not consume that package.
- Lacks smoke tests for backend endpoints or frontend rendering, leaving regression detection entirely to app-level suites.

**Missing / Incomplete Work**
- Introduce API contract smoke tests covering auth, approvals, CSR programmes, and financial flows.
- Establish Playwright or API-integration fixtures that exercise both backend and frontend builds end-to-end.
- Set up CI pipeline stage (GitHub Actions/CI) to run `apps/__tests__` so regressions are caught automatically.

**Pending Actions**
1. Restructure shared tests under a stable path (e.g., `tests/shared`) with tsconfig path aliases.
2. Expand coverage to include DTO serialization/deserialization snapshots and schema validation.
3. Document how these shared tests complement app-specific suites to avoid duplication.

---

## 2. apps/backend (NestJS API)
**Current Coverage & Connections**
- Modular NestJS app with Prisma integrations, versioned controllers (`/api/v1`), and shared DTO contracts.
- `CSRProgrammeService` mature but `/api/v1/csr` routes remain unwired; admin reporting & analytics KPIs partially present in services but not exposed publicly.
- Approvals module has guards/tests yet lacks integration tests for transaction failure scenarios.

**Incomplete / Incorrect Implementations**
- CSR company endpoints exist but remain behind feature flag; `/api/v1` admin reporting and analytics KPIs still pending.
- Approvals analytics linkage relies on eventual consistency; no tests ensure notification failures leave approvals intact (design guarantee, but unverified).
- Financial admin listing returns raw Prisma models; requires DTO sanitisation before surfacing to consumers.

**Missing Work & Dependencies**
- Need integration tests for CSR endpoints (company vs admin RBAC) and analytics KPI verification.
- Notification retry queue documented but not instrumented with metrics dashboards.
- Docs (AGENTS.md, docs folder) should capture transaction guarantees, cache TTL guardrails, and CSR v1 status.

**Pending Actions**
1. Wire CSR Programme controllers into `/api/v1`, add admin filters, and ensure analytics includes CSR KPIs.
2. Expand end-to-end tests for approvals/CSR/financial modules using seeded Prisma fixtures.
3. Harden documentation (API, operations, Postman) to reflect new endpoints, cache behaviour, and retry strategy.

---

## 3. apps/frontend (Next.js Web Client)
**Current Coverage & Connections**
- Feature-flag driven dashboards (`API_DASHBOARD`) consuming analytics hooks.
- Approvals UI still static; hooks prepared but not connected to live data.
- CSR Programme UI leverages backend DTOs but lacks end-to-end smoke tests and runtime monitoring.

**Incomplete / Incorrect Implementations**
- Approvals screen shows prototype cards with mock data; lacks real API integration, validation, or optimistic updates.
- NGO financial uploads remain placeholder; no API wiring to backend financial endpoints.
- Notifications UI only displays badge stubs—no list/feed, filters, or real-time updates.

**Missing Work & Dependencies**
- Need API clients/hooks mirroring backend approval endpoints and CSR admin reports.
- Feature flag infrastructure requires environment-specific defaults plus monitoring dashboards.
- Accessibility/performance audits pending for dashboard components (charts, tables, modals).

**Pending Actions**
1. Wire approvals UI to backend read APIs (read-only first), then add action flows with optimistic updates and audit surfacing.
2. Replace NGO financial mocks with real upload/listing flows; ensure API flag parity tests exist.
3. Build notifications centre UI and connect to backend intent/metrics once provider dashboard is live.

---

## 4. packages (Shared Libraries)
**Current Coverage & Connections**
- `@impactbridge/api-contracts` publishes enums and a handful of DTOs; many folders remain empty.
- No automated release/versioning; consumers rely on workspace references.

**Incomplete / Incorrect Implementations**
- CSR, approvals, financial, analytics DTO definitions incomplete—forcing apps to re-create interfaces.
- Lack of schema validation or contract tests increases drift risk between backend responses and frontend expectations.
- Build pipeline doesn’t generate declaration maps or publish to registry, limiting external reuse.

**Pending Actions**
1. Populate DTO exports for all active modules (auth, approvals, CSR, financial, analytics, notifications).
2. Configure semantic-release (or equivalent) with changelog, version bumping, and CI publish.
3. Add contract tests comparing package exports against live backend serializers.

---

## 5. Documentation & Tooling (Cross-Cutting)
**Observations**
- Backend docs now cover CSR v1/admin endpoints, approval transaction guarantees, and analytics cache guardrails (see backend agents entry #24).
- Frontend documentation includes approvals integration roadmap, fallback behaviour, and testing plan across operations/testing/readme docs (frontend agents entry #27-28).
- Docs lint workflow in CI (`docs-lint.yml`) ensures future changes keep documentation and pending works tidy.

**Pending Actions**
1. Keep backend docs synced with future CSR v1 enhancements (admin filters, analytics KPIs) once implemented.
2. Expand frontend docs again when approvals UI ships (screenshots, end-to-end flows) to match the roadmap.
3. Monitor doc lint pipeline outcomes and iterate rules if additional formatting policies are needed.

---

## Role-Wise Module Status & Pending Work

### Backend
- **Auth** — ✅ Completed — _Pending_: refresh tokens, password recovery, MFA rollout.
- **Users** — ✅ Completed — _Pending_: soft-delete restore workflows, advanced filters/exports.
- **Approvals** — 🟡 In Progress — _Pending_: transactional coupling with notifications/audit logs, analytics reconciliation tests (documentation for guarantees added in backend agents entry #24).
- **CSR Programme** — 🟡 In Progress — _Pending_: `/api/v1` admin reporting reads, analytics KPIs, integration tests (API guide updated with v1 endpoints).
- **Financial** — 🟡 In Progress — _Pending_: DTO sanitised responses for admin list, automated donation/financial reconciliation checks.
- **Analytics** — 🟡 In Progress — _Pending_: cache telemetry, rate limiting, multi-tenant performance monitoring (operations guide expanded with guardrails).
- **Notifications** — 🟡 In Progress — _Pending_: provider dashboard, alerting thresholds, worker orchestration.
- **Activity/Audit Logging** — ✅ Completed — _Pending_: reporting surfaces and coverage for future modules.
- **Infrastructure & Docs** — 🟡 In Progress — _Pending_: doc automation, validation hooks, CI pipeline expansion; latest documentation updates captured in backend agents entry #24.

### Frontend
- **Admin Dashboard** — ✅ Completed — _Pending_: performance instrumentation, API-on smoke tests, offline fallbacks.
- **Approvals UI** — 🟠 In Progress — _Pending_: action controls (approve/reject/revoke), validation, optimistic updates, audit trail surface; read-only API wiring verified (see frontend agents entry #32).
- **CSR Programme UI** — 🟡 In Progress — _Pending_: e2e smoke coverage, RBAC telemetry, runtime monitoring dashboards.
- **NGO Dashboard & Financials** — 🟡 In Progress — _Pending_: real upload/list wiring, donor journey tests, data validation.
- **Notifications UI** — 🔴 Incomplete — _Pending_: feed view, filtering, real-time updates aligned with backend retries.
- **Testing & Quality** — 🟡 In Progress — _Pending_: RTL/Playwright journeys, performance/a11y audits, API-flag permutations.

### Shared / Packages
- **API Contracts** — 🟡 In Progress — _Pending_: DTO expansion, release automation, contract validation tests.
- **Testing & CI Infrastructure** — 🟡 In Progress — _Pending_: cross-app suites, coverage gates, doc-sync checks.
- **Observability & Operations** — 🟡 In Progress — _Pending_: analytics dashboards, notification metrics, reconciliation playbooks.

---

## Final Verification Checklist
- [x] All four target folders audited with explicit missing/incomplete work.
- [x] Pending tasks documented for each module and shared concern.
- [x] Role-wise status updated with clear ✅/🟢/🟠/🔴 markers.
- [x] No code files modified; documentation only.

_Update this document whenever items are closed or new findings emerge to maintain alignment across teams._
