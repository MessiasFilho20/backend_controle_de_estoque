-- CreateTable
CREATE TABLE `category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `metalurgy` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `categoryID` INTEGER NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `fornecedor` VARCHAR(191) NOT NULL,
    `img` VARCHAR(191) NOT NULL,
    `quanti_emerg` INTEGER NOT NULL,
    `quantidade` DOUBLE NOT NULL,
    `tamanho` DOUBLE NOT NULL,

    INDEX `Metalurgy_categoryID_fkey`(`categoryID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `oreder` (
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
    `quantidade` DOUBLE NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
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
