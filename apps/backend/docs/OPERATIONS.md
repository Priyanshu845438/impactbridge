# Backend Operations Notes

## Admin Analytics Overview
- Aggregation service pulls donations, programmes, approvals, financial reports, and audit logs in a single query set. Expect one Prisma aggregate + timeline query per domain.
- Endpoint: `GET /api/v1/admin/analytics/overview` (SUPER_ADMIN + JWT required).
- Payload includes:
  - `donations`: totals array, daily timeline, rolling summary windows.
  - `programmes` / `approvals`: status counts and summary objects.
  - `financial`: total reports, NGO coverage, latest submission timestamp.
  - `recentActivity`: audit log entries (actor, action, timestamp).

### Operational Tips
- Ensure `JWT_SECRET` is set for JwtModule since analytics sits behind the global auth guard.
- Logs for aggregation failures surface via Nest logger; add metrics if sustained load increases.

### Caching & Guardrails
- Aggregations are cached in-process (TTL ~2 minutes) with cache-key scoped per company/NGO filter.

- Cache keys are built from scope JSON (companyId/ngoId) to keep entries isolated per tenant.
- Because caching is in-memory per instance, deployers should plan horizontal scaling with sticky sessions or accept cache misses on cross-instance traffic.
- Invalidation relies on data mutations (donations, programmes, approvals, financial reports); cache is short-lived and auto-refreshes on expiry.
- Expected cost per cold request: one aggregate + timeline query per domain plus grouped counts; warm cache returns instantly.
- Warm cache hits return in-memory data only (no Prisma reads).
- Cold requests execute aggregates; monitor around midnight when date windows shift to minimise thundering herd.
- Intended usage: SUPER_ADMIN dashboards and scoped analytics for audits; do not expose to public endpoints.
- Monitor Node memory if instance counts increase; cache size is modest but grows with active scopes.

## Testing
- Run `npm run test -- analytics` or full `npm run test` before deployments.
- E2E spec `apps/backend/test/v1/analytics.e2e-spec.ts` validates endpoint contract.

## Documentation Sync
- Update `pending_works.md` and AGENTS log when analytics scope changes.
