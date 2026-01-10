# Operations Guide

## Environment Setup
1. Copy `.env.example` to `.env` and configure:
   - `DATABASE_URL` pointing to PostgreSQL instance.
   - `JWT_SECRET` for token signing.
   - Optional: rate limiter/window overrides.
2. Install dependencies: `npm install` at repo root.
3. Generate Prisma client: `npx prisma generate` (runs automatically via postinstall when enabled).

## Migrations & Seed
- Apply migrations: `npx prisma migrate deploy` (production) or `npx prisma migrate dev --name <tag>` (local).
- Seeds: use `prisma/seed.ts` (if defined) via `npx prisma db seed`.

## Common Commands
- `npm run init` — lightweight check; ensures prerequisites before longer jobs.
- `npm run build` — compile Nest application to `dist/`.
- `npm run start:dev` — hot reload server.
- `npm run test` — unit tests.
- `npm run test:e2e` — end-to-end suites (requires test database).

## Deployment Checklist
- Ensure migrations are applied to target environment.
- Provide `JWT_SECRET`, database credentials, and any feature flag env vars.
- Configure logging sinks (stdout collector) for structured logs.

## Troubleshooting
- **Database connection errors**: verify `DATABASE_URL`, network access, and that Postgres accepts SSL/non-SSL as configured.
- **JWT errors**: ensure `JWT_SECRET` matches env; tokens issued before rotation become invalid.
- **Rate limiting**: adjust environment variables controlling window/requests or whitelist internal probes.
- **Notification intents**: default provider is noop; to enable real delivery, bind a concrete provider via `NOTIFICATION_PROVIDER`.
- **Financial validation**: Upload endpoints rely on DTO checks enforcing reporting period (1-12), year (>=2000), and HTTPS report URLs; invalid payloads are rejected before persistence with existing error messages.
- **Financial analytics**: Admin aggregation exposes total reports, NGO coverage, and latest submission timestamp (data only); wiring to dashboards can rely on stable responses.

## Observability
- Request logs include `requestId`, method, status, duration; ensure downstream log aggregator preserves structured JSON.
- Activity logs available via `ActivityLogService` for auditing actions (approvals, programmes, financial uploads). CSR lifecycle, approval transitions, and financial report submissions were verified to emit single, actor-scoped entries with accurate metadata and no duplicates.
- Analytics aggregation metrics can be invoked manually via `AnalyticsAggregationService` (no public API aside from controller).
