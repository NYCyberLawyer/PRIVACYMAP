/*
  Warnings:

  - You are about to drop the column `name` on the `Business` table. All the data in the column will be lost.
  - Added the required column `businessContactEmail` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessContactName` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessContactPhone` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessContactPosition` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyAddress` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyEmail` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyName` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyPhone` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `technicalContactEmail` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `technicalContactName` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `technicalContactPhone` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `technicalContactPosition` to the `Business` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Business" DROP COLUMN "name",
ADD COLUMN     "businessContactEmail" TEXT NOT NULL,
ADD COLUMN     "businessContactName" TEXT NOT NULL,
ADD COLUMN     "businessContactPhone" BIGINT NOT NULL,
ADD COLUMN     "businessContactPosition" TEXT NOT NULL,
ADD COLUMN     "companyAddress" TEXT NOT NULL,
ADD COLUMN     "companyEmail" TEXT NOT NULL,
ADD COLUMN     "companyName" TEXT NOT NULL,
ADD COLUMN     "companyPhone" BIGINT NOT NULL,
ADD COLUMN     "technicalContactEmail" TEXT NOT NULL,
ADD COLUMN     "technicalContactName" TEXT NOT NULL,
ADD COLUMN     "technicalContactPhone" BIGINT NOT NULL,
ADD COLUMN     "technicalContactPosition" TEXT NOT NULL;
