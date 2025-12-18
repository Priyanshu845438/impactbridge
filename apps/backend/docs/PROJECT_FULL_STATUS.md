# ImpactBridge Backend – Full Status Report

_Last reviewed: 2025-02-14_

## 1. Executive Summary
ImpactBridge’s backend enables compliance-driven CSR collaborations between NGOs, corporates, and donors. The core modules (auth, user lifecycle, NGO/company compliance, donations, analytics) are production-ready. Upcoming focus areas include approvals, financial reporting exposure, and notification delivery channels.

## 2. Architectural Themes
- **Security first**: JWT auth, role-based guards, sanitized responses, audit logs.
- **Compliance ready**: NGO/company profiles, bank + document verification, audit logging.
- **Modular**: Strict controller → service → Prisma structure with shared utilities (sanitisation, pagination, notifications).
- **Docs-driven**: Every major deliverable logged in `AGENTS.md`, guides kept in `docs/`.

## 3. Environment Snapshot
| Environment | Status | Notes |
|-------------|--------|-------|
| Local Dev | ✅ | Prisma migrations via `npx prisma migrate dev`, shared testing helpers. |
| Integration | ✅ | Deploy via `npx prisma migrate deploy`, Postman regression pack available. |
| Production | 🔄 Planned | Requires migration playbook approval before go-live. |

## 4. Recent Highlights
- Auto-creation of NGO/company/donor profiles during registration.
- Admin listings for NGOs, companies, donors with sanitised results.
- NGO financial reporting services (service layer, controllers pending exposure).
- Pagination + soft-delete helpers integrated into shared utilities.
- Notification infrastructure scaffold with injectable provider token.
- Migration and API versioning guides established for operational readiness.

## 5. Feature Checklist (Delivered vs Pending)

| Feature | Description | Status |
| ------- | ----------- | ------ |
| Authentication & JWT | Register, login, password hashing, token guard | ✅ Complete |
| Invitations | SUPER_ADMIN invites + public acceptance | ✅ Complete |
| NGO compliance setup | Address, bank, documents modules | ✅ Complete |
| NGO verification workflow | Admin approval gating campaign creation | ✅ Complete |
| Campaign creation & public listing | NGOs publish, donors browse | ✅ Complete |
| Donation flows | Authenticated and anonymous donations; history endpoints | ✅ Complete |
| Donation receipts | NGOs attach receipt URLs to donations | ✅ Complete |
| Company CSR tracking | Budget status and automatic spend updates on donations | ✅ Complete |
| Analytics & admin lists | Platform oversight for SUPER_ADMIN | ✅ Complete |
| Activity logging | Audit trail for key actions | ✅ Complete |
| Company–NGO approval workflow | Campaign approvals before company donations | 🔄 Service logic ready, API exposure pending |
| NGO financial reporting | Upload/list quarterly & annual reports | ✅ Service layer ready (controller + docs pending) |
| Pagination & search | Consistent pagination across lists | ✅ Base helpers shipped (controllers default to full results) |
| Soft delete approach | Replace hard deletes with `deletedAt` | ✅ Query helpers enforce filters; delete endpoints TODO |
| Email/SMS notifications | Receipts, password change, invitation reminders | ✅ Service skeleton (no delivery provider) |
| Reviewer/Auditor dashboards | Read-only portals for new roles | 🔄 Planned |
| Automated tests | Integration/e2e coverage | 🔄 Planned |
| Migration playbook | Runbook for apply/rollback | ✅ Added `docs/MIGRATION_PLAYBOOK.md` |
| API versioning policy | Versioning + DTO alignment | ✅ Added `docs/API_VERSIONING_GUIDE.md` |
| Observability plan | Structured logging, tracing, error correlation | ✅ Added `docs/OBSERVABILITY_PLAN.md` |

Legend: ✅ Delivered · 🔄 In progress / On roadmap · 🚧 Not started

## 6. Roadmap Priorities
1. Expose company ↔ NGO approval APIs with full audit trail.
2. Publish NGO financial reporting endpoints + CSR-2 export pipeline.
3. Wire real notification providers (email/SMS) and audit outgoing messages.
4. Introduce shared DTO/type package for frontend-backend alignment.
5. Expand automated tests (unit, integration, e2e) and add CI gates.

## 7. Operational Runbook (Excerpt)
- Migrations: follow `docs/MIGRATION_PLAYBOOK.md` for apply/rollback instructions per environment.
- Versioning: `/v1` remains default; breaking changes must follow `docs/API_VERSIONING_GUIDE.md`.
- Testing: run `npm run test -- --runInBand`, `npm run lint`, `npm run build` before raising PR or handing over tasks.

## 8. Documentation Index
Refer to `docs/README.md` for a full list of guides (API testing, business logic, migration, versioning, etc.).

## 9. Outstanding Risks
- Notification delivery providers not yet implemented; messages remain no-op.
- Approval workflow APIs still hidden; UI may expect endpoints soon.
- Legacy `/users` controller duplicates functionality from `users` module; needs consolidation.
- No automated integration/CI pipeline yet; manual diligence required before releases.

## 10. Change Log Reference
Every significant update is tracked in `apps/backend/agents.md`. Latest entries cover pagination/soft delete utilities, approval workflow logic, financial reporting services, and notification scaffolding.

Maintain this report as modules graduate from service-layer prep to full API exposure.
