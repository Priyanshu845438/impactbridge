# Backend Changelog
- **2026-01-12** — Financial report DTO validation hardened (strict period/year bounds and URL checks) with accompanying tests; no endpoint behaviour changes.

- **2026-01-06** — CSR request context plumbing added (AsyncLocal-based); no behavioural changes yet, logging task pending.

- **2025-02-25** — CSR programme RBAC route tests added to confirm COMPANY-only access without changing guards.
- **2025-02-24** — CSR programme happy-path e2e suite added to validate list/detail/create/update/status contracts.
- **2025-02-22** — CSR programme company-scoped controller wired with existing service methods; API docs updated to reflect `/companies/:companyId/csr-programmes` routes and response DTOs.

- **2025-01-27** — Approval notifications integrated: intents queued on request/reset/approve/reject/revoke, tests added; stored payload includes channel/recipient/body/metadata for future delivery.
- **2025-01-24** — Admin analytics service & controller delivered with SUPER_ADMIN-only endpoints.
- **2025-01-26** — CSR programme workflow hardened: NGO unassignment, milestone lifecycle, status transition enforcement, and new integration tests.
- **2025-01-15** — CSR programme modules exposing company flows with feature-flagged frontend integration support.
- **2025-01-05** — Rate limiting + structured request logging middleware enabled globally.
- **2024-12-20** — Government-compliant Prisma schema migration (NGO/Company/Donor profiles, campaigns, donations, audit logs).
- **2024-11-30** — Auth module hardened: login/signup DTOs, bcrypt utility, JWT issuance and guards.
- **2024-11-15** — User module RBAC endpoints (`/users`, `/users/:id`, `/users/me`, change-password) finalised.
- **2024-10-20** — Base NestJS scaffolding, Prisma service wrapper, global validation pipe.
- **2026-01-06** — CSR lifecycle actions now emit audit logs when actor context is present; unassignment/milestone logging added in follow-up update.
- **2026-01-09** — Audit logging validated end-to-end (CSR, approvals, financial uploads); no implementation change, tests ensure single-entry actor-scoped records.
- **2026-01-08** — No backend implementation changes; frontend CSR programme update flow now consumes existing PATCH endpoint via feature flag. Keep monitoring response DTO expectations (title/description/status fields) as frontend normalises onto mock shape.
- **2026-01-06** — CSR negative-path route tests added covering ownership and not-found cases; runtime behaviour unchanged.
- **2026-01-06** — CSR programme list/detail frontend contract tests documented to preserve UI parity while backend contracts remain unchanged (no server code modifications).
- **2026-01-05** — Applied explicit JwtAuthGuard + RolesGuard (COMPANY) to all CSR programme controller routes and added guard coverage tests; no response changes.

- **2026-01-07** — Documented frontend CSR assignment/status feature-flag usage; backend CSR endpoints unchanged but verified by existing contract tests.

## Notifications
- Added safe delivery processing for notification intents with status updates on success/failure.
- Introduced retry metadata (retryCount, lastAttemptAt) and provider metrics logging without altering current delivery behaviour.
- Enabled automated cron-based retries for FAILED intents with PERMANENT_FAILURE safeguards and lifecycle logging; enqueue behaviour unchanged.
