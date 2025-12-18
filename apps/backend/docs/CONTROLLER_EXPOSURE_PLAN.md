# Controller Exposure Plan

## Overview
This plan outlines how existing backend services will be exposed through NestJS controllers without introducing unintended coupling. It serves as the bridge between the current service-only implementation and the forthcoming API integration work.

## Versioning & Routing
- Adopt `/api/v1/<module>` as the base path for all new controllers.
- Group routes by domain module (e.g., `auth`, `users`, `programmes`, `reports`).
- Include a top-level `v1` module to simplify future version increments while keeping the current app module unmodified until wiring starts.

## Service → Controller Mapping
| Service | Planned Controller | Initial Routes | Notes |
| --- | --- | --- | --- |
| `AuthService` | `AuthController` | `POST /auth/login`, `POST /auth/register` | Already defined; will be the first to expose. |
| `UserService` (`src/user/`) | `UserController` | `GET /users/:id`, `PATCH /users/me` | Read/update self endpoints only until RBAC guard finalised. |
| `UsersService` (`src/users/`) | `AdminUsersController` | `GET /users`, `GET /users/ngos/:id`, `GET /users/companies/:id` | Restricted to `SUPER_ADMIN`. Initially read-only. |
| `ProgrammesService` | `ProgrammesController` | `POST /programmes`, `PATCH /programmes/:id`, `POST /programmes/:id/archive` | Exposed after auth endpoints stabilise. |
| `NgoFinancialReportsService` | `NgoReportsController` | `POST /ngos/:id/reports`, `GET /ngos/:id/reports` | Read-only first; uploads gated by feature flag. |
| `NotificationsService` | `NotificationsController` | `POST /notifications/intent` (admin only), `GET /notifications/inbox` | Will remain no-op until providers are wired. |

## Guard Placement
- `JwtAuthGuard` applied at controller level for all protected modules.
- `RolesGuard` stacked with decorator `@Roles()` according to module needs:
  - `AuthController`: no guard on register/login.
  - `UserController`: `JwtAuthGuard` for all routes; `RolesGuard` only where role validation is required (e.g., admin overrides).
  - `AdminUsersController`: `@UseGuards(JwtAuthGuard, RolesGuard)` with `@Roles(UserRole.SUPER_ADMIN)`.
  - `ProgrammesController`: `@Roles(UserRole.COMPANY, UserRole.SUPER_ADMIN)` for create/update/archive.
  - `NgoReportsController`: `@Roles(UserRole.NGO)` for create, `@Roles(UserRole.SUPER_ADMIN, UserRole.COMPANY, UserRole.NGO)` for read.
  - `NotificationsController`: `@Roles(UserRole.SUPER_ADMIN)` for admin triggers; user inbox uses JWT only.

## Naming & Response Conventions
- Controllers return `{ data: <payload> }` on success and `{ data: <array>, meta: { pagination } }` for list endpoints.
- Errors throw Nest exceptions with structured messages already produced by services (no additional wrapping).
- DTOs remain the single source for validation; controllers must only map `@Body()`/`@Param()` to service calls.

## Read-Only First Approach
- Only enable GET endpoints initially for complex modules (`users` admin views, NGO/company listings) while POST/PATCH remain feature-flagged until services are thoroughly integration-tested.
- Archive/delete operations stay disabled until soft-delete guardrails are in place.

## Next Steps
1. Generate controller shells aligned with this mapping (no logic yet).
2. Wire guards and decorators according to the matrix above.
3. Incrementally enable write endpoints after integration smoke tests.
