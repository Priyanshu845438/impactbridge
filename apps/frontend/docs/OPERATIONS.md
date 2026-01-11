# Frontend Operations Notes

## Feature Flags
- `API_DASHBOARD`: pulls admin analytics from backend. When disabled, dashboard and reports pages render seeded mock data.

## Admin Analytics Wiring
- Data source: `useAdminAnalytics` hook (React Query) → `fetchAdminAnalytics` API → backend `/api/v1/admin/analytics/overview`.
- Adapter maps payload into UI-friendly metrics (donation stats, programme/approval counts, financial overview, activity feed).
- Pages consuming analytics:
  - `/dashboard/admin`
  - `/dashboard/admin/reports`
- Components maintain existing layout/styles; fallbacks apply when analytics disabled or payload empty.

## Testing
- `__tests__/dashboard-admin-analytics.test.tsx`
- `__tests__/dashboard-admin-reports.test.tsx`
- `__tests__/analytics-adapters.test.ts`

Run `npm run test -- dashboard-admin-analytics.test.tsx` or full `npm run test` before deploying flag changes.
