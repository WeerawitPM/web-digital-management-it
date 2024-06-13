-- CreateTable
CREATE TABLE `Table_ITC_0005` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `type_email` VARCHAR(191) NOT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `request_by_id` INTEGER NOT NULL,
    `document_head_id` VARCHAR(191) NOT NULL,
    `status_flag` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Table_ITC_0005` ADD CONSTRAINT `Table_ITC_0005_request_by_id_fkey` FOREIGN KEY (`request_by_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Table_ITC_0005` ADD CONSTRAINT `Table_ITC_0005_document_head_id_fkey` FOREIGN KEY (`document_head_id`) REFERENCES `Document_Head`(`ref_no`) ON DELETE RESTRICT ON UPDATE CASCADE;
