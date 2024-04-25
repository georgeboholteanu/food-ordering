/*
  Warnings:

  - A unique constraint covering the columns `[orderId,productId,productTitle]` on the table `OrderItem` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_productId_fkey";

-- DropIndex
DROP INDEX "OrderItem_orderId_productId_key";

-- AlterTable
ALTER TABLE "OrderItem" ALTER COLUMN "productPrice" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "OrderItem_orderId_productId_productTitle_key" ON "OrderItem"("orderId", "productId", "productTitle");

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_productTitle_fkey" FOREIGN KEY ("productId", "productTitle") REFERENCES "Product"("id", "title") ON DELETE RESTRICT ON UPDATE CASCADE;
