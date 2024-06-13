/*
  Warnings:

  - Added the required column `company` to the `Table_ITC_0005` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `table_itc_0005` ADD COLUMN `company` VARCHAR(191) NOT NULL;
