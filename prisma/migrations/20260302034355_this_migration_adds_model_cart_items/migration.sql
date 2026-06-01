-- CreateTable
CREATE TABLE "CartItems" (
    "cartId" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "total_Amount" DOUBLE PRECISION NOT NULL,
    "size" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "CartItems_pkey" PRIMARY KEY ("cartId")
);
