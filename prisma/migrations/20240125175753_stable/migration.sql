/*
  Warnings:

  - You are about to drop the column `dateTimeSubmitted` on the `jobs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "dateTimeSubmitted",
ADD COLUMN     "dateTimePosted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
