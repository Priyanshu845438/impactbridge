# ImpactBridge Apps Progress Log

## Backend
- **2024-10-20** — NestJS + Prisma scaffold established (modules, PrismaService, global validation pipe).
- **2024-11-15** — Auth & User modules completed (JWT login/register, RBAC guards, profile CRUD).
- **2024-12-20** — Government-compliant schema migration covering NGO/Company/Donor profiles, campaigns, donations.
- **2025-01-05** — Rate limiting & structured request logging middleware introduced.
- **2025-01-15** — CSR programme module + analytics aggregation service delivered.
- **2025-01-24** — Admin analytics controller exposed with SUPER_ADMIN protection.
- **2025-01-27** — Approval workflow now queues notification intents for all transitions.

## Frontend
- **2024-10-25** — Next.js App Router scaffold, auth flows with mock backend, Tailwind design system.
- **2024-11-18** — RBAC middleware + shared role helpers unifying server/client gating.
- **2024-12-10** — Feature flag framework added (`API_DASHBOARD`, `API_CSR_PROGRAMMES`, `API_AUTH`).
- **2025-01-12** — Admin analytics dashboard wired to adapters with flag-controlled React Query.
- **2025-01-20** — CSR programme list/detail prepared for API integration behind flags.

## Ops & Testing
- Standard commands: `npm run init`, `npm run build`, `npm run test`, `npm run test:e2e` (backend), `npm run test`, `npm run lint`, `npm run build` (frontend).
- Postman collection furnished under `apps/backend/docs/postman/`.
- Jest suites cover key flows (auth, approvals, analytics) across backend/frontend.
