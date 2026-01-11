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
- Monitor Prisma query performance if donations volume spikes; consider adding caching later.
- Ensure `JWT_SECRET` is set for JwtModule since analytics sits behind the global auth guard.
- Logs for aggregation failures surface via Nest logger; add metrics if sustained load increases.

## Testing
- Run `npm run test -- analytics` or full `npm run test` before deployments.
- E2E spec `apps/backend/test/v1/analytics.e2e-spec.ts` validates endpoint contract.

## Documentation Sync
- Update `pending_works.md` and AGENTS log when analytics scope changes.
