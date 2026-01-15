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
- Aggregations are cached in-process (TTL ~2 minutes) with cache-key scoped per company/NGO filter. Cache entries are isolated by serialising the scope payload (`{ companyId, ngoId }`) to JSON before hashing.
- Because caching is per-process, horizontal scale introduces cache warm-up on each instance. To avoid stampedes:
  - Respect feature flags to limit admin-only access.
  - Stagger dashboards polling (recommended 5–10 minute refresh on the frontend).
  - Consider sticky sessions if the deployment platform allows it; otherwise expect occasional cold hits as traffic bounces between replicas.
- Invalidation strategy:
  - Mutations writing to donations, programmes, approvals, CSR programmes, or financial reports emit cache-buster events that clear the relevant key when those modules call the aggregation service.
  - Otherwise, cache expires naturally after TTL. No manual invalidation API is exposed today.
- Cost expectations:
  - Cold request → one aggregate + optional timeline query per domain (donations, programmes, approvals, CSR programmes, financial, audit log). Monitor CPU around top-of-hour and day rollovers when all tenants fetch simultaneously.
  - Warm request → in-memory response, microsecond latency. Monitor Node heap usage; each cached scope consumes ~5 KB.
- Guardrails:
  - Admin-only usage enforced by RBAC; do not expose analytics route publicly.
  - If cache evictions spike, review backend logs for repeated mutation bursts (may require debouncing on callers).
  - For long-running background jobs querying analytics, explicitly disable cache (service accepts `bypassCache` option) to avoid polluting the admin dashboard cache namespace.

## Testing
- Run `npm run test -- analytics` or full `npm run test` before deployments.
- E2E spec `apps/backend/test/v1/analytics.e2e-spec.ts` validates endpoint contract.

## Documentation Sync
- Update `pending_works.md` and AGENTS log when analytics scope changes.
