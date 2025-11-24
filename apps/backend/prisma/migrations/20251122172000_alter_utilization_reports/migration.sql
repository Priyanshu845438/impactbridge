ALTER TABLE "UtilizationReport"
    ADD COLUMN IF NOT EXISTS "companyId" TEXT;

ALTER TABLE "UtilizationReport"
    ADD CONSTRAINT "UtilizationReport_companyId_fkey"
    FOREIGN KEY ("companyId") REFERENCES "CompanyProfile"("id") ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS "UtilizationReport_companyId_idx" ON "UtilizationReport" ("companyId");
