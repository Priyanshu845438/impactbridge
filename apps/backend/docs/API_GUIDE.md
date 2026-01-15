# API Guide

## Versioning
- All endpoints are served beneath `/api/v1`. Requests without the version prefix are rejected.
- Future breaking changes will be introduced via `/api/v2` while keeping `/api/v1` stable until deprecation.

## Authentication
- Bearer JWT (access token) issued by `POST /api/v1/auth/login` or `/register`.
- Tokens contain `sub` (user id) and `role`. Guards enforce role assertions via `RolesGuard`.

## Core Endpoints

| Area | Endpoint | Method | Description | Guards |
| --- | --- | --- | --- | --- |
| Auth | `/api/v1/auth/register` | POST | Create user (SUPER_ADMIN, NGO, COMPANY, DONOR) | Public (DTO validation) |
| Auth | `/api/v1/auth/login` | POST | Issue JWT on valid credentials | Public |
| Users | `/api/v1/users/me` | GET | Current user profile | JWT |
| Users | `/api/v1/users/me` | PATCH | Update current user | JWT |
| Users | `/api/v1/users/:id` | GET | Fetch public profile by id | JWT (role aware) |
| Users | `/api/v1/users` | GET | List all users | JWT + Role(SUPER_ADMIN) |
| Users | `/api/v1/users/:id` | PATCH | Update arbitrary user | JWT + Role(SUPER_ADMIN) |
| Users | `/api/v1/users/:id` | DELETE | Delete user | JWT + Role(SUPER_ADMIN) |
| Users | `/api/v1/users/me/change-password` | POST | Change password | JWT |
| CSR Programmes (Company scope) | `/api/v1/companies/{companyId}/csr-programmes` | GET list / POST create | JWT + Role(COMPANY) |
| CSR Programmes (Company scope) | `/api/v1/companies/{companyId}/csr-programmes/{programmeId}` | GET detail / PATCH update | JWT + Role(COMPANY) |
| CSR Programmes (Company scope) | `/api/v1/companies/{companyId}/csr-programmes/{programmeId}/assign-ngo` | POST assign NGO | JWT + Role(COMPANY) |
| CSR Programmes (Company scope) | `/api/v1/companies/{companyId}/csr-programmes/{programmeId}/unassign-ngo` | POST unassign NGO (final status) | JWT + Role(COMPANY) |
| CSR Programmes (Company scope) | `/api/v1/companies/{companyId}/csr-programmes/{programmeId}/milestones` | POST create / PATCH update milestone | JWT + Role(COMPANY) |
| CSR Programmes (Company scope) | `/api/v1/companies/{companyId}/csr-programmes/{programmeId}/status` | POST transition status | JWT + Role(COMPANY) |
| CSR Programmes (Admin reporting) | `/api/v1/csr-programmes` | GET list with optional `status`, `companyId`, `ngoId` filters | JWT + Role(SUPER_ADMIN) |
| CSR Programmes (Admin reporting) | `/api/v1/csr-programmes/{programmeId}` | GET admin detail view | JWT + Role(SUPER_ADMIN) |
| Approvals | `/api/v1/approvals/...` | Request/approve/reject/revoke campaign approvals | JWT (NGO/COMPANY) + Roles |
| Analytics | `/api/v1/analytics/...` | Admin metrics endpoints | JWT + Role(SUPER_ADMIN) |
| Financial | `/api/v1/financial/ngo/upload` | POST | Upload NGO report (409 on duplicate; payload validated for period/year/url) | JWT + Role(NGO) |

Refer to controller source files for full parameter shapes. Every request body is defined via DTOs under `src/**/dto`.

### CSR Programme v1 Surface
- The `/api/v1/csr-programmes` namespace exposes read-only admin access to CSR programme records. Filters (`status`, `companyId`, `ngoId`) map directly to Prisma where clauses; omit filters to retrieve the full catalogue (RBAC-limited to SUPER_ADMIN).
- Company-scoped endpoints remain under `/api/v1/companies/{companyId}/csr-programmes/**` and reuse identical DTOs/services. Admin reads share the same mappers to guarantee field parity across roles.
- Responses include programme metadata, linked company/NGO summaries, assignment status, and milestone snapshots. No additional admin-only fields are introduced to keep the contract consistent.
- Feature flags are not applied on the backend; frontends must continue to gate usage via their own configuration.

## Postman Collection
- Import `docs/postman/impactbridge.postman_collection.json` into Postman.
- Collection variables:
  - `{{baseUrl}}` → default `http://localhost:3000/api/v1`
  - `{{accessToken}}` → set after login request
- Folder structure mirrors feature modules (Auth, Users, CSR, Approvals, Analytics).

## Error Handling
- Standard NestJS HTTP exceptions (`BadRequestException`, `ForbiddenException`, `NotFoundException`) with descriptive messages.
- Validation errors respond with `400` and constraint details.
- Global rate limiter returns `429` with retry-after header when thresholds exceeded.

## Approvals Transaction Guarantees
- Request, approval, rejection, and revocation endpoints follow a two-step process:
  1. Persist approval state change via Prisma (single `campaignApproval` update) inside the service layer.
  2. Record audit log + enqueue notification intent.
- The service ensures that approval state is updated before side effects; failures in notifications do **not** roll back the approval record.
- Audit logs capture previous/new status, actor, and remarks to provide traceability even when notifications fail or are retried.
- No multi-statement transaction spans the Prisma update and notification enqueue; this design prevents long-lived transactions and keeps approval availability high. Operations teams should monitor notification intent queues separately for delivery issues.
- Downstream consumers (analytics, dashboards) always read approval state directly from the database, avoiding dependence on notification delivery success.

## Analytics Helpers
- Admin overview aggregates donations, programme counts, approvals (including status breakdown), CSR programme KPIs (totals and per-status counts), and financial report overview (totals, NGO coverage, latest submission).
- CSR analytics leverage the same aggregation service; scoped queries (company/NGO) respect cache keys detailed in the operations guide.

## Changelog Reference
- See `docs/CHANGELOG.md` for recent endpoint additions/changes. Frontend contract tests cover CSR list/detail responses to ensure DTO alignment without altering these APIs. Notification intents are still queued only (no dispatch layer yet); runtimes should monitor the changelog for delivery updates once a worker is introduced.
