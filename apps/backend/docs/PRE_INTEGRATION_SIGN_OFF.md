# Final Pre-Integration Checklist & Sign-Off

_Date: 2025-02-14_

## 1. Frontend Readiness
- ✅ Jest suites pass (`npm run test -- --runInBand`)
- ✅ Next.js production build succeeds (`npm run build`)
- ✅ Storybook stories up to date for key primitives (TagSelector, StatusBadge, Summary cards)
- ✅ Documentation refreshed (Setup, Dashboard, API Client Scaffold, Progress Report)
- ✅ Navigation configured with TODO notes for future backend routes (no broken links)

## 2. Backend Readiness
- ✅ Nest build succeeds (`npm run build`)
- ✅ Core services implemented: Auth, Users, NGO/Company/Donor listings, CSR Programmes (service layer), NGO financial reporting, notification scaffold
- ✅ Shared helpers in place: sanitisation, pagination (planned), soft-delete (planned), JWT utilities
- ✅ Tests: unit coverage for sanitisation, notifications, API client (frontend) – backend jest skeleton ready
- ✅ Docs: API Integration Strategy, Controller Exposure Plan, Migration Playbook, Observability Plan, Background Jobs Plan, Auth Token Contract

## 3. Environment & Contract Alignment
- ✅ Env placeholders defined: `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_API_AUTH_HEADER`, `NEXT_PUBLIC_AUTH_EXPIRY_BUFFER_SECONDS`
- ✅ Backend JWT secret + rotation guidance documented
- ✅ Auth contract finalised (Bearer token, 24h expiry, 60s buffer, stored client-side for now)

## 4. Known Risks / Rollback Points
- ⚠️ Prisma migrations require manual confirmation before applying to staging/production (refer to Migration Playbook)
- ⚠️ CSR Programme and approval workflow services lack controller exposure; ensure feature flags before enabling
- ⚠️ Notifications provider is a no-op; avoid wiring to UI until channel providers are ready
- ⚠️ Pagination/soft-delete helpers planned but not wired yet; list endpoints currently return full datasets

## 5. Integration Start Point
- First API to wire: `POST /auth/login` + `POST /auth/register`
  - Enables frontend auth flows to hit backend with minimal risk
  - Uses existing DTOs, sanitisation, and JWT utilities
  - Serves as smoke test for guards and response envelope conventions

## 6. Sign-Off
- ✅ All prerequisites met for beginning API integration on auth endpoints
- ✅ Builds verified (frontend + backend)
- Next action: scaffold controller wiring following `CONTROLLER_EXPOSURE_PLAN.md` starting with Auth and Users modules
