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

13. CSR Programme Detail Page API Switch
- Detail page now uses the flag-aware hook with a safe mock fallback, keeping skeleton and error states intact.
- Added unit tests for flag off/on paths, API fallback, loading, and error handling to guarantee UI parity.
- Re-ran full frontend test/build pipelines (`npm run test`, `npm run build`) to confirm no regressions.

14. CSR Programme Create Scaffold
- Added mock-backed `useCreateProgramme` mutation hook plus `/dashboard/company/programmes/new` to mirror existing UX.
- Baseline tests ensure the mock mutation runs and validation remains unchanged.
- No behavioural differences; build/test stay green (`npm run test`, `npm run build`).

15. CSR Programme Create API Bridge
- Upgraded `useCreateProgramme` mutation to call backend API when `API_PROGRAMME` flag is enabled, while preserving mock fallback.
- Added hook unit tests covering flag on/off behaviour and response shape parity.
- Confirmed create form tests remain stable via mocked hook and reran full suite (`npm run test`) and production build (`npm run build`).

16. CSR Programme Status API Hook
- `useProgrammeStatus` now switches between mock and backend API paths based on `API_PROGRAMME`, preserving the existing UX.
- Hook unit tests validate flag on/off execution and ensure the mutation falls back to mocks when the API lacks data.
- Frontend test/build suites re-run (`npm run test`, `npm run build`) to confirm no regressions.

17. CSR Programme Assignment API Hook
- Added feature-flag-aware `useProgrammeAssignment` mutation that calls the backend assign-ngo endpoint when enabled, falling back to mocks otherwise.
- Extended hook test suite to validate flag on/off paths and null-data fallback, keeping UI behaviour unchanged.
- Frontend test/build pipeline rerun (`npm run test -- programmes/hooks.test.tsx`, `npm run build`) to ensure zero regressions.

18. Technology Overview Documentation
- Authored `project_technologies.md` summarising frontend/backend stacks, data flow, and Prisma schema highlights for onboarding.
- No code changes required; serves as a living reference for teams connecting UI hooks with NestJS modules.

19. CSR Programme Update API Hook
- Upgraded `useUpdateProgramme` to call the backend PATCH endpoint under the `API_PROGRAMME` flag with graceful mock fallback.
- Refactored the edit page to consume the hook without altering UX and added hook tests for flag on/off paths.
- Re-ran targeted hook tests and full Next.js build (`npm run test -- programmes/hooks.test.tsx`, `npm run build`) to confirm unchanged behaviour.

20. CSR Programme — Update Flow Integration
- Connected the edit/update flow to the backend API behind the feature flag while preserving the existing mock fallback.
- Maintained identical UX across flag modes; no new states introduced.
- Documented flag behaviour and validated with hook tests plus full build (`npm run test -- programmes/hooks.test.tsx`, `npm run build`).

21. CSR Programme — Cache Consistency Hardening
- Unified list/detail query keys and hooked create/update/status/assignment mutations into React Query invalidation.
- Added tests verifying cache refresh behaviour across mock/API modes with no UX changes.
- Re-ran targeted hook tests and full build (`npm run test -- programmes/hooks.test.tsx`, `npm run build`) to confirm stable behaviour.

22. Admin Donations Dashboard Wiring
- Connected the admin donations screen to `GET /donations/admin/all` via a new React Query hook while preserving mock fallback under `API_DASHBOARD`.
- Added `dashboard-admin-donations.test.tsx` smoke coverage to confirm live data renders without altering existing UX.
- Validated the path with `npm run test -- dashboard-admin-donations.test.tsx` and ensured no other surfaces were affected.

23. Admin Financial Analytics Dashboard Wiring
- Admin dashboard and reports pages now use real analytics payloads (donation timeline/summary, programme & approval status, financial overview, audit activity) when `API_DASHBOARD` is enabled.
- Added shared formatters and updated adapters/hooks to expose new metrics while keeping mock fallback intact.
- Expanded Jest/RTL coverage for dashboard/report pages and analytics adapters, confirming flag on/off scenarios render expected data.

24. Analytics Wiring Builds & Docs
- Re-ran full frontend test/build pipeline after analytics wiring (`npm run test`, `npm run build`).
- Updated frontend changelog/operations docs and pending works tracker to reflect completion of admin financial analytics wiring.

25. Admin Financial Analytics Data Live
- Admin dashboard and reports pages now render donation/programme/approval/financial analytics from backend when `API_DASHBOARD` is enabled, preserving mock fallback.
- Enhanced adapters, hooks, and ActivityFeed formatting to consume new backend fields and display audit timestamps cleanly.
- Expanded Jest/RTL coverage for dashboard and reports pages plus adapters; lint, test, and build run clean (`npm run lint`, `npm run test`, `npm run build`).

26. Approvals UI Foundation
- Added approval API clients, validation schemas, and React Query hooks so future approval actions can call backend endpoints without restructuring pages.
- Hook unit tests confirm feature-flag gating, cache invalidation, and backend parity while keeping the current static UI unchanged.
- Pending works tracker updated; verification via `npm run test` and `npm run build` shows no behavioural regressions.

27. Approvals UI Gap Assessment
- Confirmed no dedicated approvals screen exists; current dashboards only surface analytics counts without real record views.
- Documented requirements for wiring existing hooks to UI, adding validation/optimistic updates, and rendering audit history alongside backend payloads.
- Pending works tracker updated to keep Approvals UI flagged as incomplete until implementation lands.
- Frontend docs (operations/testing/readme) now capture the integration roadmap, fallback behaviour, and coverage plan so future work starts from a shared baseline.

28. Documentation & Docs Lint Pipeline
- Expanded frontend docs with approvals integration roadmap, fallback behaviour, and testing plan across operations/testing/readme.
- Added `lint:docs` script plus GitHub Actions workflow to lint markdown files for trailing whitespace and stray TODOs.
- First run of the docs lint succeeded locally, ensuring CI will guard pending_works and docs updates automatically.

29. Shared Test Harness Planning
- Logged dependency on workspace-level shared tests consuming `@impactbridge/api-contracts` so frontend analytics/approvals UI can rely on consistent DTOs.
- Awaiting backend alignment on contract smoke tests before wiring new fixtures; tracked via pending works shared testing section.

30. Approvals Hooks API Wiring (No UI Exposure)
- Hardened `approvalDecisionSchema` and `approvalRevokeSchema` to mirror backend DTO rules, including remark requirements for reject/revoke flows.
- Confirmed mutation hooks call real approvals API clients with validated payloads and safe error handling while remaining unused by UI for now.
- Full frontend test/build pipeline rerun (`npm run test`, `npm run build`) to verify no behavioural or UI changes.

31. Approvals Read-Only Dashboard
- Introduced `/dashboard/admin/modules/approvals` presenting a read-only table over pending approvals with status badges and relative timestamps.
- Reused `usePendingApprovals` hook plus existing skeleton/empty-state patterns so flag-off/errors mirror prior mock behaviour.
- Verified coverage with full frontend test/build pipeline (`npm run test`, `npm run build`) confirming no unintended regressions.

32. Approvals Backend Validation Recorded
- Captured backend validation outcome confirming approvals flows are production-ready (state persistence, audit logs, notifications) with added test coverage.
- Documented that frontend enhancements (optimistic updates, audit surfacing) remain blocked pending backend audit metadata exposure.
- Full test/build passes (`npm run test`, `npm run build`) reaffirm the stable baseline.

33. Shared Smoke Tests Coverage (Frontend Contracts)
- Coordinated with backend to stand up `tests/shared/` Vitest workspace exercising auth, approvals, CSR, and financial API shapes via mocked HTTP calls.
- Ensures frontend adapters continue matching backend serializers; no runtime code touched, but contract drift now fails CI.
- Shared workflow runs on every PR affecting frontend/backend/contracts, providing early warning before UI regressions surface.

34. Financial Admin Contract Watch
- Awaiting backend financial admin sanitisation to stabilise; frontend will hold integration work until DTO shape is finalised.
- No UI changes shipped – dashboards continue consuming existing mocks while backend tests settle.
- Shared smoke suite unchanged; will extend once backend contract passes `financial.admin.sanitization` spec consistently.

35. Documentation Sync Audit
- Re-reviewed approvals and financial modules; no new UI or API functionality shipped, but status notes now mirrored in pending work log.
- Confirmed feature flag posture remains unchanged to prevent accidental exposure of unfinished approvals actions or financial uploads.
- Frontend tests/builds were not rerun since no runtime code changed; documentation-only update keeps historical record current.

36. Approvals Docs Touchpoint
- Logged the latest backend verification request; no frontend-runtime work executed but documentation remains aligned with pending tasks.
- Tests and builds untouched because the frontend baseline is unchanged.

37. NGO Financial API Wiring (WIP)
- Added `API_NGO_FINANCIAL` feature flag plus React Query hook and API client scaffolding for the NGO finance reports page.
- Page still defaults to mock data while DTO mapping, optimistic fallbacks, and RTL coverage are finalised; build not rerun yet.
- Pending follow-up to validate contract shapes, finish tests, and enable the flag once backend sanitisation stabilises.

38. Admin Settings & Keys Console Delivered
- Built comprehensive 6-tab Admin Settings & Keys Console (`/dashboard/admin/settings`) backed by React Query mutations and queries.
- Allows Super Admin to configure General, Cloud Storage, Email, Payment, CSR regulatory thresholds, and live Feature Flags.
- Masked sensitive tokens (`••••••••`) over the network with interactive reveal/edit controls.

39. Interactive Approvals Hub & NGO Statutory Vault
- Connected `/dashboard/admin/modules/approvals` with live mutations (`approve`, `reject`, `revoke`) and mandatory audit remarks dialog.
- Built interactive NGO Statutory Document Vault (`/dashboard/ngo/documents`) with client file selection, size validation, and simulated progress.
- Resolved TypeScript compiler issue in hook test and verified 100% test pass (27 suites, 99 tests) and production build (81 routes).

