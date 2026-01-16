# Pending Work Audit (Comprehensive)

_All findings are observational; no runtime code was modified while compiling this report._

## Scope & Method
- Walked the target directories (`apps/__tests__`, `apps/backend`, `apps/frontend`, `packages`) and supporting docs/agents files.
- Correlated current implementation state with documented requirements and previously logged tasks.
- Captured every gap, dependency, and incorrect or incomplete implementation that remains outstanding.
- Re-verified documentation updates so that backend/ frontend agents logs and docs stay in sync with this audit.

---

## Folder-Level Findings

### apps/__tests__ — ✅ Completed (tests relocated)
- **Current coverage:** legacy ad-hoc tests removed; coverage now maintained via `tests/shared` workspace with cross-app smoke suites.
- **Connections & risks:** shared DTO contracts now exercised centrally, reducing drift risk between backend serializers and frontend clients.
- **Next steps:**
  1. Extend coverage to additional modules (donations, notifications) as new contracts stabilise.
  2. Layer in Playwright/API fixtures once end-to-end environments are provisioned.
  3. Monitor CI execution time and shard if shared suite grows.

### apps/backend — 🟡 In Progress
- **Current state:** Modular NestJS app with Prisma; CSRProgrammeService is mature but `/api/v1` admin wiring and analytics KPIs are pending exposure. Approvals resilience now has explicit failure-path tests guaranteeing state persistence when notifications throw.
- **Gaps & risks:**
  - CSR company endpoints sit behind feature flags; versioned `/api/v1` admin reporting and analytics KPIs not exposed yet.
  - Financial admin listings still emit raw Prisma models; DTO sanitisation work has started but tests currently fail (`financial.admin.sanitization` spec unresolved).
- **Required actions:**
  1. Wire CSR Programme routes into `/api/v1`, expose read-only admin filters, and slot CSR KPIs into analytics outputs (reusing existing services/DTOs).
  2. Finalise financial admin sanitisation by completing DTO mapping, fixing failing tests, and ensuring RBAC paths resolve correctly.
  3. Add integration tests covering CSR admin reporting and financial list sanitisation using seeded Prisma fixtures.
  4. Extend documentation (API guides, docs/AGENTS.md) as new endpoints/behaviours land—backend agents entry **#24** already notes doc gaps addressed for CSR v1, approval guarantees, and analytics cache guardrails; keep that section updated when code ships.

### apps/frontend — 🟡 In Progress
- **Current state:** Feature-flag driven dashboards. CSR programme UI already API-aware with fallbacks. Approvals screen recently added as read-only (see frontend agents entries **#31-32**), but interactive flows remain undone. NGO financial UI still mock-backed.
- **Gaps & risks:**
  - Approvals UI lacks action wiring, optimistic updates, validation, and audit trail surfacing despite backend readiness.
  - NGO financial uploads/lists still rely on mock data; API flag scaffolding added but needs contract validation and tests before enabling.
  - Notifications section remains a badge placeholder with no real feed or filters.
- **Required actions:**
  1. Connect approvals list to live mutations (approve/reject/revoke) with validation mirroring backend DTOs; add optimistic updates + audit history rendering once backend exposes metadata.
  2. Finalise NGO financial list API integration: finish React Query hook mapping, add RTL coverage for flag on/off + empty states, and enable flag once backend sanitisation is stable.
  3. Deliver notifications centre UI aligned with backend intents & retry metrics when product requirements arrive.

### packages — 🟡 In Progress
- **Current state:** `@impactbridge/api-contracts` publishes a small subset of enums/DTOs; many module folders empty. No automated release pipeline; consumers rely on workspace linking.
- **Gaps & risks:**
  - Missing DTO exports for approvals, CSR, financial, analytics, notifications leads to duplicated types across apps.
  - No schema validation or contract tests to ensure backend serializers align with published interfaces.
  - Build output lacks declaration maps; package not published to registry.
- **Required actions:**
  1. Populate DTO/index exports for all active modules.
  2. Configure semantic-release (or similar) to publish versions automatically with changelog and tags.
  3. Add contract tests that compare backend serializers against the published package to detect drift.

---

## Documentation & Tooling Snapshot
- Backend docs have already been extended with CSR v1 endpoints, approval transaction guarantees, and analytics cache guardrails (see `apps/backend/agents.md` entry **#24**).
- Frontend docs describe the approvals integration roadmap, fallback behaviour, and testing strategy (entries **#27-28** in `apps/frontend/agents.md`).
- Docs lint workflow (`lint:docs` + CI) is live to keep markdown/pending work logs clean.
- Future updates must keep these sources aligned whenever tasks transition status.

---

## Role-Wise Module Status & Pending Work

### Backend Modules
| Module | Status | Key Pending Work |
| --- | --- | --- |
| Auth | ✅ Completed | Refresh tokens, password recovery, MFA rollout. |
| Users | ✅ Completed | Soft-delete restore flows, advanced filters/exports. |
| Approvals | ✅ Completed | Analytics reconciliation verification, UI audit metadata exposure. |
| CSR Programme | 🟡 In Progress | `/api/v1` admin reporting routes, CSR analytics KPIs, integration/E2E tests. |
| Financial | 🟡 In Progress | Complete admin DTO sanitisation (current tests failing), automated reconciliation checks. |
| Analytics | ✅ Completed | Maintain KPI consistency; no outstanding work post-validation. |
| Notifications | 🟡 In Progress | Provider dashboard, alert thresholds, worker orchestration metrics. |
| Audit Logging | ✅ Completed | Future module coverage and reporting surfaces when new features arrive. |
| Infrastructure & Docs | 🟡 In Progress | CI expansion for shared tests, documentation automation, operational playbooks. |

### Frontend Modules
| Module | Status | Key Pending Work |
| --- | --- | --- |
| Admin Dashboard | ✅ Completed | Performance instrumentation, API-enabled smoke tests, offline fallbacks. |
| Approvals UI | ❌ Incomplete | Action wiring (approve/reject/revoke), validation, optimistic updates, audit trail rendering. |
| CSR Programme UI | 🟡 In Progress | End-to-end smoke coverage, RBAC telemetry, runtime monitoring dashboards. |
| NGO Dashboard & Financials | 🟡 In Progress | Real upload/list integrations, donor journey tests, data validation. |
| Notifications UI | ❌ Incomplete | Feed view, filtering, real-time updates tied to backend retries. |
| Testing & Quality | 🟡 In Progress | RTL/Playwright journeys, performance & accessibility audits, feature-flag permutation coverage. |

### Shared / Packages / Tooling
| Area | Status | Key Pending Work |
| --- | --- | --- |
| API Contracts Package | 🟡 In Progress | DTO expansion, release automation, contract verification tests. |
| Shared Testing & CI | ✅ Completed | Maintain new `tests/shared` Vitest suite; extend with additional modules and monitor CI runtime. |
| Observability & Operations | 🟡 In Progress | Analytics dashboards, notification metrics, reconciliation playbooks. |

---

## Final Verification Checklist
- ✅ All specified directories audited with explicit pending work captured.
- ✅ Status markers aligned with current completion state (✅ completed, 🟡 in progress, ❌ incomplete).
- ✅ Documentation cross-references noted to keep agents/docs in sync.
- ✅ No source code altered; only `pending_works.md` updated.

_Keep this document up to date as tasks close or new gaps appear so cross-functional teams remain aligned._
