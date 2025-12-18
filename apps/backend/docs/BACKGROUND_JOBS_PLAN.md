# Background Job Infrastructure Strategy

This document proposes a repeatable strategy for handling asynchronous workloads in the ImpactBridge backend without impacting the current synchronous API flow. No code is introduced yet—this is planning only.

---

## 1. Problem Space
Upcoming features require reliable processing outside the HTTP request/response cycle:
- **Notifications dispatch** – email/SMS intents produced by `NotificationsService` must be sent without blocking API calls.
- **Report generation** – CSR-2 exports, NGO financial summaries, and analytics snapshots may take longer than request timeouts.
- **Scheduled compliance tasks** – periodic reminders (e.g., quarterly report submissions), audit log exports, data cleanup.

These workloads must be resilient, observable, and safe to retry.

---

## 2. In-Request vs Background
| Task Type | Request Cycle | Background Job |
|-----------|---------------|----------------|
| Write to DB, lightweight calculations | ✅ (continue as-is) |
| Triggering notification intent | ✅ (enqueue only) | ✅ (delivery) |
| Generating large reports | ❌ | ✅ |
| Scheduled reminders/compliance checks | ❌ | ✅ |
| Long-running external API calls | ❌ | ✅ |

**Rule of thumb:** anything that may exceed 2–3 seconds, requires retries, or integrates with third-party services should run in the background. Controllers/services should enqueue work and return immediately, surfacing job IDs if needed.

---

## 3. Option A – BullMQ (Redis-backed Queue)
**Overview:** Use BullMQ with Redis as the queue broker.

### Pros
- Mature ecosystem with delayed jobs, retries, and concurrency controls.
- Repeatable cron jobs via BullMQ repeatable jobs API.
- Built-in job status tracking, metrics, dashboard (Bull Board).
- Horizontal scalability by adding worker processes.

### Cons
- Requires Redis infrastructure (managed service or container) with HA considerations.
- Must manage queue health, dead-letter queues, and monitoring.
- Additional operational overhead (credentials, firewall, backup).

### Infrastructure Needs
- `REDIS_URL`, optional TLS certs.
- Deployment process to run worker dynos/containers separate from the API.
- Monitoring: Redis metrics, job lag dashboards.

### Recommended Uses
- Notification dispatch (email/SMS providers).
- Report generation pipeline.
- Scheduled compliance reminders using repeatable jobs.

---

## 4. Option B – Simple Cron + Worker Service
**Overview:** Leverage NestJS Schedule module or external cron (e.g., systemd timer) triggering background workers that run job scripts.

### Pros
- Minimal dependencies beyond PostgreSQL and the application runtime.
- Simpler to operate in small deployments; no queue broker required.
- Fits well for low-volume, predictable workloads (e.g., nightly reports).

### Cons
- Harder to handle large bursts or retries; risks double execution if cron overlaps.
- Manual effort to manage job uniqueness, backoff, and monitoring.
- Scaling requires careful coordination if multiple workers run concurrently.

### Infrastructure Needs
- `CRON_SECRET` (if using HTTP-triggered cron endpoints) or server-level scheduler.
- Logging/alerting to detect failures (no built-in job state store).

### Recommended Uses
- Initial deployment phase with low notification/report volumes.
- Maintenance scripts, periodic cleanup, or reporting jobs with generous time windows.

---

## 5. Decision Factors
| Criteria | BullMQ | Cron Worker |
|----------|--------|-------------|
| Volume & bursts | Strong | Limited |
| Retry & backoff | Built-in | Manual |
| Observability | Job dashboards | Custom logging |
| Operational overhead | Higher | Lower |
| Existing expertise | Medium (requires queue knowledge) | High (cron familiarity) |

**Likely Path:** Start with BullMQ once Redis is provisioned to future-proof for higher throughput notifications and reporting. Cron worker remains a fallback/stopgap if Redis provisioning is delayed.

---

## 6. Boundary Contracts
- Controllers/services create **jobs** (e.g., `NotificationsService.enqueueSendEmail`) that persist intent metadata.
- Background workers perform **side effects** (send email, generate files) and update job status.
- Jobs must be idempotent—safe to retry.
- Visibility: expose job status via future admin endpoints or logs.

---

## 7. Environment & Configuration Checklist
- `QUEUE_DRIVER` (e.g., `bullmq`, `cron`, `memory`) to toggle implementation.
- `REDIS_URL` (when using BullMQ).
- Provider-specific secrets: `EMAIL_API_KEY`, `SMS_API_KEY` (referenced by workers only).
- `REPORT_STORAGE_BUCKET` for generated files (if using S3/GCS later).
- Observability: hook into existing logging stack, add metrics (job duration, failures).

---

## 8. Scaling Considerations
- **Horizontal scaling:** add more workers to process queues; ensure Redis can handle connections.
- **Graceful shutdown:** workers should complete in-flight jobs before exit (`SIGTERM` hooks).
- **Back-pressure:** implement rate limiting per provider (BullMQ allows per-job concurrency).
- **Failover:** plan for Redis outage (queue fallback or circuit breaker to pause enqueues).

---

## 9. Next Steps (Implementation Roadmap)
1. Decide on queue driver (BullMQ recommended) and provision infrastructure.
2. Abstract job enqueueing behind `JobService` to keep controllers agnostic.
3. Implement notification worker consuming jobs and invoking provider adapters.
4. Extend for report generation (store generated files, notify users).
5. Add scheduled jobs for compliance reminders.
6. Introduce monitoring dashboards and alerting.

Document updates and architectural decisions in `agents.md` before coding.
