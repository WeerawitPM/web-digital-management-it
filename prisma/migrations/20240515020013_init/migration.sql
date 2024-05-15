-- DropForeignKey
ALTER TABLE `track_doc` DROP FOREIGN KEY `Track_Doc_user_id_fkey`;

-- AlterTable
ALTER TABLE `track_doc` MODIFY `user_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Track_Doc` ADD CONSTRAINT `Track_Doc_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
