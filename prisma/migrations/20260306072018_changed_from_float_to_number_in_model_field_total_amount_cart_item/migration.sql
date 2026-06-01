/*
  Warnings:

  - You are about to alter the column `total_Amount` on the `CartItems` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "CartItems" ALTER COLUMN "total_Amount" SET DATA TYPE INTEGER;
