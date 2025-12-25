# Admin Analytics API Guide

This document covers the read-only analytics endpoints exposed to the admin dashboard via `/api/v1/admin/analytics`. These routes surface aggregated donation, programme, and approval data calculated by the `AnalyticsAggregationService`. All endpoints are restricted to `SUPER_ADMIN` users via the global JWT/roles guards.

## Endpoints

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/api/v1/admin/analytics/overview` | Returns donation totals, CSR programme counts, and approval status breakdowns. |

### Authentication & RBAC

- Requires `Authorization: Bearer <JWT>` header.
- JWT must encode `role: SUPER_ADMIN`.
- Non-admin roles receive `403 Forbidden`.
- Missing/invalid tokens result in `401 Unauthorized`.

### Response Shape

```json
{
  "donations": {
    "totalCount": 3,
    "totalAmount": 3000,
    "today": { "count": 1, "amount": 1000 },
    "last7Days": { "count": 2, "amount": 2000 },
    "last30Days": { "count": 3, "amount": 3000 }
  },
  "programmes": {
    "totalProgrammes": 2,
    "byStatus": {
      "ACTIVE": 1,
      "COMPLETED": 1,
      "DRAFT": 0,
      "ARCHIVED": 0
    }
  },
  "approvals": {
    "totalApprovals": 2,
    "byStatus": {
      "APPROVED": 1,
      "PENDING": 1
    }
  }
}
```

### Notes

- Donation windows rely on server time (UTC) for day/week/month calculations.
- Aggregations respect soft-delete flags and campaign relationships (e.g., NGO filter). Future filters (date ranges, company scoping) will extend the query DTOs.

## Testing

- Unit tests: `test/unit/analytics/analytics-aggregation.service.spec.ts` mocks Prisma aggregate/groupBy behaviour.
- Integration tests: `test/v1/analytics.e2e-spec.ts` verifies admin access succeeds and non-admin requests are blocked.
- Commands: `npm run test -- --runInBand test/v1/analytics.e2e-spec.ts` (or full suite) and `npm run build`.

