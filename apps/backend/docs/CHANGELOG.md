# Backend Changelog
- **2025-02-25** — CSR programme RBAC route tests added to confirm COMPANY-only access without changing guards.
- **2025-02-24** — CSR programme happy-path e2e suite added to validate list/detail/create/update/status contracts.
- **2025-02-22** — CSR programme company-scoped controller wired with existing service methods; API docs updated to reflect `/companies/:companyId/csr-programmes` routes and response DTOs.

- **2025-01-27** — Approval notifications integrated: intents queued on request/reset/approve/reject/revoke, tests added.
- **2025-01-24** — Admin analytics service & controller delivered with SUPER_ADMIN-only endpoints.
- **2025-01-26** — CSR programme workflow hardened: NGO unassignment, milestone lifecycle, status transition enforcement, and new integration tests.
- **2025-01-15** — CSR programme modules exposing company flows with feature-flagged frontend integration support.
- **2025-01-05** — Rate limiting + structured request logging middleware enabled globally.
- **2024-12-20** — Government-compliant Prisma schema migration (NGO/Company/Donor profiles, campaigns, donations, audit logs).
- **2024-11-30** — Auth module hardened: login/signup DTOs, bcrypt utility, JWT issuance and guards.
- **2024-11-15** — User module RBAC endpoints (`/users`, `/users/:id`, `/users/me`, change-password) finalised.
- **2024-10-20** — Base NestJS scaffolding, Prisma service wrapper, global validation pipe.
- **2026-01-05** — Applied explicit JwtAuthGuard + RolesGuard (COMPANY) to all CSR programme controller routes and added guard coverage tests; no response changes.
