/*
  Warnings:

  - Added the required column `dateTimeUpdated` to the `resumes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateTimeUpdated` to the `userActivities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "resumes" ADD COLUMN     "dateTimeCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dateTimeUpdated" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "userActivities" ADD COLUMN     "dateTimeUpdated" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "openai" (
    "threadId" TEXT NOT NULL,
    "runId" TEXT NOT NULL,
    "dateTimeCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "openai_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "openai_userId_key" ON "openai"("userId");

-- AddForeignKey
ALTER TABLE "openai" ADD CONSTRAINT "openai_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
