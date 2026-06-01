-- CreateTable
CREATE TABLE "PurchasedProduct" (
    "acquiredId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "TransactionString" TEXT NOT NULL,
    "PhoneNumber" TEXT NOT NULL,
    "Location" TEXT NOT NULL,

    CONSTRAINT "PurchasedProduct_pkey" PRIMARY KEY ("acquiredId")
);
