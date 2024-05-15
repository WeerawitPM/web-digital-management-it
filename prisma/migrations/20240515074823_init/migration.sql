/*
  Warnings:

  - You are about to drop the column `ref_quotation` on the `table_itc_0001` table. All the data in the column will be lost.
  - You are about to drop the `userstatus` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_status_id_fkey`;

-- AlterTable
ALTER TABLE `table_itc_0001` DROP COLUMN `ref_quotation`;

-- AlterTable
ALTER TABLE `track_doc` ADD COLUMN `remark` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `userstatus`;

-- CreateTable
CREATE TABLE `User_Status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `status_flag` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `User_Status_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Table_Ref_Quotation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `table_ITC_0001_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_status_id_fkey` FOREIGN KEY (`status_id`) REFERENCES `User_Status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Table_Ref_Quotation` ADD CONSTRAINT `Table_Ref_Quotation_table_ITC_0001_id_fkey` FOREIGN KEY (`table_ITC_0001_id`) REFERENCES `Table_ITC_0001`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
