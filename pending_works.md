# Pending Work Audit (Comprehensive)

## Overview
- Audit covers `apps/__tests__`, `apps/backend`, `apps/frontend`, and `packages`.
- No code changes were made; findings are observational for planning and remediation.

## 1. apps/__tests__
- Directory contains only `api-client.test.ts`, focused on the shared fetch wrapper; there is no cross-package integration coverage.
- Missing smoke/e2e tests that exercise backend APIs or frontend pages together, leaving CSR, auth, approvals, and financial flows unvalidated.

## 2. apps/backend Audit
- NestJS project structure intact (modules, Prisma layer, docs, metrics) but several features stop at the service layer.
- CSR Programme (`src/csr-programme`): service + DTO mappers exist, yet there is no controller or module wiring; service also lacks a public "get by id" method, blocking detail routes.
- Financial (`src/financial`): controller/service implemented, but validation hardening, admin analytics, and integration tests are still pending.
- Notifications (`src/notifications`): intent storage provided, while dispatch workers/providers are absent; no retry or audit logging on delivery.
- Activity/Audit logging is inconsistent; multiple modules call `ActivityLogService`, but key flows (CSR, approvals, financial) do not log uniformly.
- Test coverage mixes unit and partial e2e runs; new CSR routes/tests are not yet in place, and RBAC guard behaviour is only unit-tested.

## 3. apps/frontend Audit
- Next.js App Router app heavily depends on mock data across dashboards; React Query hooks for CSR/approvals are scaffolded but disabled by feature flags.
- Auth, approvals, CSR, and financial pages still call mock handlers; the shared API client is not wired to backend endpoints and `ky` remains in contexts.
- Tests are abundant but mock-based, offering no assurance against real API regressions; Storybook exists yet CI visual regression is disabled.
- Route-level guards/middleware for RBAC are missing, leaving client-state checks as the only protection.

## 4. packages Audit
- `packages/api-contracts` offers DTOs/enums for auth, approvals, CSR programme, financial, and users.
- DTO coverage for campaigns/donations is missing, so frontend duplicates types; publishing the package remains a manual step without CI automation.

## Module Status by Role

### Backend
1. **Auth** — ✅ Complete
   - JWT login/register, DTO validation, guards in place.
   - Pending: refresh tokens and password recovery flows.
2. **Users** — ✅ Complete
   - CRUD with RBAC and basic pagination.
   - Pending: soft-delete restoration endpoints and scoped filters.
3. **Approvals** — 🟡 In Progress
   - Core workflow and notification intents delivered.
   - Pending: RBAC integration tests, audit logging parity, CSR linkage.
4. **CSR Programme** — 🟡 In Progress
   - Service/DTO alignment done; controller/routes absent.
   - Pending: expose company-scoped endpoints, add integration tests, unblock frontend hooks.
5. **Financial** — 🟡 In Progress
   - Upload/list APIs exist.
   - Pending: stricter validation, admin analytics, UI wiring.
6. **Analytics** — 🟡 In Progress
   - Aggregators power admin dashboard.
   - Pending: CSR data feed, caching, metric expansion.
7. **Notifications** — 🟠 Incomplete
   - Intent records only; dispatch worker/provider integration outstanding.
8. **Activity/Audit** — 🟠 Incomplete
   - Logging utilities present; consistent adoption missing.

### Frontend
1. **Auth Experience** — 🟡 In Progress
   - Mock login/register; real backend integration pending.
2. **Company Dashboard** — 🟡 In Progress
   - UI widgets completed with mocks; needs live data.
3. **NGO Dashboard** — 🟡 In Progress
   - Financial/impact sections mocked; awaiting API hooks.
4. **Admin Dashboard** — 🟡 In Progress
   - Analytics cards rely on adapters + feature flags; no live data.
5. **Approvals UI** — 🟠 Incomplete
   - Prototype only; requires backend wiring and real-time updates.
6. **CSR Programme UI** — 🟠 Incomplete
   - Hooks partially implemented but feature-flagged off until backend routes exist.

## Detailed Pending Work Items
1. **CSR Programme Controller & Routes**
   - Wire company-scoped routes to existing service methods and add integration tests.
   - Introduce a detail/retrieval method (or expose sanitized ensure helper) to satisfy GET by programme ID.
2. **Frontend Mock Replacement**
   - Replace mock data with React Query hooks calling backend APIs via `@impactbridge/api-contracts` DTOs.
   - Ensure loading/error states derive from query status instead of hardcoded placeholders.
3. **Notification Dispatch & Workers**
   - Implement background worker/providers to send queued intents with retries and audit logging.
   - Define failure handling and surface metrics for operations.
4. **Financial Reporting Hardening**
   - Enforce DTO validation, add admin review/analytics flows, and create matching frontend UI.
   - Expand tests to cover success/error paths for uploads and reads.
5. **RBAC Integration Tests**
   - Extend e2e coverage to verify guard stacks for approvals, financial, CSR routes using real JWTs.
   - Document expected roles per endpoint to guide frontend role gating.
6. **Shared Package Release Automation**
   - Create CI workflow to build/test/publish `@impactbridge/api-contracts`; formalize semantic versioning.
   - Add release notes and dependency update checklist for consuming apps.
7. **Pagination & Soft-Delete Enforcement**
   - Apply pagination helpers + soft-delete filters across campaigns, donations, programmes, approvals listings.
   - Provide restore endpoints and regression tests.
8. **CI/Lint/Test Enforcement**
   - Ensure pipelines run lint/test/build for backend/frontend before merging; enforce coverage thresholds.
   - Add alerts for failures and flaky suites.
9. **Accessibility & Testing Improvements**
   - Enable automated axe scans and `eslint-plugin-jsx-a11y` in CI; extend RTL coverage to responsive states.
   - Incorporate accessibility acceptance criteria into PR reviews.
10. **Storybook & Visual Regression**
    - Re-enable Storybook CI build with Percy/Chromatic; align stories with DTO-driven props.
    - Use stories for contract validation against backend data shapes.

---
Update this audit as teams close items or identify new gaps.
