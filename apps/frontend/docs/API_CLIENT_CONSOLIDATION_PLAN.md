# API Client Consolidation Plan

## Current State

- **AuthProvider** uses a lightweight `ky` instance inline (`ky.create`) to call auth endpoints (mocked today).
- **lib/api-client.ts** exports a shared `ky`-based client (`apiClient`) with token injection via `setApiClientToken` and typed wrapper tests.
- Other modules still rely on mock data; no module uses the shared client in production code.

## Objective

Unify all network calls behind the shared client in `lib/api-client.ts`, keeping the API surface small (e.g., `apiClient`, helper wrapper methods) so that future switches (fetch/axios/native) require changes in one place only.

## Consolidation Steps

1. **Auth Module (Login/Register)**
   - Refactor `AuthProvider` to import `apiClient` instead of creating its own `ky` instance.
   - Surface helper functions (e.g., `authApi.login`, `authApi.register`) that call the shared client; keep mock implementations until backend ready.
   - Redirect/notification behaviour remains identical; only the HTTP layer changes.

2. **Session Persistence**
   - Ensure `setApiClientToken` continues to run from `AuthProvider.login` so all subsequent calls reuse the bearer token.
   - Remove direct header manipulation in components; rely on the shared client.

3. **Module-by-Module Migration (after auth)**
   - **Dashboard modules** (company, NGO, admin): replace mock fetches with React Query hooks that consume the shared client once backend endpoints exist.
   - **Notifications**: centralise enqueue/fetch logic, using `apiClient` with dedicated helpers.
   - **Docs & Storybook**: align stories and mock handlers so they consume the same helper API to keep parity.

4. **Cleanup**
   - Remove any remaining inline `ky.create` usages.
   - Provide a single entrypoint (`lib/api/index.ts`) exporting typed helpers for each domain.

## Rollout Notes

- Keep mocks in place until backend endpoints are live; helpers can return mocked promises temporarily.
- Ensure comprehensive tests (unit + RTL) reference the helper layer to catch regressions when switching implementations.
