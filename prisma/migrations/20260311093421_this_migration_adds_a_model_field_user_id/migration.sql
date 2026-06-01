/*
  Warnings:

  - Added the required column `userId` to the `CartItems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartItems" ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "color" DROP DEFAULT;
