-- AlterTable
ALTER TABLE `requestequipment` MODIFY `step` INTEGER NOT NULL DEFAULT 1,
    MODIFY `allStatus` VARCHAR(191) NOT NULL DEFAULT 'Waiting',
    MODIFY `remark` VARCHAR(191) NOT NULL DEFAULT '';
