/*
  Warnings:

  - You are about to drop the column `age` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `billingHistory` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `biometricData` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `birthdate` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `civilJusticeInfo` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `criminalInfo` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `driversLicenceNumber` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `emailAddress` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `ethnicOrigin` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `financialInfo` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `healthInfo` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `homeAddress` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `householdInfo` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `idNumbers` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `maritalStatus` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `medicalInfo` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `minorInfo` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `mobileNumber` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `nationality` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `physicalCharacteristics` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `religiousPhilosophicalPoliticalBeliefs` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `sexualBehaviour` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `socialMedia` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `studentInfo` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `telephoneNumber` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `tradeUnionMembershio` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `uniqueDeviceId` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `Module` table. All the data in the column will be lost.
  - Added the required column `hasAge` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasBillingHistory` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasBiometricData` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasBirthdate` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasCivilJusticeInfo` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasCriminalInfo` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasDriversLicenceNumber` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasEmailAddress` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasEthnicOrigin` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasFinancialInfo` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasGender` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasHealthInfo` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasHomeAddress` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasHouseholdInfo` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasIdNumbers` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasLocation` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasMaritalStatus` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasMedicalInfo` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasMinorInfo` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasMobileNumber` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasNationality` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasPhysicalCharacteristics` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasReligiousPhilosophicalPoliticalBeliefs` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasSexualBehaviour` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasSocialMedia` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasStudentInfo` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasTelephoneNumber` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasTradeUnionMembership` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasUniqueDeviceId` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Module" DROP CONSTRAINT "Module_applicationId_fkey";

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "age",
DROP COLUMN "billingHistory",
DROP COLUMN "biometricData",
DROP COLUMN "birthdate",
DROP COLUMN "civilJusticeInfo",
DROP COLUMN "criminalInfo",
DROP COLUMN "driversLicenceNumber",
DROP COLUMN "emailAddress",
DROP COLUMN "ethnicOrigin",
DROP COLUMN "financialInfo",
DROP COLUMN "gender",
DROP COLUMN "healthInfo",
DROP COLUMN "homeAddress",
DROP COLUMN "householdInfo",
DROP COLUMN "idNumbers",
DROP COLUMN "location",
DROP COLUMN "maritalStatus",
DROP COLUMN "medicalInfo",
DROP COLUMN "minorInfo",
DROP COLUMN "mobileNumber",
DROP COLUMN "nationality",
DROP COLUMN "physicalCharacteristics",
DROP COLUMN "religiousPhilosophicalPoliticalBeliefs",
DROP COLUMN "sexualBehaviour",
DROP COLUMN "socialMedia",
DROP COLUMN "studentInfo",
DROP COLUMN "telephoneNumber",
DROP COLUMN "tradeUnionMembershio",
DROP COLUMN "uniqueDeviceId",
ADD COLUMN     "hasAge" BOOLEAN NOT NULL,
ADD COLUMN     "hasBillingHistory" BOOLEAN NOT NULL,
ADD COLUMN     "hasBiometricData" BOOLEAN NOT NULL,
ADD COLUMN     "hasBirthdate" BOOLEAN NOT NULL,
ADD COLUMN     "hasCivilJusticeInfo" BOOLEAN NOT NULL,
ADD COLUMN     "hasCriminalInfo" BOOLEAN NOT NULL,
ADD COLUMN     "hasDriversLicenceNumber" BOOLEAN NOT NULL,
ADD COLUMN     "hasEmailAddress" BOOLEAN NOT NULL,
ADD COLUMN     "hasEthnicOrigin" BOOLEAN NOT NULL,
ADD COLUMN     "hasFinancialInfo" BOOLEAN NOT NULL,
ADD COLUMN     "hasGender" BOOLEAN NOT NULL,
ADD COLUMN     "hasHealthInfo" BOOLEAN NOT NULL,
ADD COLUMN     "hasHomeAddress" BOOLEAN NOT NULL,
ADD COLUMN     "hasHouseholdInfo" BOOLEAN NOT NULL,
ADD COLUMN     "hasIdNumbers" BOOLEAN NOT NULL,
ADD COLUMN     "hasLocation" BOOLEAN NOT NULL,
ADD COLUMN     "hasMaritalStatus" BOOLEAN NOT NULL,
ADD COLUMN     "hasMedicalInfo" BOOLEAN NOT NULL,
ADD COLUMN     "hasMinorInfo" BOOLEAN NOT NULL,
ADD COLUMN     "hasMobileNumber" BOOLEAN NOT NULL,
ADD COLUMN     "hasNationality" BOOLEAN NOT NULL,
ADD COLUMN     "hasPhysicalCharacteristics" BOOLEAN NOT NULL,
ADD COLUMN     "hasReligiousPhilosophicalPoliticalBeliefs" BOOLEAN NOT NULL,
ADD COLUMN     "hasSexualBehaviour" BOOLEAN NOT NULL,
ADD COLUMN     "hasSocialMedia" BOOLEAN NOT NULL,
ADD COLUMN     "hasStudentInfo" BOOLEAN NOT NULL,
ADD COLUMN     "hasTelephoneNumber" BOOLEAN NOT NULL,
ADD COLUMN     "hasTradeUnionMembership" BOOLEAN NOT NULL,
ADD COLUMN     "hasUniqueDeviceId" BOOLEAN NOT NULL,
ADD COLUMN     "modules" TEXT[];

-- AlterTable
ALTER TABLE "Module" DROP COLUMN "applicationId";
