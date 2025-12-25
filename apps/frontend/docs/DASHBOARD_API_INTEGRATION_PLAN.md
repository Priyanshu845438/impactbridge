# Dashboard API Integration Plan

This document captures the rollout strategy for replacing mock dashboard data with live backend APIs.
Feature flags described below gate every envelope so we can enable functionality incrementally without risking user-facing instability.

## Shared Principles

- Keep mock data wired until the final verification step; flip the flag only after each dashboard clears QA.
- All requests use the consolidated API client (per `API_CLIENT_CONSOLIDATION_PLAN.md`).
- Loading states should reuse existing skeletons; avoid new UI patterns.
- Error states must display the standard fetch fallback introduced in the error boundary work.
- Empty states should mirror today’s mock placeholders unless noted.
- Regression tests cover the flag enabled/disabled paths before removing mock datasets.

## Feature Flags

| Flag key | Description | Default |
| --- | --- | --- |
| `API_DASHBOARD` | Global toggle enabling API-backed dashboards | Off |

Additional, more granular flags can be added later (e.g., `API_DASHBOARD_NGO`) but the initial rollout is gated behind the shared `API_DASHBOARD` flag.

## NGO Dashboard

### Backend Endpoints

1. `GET /api/v1/campaigns?ngoId=<current>` – active campaigns, target vs raised totals, progress.
2. `GET /api/v1/donations?ngoId=<current>` – recent donations, donor metadata, amount trends.
3. `GET /api/v1/financial/reports?ngoId=<current>` – finance quick stats (cash flow, burn rate).
4. `GET /api/v1/approvals?ngoId=<current>` – compliance status, pending actions.
5. `GET /api/v1/ngo/progress-metrics` – impact KPIs (beneficiaries, outcomes).

### Integration Steps

1. **Phase 1 – Data fetch scaffolding**
   - Wrap existing mock selectors with hooks calling the relevant endpoints.
   - Behind `API_DASHBOARD`, load real data and map to current component props.
   - Keep mock data accessible when the flag is off.
2. **Phase 2 – State handling**
   - Ensure skeleton display during initial loads.
   - On error, surface fetch fallback while still allowing mock data when the flag is disabled.
3. **Phase 3 – Empty states**
   - Confirm backend returns empty arrays without throwing; align empty placeholders with current copy.
4. **Phase 4 – QA validation**
   - Flip flag in staging, verify metrics alignment with backend fixtures.
5. **Phase 5 – Mock data removal**
   - After the flag ships to production, remove NGO mock dataset last.

### Loading / Empty / Error States

- Loading: existing skeleton shimmer components for summary cards, tables, charts.
- Empty: reuse “No data available” cards used by mock dataset when arrays are empty.
- Error: render fetch fallback with retry button; keep mock fallback disabled when flag is on (to avoid showing stale data).

### Final Mock Removal

- Remove `app/dashboard/ngo/finance/mock-data.ts` (or equivalent dataset) after production verifies flag on for two releases.

## Company Dashboard

### Backend Endpoints

1. `GET /api/v1/company/programmes?companyId=<current>` – primary programme list, statuses, budgets.
2. `GET /api/v1/company/reports?companyId=<current>` – compliance summary table.
3. `GET /api/v1/company/ngo-engagements?companyId=<current>` – partner NGO list + risk scores.
4. `GET /api/v1/company/impact-metrics?companyId=<current>` – chart data for impact widgets.
5. `GET /api/v1/company/donations?companyId=<current>` – CSR spend breakdown.

### Integration Steps

1. **Phase 1 – Programme directory wiring**
   - Replace mock programme array with query hook referencing `/company/programmes`.
2. **Phase 2 – Compliance/Impact sections**
   - Swap compliance and impact cards to use live endpoints; maintain skeletons.
3. **Phase 3 – Aggregated metrics**
   - Align KPIs with backend totals (spend vs allocation); ensure decimal rounding matches docs.
4. **Phase 4 – QA & analytics sanity**
   - Validate chart data matches expected test fixtures; check activity logs for generated updates.
5. **Phase 5 – Mock cleanup**
   - Remove programme/compliance mock data last once adoption is stable.

### Loading / Empty / Error States

- Loading: keep home dashboard skeleton grid + table placeholders.
- Empty: new data should reuse “No items in this category yet” messaging from mock flows.
- Error: show fetch fallback; if failure occurs, avoid falling back to mock to prevent incorrect business decisions.

### Final Mock Removal

- Delete `app/dashboard/company/programmes/mock-programmes.ts` and related dataset once the flag is live for two sprints.

## Admin Analytics Dashboard

### Backend Endpoints

1. `GET /api/v1/admin/analytics/overview` – top-level KPI aggregates (donations, impact, compliance).
2. `GET /api/v1/admin/analytics/campaigns` – per campaign metrics for charts.
3. `GET /api/v1/admin/analytics/ngo` – NGO pipeline statistics, approval counts.
4. `GET /api/v1/admin/analytics/company` – CSR spend vs allocation per company.
5. `GET /api/v1/admin/analytics/activity` – recent events for the activity feed.

### Integration Steps

1. **Phase 1 – KPI cards**
   - Switch stat cards to fetch `/admin/analytics/overview`.
   - Validate data matches expected decimals and currency formatting.
2. **Phase 2 – Charts**
   - Replace area/line charts with live data; ensure tooltip + axis formatting remain consistent.
3. **Phase 3 – Activity feed**
   - Map backend audit events to existing feed component structure.
4. **Phase 4 – QA cross-check**
   - Compare output with backend analytics tests; verify accessibility tests pass with real data.
5. **Phase 5 – Mock removal**
   - Remove analytics mock JSON after deployment remains stable for one release.

### Loading / Empty / Error States

- Loading: maintain skeleton cards and chart placeholders already present.
- Empty: confirm backend returns zeroed metrics gracefully; display existing “No activity recorded” copy.
- Error: fetch fallback UI with link to status page; ensure analytics warns but keeps page frame intact.

### Final Mock Removal

- Remove `app/dashboard/admin/analytics/mock-analytics.ts` after a full release cycle with flag enabled.

## QA & Rollout Checklist

1. Local: enable `NEXT_PUBLIC_FLAG_API_DASHBOARD=on`; confirm data renders and tests pass.
2. Staging: enable flag for QA group; run automated regression + manual UAT.
3. Production pilot: enable for internal cohort, monitor error logs.
4. Production rollout: enable for all users; monitor metrics for 48 hours.
5. Remove mocks + release docs update.

## References

- `API_CLIENT_CONSOLIDATION_PLAN.md` – explains shared client migration.
- `FRONTEND_DASHBOARD.md` – describes current dashboard UI parts.
- `PERFORMANCE_BASELINE.md` – ensure new data sources keep LCP targets.

