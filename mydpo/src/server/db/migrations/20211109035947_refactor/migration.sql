/*
  Warnings:

  - You are about to drop the column `slug` on the `Business` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Business.slug_unique";

-- AlterTable
ALTER TABLE "Business" DROP COLUMN "slug";
