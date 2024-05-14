/*
  Warnings:

  - You are about to drop the `table_itc0001` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `table_itc0001` DROP FOREIGN KEY `Table_ITC0001_asset_id_fkey`;

-- DropForeignKey
ALTER TABLE `table_itc0001` DROP FOREIGN KEY `Table_ITC0001_asset_type_id_fkey`;

-- DropForeignKey
ALTER TABLE `table_itc0001` DROP FOREIGN KEY `Table_ITC0001_document_head_id_fkey`;

-- DropForeignKey
ALTER TABLE `table_itc0001` DROP FOREIGN KEY `Table_ITC0001_request_by_id_fkey`;

-- DropTable
DROP TABLE `table_itc0001`;

-- CreateTable
CREATE TABLE `Table_ITC_0001` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `asset_id` INTEGER NOT NULL,
    `qty` INTEGER NOT NULL,
    `purpose` VARCHAR(191) NOT NULL,
    `spec_detail` VARCHAR(191) NOT NULL,
    `ref_quotation` VARCHAR(191) NOT NULL,
    `ref_ro` VARCHAR(191) NOT NULL,
    `remark` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `request_by_id` INTEGER NOT NULL,
    `document_head_id` VARCHAR(191) NOT NULL,
    `status_flag` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Table_ITC_0001` ADD CONSTRAINT `Table_ITC_0001_asset_id_fkey` FOREIGN KEY (`asset_id`) REFERENCES `Asset`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Table_ITC_0001` ADD CONSTRAINT `Table_ITC_0001_request_by_id_fkey` FOREIGN KEY (`request_by_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Table_ITC_0001` ADD CONSTRAINT `Table_ITC_0001_document_head_id_fkey` FOREIGN KEY (`document_head_id`) REFERENCES `Document_Head`(`ref_no`) ON DELETE RESTRICT ON UPDATE CASCADE;
