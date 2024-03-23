/*
  Warnings:

  - The `min` column on the `performance` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "performance" DROP COLUMN "min",
ADD COLUMN     "min" INTEGER;
