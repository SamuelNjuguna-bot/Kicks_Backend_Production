-- AlterTable
ALTER TABLE "CartItems" ADD COLUMN     "viewCart" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "CartItems" ADD CONSTRAINT "CartItems_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "PurchasedProduct"("acquiredId") ON DELETE RESTRICT ON UPDATE CASCADE;
