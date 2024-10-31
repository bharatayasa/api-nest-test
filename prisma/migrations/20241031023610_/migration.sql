/*
  Warnings:

  - You are about to alter the column `title` on the `News` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `name` on the `NewsCategory` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `username` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `News` MODIFY `title` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `NewsCategory` MODIFY `name` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `username` VARCHAR(50) NOT NULL,
    MODIFY `password` VARCHAR(255) NOT NULL,
    MODIFY `email` VARCHAR(100) NOT NULL,
    MODIFY `name` VARCHAR(100) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);
