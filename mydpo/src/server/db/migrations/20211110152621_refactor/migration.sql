-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "hrResourcesContactEmail" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "hrResourcesContactName" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "hrResourcesContactPhone" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "hrResourcesContactPosition" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "privacyLiaisonContactEmail" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "privacyLiaisonContactName" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "privacyLiaisonContactPhone" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "privacyLiaisonContactPosition" TEXT NOT NULL DEFAULT E'';
