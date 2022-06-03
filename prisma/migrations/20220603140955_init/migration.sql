-- CreateTable
CREATE TABLE "citizens" (
    "citizenId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "socialSecuriyId" TEXT NOT NULL,
    "healthSecurityId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dateOfBirth" TEXT NOT NULL,

    CONSTRAINT "citizens_pkey" PRIMARY KEY ("citizenId")
);

-- CreateIndex
CREATE UNIQUE INDEX "citizens_socialSecuriyId_key" ON "citizens"("socialSecuriyId");

-- CreateIndex
CREATE UNIQUE INDEX "citizens_healthSecurityId_key" ON "citizens"("healthSecurityId");
