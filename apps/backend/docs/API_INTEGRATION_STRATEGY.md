# API Integration Strategy & Rollout Plan

## 1. Integration Order
1. **Auth & Session bootstrap**
   - Verify `/auth/login` contract, token storage, refresh policy.
   - Enable read-only guard checks before mutating flows.
2. **Self-service profiles & compliance modules**
   - `/users/me`, address, bank, documents endpoints.
   - Replace local mocks while keeping optimistic UI fallbacks.
3. **Admin registries & aggregated listings**
   - NGO/company/donor paginated lists.
   - Aggregated NGO-with-campaigns and company-with-donations views.
4. **CSR budget & donation surfaces**
   - CSR status, donations history, utilization summaries.
5. **Workflows & approvals**
   - Company ↔ NGO approvals, financial reporting exposure, notifications once APIs are stable.

## 2. Rollout Controls
- **Feature flags**
  - Frontend env `NEXT_PUBLIC_ENABLE_REAL_API=<module>` toggles per surface (e.g., `auth`, `profiles`, `registries`).
  - Backend env `ENABLE_ENDPOINT_<MODULE>=true` guards experimental controllers.
- **Environment routing**
  - Default to mock data when flag disabled or request fails hard.
  - Stage rollout in dev → staging → production with flag matrix tracked in release notes.

## 3. Mock Fallback Pattern
- All async hooks/components must:
  1. Check feature flag.
  2. Attempt real API call.
  3. On failure (network or 5xx) fallback to existing mock dataset but log warning via structured logger once observability lands.
- Provide contextual toasts or banners when showing degraded data.

## 4. Error Handling & Retry Rules
- **401/403**: trigger logout or access denied toast, no automatic retry.
- **408/5xx**: single retry with exponential backoff (250ms) for idempotent GETs; no retry for POST unless backend explicitly idempotent.
- **Validation 400s**: surface first error message inline.
- **Network errors**: display offline indicator (existing offline provider) and revert to mock view.

## 5. Loading / Empty / Degraded States
- Loading: reuse existing skeletons/spinners; ensure they display while waiting for API.
- Empty: distinguish between “no data” (show cheerful empty state) vs “API unavailable” (show warning + mock fallback).
- Degraded: yellow banner indicating partial data (e.g., “Live data unavailable, showing last mock snapshot”).

## 6. Gate Criteria Before Advancing
- Module test plan executed (RTL + Postman)
- Feature flag documented with default state
- Observability hooks (requestId, logger) available for module
- Agents log entry created for each rollout stage
- Rollback path documented (toggle flag, redeploy)

Maintain this document as modules graduate to real APIs.
