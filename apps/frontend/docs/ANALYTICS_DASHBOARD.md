# Admin Analytics Dashboard

## Data Sources
- API Hook: `useAdminAnalytics` (React Query) hitting `/api/v1/analytics/...` endpoints when `API_DASHBOARD` flag is enabled.
- Mock Fallback: static dataset under `lib/analytics/mock-data.ts` rendered when flag is disabled or API request fails.
- Adapter: `lib/analytics/adapters.ts` maps API payloads to UI-friendly structures.

## UI Sections
1. **Hero KPIs** — Total donations, active programmes, approval summary.
2. **Activity Feed** — Recent approval/donation events (populated via API list or mock array).
3. **Charts** — Donation breakdown and programme statuses (backed by adapter aggregated data).

## Loading & Error States
- `useAdminAnalytics` exposes `isLoading` → render skeleton components defined alongside dashboard widgets.
- `isError` → show inline alert with retry button (re-invokes query).
- Empty payloads gracefully display placeholders (`No data yet`).

## Testing
- Unit tests (`lib/hooks/__tests__/use-admin-analytics.test.tsx`) mock ky responses and feature flags.
- Component tests (`__tests__/dashboard-admin-analytics.test.tsx`) assert flag off/on transitions and fallback behaviour.

## Integration Checklist
- Ensure `NEXT_PUBLIC_FLAG_API_DASHBOARD=true` in environments where backend analytics is available.
- Provide valid JWT token via `AuthProvider` to avoid 401.
- Backend must expose `/api/v1/analytics/donations` and `/api/v1/analytics/programmes` endpoints returning payloads expected by adapters.
