/*
  Warnings:

  - You are about to alter the column `businessContactPhone` on the `Business` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `companyPhone` on the `Business` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `technicalContactPhone` on the `Business` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Business" ALTER COLUMN "businessContactPhone" SET DATA TYPE INTEGER,
ALTER COLUMN "companyPhone" SET DATA TYPE INTEGER,
ALTER COLUMN "technicalContactPhone" SET DATA TYPE INTEGER;
