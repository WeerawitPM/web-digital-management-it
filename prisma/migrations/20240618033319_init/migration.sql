-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `expires` DATETIME(3) NOT NULL,
    `session_token` VARCHAR(191) NOT NULL,
    `access_token` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_session_token_key`(`session_token`),
    UNIQUE INDEX `Session_access_token_key`(`access_token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User_Status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `status_flag` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `User_Status_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `status_flag` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `Role_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `firstname` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `tel` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `license` VARCHAR(191) NULL,
    `role_id` INTEGER NOT NULL,
    `emp_id` INTEGER NULL,
    `company_id` INTEGER NOT NULL,
    `department_id` INTEGER NOT NULL,
    `position_id` INTEGER NOT NULL,
    `status_id` INTEGER NOT NULL,
    `step` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `status_flag` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Company` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `status_flag` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `Company_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Department` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `status_flag` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `Department_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Position` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `status_flag` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `Position_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Asset_Type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `status_flag` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `Asset_Type_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Asset` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `asset_type_id` INTEGER NOT NULL,
    `status_flag` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `Asset_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Table_Ref_Quotation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `path` VARCHAR(191) NULL,
    `table_ITC_0001_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Attached_Proposal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `path` VARCHAR(191) NULL,
    `table_ITC_0003_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Table_ITC_0001` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `asset_id` INTEGER NOT NULL,
    `qty` INTEGER NULL,
    `price` DOUBLE NULL,
    `purpose` VARCHAR(191) NULL,
    `spec_detail` VARCHAR(191) NULL,
    `ref_ro` VARCHAR(191) NULL,
    `remark` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `request_by_id` INTEGER NOT NULL,
    `document_head_id` VARCHAR(191) NOT NULL,
    `status_flag` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Table_ITC_0003` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `requirement` VARCHAR(191) NOT NULL,
    `purpose` VARCHAR(191) NOT NULL,
    `requirement_detail` VARCHAR(191) NOT NULL,
    `proposal_detail` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `request_by_id` INTEGER NOT NULL,
    `document_head_id` VARCHAR(191) NOT NULL,
    `status_flag` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Table_ITC_0005` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `email_type` VARCHAR(191) NOT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `request_by_id` INTEGER NOT NULL,
    `document_head_id` VARCHAR(191) NOT NULL,
    `status_flag` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Table_ITC_0006` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `email_type` VARCHAR(191) NOT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `request_by_id` INTEGER NOT NULL,
    `document_head_id` VARCHAR(191) NOT NULL,
    `status_flag` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Table_ITC_0007` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `domain_company` VARCHAR(191) NOT NULL,
    `domain_username` VARCHAR(191) NOT NULL,
    `domain_company_type` VARCHAR(191) NOT NULL,
    `domain_end_date` DATETIME(3) NOT NULL,
    `email_company` VARCHAR(191) NOT NULL,
    `email_username` VARCHAR(191) NOT NULL,
    `email_company_type` VARCHAR(191) NOT NULL,
    `email_end_date` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `request_by_id` INTEGER NOT NULL,
    `document_head_id` VARCHAR(191) NOT NULL,
    `status_flag` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Table_ITC_0009` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `computer_type` VARCHAR(191) NULL,
    `computer_brand` VARCHAR(191) NULL,
    `computer_name` VARCHAR(191) NULL,
    `computer_ram` VARCHAR(191) NULL,
    `computer_vga` VARCHAR(191) NULL,
    `computer_dvd` VARCHAR(191) NULL,
    `computer_equipment_number` VARCHAR(191) NULL,
    `computer_serial_number` VARCHAR(191) NULL,
    `computer_mb` VARCHAR(191) NULL,
    `computer_hdd` VARCHAR(191) NULL,
    `computer_case` VARCHAR(191) NULL,
    `computer_purpose` VARCHAR(191) NULL,
    `monitor_brand` VARCHAR(191) NULL,
    `monitor_size` VARCHAR(191) NULL,
    `monitor_equipment_number` VARCHAR(191) NULL,
    `monitor_serial_number` VARCHAR(191) NULL,
    `monitor_purpose` VARCHAR(191) NULL,
    `printer_brand` VARCHAR(191) NULL,
    `printer_equipment_number` VARCHAR(191) NULL,
    `printer_serial_number` VARCHAR(191) NULL,
    `printer_purpose` VARCHAR(191) NULL,
    `ups_brand` VARCHAR(191) NULL,
    `ups_equipment_number` VARCHAR(191) NULL,
    `ups_serial_number` VARCHAR(191) NULL,
    `ups_purpose` VARCHAR(191) NULL,
    `etc` VARCHAR(191) NULL,
    `etc_purpose` VARCHAR(191) NULL,
    `start_date` DATETIME(3) NULL,
    `end_date` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `request_by_id` INTEGER NOT NULL,
    `document_head_id` VARCHAR(191) NOT NULL,
    `status_flag` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Document` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `status_flag` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `Document_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Routing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `step` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `document_id` INTEGER NOT NULL,
    `status_flag` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Document_Head` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref_no` VARCHAR(191) NOT NULL,
    `price` DOUBLE NULL,
    `document_id` INTEGER NOT NULL,
    `start_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `end_date` DATETIME(3) NULL,
    `step` INTEGER NOT NULL DEFAULT 0,
    `status` INTEGER NOT NULL DEFAULT 0,
    `status_flag` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `Document_Head_ref_no_key`(`ref_no`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Track_Doc` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `step` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `document_head_id` VARCHAR(191) NOT NULL,
    `start_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `end_date` DATETIME(3) NULL,
    `user_id` INTEGER NULL,
    `remark` VARCHAR(191) NULL,
    `status` INTEGER NOT NULL DEFAULT 0,
    `status_flag` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `Department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_position_id_fkey` FOREIGN KEY (`position_id`) REFERENCES `Position`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_status_id_fkey` FOREIGN KEY (`status_id`) REFERENCES `User_Status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_asset_type_id_fkey` FOREIGN KEY (`asset_type_id`) REFERENCES `Asset_Type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Table_Ref_Quotation` ADD CONSTRAINT `Table_Ref_Quotation_table_ITC_0001_id_fkey` FOREIGN KEY (`table_ITC_0001_id`) REFERENCES `Table_ITC_0001`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attached_Proposal` ADD CONSTRAINT `Attached_Proposal_table_ITC_0003_id_fkey` FOREIGN KEY (`table_ITC_0003_id`) REFERENCES `Table_ITC_0003`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Table_ITC_0001` ADD CONSTRAINT `Table_ITC_0001_asset_id_fkey` FOREIGN KEY (`asset_id`) REFERENCES `Asset`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Table_ITC_0001` ADD CONSTRAINT `Table_ITC_0001_request_by_id_fkey` FOREIGN KEY (`request_by_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Table_ITC_0001` ADD CONSTRAINT `Table_ITC_0001_document_head_id_fkey` FOREIGN KEY (`document_head_id`) REFERENCES `Document_Head`(`ref_no`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Table_ITC_0003` ADD CONSTRAINT `Table_ITC_0003_request_by_id_fkey` FOREIGN KEY (`request_by_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Table_ITC_0003` ADD CONSTRAINT `Table_ITC_0003_document_head_id_fkey` FOREIGN KEY (`document_head_id`) REFERENCES `Document_Head`(`ref_no`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Table_ITC_0005` ADD CONSTRAINT `Table_ITC_0005_request_by_id_fkey` FOREIGN KEY (`request_by_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Table_ITC_0005` ADD CONSTRAINT `Table_ITC_0005_document_head_id_fkey` FOREIGN KEY (`document_head_id`) REFERENCES `Document_Head`(`ref_no`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Table_ITC_0006` ADD CONSTRAINT `Table_ITC_0006_request_by_id_fkey` FOREIGN KEY (`request_by_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Table_ITC_0006` ADD CONSTRAINT `Table_ITC_0006_document_head_id_fkey` FOREIGN KEY (`document_head_id`) REFERENCES `Document_Head`(`ref_no`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Table_ITC_0007` ADD CONSTRAINT `Table_ITC_0007_request_by_id_fkey` FOREIGN KEY (`request_by_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Table_ITC_0007` ADD CONSTRAINT `Table_ITC_0007_document_head_id_fkey` FOREIGN KEY (`document_head_id`) REFERENCES `Document_Head`(`ref_no`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Table_ITC_0009` ADD CONSTRAINT `Table_ITC_0009_request_by_id_fkey` FOREIGN KEY (`request_by_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Table_ITC_0009` ADD CONSTRAINT `Table_ITC_0009_document_head_id_fkey` FOREIGN KEY (`document_head_id`) REFERENCES `Document_Head`(`ref_no`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Routing` ADD CONSTRAINT `Routing_document_id_fkey` FOREIGN KEY (`document_id`) REFERENCES `Document`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Document_Head` ADD CONSTRAINT `Document_Head_document_id_fkey` FOREIGN KEY (`document_id`) REFERENCES `Document`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Track_Doc` ADD CONSTRAINT `Track_Doc_document_head_id_fkey` FOREIGN KEY (`document_head_id`) REFERENCES `Document_Head`(`ref_no`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Track_Doc` ADD CONSTRAINT `Track_Doc_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
