/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `InvalidToken` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `InvalidToken_token_key` ON `InvalidToken`;

-- AlterTable
ALTER TABLE `InvalidToken` MODIFY `token` TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `InvalidToken_token_key` ON `InvalidToken`(`token`(255));
