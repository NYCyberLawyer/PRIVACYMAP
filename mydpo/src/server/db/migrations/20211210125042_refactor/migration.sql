/*
  Warnings:

  - You are about to drop the column `applicationId` on the `Application` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "applicationId",
ADD COLUMN     "linkedApps" TEXT[];
