/*
  Warnings:

  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `News` ADD COLUMN `deletedAt` TIMESTAMP(6) NULL,
    MODIFY `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    MODIFY `updatedAt` TIMESTAMP(6) NOT NULL;

-- AlterTable
ALTER TABLE `NewsCategory` ADD COLUMN `deletedAt` TIMESTAMP(6) NULL,
    MODIFY `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    MODIFY `updatedAt` TIMESTAMP(6) NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `deletedAt` TIMESTAMP(6) NULL,
    ADD COLUMN `updatedAt` TIMESTAMP(6) NOT NULL,
    MODIFY `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6);
