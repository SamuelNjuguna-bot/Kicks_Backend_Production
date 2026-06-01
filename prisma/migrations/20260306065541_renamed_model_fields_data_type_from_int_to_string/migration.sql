/*
  Warnings:

  - The primary key for the `CartItems` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "CartItems" DROP CONSTRAINT "CartItems_pkey",
ALTER COLUMN "cartId" DROP DEFAULT,
ALTER COLUMN "cartId" SET DATA TYPE TEXT,
ALTER COLUMN "productId" SET DATA TYPE TEXT,
ADD CONSTRAINT "CartItems_pkey" PRIMARY KEY ("cartId");
DROP SEQUENCE "CartItems_cartId_seq";
