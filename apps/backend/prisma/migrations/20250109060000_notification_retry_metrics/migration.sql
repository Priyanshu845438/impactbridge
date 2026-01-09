-- Track retry metadata and delivery outcomes for notifications without altering existing behaviour.
-- Retry rules (documented for future workers):
--   * retryable statuses: PENDING and FAILED only (SENT is terminal)
--   * max retry attempts: 5 (enforced by future processors)
--   * lastAttemptAt captures most recent delivery attempt timestamp
-- Metrics capture provider-level outcomes for observability only; no control flow depends on them yet.

ALTER TABLE "NotificationIntent"
  ADD COLUMN "retryCount" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN "lastAttemptAt" TIMESTAMP(3);

CREATE TABLE "NotificationDeliveryMetric" (
  "id" TEXT NOT NULL,
  "intentId" TEXT NOT NULL,
  "provider" TEXT NOT NULL,
  "outcome" TEXT NOT NULL,
  "failureReason" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "NotificationDeliveryMetric_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "NotificationDeliveryMetric_intentId_idx"
  ON "NotificationDeliveryMetric"("intentId");

ALTER TABLE "NotificationDeliveryMetric"
  ADD CONSTRAINT "NotificationDeliveryMetric_intentId_fkey"
  FOREIGN KEY ("intentId") REFERENCES "NotificationIntent"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
