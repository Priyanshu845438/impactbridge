# Technical Overview – ImpactBridge Backend

## Stack & Conventions

- **NestJS 11 (TypeScript)** with strict controller → service → Prisma layering.
- **Prisma ORM** with Neon PostgreSQL; migrations tracked under `prisma/migrations/*`.
- **Auth** via JWT (1-day expiry) + bcrypt hashed passwords.
- **Validation** using DTOs (`class-validator`); global `ValidationPipe` enforces input hygiene.
- **Testing** scaffold via Jest (config, setup, bootstrap helper, guard smoke tests) plus shared sanitize utility for consistent responses.
- **Tooling**: ESLint, Prettier, Postman collection, Activity logging.

## Module Inventory

- `auth` – register/login, invitation acceptance, guards/decorators, password utilities.
- `users` & `user` – self-service (`/users/me`, change password) + legacy admin endpoints.
- `address`, `bank`, `documents` – NGO compliance data.
- `campaigns` – creation (NGO approval enforced) + public listing.
- `milestones` – per-campaign project milestones with status/progress tracking.
- `donations` – authenticated & anonymous donations, histories, CSR integration.
- `receipts` – attach donation receipt URLs.
- `csr` – company budget + auto-spend tracking for donations.
- `verification` – SUPER_ADMIN approval for NGOs.
- `invitations` – SUPER_ADMIN invite flow with public acceptance.
- `analytics` – platform-wide stats for admins.
- `activity` – audit logging utility.
- `financial` – placeholder module for future NGO financial reports (schema primed).

## Prisma Schema Highlights

- `User` → one-to-one relationship with `NGOProfile`, `CompanyProfile`, `DonorProfile`.
- `NGOProfile` includes `verificationStatus`/`verificationRemarks` plus relations to campaigns, documents, financial reports, milestones (via campaigns).
- `CompanyProfile` now tracks `csrAnnualBudget`, `csrAllocated`, `csrSpent` and relates to approvals (future workflow).
- `Campaign` links to `Milestone` records for project tracking.
- `Donation` includes optional company/donor pointers and `receiptUrl`.
- `Milestone` captures title/description/targetDate/budget + status/progress (0–100).
- `CampaignApproval` (planned workflow) ensures company-ngo approvals before donations (logic pending completion).
- `FinancialReport` (future module ready for service layer).

## Request & Guard Pipeline

1. **Authentication**: `/auth/login` issues JWT with `{ sub: userId, role }` payload.
2. **Guards**: `JwtAuthGuard` checks token → `RolesGuard` enforces role metadata (`@Roles(...)`).
3. **DTO Validation**: All controllers accept DTO classes to validate payloads.
4. **Business Services**: Services handle Prisma access and enforce domain rules (e.g., NGO must own campaign to create milestone).
5. **Activity Logging**: `ActivityLogService` persists metadata after critical operations.

## Role-Based Access Summary

- **NGO**: can manage profile/compliance, create campaigns, manage milestones, views donation history.
- **COMPANY**: manages CSR, donates to campaigns, views milestones when approved.
- **DONOR**: donates (auth or public) and views personal history.
- **SUPER_ADMIN**: invites users, verifies NGOs, sees analytics, accesses admin lists.

## Milestone Module Details

- **DTOs**: `CreateMilestoneDto`, `UpdateMilestoneStatusDto` (status + progress 0–100).
- **Service**: `create`, `updateStatus`, `listForCampaign` (access checks for NGO ownership or company approval).
- **Controller**:
  - `POST /milestones/:campaignId` (NGO)
  - `PATCH /milestones/status/:milestoneId` (NGO)
  - `GET /milestones/:campaignId` (NGO owning campaign, approved company, or SUPER_ADMIN)

## CSR & Donation Integration

- Company donations trigger `CSRService.updateSpent` to keep budgets aligned.
- Future: Campaign approvals will gate company donations (schema in place).

## Observability, Testing & Docs

- Audit logs (login, profile updates, campaign creation, donations, receipts, CSR, milestones) stored in `AuditLog` table.
- Jest baseline (`jest.config.ts`, `test/setup.ts`, `test/unit/*`) ensures app bootstrap + guard behaviour without hitting real database or migrations.
- Notifications infrastructure resides in `src/notifications/` where `NotificationsService` composes channel/recipient/payload intents and forwards them to an injected provider (`NOTIFICATION_PROVIDER`). The default `NoopNotificationProvider` enables safe local usage while allowing future providers (email/SMS) to plug in without runtime changes.
- Documentation set:
  - `PROJECT_MASTER_CONTEXT.md` – architecture summary.
  - `PROJECT_FULL_STATUS.md` – non-technical working overview + status.
  - `API_TESTING_GUIDE.md` – Postman instructions.
  - `FRONTEND_BUSINESS_GUIDE.md` – role-based business flows.
  - `MIGRATION_PLAYBOOK.md` – operational checklist for applying and rolling back Prisma migrations across local, staging, and production environments.
- `API_VERSIONING_GUIDE.md` – versioning strategy, deprecation workflow, and shared DTO/type alignment guidelines.
  - `BACKGROUND_JOBS_PLAN.md` – comparison of BullMQ vs cron workers and boundaries for async workloads (notifications, reports, compliance reminders).
- `OBSERVABILITY_PLAN.md` – structured logging, request tracing, and error correlation blueprint (pino + request IDs + Sentry) ready for future implementation.
- Postman collection auto-injects tokens, captures IDs (`campaignId`, `donationId`, `milestoneId`).

### Versioning Policy

- All HTTP routes are exposed under the `/api/v1/**` namespace; unversioned paths respond with `404`.
- Future breaking changes must ship under `/api/v2/**` while `/api/v1/**` stays available until consumers migrate (Sunset header + deprecation notes in docs/Postman collection).
- Non-breaking enhancements (fields, optional params) remain within `/api/v1/**` without bumping the version number.

## Pending Roadmap

- Company–NGO approvals (service partially drafted; full integration pending).
- NGO financial reporting services (upload/list). Controllers pending exposure.
- Compliance evidence ingestion (regulatory filings, CSR-2 schedules) – schema ready, services/controllers next.
- Impact reporting exports (board/CSR summaries) – to build on existing analytics module.
- Pagination/search for admin lists.
- Soft delete handling (`deletedAt`).
- Notification service (email/SMS) and reviewer dashboards.
- Automated integration tests.
- Pagination helpers & soft-delete filters wired into shared query utilities (controllers still default to full lists).
- Cursor pagination can now be toggled per service using the shared helper; controllers remain offset-based until endpoints are versioned.

## Utilization Reporting

- NGOs submit fund usage reports (amount, description, proof URL, optional milestone) via the Utilization module.
- Campaign-level (`GET /utilization/campaign/:id`) and milestone-level (`GET /utilization/milestone/:id`) endpoints expose spending to relevant roles.
- SUPER_ADMIN ledger (`GET /utilization/admin/all`) aggregates all reports for compliance.

## CSR Summary Builder

- `POST /csr/summary` aggregates CSR-2 style metrics (obligation, spend, utilization, unspent, project breakdown, beneficiaries).
- Reuses Utilization and Impact modules to build a comprehensive annual report per company.
