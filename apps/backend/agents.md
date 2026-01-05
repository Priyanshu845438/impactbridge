# Backend Progress Snapshot

1. Core Platform Foundation
- Established NestJS application skeleton with Prisma integration for data access.
- Seeded initial modules (auth, users) to enable iterative feature development.
- Configured shared configuration and environment bootstrap for consistency.

2. Authentication & Security Hardening
- Added bcrypt utilities, JWT issuance, and guard stack to secure protected routes.
- Introduced DTO validation across auth endpoints to ensure payload safety.
- Delivered reusable decorators/guards for role-based access control.

3. Regulatory Data Model Expansion
- Extended Prisma schema with government-aligned NGO/company/donor profiles.
- Migrated documents, banking, campaigns, and audit log relations.
- Preserved existing data contract while enabling CSR compliance reporting.

4. CSR Programme & Analytics Services
- Implemented CSR programme APIs with sanitised outputs and RBAC enforcement.
- Delivered analytics aggregation service powering donation/programme/approval metrics.
- Ensured Prisma queries avoid N+1 via targeted includes and grouping.

5. Admin Analytics Delivery
- Exposed analytics controller with SUPER_ADMIN guard and DTO responses.
- Added integration tests validating role-based access and payload structure.
- Wired aggregation service into controller without altering consumer contracts.

6. Approval Workflow Notifications
- Integrated notification intents into approval state transitions (request/reset/approve/reject/revoke).
- Expanded unit tests to confirm enqueue behaviour for each transition pathway.
- Maintained separation between intent creation and downstream delivery providers.

7. Financial Reporting Hardening
- Enforced NGO ownership checks and period/year uniqueness for financial reports.
- Replaced generic errors with precise NestJS exceptions and audit logging.
- Added unit + e2e coverage for duplicate rejection, RBAC enforcement, and admin reads.

8. RBAC Coverage Pending
- RBAC integration tests for controllers (auth, users, approvals, financial) planned but awaiting implementation.
- No code changes yet; documentation reflects outstanding task.

9. Documentation Audit Completed
- Reviewed API, architecture, operations references, and Postman collection for accuracy against live backend behaviours.
- Confirmed guidance already reflects current features, so no content edits were required.

10. CSR Programme Gap Analysis
- Inspected existing CSR programme service, DTOs, and Prisma models; noted absence of controller wiring in v1 module.
- Confirmed available unit tests cover service-only logic, with integration tests and CRUD endpoints pending implementation.

11. CSR Programme Task Deferred
- Re-confirmed current backend state without applying code changes to ensure no unintended regressions.
- Ran npm init/test/build to validate the baseline; awaiting clarified implementation scope before proceeding.

12. CSR Programme Workflow Enhancements
- Added NGO unassignment handling, milestone retrieval, and status transition enforcement within CSRProgrammeService.
- Introduced comprehensive in-memory integration specs plus expanded unit coverage to validate assignments, milestones, and lifecycle rules.

13. CSR Programme Frontend Coordination
- Reassessed CSR programme backend readiness to align with upcoming frontend hook integration requirements.
- Deferred further changes until controllers and contracts are confirmed, keeping current APIs stable for dependent teams.

14. CSR Programme DTO Audit
- Reviewed shared CSR programme DTO usage across backend and frontend; found no duplicate runtime types to consolidate yet.
- Attempted build verification but frontend lint errors in admin dashboard (pre-existing) prevented completing the shared alignment task.
- Awaiting lint cleanup or feature-flag guidance before unifying DTO imports across apps.

15. api-contracts Import Resolution
- Rebuilt shared `@impactbridge/api-contracts` package with compiled JS and type outputs for backend consumption.
- Updated backend path aliases and csr-programme DTO import to consume the published namespace cleanly.
- Verified `npm run build` and `npm run test` succeed with zero behavioural changes.

16. CSR Programme Controller Pending
- Reviewed controller wiring requirements and confirmed service lacks a dedicated fetch-by-id path today.
- Paused controller scaffolding to avoid introducing list-filter workarounds that would change current semantics.
- Ready to proceed once a service-level detail method is added and response contracts are confirmed.

17. CSR Service DTO Alignment
- Added mapper helpers so CSRProgrammeService returns shared DTO contracts for create, update, list, assignment, and status flows.
- Ensured sanitisation still strips sensitive fields while preserving previous field values and formats.
- Verified npm init/test/build all pass, confirming behaviour is unchanged while responses now match `@impactbridge/api-contracts`.

18. CSR Controller Wiring Blocked
- Attempted to scaffold CSR programme controller but service lacks the unscoped list/detail/create signatures the routes require.
- Paused changes to avoid altering service behaviour without confirmation on company-scoped method usage or new APIs.
- Awaiting confirmation on which existing service call should power the detail route before wiring controllers.

19. CSR Programme Read Wrapper
- Exposed getByIdForCompany in CSRProgrammeService as a thin wrapper over existing ownership check.
- No behavioural changes; controller wiring can now call the service directly.

20. CSR Programme Controller
- Added company-scoped controller wiring the existing service methods without altering behaviour.
- Module now registers CSRProgrammeController for route exposure.


21. CSR Programme Route Contracts
- Added company-scoped e2e tests covering list/detail/create/update/assign/status routes.
- Tests run against Nest testing module with mocked Prisma to assert DTO-aligned responses.
- No service or controller changes; suites guard against regressions.

22. CSR Programme Route Guards
- Applied `JwtAuthGuard` + `RolesGuard` with COMPANY role requirement across all CSR controller endpoints.
- Added guard-focused tests to confirm unauthenticated and mis-role requests are rejected while preserving successful responses for COMPANY tokens.
- Updated contract tests to send bearer tokens, keeping payload expectations unchanged.
