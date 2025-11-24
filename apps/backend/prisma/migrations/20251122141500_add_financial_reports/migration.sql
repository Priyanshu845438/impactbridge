CREATE TABLE IF NOT EXISTS "FinancialReport" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "ngoId" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "reportUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT "FinancialReport_ngoId_fkey" FOREIGN KEY ("ngoId") REFERENCES "NGOProfile"("id") ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "FinancialReport_ngoId_idx" ON "FinancialReport" ("ngoId");
