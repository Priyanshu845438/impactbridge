# ImpactBridge Pending Work & Recommendations (Audit: 2025-02-22)

## Backend

### High-Priority Gaps
- CSR Programme service exists but lacks public controllers/routes/tests; frontend remains blocked from live CSR data.
- Financial reporting APIs still not exposed; upload/list endpoints, DTO validation, and audit hooks pending.
- Address/Bank profile controllers need hardened error handling and ownership checks for both NGO and company variants.
- Pagination + soft-delete defaults only applied to `/users` list; other aggregates (NGO/company/donor listings, approvals, programmes) still fetch entire tables and can surface soft-deleted rows.
- Notification pipeline now persists intents but still lacks dispatch queue integration, status transitions, and retry handling.
- Activity/Audit logging depends on manual service calls; approvals/programme/financial flows need consistent hooks + reporting endpoints.
- RBAC coverage limited to unit specs; no end-to-end tests confirming guard stack across auth, approvals, CSR programmes, financial reporting.
- Background job infrastructure remains design-only; no worker or scheduler to process notification intents or compliance reminders.

- Extend pagination helper adoption (cursor + offset) to heavy listings such as campaigns, donations, NGOs with campaigns, company reports.
- Implement soft-delete enforcement + restore flows for major entities (programmes, approvals, campaigns) with regression tests.
- Wire notification intents into domain events (approvals transitions, financial submissions) once dispatch contract finalised.
- Harden FinancialService (validation, error paths) and introduce integration tests for success/failure scenarios.
- Produce Postman collections / automated scripts for newly exposed `/api/v1` auth, users, approvals once live; extend to CSR/financial later.
- Document RBAC matrix per endpoint, including guard combinations and expected roles, to guide frontend integration.
- Finalise Prisma seeding (separate demo/test seeds) and automate dry-run checks in CI.

### Low-Priority Enhancements
- Add config-driven rate limiting, structured logging, and tracing middleware before production launch.
- Publish shared DTO/enums package to keep frontend/back-end contracts aligned.
- Provide admin scripts/CLI for demo data resets and smoke testing.
- Review defaults (e.g., `NGORegistrationType.OTHER`) and capture regulatory mappings in constants + docs.
- Introduce data quality checks (e.g., ensuring NGO/Company profiles auto-create successfully) with health endpoint.

## Frontend

### High-Priority Gaps
- Entire dashboard still powered by mocks; no API wiring to new `/api/v1` endpoints (auth, users, approvals) or backend models (CSR, donations, compliance).
- API client scaffold unused; legacy `ky` usage persists in auth context leading to duplicate HTTP layers.
- Server-side route guards/middleware absent; authentication enforced only via client context.
- React Query (or similar) data layer not adopted; no caching/retry/invalidations prepared for integration phase.
- Auth flows (login/register/forgot) still call mock handlers; need connection to real backend plus error handling states.
- Storybook visual regression remains disabled (Percy deps missing); no automated approval for UI changes.
- RTL coverage limited to select dashboards; significant modules (NGO financials, compliance center, approvals) lack tests.
- Accessibility tooling (axe, eslint rules) not integrated; risk of regressions as UI expands.

- Transition auth storage to secure cookies/session once backend issues tokens for browser use.
- Build server-provided navigation + feature flags to keep roles in sync with backend RBAC.
- Implement loading/error states driven by query status instead of manual placeholders.
- Extend analytics widget tests and add coverage for NGO/company KPI dashboards.
- Align Storybook mocks with eventual backend responses to ease integration.
- Capture performance budgets (TTI/LCP) and monitor via Next.js telemetry.
- Introduce error boundaries and fallback UIs for failed API calls.
- Establish shared typed API client + React Query hooks referencing backend DTO package.

### Low-Priority Enhancements
- Expand RTL suites to capture responsive states (drawer, filters, charts) and cross-role scenarios.
- Enable `eslint-plugin-jsx-a11y` and automated axe scans as part of CI.
- Document design tokens + Figma linkage for shared styling vocabulary.
- Add feature-flag UI toggles to surface backend-controlled experiments.
- Re-enable Storybook build in CI once visual regression tooling stabilises.

## Suggested New Features

### Backend
- Webhook ingestion endpoints for compliance, donation, and external partner integrations.
- Audit log query API (filterable, exportable) backed by ActivityLog entries.
- Background job scheduler for notification dispatch, compliance reminders, data hygiene.
- Analytics aggregation service to precompute KPI dashboards and reduce query load.
- Real-time notification channel (WebSocket/SSE) for approvals, programme changes.
- Data retention & purge tooling for regulatory compliance (GDPR, CSR mandates).

### Frontend
- Admin control centre for feature flags, system status, and release toggles.
- In-app guided tours/onboarding checklists tailored per role.
- Downloadable CSR/impact reports fed by upcoming backend analytics endpoints.
- Offline-ready data capture with sync for field operators (NGO staff).
- Real-time collaboration cues (presence, comments) to support joint campaign planning.

---

_Update pending_works.md as items evolve or are completed._
