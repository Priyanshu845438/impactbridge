CREATE TABLE IF NOT EXISTS "ImpactMetric" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "campaignId" TEXT NOT NULL,
    "milestoneId" TEXT,
    "name" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT "ImpactMetric_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE,
    CONSTRAINT "ImpactMetric_milestoneId_fkey" FOREIGN KEY ("milestoneId") REFERENCES "Milestone"("id") ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS "ImpactMetric_campaignId_idx" ON "ImpactMetric" ("campaignId");
CREATE INDEX IF NOT EXISTS "ImpactMetric_milestoneId_idx" ON "ImpactMetric" ("milestoneId");
