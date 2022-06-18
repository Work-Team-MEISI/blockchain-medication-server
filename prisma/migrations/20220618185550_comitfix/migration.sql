/*
  Warnings:

  - You are about to drop the column `socialSecuriyId` on the `citizens` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[socialSecurityId]` on the table `citizens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `socialSecurityId` to the `citizens` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "citizens_socialSecuriyId_key";

-- AlterTable
ALTER TABLE "citizens" DROP COLUMN "socialSecuriyId",
ADD COLUMN     "socialSecurityId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "citizens_socialSecurityId_key" ON "citizens"("socialSecurityId");
