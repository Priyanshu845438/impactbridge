# Performance Baseline & Budgets

_Last updated: 2025-12-18 09:10 UTC_

## Overview

To avoid silent regressions during upcoming API integrations, we capture build-time metrics for core dashboards using Next.js capture hooks. Budgets emit warnings (no build failure) when they are exceeded.

## Budgets

| Route | firstLoadJS | renderDuration | LCP (approx) | Notes |
| --- | --- | --- | --- | --- |
| `/dashboard` | ≤ 110 kB | — | — | Keep landing bundle light. |
| `/dashboard/company` | ≤ 120 kB | ≤ 3200 ms | ≤ 2500 ms | Expected user home post-login. |
| `/dashboard/admin` | ≤ 200 kB | ≤ 3500 ms | — | Admin has extra modules; higher ceiling. |

## Baseline Snapshot (mock data)

Measured via `npm run build` on 2025-12-18.

| Route | firstLoadJS | renderDuration | LCP | Status |
| --- | --- | --- | --- | --- |
| `/dashboard` | 87.6 kB | 1280 ms | 1180 ms | ✅ within budgets |
| `/dashboard/company` | 104 kB | 2440 ms | 2100 ms | ✅ within budgets |
| `/dashboard/admin` | 246 kB | 3120 ms | 2600 ms | ⚠️ firstLoad exceeds soft budget (expected until lazy-loading modules) |

Warnings appear in build logs but do not halt the pipeline.

## Next Steps

1. After real API data lands, tighten budgets and explore code-splitting for admin tiles.
2. Feed build metrics into CI dashboards (e.g., Slack, DataDog) once backend telemetry is ready.
3. Extend coverage to donor/ngo dashboards when those flows stabilize.
