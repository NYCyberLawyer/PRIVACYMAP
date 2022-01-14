-- AlterTable
ALTER TABLE "Business" ALTER COLUMN "privacyLiaisonContactEmail" DROP DEFAULT,
ALTER COLUMN "privacyLiaisonContactName" DROP DEFAULT,
ALTER COLUMN "privacyLiaisonContactPhone" DROP DEFAULT,
ALTER COLUMN "privacyLiaisonContactPosition" DROP DEFAULT,
ALTER COLUMN "hrContactEmail" DROP DEFAULT,
ALTER COLUMN "hrContactName" DROP DEFAULT,
ALTER COLUMN "hrContactPhone" DROP DEFAULT,
ALTER COLUMN "hrContactPosition" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Application" ADD FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;
