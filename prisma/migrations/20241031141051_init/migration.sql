/*
  Warnings:

  - You are about to drop the column `createdById` on the `News` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `News_createdById_fkey` ON `News`;

-- AlterTable
ALTER TABLE `News` DROP COLUMN `createdById`;
