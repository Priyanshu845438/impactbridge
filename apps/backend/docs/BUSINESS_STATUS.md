# Business Logic Status – ImpactBridge Backend

This document summarizes the current state of backend capabilities, highlighting completed functionality and outstanding work.

## Completed Functionality

### Authentication & Authorization
- User registration (`POST /auth/register`) with role assignment.
- User login (`POST /auth/login`) issuing JWT (1-day expiry).
- Global JWT guard (`JwtAuthGuard`) and role-based guard (`RolesGuard`).
- Change password workflow (`POST /users/change-password`).

### User Profiles
- Self-service profile retrieval and update (`GET/PATCH /users/me`).
- Public profile lookup (`GET /users/:id`).
- Admin/company role views for NGO profiles (`GET /users/ngos/:id`).
- Admin/NGO role views for company profiles (`GET /users/companies/:id`).

### Data Access Layers
- Prisma integration with sanitizer helpers removing passwords before returning user data.
- DTO-based validation across auth and user modules.
- Postman collection covering core API flows.

## Pending / Future Work
- Consolidate `user/` and `users/` modules (overlapping responsibilities).
- Add RBAC enforcement for legacy CRUD endpoints (`POST/PATCH/DELETE /users`).
- Implement pagination and filtering for user listings.
- Add e2e/integration tests (currently none).
- Introduce refresh token or session management strategy.
- Enhance error handling (Prisma-specific exceptions).
- Align database seeding and migrations with latest schema changes.

## Recommended Next Steps
1. Unify user modules to avoid duplication and inconsistent sanitization.
2. Expand RBAC policies to cover legacy endpoints; ensure sanitized outputs.
3. Add automated test coverage for auth and profile flows.
4. Review and configure CI/CD to run `npm run build` and future tests.
5. Document environment variable requirements in deployment guide.

## Notes
- The system assumes an operational database (Neon) and valid Prisma schema migrations.
- Some endpoints (e.g., legacy users CRUD) may expose password hashes; sanitize before exposing publicly.
- Postman collection lives at `docs/postman/impactbridge.postman_collection.json` for manual QA.
