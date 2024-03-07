-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "dateTimeCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateTimeUpdated" TIMESTAMP(3) NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobs" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "requirements" TEXT[],
    "companyName" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "dateTimePosted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateTimeUpdated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userJobApplications" (
    "status" TEXT NOT NULL DEFAULT 'pending',
    "dateTimeApplied" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateTimeUpdated" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "jobId" INTEGER NOT NULL,

    CONSTRAINT "userJobApplications_pkey" PRIMARY KEY ("userId","jobId")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" SERIAL NOT NULL,
    "postalCode" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userActivities" (
    "userId" INTEGER NOT NULL,
    "searchHistory" TEXT[],
    "jobsVisited" INTEGER[],
    "dateTimeEmitted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateTimeUpdated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userActivities_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "resumes" (
    "objective" TEXT NOT NULL,
    "experience" TEXT[],
    "education" TEXT[],
    "skills" TEXT[],
    "additionalInformation" TEXT[],
    "dateTimeCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateTimeUpdated" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "resumes_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "generatedResumes" (
    "objective" TEXT NOT NULL,
    "experience" TEXT[],
    "education" TEXT[],
    "skills" TEXT[],
    "additionalInformation" TEXT[],
    "dateTimeCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateTimeUpdated" TIMESTAMP(3) NOT NULL,
    "userJobApplicationJobId" INTEGER NOT NULL,
    "userJobApplicationUserId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "openAI" (
    "threadId" TEXT NOT NULL,
    "runId" TEXT NOT NULL,
    "dateTimeCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "openAI_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "userJobApplications_jobId_userId_key" ON "userJobApplications"("jobId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "addresses_userId_key" ON "addresses"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "resumes_userId_key" ON "resumes"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "generatedResumes_userJobApplicationJobId_key" ON "generatedResumes"("userJobApplicationJobId");

-- CreateIndex
CREATE UNIQUE INDEX "generatedResumes_userJobApplicationUserId_key" ON "generatedResumes"("userJobApplicationUserId");

-- CreateIndex
CREATE UNIQUE INDEX "generatedResumes_userJobApplicationJobId_userJobApplication_key" ON "generatedResumes"("userJobApplicationJobId", "userJobApplicationUserId");

-- CreateIndex
CREATE UNIQUE INDEX "openAI_userId_key" ON "openAI"("userId");

-- AddForeignKey
ALTER TABLE "userJobApplications" ADD CONSTRAINT "userJobApplications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userJobApplications" ADD CONSTRAINT "userJobApplications_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userActivities" ADD CONSTRAINT "userActivities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resumes" ADD CONSTRAINT "resumes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "generatedResumes" ADD CONSTRAINT "generatedResumes_userJobApplicationJobId_userJobApplicatio_fkey" FOREIGN KEY ("userJobApplicationJobId", "userJobApplicationUserId") REFERENCES "userJobApplications"("jobId", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "openAI" ADD CONSTRAINT "openAI_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
