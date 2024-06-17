/*
  Warnings:

  - Added the required column `domain_company_type` to the `Table_ITC_0007` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email_company_type` to the `Table_ITC_0007` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `table_itc_0007` ADD COLUMN `domain_company_type` VARCHAR(191) NOT NULL,
    ADD COLUMN `email_company_type` VARCHAR(191) NOT NULL;
