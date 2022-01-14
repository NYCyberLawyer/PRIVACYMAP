/*
  Warnings:

  - You are about to drop the column `stripeCurrentPeriodEnd` on the `ConsultancyFirm` table. All the data in the column will be lost.
  - You are about to drop the column `stripeCustomerId` on the `ConsultancyFirm` table. All the data in the column will be lost.
  - You are about to drop the column `stripePriceId` on the `ConsultancyFirm` table. All the data in the column will be lost.
  - You are about to drop the column `stripeSubscriptionId` on the `ConsultancyFirm` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "ConsultancyFirm.stripeCustomerId_unique";

-- DropIndex
DROP INDEX "ConsultancyFirm.stripeSubscriptionId_unique";

-- AlterTable
ALTER TABLE "ConsultancyFirm" DROP COLUMN "stripeCurrentPeriodEnd",
DROP COLUMN "stripeCustomerId",
DROP COLUMN "stripePriceId",
DROP COLUMN "stripeSubscriptionId";
