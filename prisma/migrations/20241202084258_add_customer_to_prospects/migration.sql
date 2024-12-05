/*
  Warnings:

  - You are about to drop the column `estimatedValue` on the `Prospect` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Prospect` table. All the data in the column will be lost.
  - You are about to drop the column `probability` on the `Prospect` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Prospect` table. All the data in the column will be lost.
  - Added the required column `company` to the `Prospect` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Prospect` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Prospect` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobile` to the `Prospect` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stage` to the `Prospect` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Prospect` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Prospect" DROP COLUMN "estimatedValue",
DROP COLUMN "notes",
DROP COLUMN "probability",
DROP COLUMN "status",
ADD COLUMN     "businessProspect" DOUBLE PRECISION,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "company" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL DEFAULT 'India',
ADD COLUMN     "email" TEXT,
ADD COLUMN     "executive" TEXT,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "industry" TEXT,
ADD COLUMN     "isCustomer" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isFriend" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isNeighbour" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isProspect" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isSupplier" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "mobile" TEXT NOT NULL,
ADD COLUMN     "orderTarget" DOUBLE PRECISION,
ADD COLUMN     "product" TEXT,
ADD COLUMN     "stage" TEXT NOT NULL,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "website" TEXT;
