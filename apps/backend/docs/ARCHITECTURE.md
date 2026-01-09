# Backend Architecture

## Stack Overview
- **Runtime**: Node.js 18.x, NestJS framework
- **Language**: TypeScript (strict mode)
- **Database**: PostgreSQL via Prisma ORM (`prisma/generated` client)
- **Deployment Targets**: containerised services (Docker-based dev/test), stateless API pods in production

## Module Layout
- `auth/` — login, registration, JWT issuance, guards
- `users/` — profile management, RBAC-protected admin endpoints
- `csr-programme/` — CSR programme CRUD, milestones, company/NGO assignments
- `approvals/` — campaign approval workflow, audit logging, notification intents
- `analytics/` — aggregation service powering dashboards
- `notifications/` — intent queue + provider abstraction (email/SMS ready)
- `prisma/` — PrismaService wrapper, migrations, generated client
- `v1/` — controller namespace ensuring `/api/v1/**` routing

Support modules (`activity`, `documents`, `donations`, etc.) follow the controller → service → Prisma pattern and ensure DTO validation at ingress.

## Data Flow Highlights
1. **HTTP Entry** → Versioned controller (`@Controller('v1/...')`) validating DTOs via global `ValidationPipe`.
2. **Service Layer** → Business orchestration, RBAC, cross-module coordination (e.g., approvals writing activity logs + notifications).
3. **Persistence** → Prisma client with soft-delete awareness, standard transactions for multi-write operations.
4. **Events/Notifications** → `NotificationsService.enqueue(...)` captures intent for asynchronous delivery (currently noop provider). Stored intent records contain channel, recipient JSON (email/name), payload (subject/body/metadata), and status to support future workers.
5. **Analytics** → `AnalyticsAggregationService` executes aggregations directly via Prisma, used by admin dashboards.

## Cross-Cutting Concerns
- **Auth**: JWT guard + `RolesGuard` ensure API access is role bounded. `CurrentUser` decorator exposes decoded payload.
- **Validation**: DTOs use `class-validator`; `ValidationPipe` strips unknown fields and rejects non-whitelisted properties.
- **Activity Logging**: `ActivityLogService` records status changes with metadata for audit trails.
- **Rate Limiting & Logging**: Express middleware enforces conservative rate limits and structured logs (`requestId`, method, route, status, duration).
- **Testing**: Jest unit tests mock Prisma/notifications; integration/e2e suites run against an ephemeral database when enabled.

## Database Models (Highlights)
- `User` (role enum: SUPER_ADMIN, NGO, COMPANY, DONOR)
- `NGOProfile`, `CompanyProfile`, `DonorProfile` auto-created post registration
- `Campaign`, `CampaignApproval`, `CSRProgramme`, `Milestone`
- `Donation`, `FinancialReport`, `UtilizationReport`
- `NotificationIntent` storing queued deliveries (channel, recipient JSON, payload, status)
- `AuditLog` central trace of significant actions

Refer to the Prisma schema (`prisma/schema.prisma`) for complete definitions and relations.
