/*
  Warnings:

  - You are about to drop the column `name` on the `Application` table. All the data in the column will be lost.
  - Added the required column `age` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `applicationDRRegionStored` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `applicationHostingEntity` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `applicationHostingManagement` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `applicationHostingType` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `applicationId` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `applicationName` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `applicationOwner` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `applicationRegionStored` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `applicationType` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billingHistory` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `biometricData` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthdate` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `civilJusticeInfo` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comments` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `connectionType` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `criminalInfo` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataRetentionReq` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `driversLicenceNumber` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emailAddress` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `encryptedDataTransfer` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ethnicOrigin` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `financialInfo` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasDRHosting` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasNameAndInitials` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `healthInfo` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `homeAddress` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `householdInfo` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idNumbers` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maritalStatus` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medicalInfo` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minorInfo` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobileNumber` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nationality` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `physicalCharacteristics` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `religiousPhilosophicalPoliticalBeliefs` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sexualBehaviour` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `socialMedia` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentInfo` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `technologyOwner` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telephoneNumber` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tradeUnionMembershio` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uniqueDeviceId` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "name",
ADD COLUMN     "age" BOOLEAN NOT NULL,
ADD COLUMN     "applicableRegulations" TEXT[],
ADD COLUMN     "applicationDRRegionStored" TEXT NOT NULL,
ADD COLUMN     "applicationHostingEntity" TEXT NOT NULL,
ADD COLUMN     "applicationHostingManagement" TEXT NOT NULL,
ADD COLUMN     "applicationHostingType" TEXT NOT NULL,
ADD COLUMN     "applicationId" TEXT NOT NULL,
ADD COLUMN     "applicationName" TEXT NOT NULL,
ADD COLUMN     "applicationOwner" TEXT NOT NULL,
ADD COLUMN     "applicationRegionStored" TEXT NOT NULL,
ADD COLUMN     "applicationType" TEXT NOT NULL,
ADD COLUMN     "billingHistory" BOOLEAN NOT NULL,
ADD COLUMN     "biometricData" BOOLEAN NOT NULL,
ADD COLUMN     "birthdate" BOOLEAN NOT NULL,
ADD COLUMN     "civilJusticeInfo" BOOLEAN NOT NULL,
ADD COLUMN     "comments" TEXT NOT NULL,
ADD COLUMN     "connectionType" TEXT NOT NULL,
ADD COLUMN     "criminalInfo" BOOLEAN NOT NULL,
ADD COLUMN     "dataRetentionReq" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "driversLicenceNumber" BOOLEAN NOT NULL,
ADD COLUMN     "emailAddress" BOOLEAN NOT NULL,
ADD COLUMN     "encryptedDataTransfer" BOOLEAN NOT NULL,
ADD COLUMN     "ethnicOrigin" BOOLEAN NOT NULL,
ADD COLUMN     "financialInfo" BOOLEAN NOT NULL,
ADD COLUMN     "gender" BOOLEAN NOT NULL,
ADD COLUMN     "hasDRHosting" BOOLEAN NOT NULL,
ADD COLUMN     "hasNameAndInitials" BOOLEAN NOT NULL,
ADD COLUMN     "healthInfo" BOOLEAN NOT NULL,
ADD COLUMN     "homeAddress" BOOLEAN NOT NULL,
ADD COLUMN     "householdInfo" BOOLEAN NOT NULL,
ADD COLUMN     "idNumbers" BOOLEAN NOT NULL,
ADD COLUMN     "location" BOOLEAN NOT NULL,
ADD COLUMN     "maritalStatus" BOOLEAN NOT NULL,
ADD COLUMN     "medicalInfo" BOOLEAN NOT NULL,
ADD COLUMN     "minorInfo" BOOLEAN NOT NULL,
ADD COLUMN     "mobileNumber" BOOLEAN NOT NULL,
ADD COLUMN     "nationality" BOOLEAN NOT NULL,
ADD COLUMN     "physicalCharacteristics" BOOLEAN NOT NULL,
ADD COLUMN     "religiousPhilosophicalPoliticalBeliefs" BOOLEAN NOT NULL,
ADD COLUMN     "sexualBehaviour" BOOLEAN NOT NULL,
ADD COLUMN     "socialMedia" BOOLEAN NOT NULL,
ADD COLUMN     "studentInfo" BOOLEAN NOT NULL,
ADD COLUMN     "technologyOwner" TEXT NOT NULL,
ADD COLUMN     "telephoneNumber" BOOLEAN NOT NULL,
ADD COLUMN     "tradeUnionMembershio" BOOLEAN NOT NULL,
ADD COLUMN     "uniqueDeviceId" BOOLEAN NOT NULL;

-- AddForeignKey
ALTER TABLE "Application" ADD FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;
