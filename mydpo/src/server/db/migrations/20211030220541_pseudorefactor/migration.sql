/*
  Warnings:

  - A unique constraint covering the columns `[stripeCustomerId]` on the table `ConsultancyFirm` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripeSubscriptionId]` on the table `ConsultancyFirm` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ConsultancyFirm" ADD COLUMN     "stripeCurrentPeriodEnd" TIMESTAMP(3),
ADD COLUMN     "stripeCustomerId" TEXT,
ADD COLUMN     "stripePriceId" TEXT,
ADD COLUMN     "stripeSubscriptionId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "ConsultancyFirm.stripeCustomerId_unique" ON "ConsultancyFirm"("stripeCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "ConsultancyFirm.stripeSubscriptionId_unique" ON "ConsultancyFirm"("stripeSubscriptionId");
