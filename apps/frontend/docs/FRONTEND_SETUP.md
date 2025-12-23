# Frontend Setup Guide

This document tracks the architecture, tooling, and conventions used in the
ImpactBridge frontend application.

## Tech Stack

- Next.js 14 (App Router, client + server components disabled for now)
- TypeScript with strict mode
- Tailwind CSS + shadcn/ui component primitives
- Sonner toast notifications
- React Query (`@tanstack/react-query`) for eventual data fetching
- Next Themes for dark/light handling
- Custom Auth + Locale providers (mock session at the moment)
- jest-axe driven accessibility smoke tests (report-only)

## Key Providers

Application providers live under `@/providers/`.

- `theme-provider.tsx` – wraps `next-themes`
- `auth-context.tsx` – mock session persistence using localStorage/cookies
- `locale-context.tsx` / `intl-provider.tsx` – locale + i18n scaffolding
- `offline-status-provider.tsx` – tracks navigator online/offline state
- `query-provider.tsx` – React Query provider (now default in root layout)
- `tooltip.tsx` – shadcn tooltip root

The root layout (`app/layout.tsx`) composes these together. Always keep `QueryProvider`
outside any providers that may rely on data fetching (AuthProvider, dashboards).

## React Query Configuration

React Query is configured via a reusable factory at `lib/query-client.ts`.

```ts
export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: 1,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: 0,
      },
    },
  })
```

`providers/query-provider.tsx` memoises the client per app instance to avoid
recreating caches during hydration.

A placeholder hook `lib/hooks/use-example-query.ts` demonstrates the pattern
while still returning mock data:

```ts
export function useExampleQuery() {
  return useQuery({
    queryKey: ['example'],
    queryFn: async () => ({ message: 'React Query ready' }),
  })
}
```

No components consume the hook yet; it is staged for future API wiring.

## Testing

- Jest + Testing Library for unit/integration tests
- Example query hook has a dedicated test under
  `lib/hooks/__tests__/use-example-query.test.tsx`
- Dashboard RTL coverage (mock data only):
  - `__tests__/dashboard-ngo-finance.test.tsx` – ensures summary cards render, filters adjust rows, and empty state messaging appears.
  - `__tests__/dashboard-company-programmes.test.tsx` – exercises programme search/status filters, skeletons, and detail routing fallback.
  - `__tests__/dashboard-company-compliance.test.tsx` – verifies status filters, search narrowing, and empty-state reset CTA.

Run tests with:

```
npm run test -- --runInBand
```

Accessibility tests live under `__tests__/a11y/` and rely on the helper in `test/a11y-utils.ts`.
They log violations to the console but never fail the suite so we can track regressions while
the UI still uses mock data.

## Build & Init Scripts

```
npm run init   # no-op placeholder
npm run build  # Next production build (App Router)
```

Known warnings: Next will emit `[MODULE_TYPELESS_PACKAGE_JSON]` until we set
`"type": "module"` in `package.json`. This is tracked separately.

Recent regression checks:
- `npm run test -- --runInBand`
- `npm run build`

## Error Handling

- `components/overlays/error-boundary.tsx` wraps dashboard content to surface fallback messaging.
- `components/overlays/fallback-panel.tsx` provides a neutral retry/back UI for fetch failures or 5xx states.
- Unit test coverage in `lib/hooks/__tests__/error-boundary.test.tsx` verifies fallback rendering.
