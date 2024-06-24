-- CreateTable
CREATE TABLE `metalurgy` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `situation` VARCHAR(191) NOT NULL,
    `reference` VARCHAR(191) NOT NULL,
    `material` VARCHAR(191) NOT NULL,
    `amount` VARCHAR(191) NOT NULL,
    `obs` VARCHAR(191) NOT NULL,
    `condition` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
