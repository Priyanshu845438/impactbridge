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
| CSR Programmes | `/api/v1/companies/{companyId}/csr-programmes` | GET list / POST create | JWT + Role(COMPANY) |
| CSR Programmes | `/api/v1/companies/{companyId}/csr-programmes/{programmeId}` | GET detail / PATCH update | JWT + Role(COMPANY) |
| CSR Programmes | `/api/v1/companies/{companyId}/csr-programmes/{programmeId}/assign-ngo` | POST assign NGO | JWT + Role(COMPANY) |
| CSR Programmes | `/api/v1/companies/{companyId}/csr-programmes/{programmeId}/status` | POST transition status | JWT + Role(COMPANY) |
| Approvals | `/api/v1/approvals/...` | Request/approve/reject/revoke campaign approvals | JWT (NGO/COMPANY) + Roles |
| Analytics | `/api/v1/analytics/...` | Admin metrics endpoints | JWT + Role(SUPER_ADMIN) |
| Financial | `/api/v1/financial/ngo/upload` | POST | Upload NGO report (409 on duplicate) | JWT + Role(NGO) |

Refer to controller source files for full parameter shapes. Every request body is defined via DTOs under `src/**/dto`.

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

## Changelog Reference
- See `docs/CHANGELOG.md` for recent endpoint additions/changes.

- `GET /api/v1/companies/{companyId}/csr-programmes` — list programmes for a company (returns `ProgrammeSummaryDto[]`).
- `GET /api/v1/companies/{companyId}/csr-programmes/{programmeId}` — fetch programme detail (`ProgrammeDetailDto`).
- `POST /api/v1/companies/{companyId}/csr-programmes` — create programme (`ProgrammeCreateResponseDto`).
- `PATCH /api/v1/companies/{companyId}/csr-programmes/{programmeId}` — update programme (`ProgrammeUpdateResponseDto`).
- `POST /api/v1/companies/{companyId}/csr-programmes/{programmeId}/assign-ngo` — assign NGO (`ProgrammeAssignmentDto`).
- `POST /api/v1/companies/{companyId}/csr-programmes/{programmeId}/status` — transition status (`ProgrammeStatusTransitionDto`).
