-- AlterTable
ALTER TABLE "Quote" ADD COLUMN     "bankDetails" TEXT,
ADD COLUMN     "billingAddress" TEXT,
ADD COLUMN     "contactPerson" TEXT,
ADD COLUMN     "isProforma" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "salesCredit" TEXT,
ADD COLUMN     "shippingAddress" TEXT;

-- CreateTable
CREATE TABLE "QuoteItem" (
    "id" SERIAL NOT NULL,
    "quoteId" INTEGER NOT NULL,
    "item" TEXT NOT NULL,
    "description" TEXT,
    "hsnCode" TEXT,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unit" TEXT,
    "rate" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "taxableAmount" DOUBLE PRECISION NOT NULL,
    "cgst" DOUBLE PRECISION NOT NULL,
    "sgst" DOUBLE PRECISION NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "leadTime" TEXT,

    CONSTRAINT "QuoteItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuoteTerm" (
    "id" SERIAL NOT NULL,
    "quoteId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "QuoteTerm_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuoteItem" ADD CONSTRAINT "QuoteItem_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuoteTerm" ADD CONSTRAINT "QuoteTerm_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote"("id") ON DELETE CASCADE ON UPDATE CASCADE;
