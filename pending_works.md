# Pending Work Audit (Comprehensive)

_All findings are observational; no code was modified during this audit. Items are grouped by scope with each task captured as an individual, detailed point._

## 1. apps/__tests__
1. Jest, RTL, and Nest unit suites exist per app, but there are still **no cross-application integration tests** that exercise real HTTP controllers, shared DTOs, and Prisma together; regressions can hide when contracts drift between backend and frontend.
2. Vitest-based mocks in the frontend rely on global fetch overrides without scoped reset helpers, so state leakage can occur when new suites are added or run in parallel.
3. Broader customer journeys (auth → dashboard → CSR/financial) still lack end-to-end coverage—plan Playwright or supertest flows once the APIs stabilise to catch navigation or RBAC issues.
4. CSR programme smoke tests for mock vs API flag remain outstanding; previous scaffolding was removed after parity issues. Fresh e2e validation and runtime fallback assertions are required before enabling the feature flag by default.
5. Financial flows have DTO-level unit coverage, yet there are no tests validating that admin listings, analytics, and retry-safe delivery stay consistent when data volume increases; load-focused or contract tests are still needed.

## 2. apps/backend
1. **CSR Programme**: Controller and service are aligned with shared DTOs and guarded via `JwtAuthGuard` + `RolesGuard (COMPANY)`. Negative paths and audit logging are covered, but legacy `/api/v1` e2e suites still fail until Prisma-backed fixtures are restored.
2. **Approvals**: Workflow emits notification intents and audit logs, though RBAC integration tests are limited and there is no verification that approval state changes propagate to linked CSR/financial reports.
3. **Financial**: Upload/list endpoints enforce DTO validation and duplicate checks. Admin list (`/financial/admin/all`) returns raw Prisma models; analytics surfaces and admin dashboards still consume mock data, and no reconciliation exists between financial reports and donation ledgers.
4. **Analytics**: Aggregation service exposes donations/programmes/approvals but lacks caching, rate limiting, or filtering by company/NGO. Financial metrics are not surfaced, leaving admin dashboards partially mocked.
5. **Notifications**: Intent storage, safe delivery, metrics, and automated retry scheduling are in place. Provider dashboards, status introspection endpoints, and long-term worker orchestration remain future work.
6. **Docs & Tooling**: API guide and Postman collection cover CSR/auth/users/financial uploads but omit admin analytics examples. Operational runbooks mention notification delivery but not retry tuning, and there is no automation to ensure docs stay synced with code changes.
7. **Infrastructure**: Global validation pipe is active, yet controllers depend on service-level DTOs without local pipes; adding `@UsePipes(ValidationPipe)` where mutations occur would reduce reliance on global config. Prisma queries lack transactional wrappers around multi-step operations like approvals + notifications.

## 3. apps/frontend
1. **Admin Dashboard**: Core page consumes mock analytics. Flag-enabled path fetches backend data but only drives logs; widgets continue to render placeholder numbers, and the reports sub-route is entirely static. Financial admin tables are not wired to real APIs.
2. **NGO Dashboard**: Financial reports list/upload screens render mock data only; backend DTO validation is exercised through unit tests but the UI never calls the true endpoints, leaving parity unchecked.
3. **CSR Programme UI**: Hooks respect the `API_PROGRAMME` flag with runtime fallbacks, yet page-level RTL parity for edit/status/assignment flows and end-to-end smoke coverage remain pending before rolling out API mode.
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
- **Auth** — ✅ Complete (JWT login/register, guards active); _pending_: refresh tokens & password recovery flows.
- **Users** — ✅ Complete (CRUD + RBAC); _pending_: soft-delete restoration endpoints and scoped pagination filters.
- **Approvals** — 🟡 In Progress (workflow + notifications queued); _pending_: RBAC integration tests, CSR linkage, approval → audit analytics integration.
- **CSR Programme** — ✅ Complete (service + controller, guards, DTO alignment, audit logging, and integration tests); monitor frontend parity and legacy e2e fixtures before enabling APIs by default.
- **Financial** — 🟡 In Progress (upload/list APIs with hardened DTO validation); _pending_: admin analytics wiring, reconciliation with donations, comprehensive integration tests, and parity with frontend dashboards.
- **Analytics** — 🟡 In Progress (aggregation service live); _pending_: financial KPIs, caching/backoff, company/NGO scoping, dashboard wiring.
- **Notifications** — 🟢 Complete (delivery processor + retries with metrics); _pending_: provider dashboards, SLA monitoring, long-term worker orchestration.
- **Activity/Audit Logging** — 🟢 Complete (CSR, approvals, financial flows verified to emit single, actor-scoped entries); continue to enforce on new modules.

### Frontend
- **Auth Experience** — 🟡 In Progress (mock flows, guards); _pending_: real backend integration, token refresh handling, protected route SSR checks.
- **Company Dashboard** — 🟡 In Progress (mock widgets); _pending_: wire analytics + CSR counts via React Query, feature flag validation, performance tuning under API mode.
- **NGO Dashboard** — 🟡 In Progress (mock financial/impact sections); _pending_: API wiring, accessibility review, empty/error state handling when backend responds with no data.
- **Admin Dashboard** — 🟡 In Progress (analytics placeholders); _pending_: connect to backend analytics + financial endpoints, add smoke tests, restore helper utilities.
- **Approvals UI** — 🟠 Incomplete (prototype only); _pending_: backend wiring, real-time updates, form validation, audit log surfacing.
- **CSR Programme UI** — 🟠 Incomplete (feature-flagged mocks + selective API hooks); _pending_: production API rollout, RBAC validation, pagination parity, status/assignment page-level tests, and e2e validation before enabling default API mode.

### Shared / Infrastructure
- **API Contracts** — 🟡 In Progress (core CSR DTOs available); _pending_: add campaign/donation/financial/analytics contracts, automate releases, strengthen tests.
- **Testing/CI** — 🟠 Incomplete (per-app pipelines exist but lack cross-app integration, coverage gates, or visual regression enforcement).
- **Observability** — 🟡 In Progress (structured logs + activity logs); _pending_: analytics dashboards, notification metrics surfaces, financial reconciliation reports.

---
_Update this document whenever items are closed or new findings emerge to maintain alignment across teams._
