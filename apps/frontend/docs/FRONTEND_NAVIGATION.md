# Frontend Navigation Architecture

This document captures the navigation model and the path toward adopting server-driven navigation in the ImpactBridge frontend.

## Current State

- `lib/nav-menu.ts` exports a static `NavItem[]` array that powers sidebar and mobile navigation.
- Each item includes a `label`, `href`, optional `icon`, and the list of roles that can see it.
- Modules requiring nested structure use the `children` array, grouped by optional `group` headings.

## Server-Driven Contract

To prepare for backend control over navigation, the contract is defined in `docs/NAVIGATION_SERVER_CONTRACT.md` and the types live alongside the mapper in `lib/nav-menu-contract.ts`.

Key ideas:

1. The backend owns the canonical list of modules per role.
2. The frontend receives a payload grouped by role, where each module entry can contain nested children.
3. Icons are provided as tokens that map to Lucide icons. Unknown tokens are ignored gracefully.
4. The mapper merges shared modules across roles and preserves ordering based on the provided `order` field.

### Mapper Utility

`mapServerNavigation(response)` accepts the server payload and returns a `NavItem[]` matching the existing consumer shape. Behaviour highlights:

- Deduplicates modules by key and unions their `roles` arrays.
- Sorts siblings using `order` (falling back to `Number.MAX_SAFE_INTEGER`).
- Recursively handles children while retaining grouping information.
- Ignores modules with duplicate keys but different labels; the first label wins (server should supply consistent values).

### Testing

`lib/__tests__/nav-menu-contract.test.ts` covers the contract by asserting:

- Shared modules merge correctly across roles and keep child ordering.
- Missing `order` values fall back to default positioning.
- Unknown icon tokens do not throw.
- Role arrays remain deduplicated.

## Migration Plan

1. Keep using the static `navMenu` until backend endpoints are available.
2. Once the API is exposed, fetch navigation data after authentication, cache per role, and feed into the existing layout.
3. Remove the static array once server data is stable, keeping the mapper and tests as regression coverage.

This staged approach lets us soft-launch the contract without UI churn and gives the backend time to iterate on the payload safely.
