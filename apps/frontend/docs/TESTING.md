# Frontend Testing Guide

## Tooling
- **Jest** + **React Testing Library** for unit/component tests.
- **MSW** (Mock Service Worker) stubs API responses in tests hitting network.
- **Playwright** (planned) for E2E coverage once backend smoke suites stabilise.

## Scripts
- `npm run test` — executes Jest suites in watch mode when `CI` is unset.
- `npm run test:ci` — single-run mode used in pipelines.
- `npm run lint` — accessibility + best-practice linting.

## Conventions
- Tests live under `__tests__/` mirroring feature directories.
- Use `vi.mock('ky')` or provided mocks to intercept API calls.
- Prefer testing observable UI output over implementation details.
- For feature-flagged features, add separate tests covering enabled vs disabled states (e.g., CSR programme list/detail/create/update/status hooks have dedicated flag on/off suites; list/detail pages now have full UX contract tests covering flag on/off, loading, error, and mock fallback states. Hook tests now assert cache invalidation via shared query keys so API and mock modes stay aligned without UI changes).

## Coverage Expectations
- Critical flows (auth, dashboard pages, hooks) must have direct test coverage.
- When adding new hooks, include dedicated unit tests verifying fetch states (loading, success, error).
- Dashboard integrations should include RTL tests verifying data rendering and fallback behaviour.

## CI Integration
- Ensure `NEXT_PUBLIC_API_URL` and relevant flags are configured for test environment (set via `.env.test` or jest setup).
- Keep tests deterministic: mock timers, random IDs, and current time when necessary.

## Recent Additions & Gaps
- CSR programme list & detail pages now have contract-level tests ensuring mock and API modes render identically across happy-path, loading, and error states without altering runtime behaviour. Hook suites cover create/update/status/assignment flag paths, including runtime fallback behaviour for API failures. Backend audit logging verification confirmed the payloads powering these flows produce traceable metadata without frontend changes. End-to-end smoke coverage remains a TODO before enabling the API flag by default.
- Page-level RTL coverage for the edit flow is still pending; add once runtime fallbacks and smoke tests are reinstated so the API path is exercised safely.
- Financial upload form integration continues to rely on backend DTO validation; no frontend changes required, but tests should mock 422 responses to reflect stricter period/year/url enforcement.
