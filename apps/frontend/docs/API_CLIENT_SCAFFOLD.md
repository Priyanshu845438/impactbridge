# API Client Scaffold

## Purpose
- Provide a typed fetch wrapper for upcoming API integration.
- Normalise error shapes while keeping the implementation tree-shakable.
- Remains unused by UI components until backend endpoints are wired.

## File Overview
- `lib/api/client.ts`
  - Defines `apiRequest` function with JSON parsing, graceful handling of `204` responses, optional extra headers, and `normalizeError` helper.
  - Returns `{ status, ok, data }` to mirror future HTTP client patterns.
  - Throws structured `ApiError` when responses are not `ok`.

## Testing
- `__tests__/api-client.test.ts` covers:
  - Successful JSON responses.
  - `204 No Content` behaviour returning `null` data.
  - Normalised error payloads for non-OK responses.
  - `normalizeError` helper fallbacks.

Run locally:
```bash
npm run test -- --runInBand
```

## Notes
- The client intentionally avoids global token state; headers can be passed per request.
- Future integration can expose convenience helpers (e.g., `withAuth`) without breaking the current contract.
- Keep the file free of side effects to allow bundlers to drop it until actively imported.
