# Observability & Logging Plan

This document outlines a pragmatic approach for adding production-grade visibility to the ImpactBridge backend without modifying runtime code yet. It covers structured logging, request tracing, and error correlation so future implementation can proceed quickly and safely.

---

## 1. Objectives
- Provide actionable logs for debugging, auditability, and compliance.
- Correlate API requests with background jobs and external integrations.
- Maintain lightweight defaults for local development while scaling to production needs.

---

## 2. Components to Evaluate

### 2.1 Structured Logging
- **Options:** `pino` (NestJS integration via `pino-http`), `winston`, or Nest’s built-in logger with JSON transport.
- **Recommendation:** adopt `pino` for high throughput and JSON structure; fallback to Nest logger in dev.

### 2.2 Request Tracing
- **Options:** OpenTelemetry (OTel) instrumented via Nest middleware, simple request ID middleware (UUID) stored on `AsyncLocalStorage`.
- **Recommendation:** start with request ID middleware + AsyncLocalStorage to propagate `requestId` across services/guards; upgrade to full OTel tracing later for distributed spans.

### 2.3 Error Correlation
- **Options:** Sentry, Datadog APM, or self-hosted ELK stack.
- **Recommendation:** Webhook-friendly service like Sentry for capturing stack traces, breadcrumbs, and request context. Alternative: roll logs into OpenSearch/ELK if Sentry is unavailable.

---

## 3. Logging Baseline by Environment
| Environment | Logger | Output |
|-------------|--------|--------|
| Local Dev | Nest default logger (colourised) | Console (pretty) |
| Integration / QA | `pino` JSON logs to console, aggregated by platform | Console → log aggregator |
| Production | `pino` JSON with request ID + actor metadata. Errors mirrored to Sentry/monitoring tool. | Console → centralized log store (e.g., CloudWatch, Datadog, ELK) |

Additional settings:
- Toggle verbosity via `LOG_LEVEL` env (`debug`, `info`, `warn`, `error`).
- Enable request profiling (`LOG_REQUEST_BODY=1`) only in non-prod.

---

## 4. Log Field Conventions
Every structured log entry should include:
- `timestamp`
- `level`
- `requestId` (UUID from middleware or job context)
- `actorId` (user ID) when available
- `role` (user role) when available
- `module` (feature area: `auth`, `users`, `campaigns`, etc.)
- `operation` (method name or endpoint)
- `message`
- Context-specific fields (e.g., `campaignId`, `ngoProfileId`, `jobId`)

Errors additionally include:
- `error.name`
- `error.message`
- `error.stack` (redacted in prod logs if needed)

---

## 5. Logging Placement Guidelines
- **Guards & Middleware:** log authentication failures, role denials, and request summaries (method, path, requestId).
- **Controllers:** minimal logging; rely on middleware/guards for request entry/exit.
- **Services:** log domain events (user created, campaign approved) and warnings (inconsistent state, missing records) with relevant identifiers.
- **Repositories / Prisma layer:** avoid noise; rely on service-level logging unless debugging complex queries.
- **Background Jobs:** log job start, completion, retries, failures, including `jobId` and retry count.
- **External Integrations:** log requests/responses at `info` level with sanitized payloads; escalate failures to `error` with correlation IDs.

---

## 6. Tracing Strategy
1. Introduce an HTTP middleware to generate a `requestId` and store it via `AsyncLocalStorage`.
2. Expose a helper (e.g., `LoggerContext.current()`) for services to retrieve the current `requestId` and `actorId`.
3. For background jobs, seed the storage with `jobId` and propagate parent `requestId` when enqueuing.
4. Evaluate OpenTelemetry instrumentation once asynchronous context wiring is stable.

---

## 7. Error Correlation
- Configure Sentry (or equivalent) with DSN stored in `SENTRY_DSN` env variable.
- Attach `requestId`, `actorId`, and `role` to Sentry scope for every error report.
- For Prisma/database errors, include sanitized query metadata to aid debugging without leaking PII.

---

## 8. Observability Roadmap
1. Implement request ID middleware + AsyncLocalStorage context helper.
2. Swap Nest logger for `pino` with structured JSON output (dev retains colourised logs via `pino-pretty`).
3. Add Sentry integration for error capture.
4. Extend to background job workers (share context, log job lifecycle).
5. Evaluate full OpenTelemetry traces if cross-service dependencies emerge.

All changes should be logged in `agents.md` with references to this plan before implementation.
