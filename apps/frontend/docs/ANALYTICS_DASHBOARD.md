# Admin Analytics Dashboard

## Data Sources
- API Hook: `useAdminAnalytics` (React Query) calling `/api/v1/admin/analytics/overview` when `API_DASHBOARD` flag is enabled.
- Mock Fallback: static dataset under `lib/analytics/mock-data.ts` rendered when the flag is disabled or a request fails.
- Adapter: `lib/analytics/adapters.ts` maps API payloads to UI-friendly structures, including donation timeline, programme/approval status, financial overview, and audit feed.

## UI Sections
1. **Hero KPIs** — Total donations, recent donation windows (today, 7d, 30d), active programmes, approvals, reports filed.
2. **Metric Signals** — Donation totals, programme/approval status, and financial widgets sourced from analytics summary.
3. **Activity Feed** — Recent audit events rendered from analytics `recentActivity` payload (title/description formatted client-side).
4. **Charts** — Donation timeline and programme distribution derived from analytics timeline/status counts.
5. **Reports Dashboard** — Summary tiles, donation trend chart, category breakdown, and contribution split all rely on the same analytics hook.

## Loading & Error States
- `useAdminAnalytics` exposes `isLoading` and `isError`. Dashboard/reports pages render existing skeleton components and fallback copy while preserving prior UX.
- Empty payloads gracefully display placeholders (e.g., default charts/tiles) to keep layout stable when analytics returns zero results.

## Testing
- Unit tests (`lib/hooks/__tests__/use-admin-analytics.test.tsx`) mock ky responses and feature flags to assert adapter wiring.
- Component tests (`__tests__/dashboard-admin-analytics.test.tsx`, `__tests__/dashboard-admin-reports.test.tsx`) validate flag off/on transitions and fallback behaviour for both dashboard and reports pages.
- Formatters and adapters include dedicated tests to ensure ISO timestamps and currency values render correctly.

## Integration Checklist
- Ensure `NEXT_PUBLIC_FLAG_API_DASHBOARD=true` in environments where backend analytics is available.
- Provide valid SUPER_ADMIN JWT token via `AuthProvider` to avoid 401 on the admin analytics overview endpoint.
- Backend must expose `/api/v1/admin/analytics/overview` with donation/programme/approval/financial/activity data aligned to `AdminAnalyticsPayload`.
- Frontend automatically falls back to mock data if the flag is disabled or API returns an error.
