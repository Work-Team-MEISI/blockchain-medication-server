-- CreateTable
CREATE TABLE "medications" (
    "medicationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "signature" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "basePrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "medications_pkey" PRIMARY KEY ("medicationId")
);

-- CreateIndex
CREATE UNIQUE INDEX "medications_signature_key" ON "medications"("signature");
