/*
  Warnings:

  - The primary key for the `Lead` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `status` column on the `Lead` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `city` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobile` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `poc` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `since` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Lead` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lead" DROP CONSTRAINT "Lead_pkey",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "company" TEXT NOT NULL,
ADD COLUMN     "contact" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL DEFAULT 'India',
ADD COLUMN     "designation" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "lastTalk" TIMESTAMP(3),
ADD COLUMN     "mobile" TEXT NOT NULL,
ADD COLUMN     "next" TIMESTAMP(3),
ADD COLUMN     "poc" TEXT NOT NULL,
ADD COLUMN     "product" TEXT NOT NULL,
ADD COLUMN     "requirements" TEXT,
ADD COLUMN     "since" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "transferredOn" TIMESTAMP(3),
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'active',
ADD CONSTRAINT "Lead_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Lead_id_seq";
