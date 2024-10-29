-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('admin', 'user') NOT NULL DEFAULT 'user';
