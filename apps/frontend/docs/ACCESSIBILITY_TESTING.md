# Accessibility Testing Baseline

ImpactBridge now includes automated accessibility checks using
[`jest-axe`](https://github.com/nickcolley/jest-axe). The goal is to provide
fast feedback about potential violations while keeping CI green so that
feature work can continue without interruption.

## Current Scope

- Report-only a11y tests covering:
  - Login page (`app/login/page.tsx`)
  - Dashboard layout shell (`app/dashboard/layout.tsx` – mocked auth/nav)
  - Company compliance table (`app/dashboard/company/compliance/page.tsx`)
- Tests live under `__tests__/a11y/` and rely on a shared helper
  `test/a11y-utils.ts`.
- Violations are logged via `console.warn` but **never cause test failures**.

## Helper Usage

```ts
import { logViolations, runAxe } from "@/test/a11y-utils";

it("reports current violations", async () => {
  const results = await runAxe(<MyComponent />);
  logViolations(results);
  expect(results.violations.length).toBeGreaterThanOrEqual(0);
});
```

## Implementation Notes

- Tests mock API/auth/navigation/locale modules to avoid ky (ESM) transforms and
  provider dependencies.
- Canvas-based warnings appear in jsdom; they are safe to ignore.
- When wiring new pages, replicate the pattern above and keep assertions in
  “report-only” mode until we fix the underlying UI issues.

## Future Hardening (TBD)

1. Capture known violations (e.g., heading order) and track them in docs.
2. Introduce role-specific dashboards once CSR data is real.
3. Evaluate storybook-based axe runs to cover reusable components.
