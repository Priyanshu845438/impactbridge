CREATE TABLE IF NOT EXISTS "UtilizationReport" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "campaignId" TEXT NOT NULL,
    "milestoneId" TEXT,
    "amountUsed" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "proofUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT "UtilizationReport_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE,
    CONSTRAINT "UtilizationReport_milestoneId_fkey" FOREIGN KEY ("milestoneId") REFERENCES "Milestone"("id") ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS "UtilizationReport_campaignId_idx" ON "UtilizationReport" ("campaignId");
CREATE INDEX IF NOT EXISTS "UtilizationReport_milestoneId_idx" ON "UtilizationReport" ("milestoneId");
