/*
  Warnings:

  - You are about to drop the column `userId` on the `OrderItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userExternalId,orderId,productId]` on the table `OrderItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userExternalId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_userId_fkey";

-- DropIndex
DROP INDEX "OrderItem_userId_orderId_productId_key";

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "userId",
ADD COLUMN     "userExternalId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "OrderItem_userExternalId_orderId_productId_key" ON "OrderItem"("userExternalId", "orderId", "productId");

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_userExternalId_fkey" FOREIGN KEY ("userExternalId") REFERENCES "Users"("externalId") ON DELETE RESTRICT ON UPDATE CASCADE;
