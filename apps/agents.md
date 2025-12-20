# ImpactBridge Apps Progress Log

## 1. Pre-Integration Readiness & Auth Contract (2025-02-14)

- Authored "API Integration Readiness" checklist outlining frontend/backend modules ready for wiring, high-risk areas (approvals, financial reporting exposure, notification providers), and recommended integration order.
- Documented auth token contract (JWT bearer, Authorization header, 1-day expiry with 60s renewal buffer) and environment placeholders (`NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_API_AUTH_HEADER`, `NEXT_PUBLIC_AUTH_EXPIRY_BUFFER_SECONDS`).
- Added backend `.env` guidance (JWT secret, rotation cadence) and confirmed no runtime code changes were introduced.
- Verified `npm run init` / `npm run build` for both backend and frontend to maintain green builds.

## 2. API readiness & auth contract documentation (2025-02-14)

- Drafted backend `API_INTEGRATION_READINESS.md` and `AUTH_TOKEN_CONTRACT.md`, plus frontend counterpart readiness note.
- Added frontend env placeholders (`NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_API_AUTH_HEADER`, `NEXT_PUBLIC_AUTH_EXPIRY_BUFFER_SECONDS`) for future wiring.
- Captured JWT contract (Bearer header, 24h expiry, 60s buffer) and backend JWT secret expectations.
- Executed `npm run init && npm run build` for backend and frontend to ensure clean state.

## 3. Frontend API Client Scaffold (2025-02-14)
- Added lightweight fetch wrapper (`frontend/lib/api/client.ts`) returning typed responses and normalized errors while remaining unused by UI.
- Wrote Jest coverage (`frontend/__tests__/api-client.test.ts`) for success, no-content, and error flows.
- Updated frontend docs (`docs/API_CLIENT_SCAFFOLD.md`, `docs/FRONTEND_SETUP.md`, progress log) and reran `npm run test -- --runInBand`, `npm run build` (Next warning only).

## 4. Backend Controller Plan & Integration Sign-Off (2025-02-14)
- Documented `backend/docs/CONTROLLER_EXPOSURE_PLAN.md` detailing service↔controller mapping, `/api/v1` routing, RBAC guard stack, and read-only rollout sequencing.
- Added `backend/docs/PRE_INTEGRATION_SIGN_OFF.md` final checklist summarizing frontend/back-end readiness, env/auth alignment, risks, and first API target (`POST /auth/login`, `POST /auth/register`).
- Builds remain green (previous `npm run init` / `npm run build` confirmations stand); no runtime code changes introduced.

## 5. Backend v1 auth & user APIs exposed (2025-02-15)
- Wired versioned controllers under `backend/src/v1` exposing `/api/v1/auth` (login/register) and `/api/v1/users/me` (GET/PATCH) atop existing services.
- Added integration specs to validate JWT-protected access and Prisma mock behaviour, including activity log stubbing.
- Ensured `npm run init`, `npm test`, `npm run test:e2e`, and `npm run build` all pass post-change.

## 6. CSR programme API attempt blocked (2025-02-15)
- Investigated adding `/api/v1/programmes` endpoints but found no CSR Programme service, DTOs, or Prisma models in the backend codebase.
- Recorded the gap instead of shipping placeholder controllers to avoid breaking future integrations.
- Awaiting foundational service layer before exposing routes; no code changes committed for this task.
