/*
  Warnings:

  - You are about to drop the column `clerkid` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[clerkId]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clerkId` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "user_clerkid_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "clerkid",
ADD COLUMN     "clerkId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_clerkId_key" ON "user"("clerkId");
