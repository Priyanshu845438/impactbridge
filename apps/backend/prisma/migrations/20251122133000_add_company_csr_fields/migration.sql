ALTER TABLE "CompanyProfile"
  ADD COLUMN IF NOT EXISTS "csrAnnualBudget" DOUBLE PRECISION,
  ADD COLUMN IF NOT EXISTS "csrAllocated" DOUBLE PRECISION,
  ADD COLUMN IF NOT EXISTS "csrSpent" DOUBLE PRECISION;

CREATE INDEX IF NOT EXISTS "CompanyProfile_csrAnnualBudget_idx"
  ON "CompanyProfile" ("csrAnnualBudget");
