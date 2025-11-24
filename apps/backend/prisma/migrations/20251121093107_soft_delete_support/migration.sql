-- Soft delete columns added previously on DB; ensuring migration exists locally
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "deletedAt" TIMESTAMPTZ;
ALTER TABLE "NGOProfile" ADD COLUMN IF NOT EXISTS "deletedAt" TIMESTAMPTZ;
ALTER TABLE "CompanyProfile" ADD COLUMN IF NOT EXISTS "deletedAt" TIMESTAMPTZ;
ALTER TABLE "Campaign" ADD COLUMN IF NOT EXISTS "deletedAt" TIMESTAMPTZ;
ALTER TABLE "Donation" ADD COLUMN IF NOT EXISTS "deletedAt" TIMESTAMPTZ;
