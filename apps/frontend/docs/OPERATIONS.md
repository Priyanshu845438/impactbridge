# Frontend Operations Notes

## Feature Flags
- `API_DASHBOARD`: pulls admin analytics from backend. When disabled or if the API errors, dashboard and reports pages render seeded mock data with identical layout.

## Admin Analytics Wiring
- Data source: `useAdminAnalytics` hook (React Query) → `fetchAdminAnalytics` API → backend `/api/v1/admin/analytics/overview`.
- Adapter maps payload into UI-friendly metrics (donation stats, programme/approval counts, financial overview, activity feed).
- Pages consuming analytics:
  - `/dashboard/admin` (executive overview, KPI cards, charts, activity feed)
  - `/dashboard/admin/reports` (summary tiles, trend charts, category breakdown, contribution split)
- Components maintain existing layout/styles; fallbacks apply when analytics disabled, payload empty, or user lacks data.

## Testing
- `__tests__/dashboard-admin-analytics.test.tsx`
- `__tests__/dashboard-admin-reports.test.tsx`
- `__tests__/analytics-adapters.test.ts`

Run `npm run test -- dashboard-admin-analytics.test.tsx` `npm run test -- dashboard-admin-reports.test.tsx`, or full `npm run test` before deploying flag changes. Full build verified via `npm run build`.
