/*
  Warnings:

  - You are about to drop the column `hrResourcesContactEmail` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `hrResourcesContactName` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `hrResourcesContactPhone` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `hrResourcesContactPosition` on the `Business` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Business" DROP COLUMN "hrResourcesContactEmail",
DROP COLUMN "hrResourcesContactName",
DROP COLUMN "hrResourcesContactPhone",
DROP COLUMN "hrResourcesContactPosition",
ADD COLUMN     "hrContactEmail" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "hrContactName" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "hrContactPhone" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "hrContactPosition" TEXT NOT NULL DEFAULT E'';
