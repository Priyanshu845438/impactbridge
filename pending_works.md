# Pending Work Audit (Comprehensive)

_All findings are observational; no code was modified during this audit. Items are grouped by scope with each task captured as an individual, detailed point._

### Recommended Implementation Order
1. Testing & CI infrastructure to add cross-app integration/e2e coverage and keep regressions out.
2. Approvals UI wiring (API-backed actions) with audit log surfacing.
3. Notifications provider dashboard & monitoring once retry telemetry is in use.

## 1. apps/__tests__
1. Jest, RTL, and Nest unit suites exist per app, but there are still **no cross-application integration tests** that exercise real HTTP controllers, shared DTOs, and Prisma together; regressions can hide when contracts drift between backend and frontend.
2. Vitest-based mocks in the frontend rely on global fetch overrides without scoped reset helpers, so state leakage can occur when new suites are added or run in parallel.
3. Broader customer journeys (auth → dashboard → CSR/financial) still lack end-to-end coverage—plan Playwright or supertest flows once the APIs stabilise to catch navigation or RBAC issues.
4. CSR programme smoke tests (Playwright or equivalent) remain outstanding to exercise API-on journeys end-to-end; mock vs API parity is now covered at unit + RTL layers.
5. Financial flows have DTO-level unit coverage, yet there are no tests validating that admin listings, analytics, and retry-safe delivery stay consistent when data volume increases; load-focused or contract tests are still needed.

## 2. apps/backend
1. **CSR Programme**: Controller and service are aligned with shared DTOs and guarded via `JwtAuthGuard` + `RolesGuard (COMPANY)`. Negative paths and audit logging are covered, but legacy `/api/v1` e2e suites still fail until Prisma-backed fixtures are restored.
2. **Approvals**: Workflow emits notification intents and audit logs, and RBAC integration tests now cover company-vs-NGO access. There is still no verification that approval state changes propagate to linked CSR/financial reports.
3. **Financial**: Upload/list endpoints enforce DTO validation and duplicate checks. Admin list (`/financial/admin/all`) returns raw Prisma models; analytics surfaces and admin dashboards still consume mock data, and no reconciliation exists between financial reports and donation ledgers.
4. **Analytics**: Aggregation service exposes donations/programmes/approvals but lacks caching, rate limiting, or filtering by company/NGO. Financial metrics are not surfaced, leaving admin dashboards partially mocked.
5. **Notifications**: Intent storage, safe delivery, metrics, and automated retry scheduling are in place. Provider dashboards, status introspection endpoints, and long-term worker orchestration remain future work.
6. **Docs & Tooling**: API guide and Postman collection cover CSR/auth/users/financial uploads but omit admin analytics examples. Operational runbooks mention notification delivery but not retry tuning, and there is no automation to ensure docs stay synced with code changes.
7. **Infrastructure**: Global validation pipe is active, yet controllers depend on service-level DTOs without local pipes; adding `@UsePipes(ValidationPipe)` where mutations occur would reduce reliance on global config. Prisma queries lack transactional wrappers around multi-step operations like approvals + notifications.

## 3. apps/frontend
1. **Admin Dashboard**: Dashboard and reports pages now use live analytics when `API_DASHBOARD` is enabled, with mock fallbacks maintained. Financial widgets, timeline charts, and activity feed consume backend data; monitor performance before defaulting flag to on.
2. **NGO Dashboard**: Financial reports list/upload screens render mock data only; backend DTO validation is exercised through unit tests but the UI never calls the true endpoints, leaving parity unchecked.
3. **CSR Programme UI**: API flag now default-on with parity tests in place; focus shifts to e2e smoke coverage and runtime monitoring for assignment/status flows.
4. **Approvals & Notifications**: UI remains prototype-level, relying on mocked cards. No hooks exist for real approval actions or notification counts beyond the context stub.
5. **Feature Flags**: `API_DASHBOARD`, `API_PROGRAMME`, and `API_AUTH` default to false. Documentation reflects runtime fallbacks, but environment plumbing and monitoring for production toggles are not set up.
6. **Testing**: Dashboard suites assert rendering of mock data; there is no assurance that API-enabled modes render the same output. Major paths (financial admin, approvals, donors) lack even smoke-level coverage.
7. **Performance & Accessibility**: Static analytics widgets and large mock datasets render synchronously, which may degrade SSR when replaced with live data. Accessibility audits are pending for interactive tables and modals.

## 4. packages (api-contracts)
1. CSR programme DTOs are published, but there is **no automated release pipeline**; manual `npm publish` risks version drift. Semantic-release or similar tooling is recommended.
2. Campaign, donation, financial, and analytics DTOs are missing, leading frontend consumers to handcraft types and increasing drift risk.
3. Tests provide compile-time assurances only; add runtime schema checks or snapshot validation if the package will back public APIs.
4. Dist output coexists with tsconfig path aliases. Consumers depend on TS path mapping, so ensure builds or lint setups fail fast when output moves.

## 5. Documentation & Tooling
1. Frontend docs describe feature flags and testing gaps but omit financial admin wiring status and runtime fallback expectations for analytics.
2. Backend CHANGELOG and operations guides record notification delivery updates but lack playbooks for retry tuning, provider metrics interpretation, or financial reconciliation processes.
3. Pending work tracking is manual; there is no CI hook to ensure this audit stays aligned with commits.

## Role-Wise Module Status

### Backend
- **Auth** — ✅ Completed (JWT register/login, guards, hashing utilities). _Pending_: refresh-token rotation, password recovery flows, and multi-factor support once product scope finalises.
- **Users** — ✅ Completed (CRUD, RBAC endpoints, profile services). _Pending_: soft-delete restore endpoints, scoped pagination filters, and admin export tooling.
- **Approvals** — 🟢 Complete (state transitions, notification intents, audit logs validated). _Pending_: Failure-safety covered by design guarantees; focus shifts to frontend wiring and monitoring.
- **CSR Programme** — ✅ Completed (service/controller aligned with shared DTOs, company scoping, audit logging). _Pending_: rebuild legacy `/api/v1` e2e fixtures, monitor frontend parity before default API rollout, and extend analytics aggregation with programme KPIs.
- **Financial** — 🟡 Working (upload + NGO list endpoints, duplicate prevention, DTO validation). _Pending_: wire admin analytics/list endpoints into dashboards, reconcile reports with donations, and add end-to-end tests covering NGO → admin flows. Backend admin listing verified for stability.
- **Analytics** — 🟡 Working (donation/programme/approval aggregations plus financial report overview). _Pending_: expose richer KPIs, add company/NGO scoped filters, cache expensive queries, and document operational guardrails.
- **Notifications** — ✅ Completed (intent storage, safe delivery processor, metrics, automated retries). _Pending_: provider dashboards, SLA monitoring hooks, and long-term worker orchestration.
- **Activity / Audit Logging** — ✅ Completed (CSR, approvals, financial flows emit actor-scoped entries). _Pending_: ensure future modules register logs and surface reporting UI.

### Frontend
- **Admin Dashboard** — ✅ Completed (analytics wiring live via feature flag, mock fallback retained). _Pending_: monitor live metrics performance and plan richer KPI widgets once the flag is default-on.
- **Approvals UI** — 🟠 Prototype (static cards). _Pending_: hook into real approval APIs, add form validation and optimistic updates, surface audit trail.
- **CSR Programme UI** — ✅ Completed (feature flag default-on with API parity tests for list/detail/create/edit flows). _Pending_: ship end-to-end smoke tests, monitor runtime metrics, and verify RBAC guard telemetry after rollout.
- **Notifications UI** — 🔴 Missing (only unread count placeholder). _Pending_: render intent statuses, subscribe to real-time updates, align with backend metrics.

### Shared / Infrastructure
- **API Contracts** — 🟡 Working (core CSR DTOs published). _Pending_: add campaign/donation/financial/analytics DTOs, automate releases, strengthen runtime validation.
- **Testing & CI** — 🟠 Prototype (per-app suites, no cross-app coverage). _Pending_: integration/e2e pipelines, coverage gates, visual regression, and doc-sync checks.
- **Observability & Docs** — 🟡 Working (structured logs, ops guides). _Pending_: analytics dashboards, notification metric summaries, financial reconciliation playbooks, and automated doc validation.

---
_Update this document whenever items are closed or new findings emerge to maintain alignment across teams._
