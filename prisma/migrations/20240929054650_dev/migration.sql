/*
  Warnings:

  - You are about to alter the column `quantidade` on the `metalurgy` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `quantidade` on the `oreder` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `metalurgy` MODIFY `quantidade` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `oreder` MODIFY `quantidade` DOUBLE NOT NULL;
