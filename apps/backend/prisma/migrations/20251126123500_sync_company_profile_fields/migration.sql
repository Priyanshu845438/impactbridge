/*
  Warnings:

  - You are about to drop the column `csrBudget` on the `CompanyProfile` table. All the data in the column will be lost.
  - Added the required column `ngoId` to the `CampaignApproval` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Role" ADD VALUE 'REVIEWER';
ALTER TYPE "Role" ADD VALUE 'AUDITOR';

-- DropForeignKey
ALTER TABLE "CampaignApproval" DROP CONSTRAINT "CampaignApproval_campaignId_fkey";

-- DropForeignKey
ALTER TABLE "CampaignApproval" DROP CONSTRAINT "CampaignApproval_companyId_fkey";

-- DropForeignKey
ALTER TABLE "FinancialReport" DROP CONSTRAINT "FinancialReport_ngoId_fkey";

-- DropForeignKey
ALTER TABLE "ImpactMetric" DROP CONSTRAINT "ImpactMetric_campaignId_fkey";

-- DropForeignKey
ALTER TABLE "ImpactMetric" DROP CONSTRAINT "ImpactMetric_milestoneId_fkey";

-- DropForeignKey
ALTER TABLE "Milestone" DROP CONSTRAINT "Milestone_campaignId_fkey";

-- DropForeignKey
ALTER TABLE "UtilizationReport" DROP CONSTRAINT "UtilizationReport_campaignId_fkey";

-- DropForeignKey
ALTER TABLE "UtilizationReport" DROP CONSTRAINT "UtilizationReport_companyId_fkey";

-- DropForeignKey
ALTER TABLE "UtilizationReport" DROP CONSTRAINT "UtilizationReport_milestoneId_fkey";

-- DropIndex
DROP INDEX "CampaignApproval_campaignId_idx";

-- DropIndex
DROP INDEX "CampaignApproval_companyId_idx";

-- DropIndex
DROP INDEX "CompanyProfile_csrAnnualBudget_idx";

-- DropIndex
DROP INDEX "FinancialReport_ngoId_idx";

-- DropIndex
DROP INDEX "ImpactMetric_campaignId_idx";

-- DropIndex
DROP INDEX "ImpactMetric_milestoneId_idx";

-- DropIndex
DROP INDEX "Milestone_campaignId_idx";

-- DropIndex
DROP INDEX "NGOProfile_verificationStatus_idx";

-- DropIndex
DROP INDEX "UtilizationReport_campaignId_idx";

-- DropIndex
DROP INDEX "UtilizationReport_companyId_idx";

-- DropIndex
DROP INDEX "UtilizationReport_milestoneId_idx";

-- AlterTable
ALTER TABLE "Campaign" ALTER COLUMN "deletedAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "CampaignApproval" ADD COLUMN     "ngoId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updatedAt" DROP DEFAULT,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "CompanyProfile" DROP COLUMN "csrBudget",
ALTER COLUMN "deletedAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Donation" ALTER COLUMN "deletedAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "FinancialReport" ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "ImpactMetric" ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updatedAt" DROP DEFAULT,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Milestone" ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "targetDate" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updatedAt" DROP DEFAULT,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "NGOProfile" ALTER COLUMN "deletedAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "deletedAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "UtilizationReport" ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updatedAt" DROP DEFAULT,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Invitation" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_token_key" ON "Invitation"("token");

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialReport" ADD CONSTRAINT "FinancialReport_ngoId_fkey" FOREIGN KEY ("ngoId") REFERENCES "NGOProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignApproval" ADD CONSTRAINT "CampaignApproval_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignApproval" ADD CONSTRAINT "CampaignApproval_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "CompanyProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignApproval" ADD CONSTRAINT "CampaignApproval_ngoId_fkey" FOREIGN KEY ("ngoId") REFERENCES "NGOProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImpactMetric" ADD CONSTRAINT "ImpactMetric_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImpactMetric" ADD CONSTRAINT "ImpactMetric_milestoneId_fkey" FOREIGN KEY ("milestoneId") REFERENCES "Milestone"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UtilizationReport" ADD CONSTRAINT "UtilizationReport_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UtilizationReport" ADD CONSTRAINT "UtilizationReport_milestoneId_fkey" FOREIGN KEY ("milestoneId") REFERENCES "Milestone"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UtilizationReport" ADD CONSTRAINT "UtilizationReport_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "CompanyProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Milestone" ADD CONSTRAINT "Milestone_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "CampaignApproval_campaign_company_unique" RENAME TO "CampaignApproval_campaignId_companyId_key";
