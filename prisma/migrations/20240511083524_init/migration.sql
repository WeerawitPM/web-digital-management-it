/*
  Warnings:

  - You are about to drop the column `assetType` on the `asset` table. All the data in the column will be lost.
  - Added the required column `assetTypeId` to the `Asset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `asset` DROP COLUMN `assetType`,
    ADD COLUMN `assetTypeId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `AssetType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `AssetType_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_assetTypeId_fkey` FOREIGN KEY (`assetTypeId`) REFERENCES `AssetType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
