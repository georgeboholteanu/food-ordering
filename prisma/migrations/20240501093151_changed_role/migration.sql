/*
  Warnings:

  - You are about to drop the column `isAdmin` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "isAdmin",
ALTER COLUMN "role" SET DEFAULT 'WAITER';
