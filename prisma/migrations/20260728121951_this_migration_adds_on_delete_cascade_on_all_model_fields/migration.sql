-- DropForeignKey
ALTER TABLE "CartItems" DROP CONSTRAINT "CartItems_productId_fkey";

-- DropForeignKey
ALTER TABLE "PurchasedProduct" DROP CONSTRAINT "PurchasedProduct_product_fkey";

-- AddForeignKey
ALTER TABLE "CartItems" ADD CONSTRAINT "CartItems_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasedProduct" ADD CONSTRAINT "PurchasedProduct_product_fkey" FOREIGN KEY ("product") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
