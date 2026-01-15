# Frontend Operations Notes

## Feature Flags
- `API_DASHBOARD`: pulls admin analytics from backend. When disabled or if the API errors, dashboard and reports pages render seeded mock data with identical layout.
- `API_APPROVALS` (planned): target flag for wiring approvals UI to backend. Until implemented, approvals hooks default to mock data even if the flag is accidentally enabled.

## Admin Analytics Wiring
- Data source: `useAdminAnalytics` hook (React Query) → `fetchAdminAnalytics` API → backend `/api/v1/admin/analytics/overview`.
- Adapter maps payload into UI-friendly metrics (donation stats, programme/approval counts, financial overview, activity feed).
- Pages consuming analytics:
  - `/dashboard/admin` (executive overview, KPI cards, charts, activity feed)
  - `/dashboard/admin/reports` (summary tiles, trend charts, category breakdown, contribution split)
- Components maintain existing layout/styles; fallbacks apply when analytics disabled, payload empty, or user lacks data.

## Approvals Integration Roadmap
- Current state: approvals cards on admin/company dashboards display analytics-derived counts only; there is **no dedicated approvals list or actionable UI**.
- Backend readiness: approval endpoints (`/api/v1/approvals/...`) support request/approve/reject/revoke flows and return pending approval summaries.
- Planned frontend work (flagged by `API_APPROVALS`):
  1. Create approvals list screen(s) for company and NGO roles that consume `usePendingApprovals` hook.
  2. Wire existing mutation hooks (`useApproveCampaign`, `useRejectCampaign`, `useRevokeApproval`) to UI actions with optimistic updates and rollback handling.
  3. Surface audit trail/history modal leveraging backend activity log data once exposed.
- Fallback behaviour:
  - While `API_APPROVALS` remains disabled (default), approvals components must continue to render static copy to avoid regressions.
  - If the flag is enabled without UI updates, hooks still execute but should be confined to non-rendering surfaces to prevent runtime errors.
- Testing strategy:
  - Add RTL tests covering list rendering (flag off → mock, flag on → live data).
  - Mutation tests verifying optimistic updates, error rollback, and validation messages.
  - Contract tests ensuring audit trail payloads render correctly once available.

## Testing
- `__tests__/dashboard-admin-analytics.test.tsx`
- `__tests__/dashboard-admin-reports.test.tsx`
- `__tests__/analytics-adapters.test.ts`

Run `npm run test -- dashboard-admin-analytics.test.tsx` `npm run test -- dashboard-admin-reports.test.tsx`, or full `npm run test` before deploying flag changes. Full build verified via `npm run build`.
