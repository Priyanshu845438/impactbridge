# Server-Driven Navigation Contract

This guide describes how the backend will eventually drive the ImpactBridge dashboard navigation. The current UI still relies on static `navMenu` data, but the contract below prepares both sides for a seamless migration.

## Response Shape

```jsonc
{
  "version": "2025.03",
  "generatedAt": "2025-03-04T10:15:00Z",
  "roles": [
    {
      "role": "COMPANY",
      "modules": [
        {
          "key": "company-dashboard",
          "label": "Company dashboard",
          "route": "/dashboard/company",
          "icon": "layout-dashboard",
          "group": "Workspace",
          "order": 10,
          "children": []
        }
      ]
    }
  ]
}
```

### Field Reference

| Field | Type | Notes |
| --- | --- | --- |
| `version` | string | Semantic identifier so the frontend can cache/bust client-side nav data. |
| `generatedAt` | ISO date string | Timestamp for observability. |
| `roles[].role` | enum | One of `SUPER_ADMIN`, `NGO`, `COMPANY`, `DONOR`. |
| `roles[].modules[]` | object | Module tree for the role. |
| `modules[].key` | string | Stable identifier for de-duplication across roles. Required. |
| `modules[].label` | string | Text label rendered in the sidebar. |
| `modules[].route` | string \| null | Optional href. Null indicates a purely structural node. |
| `modules[].icon` | string \| null | Optional icon token. Accepted values map to lucide icons (see below). |
| `modules[].group` | string \| null | Optional grouping label surfaced in the UI. |
| `modules[].order` | number | Controls sorting; lower numbers appear first. Use integers to allow future inserts. |
| `modules[].children` | array | Nested module entries following the same structure. |

### Supported Icon Tokens

The backend should pass the icon identifier from the table below. Unknown icons are ignored on the frontend.

| Token | Lucide icon |
| --- | --- |
| `layout-dashboard` | `LayoutDashboard` |
| `hand-coins` | `HandCoins` |
| `clipboard-list` | `ClipboardList` |
| `sparkles` | `Sparkles` |
| `globe` | `Globe2` |
| `shield-check` | `ShieldCheck` |
| `trending-up` | `TrendingUp` |
| `file-bar-chart` | `FileBarChart` |
| `book-open` | `BookOpen` |
| `users` | `Users` |
| `users-two` | `Users2` |
| `folder-kanban` | `FolderKanban` |
| `life-buoy` | `LifeBuoy` |
| `message-circle` | `MessageCircle` |
| `sliders` | `SlidersHorizontal` |
| `bar-chart` | `BarChart3` |
| `settings` | `Settings2` |

The list can expand over time; unsupported tokens are ignored gracefully.

## Mapper Utility

The frontend exposes `mapServerNavigation()` (see `lib/nav-menu-contract.ts`) to convert the payload above into the existing `NavItem[]` structure (`lib/nav-menu.ts`).

Key behaviors:

1. **Role merging** – Modules with the same `key` are merged so shared routes appear once with a combined `roles` array.
2. **Ordering** – `order` determines sibling order at every depth. Missing orders default to `Number.MAX_SAFE_INTEGER` so explicitly ordered entries always win.
3. **Icon translation** – Recognised `icon` tokens map to lucide components; unknown tokens are ignored without throwing.
4. **Children** – Nested modules are recursively merged and sorted, preserving the original tree shape.
5. **Exclusions** – Modules with `route === null` are still emitted to support expandable headings without links.

## Client Integration Plan

1. **Phase 1 (current)** – UI continues to use static `navMenu`. Server contract + mapper + tests live alongside it.
2. **Phase 2** – Introduce data-fetch in the Auth lifecycle to request the server nav payload once the session is established. Cache per role and reuse during navigation renders.
3. **Phase 3** – Remove `navMenu` in favour of the server data. Keep mapper unit tests as regression coverage.

The backend team can start emitting the payload using this document immediately; once APIs are available, the frontend wiring will flip over with minimal churn.
