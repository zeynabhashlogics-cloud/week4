/*
  Warnings:

  - You are about to alter the column `title` on the `tasks` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `status` on the `tasks` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `priority` on the `tasks` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.

*/
-- DropIndex
DROP INDEX "tasks_id_userId_key";

-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "title" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "status" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "priority" SET DATA TYPE VARCHAR(20);

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "name" SET DATA TYPE TEXT;
