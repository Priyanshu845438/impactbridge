CREATE TABLE IF NOT EXISTS "Milestone" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "campaignId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "targetDate" TIMESTAMPTZ NOT NULL,
    "budget" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "progressPercent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT "Milestone_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "Milestone_campaignId_idx" ON "Milestone" ("campaignId");
