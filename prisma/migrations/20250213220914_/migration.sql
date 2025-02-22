-- DropForeignKey
ALTER TABLE `account` DROP FOREIGN KEY `Account_userId_fkey`;

-- DropIndex
DROP INDEX `Account_userId_fkey` ON `account`;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
