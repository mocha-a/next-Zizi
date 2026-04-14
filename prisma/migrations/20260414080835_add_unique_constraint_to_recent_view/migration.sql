/*
  Warnings:

  - You are about to drop the column `createdAt` on the `recent_views` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,targetId,type]` on the table `recent_views` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `viewedAt` to the `recent_views` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `recent_views_userId_idx` ON `recent_views`;

-- AlterTable
ALTER TABLE `recent_views` DROP COLUMN `createdAt`,
    ADD COLUMN `viewedAt` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE INDEX `recent_views_userId_viewedAt_idx` ON `recent_views`(`userId`, `viewedAt` DESC);

-- CreateIndex
CREATE UNIQUE INDEX `recent_views_userId_targetId_type_key` ON `recent_views`(`userId`, `targetId`, `type`);
