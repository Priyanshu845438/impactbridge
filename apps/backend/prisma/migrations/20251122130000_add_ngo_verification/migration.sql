ALTER TABLE "NGOProfile"
ADD COLUMN IF NOT EXISTS "verificationStatus" TEXT NOT NULL DEFAULT 'PENDING',
ADD COLUMN IF NOT EXISTS "verificationRemarks" TEXT;

CREATE INDEX IF NOT EXISTS "NGOProfile_verificationStatus_idx"
  ON "NGOProfile" ("verificationStatus");
