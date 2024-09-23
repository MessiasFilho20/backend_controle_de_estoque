/*
  Warnings:

  - You are about to drop the column `amount` on the `metalurgy` table. All the data in the column will be lost.
  - You are about to drop the column `condition` on the `metalurgy` table. All the data in the column will be lost.
  - You are about to drop the column `material` on the `metalurgy` table. All the data in the column will be lost.
  - You are about to drop the column `obs` on the `metalurgy` table. All the data in the column will be lost.
  - You are about to drop the column `reference` on the `metalurgy` table. All the data in the column will be lost.
  - You are about to drop the column `situation` on the `metalurgy` table. All the data in the column will be lost.
  - Added the required column `categoryID` to the `Metalurgy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descricao` to the `Metalurgy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fornecedor` to the `Metalurgy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `img` to the `Metalurgy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quanti_emerg` to the `Metalurgy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantidade` to the `Metalurgy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tamanho` to the `Metalurgy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `metalurgy` DROP COLUMN `amount`,
    DROP COLUMN `condition`,
    DROP COLUMN `material`,
    DROP COLUMN `obs`,
    DROP COLUMN `reference`,
    DROP COLUMN `situation`,
    ADD COLUMN `categoryID` INTEGER NOT NULL,
    ADD COLUMN `descricao` VARCHAR(191) NOT NULL,
    ADD COLUMN `fornecedor` VARCHAR(191) NOT NULL,
    ADD COLUMN `img` VARCHAR(191) NOT NULL,
    ADD COLUMN `quanti_emerg` INTEGER NOT NULL,
    ADD COLUMN `quantidade` INTEGER NOT NULL,
    ADD COLUMN `tamanho` DOUBLE NOT NULL;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `gmail` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_cpf_key`(`cpf`),
    UNIQUE INDEX `User_gmail_key`(`gmail`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Oreder` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userName` VARCHAR(191) NOT NULL,
    `userCpf` VARCHAR(191) NOT NULL,
    `itemID` INTEGER NOT NULL,
    `tamanho_total` DOUBLE NOT NULL,
    `tamanho` DOUBLE NOT NULL,
    `item_descricao` VARCHAR(191) NOT NULL,
    `item_fornecedor` VARCHAR(191) NOT NULL,
    `category_description` VARCHAR(191) NOT NULL,
    `category_name` VARCHAR(191) NOT NULL,
    `unidade` INTEGER NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Metalurgy` ADD CONSTRAINT `Metalurgy_categoryID_fkey` FOREIGN KEY (`categoryID`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
