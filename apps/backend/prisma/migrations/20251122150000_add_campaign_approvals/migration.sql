CREATE TABLE IF NOT EXISTS "CampaignApproval" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "campaignId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "remarks" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT "CampaignApproval_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE,
    CONSTRAINT "CampaignApproval_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "CompanyProfile"("id") ON DELETE CASCADE,
    CONSTRAINT "CampaignApproval_campaign_company_unique" UNIQUE ("campaignId", "companyId")
);

CREATE INDEX IF NOT EXISTS "CampaignApproval_companyId_idx" ON "CampaignApproval" ("companyId");
CREATE INDEX IF NOT EXISTS "CampaignApproval_campaignId_idx" ON "CampaignApproval" ("campaignId");
