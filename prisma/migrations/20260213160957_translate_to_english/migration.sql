/*
  Warnings:

  - You are about to drop the column `direccion` on the `tenants` table. All the data in the column will be lost.
  - You are about to drop the column `estado_activo` on the `tenants` table. All the data in the column will be lost.
  - You are about to drop the column `logo_url` on the `tenants` table. All the data in the column will be lost.
  - You are about to drop the column `nombre_comercial` on the `tenants` table. All the data in the column will be lost.
  - You are about to drop the column `razon_social` on the `tenants` table. All the data in the column will be lost.
  - You are about to drop the column `ruc` on the `tenants` table. All the data in the column will be lost.
  - You are about to drop the column `telefono` on the `tenants` table. All the data in the column will be lost.
  - You are about to drop the `clientes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `configuracion_facturacion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `factura_detalles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `facturas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `productos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuarios` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[taxId]` on the table `tenants` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `tenants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `commercialName` to the `tenants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `legalName` to the `tenants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taxId` to the `tenants` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SriEnvironment" AS ENUM ('TEST', 'PRODUCTION');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "IdentityType" AS ENUM ('RUC', 'ID_CARD', 'PASSPORT');

-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('GOOD', 'SERVICE');

-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('DRAFT', 'ISSUED', 'AUTHORIZED', 'NOT_AUTHORIZED', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "clientes" DROP CONSTRAINT "clientes_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "configuracion_facturacion" DROP CONSTRAINT "configuracion_facturacion_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "factura_detalles" DROP CONSTRAINT "factura_detalles_facturaId_fkey";

-- DropForeignKey
ALTER TABLE "factura_detalles" DROP CONSTRAINT "factura_detalles_productId_fkey";

-- DropForeignKey
ALTER TABLE "facturas" DROP CONSTRAINT "facturas_clienteId_fkey";

-- DropForeignKey
ALTER TABLE "facturas" DROP CONSTRAINT "facturas_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "productos" DROP CONSTRAINT "productos_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "refresh_tokens" DROP CONSTRAINT "refresh_tokens_userId_fkey";

-- DropForeignKey
ALTER TABLE "usuarios" DROP CONSTRAINT "usuarios_tenantId_fkey";

-- DropIndex
DROP INDEX "tenants_ruc_key";

-- AlterTable
ALTER TABLE "tenants" DROP COLUMN "direccion",
DROP COLUMN "estado_activo",
DROP COLUMN "logo_url",
DROP COLUMN "nombre_comercial",
DROP COLUMN "razon_social",
DROP COLUMN "ruc",
DROP COLUMN "telefono",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "commercialName" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "legalName" TEXT NOT NULL,
ADD COLUMN     "logoUrl" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "taxId" TEXT NOT NULL;

-- DropTable
DROP TABLE "clientes";

-- DropTable
DROP TABLE "configuracion_facturacion";

-- DropTable
DROP TABLE "factura_detalles";

-- DropTable
DROP TABLE "facturas";

-- DropTable
DROP TABLE "productos";

-- DropTable
DROP TABLE "usuarios";

-- DropEnum
DROP TYPE "AmbienteSri";

-- DropEnum
DROP TYPE "EstadoFactura";

-- DropEnum
DROP TYPE "Rol";

-- DropEnum
DROP TYPE "TipoIdentificacion";

-- DropEnum
DROP TYPE "TipoProducto";

-- CreateTable
CREATE TABLE "billing_configurations" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "establishment" TEXT NOT NULL DEFAULT '001',
    "emissionPoint" TEXT NOT NULL DEFAULT '001',
    "currentSequential" INTEGER NOT NULL DEFAULT 1,
    "environment" "SriEnvironment" NOT NULL DEFAULT 'TEST',
    "emissionType" INTEGER NOT NULL DEFAULT 1,
    "electronicSignature" TEXT,
    "signaturePassword" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "billing_configurations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastLogin" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "identityType" "IdentityType" NOT NULL,
    "identityNumber" TEXT NOT NULL,
    "legalName" TEXT NOT NULL,
    "address" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "unitPrice" DECIMAL(10,2) NOT NULL,
    "type" "ProductType" NOT NULL DEFAULT 'GOOD',
    "applyVat" BOOLEAN NOT NULL DEFAULT true,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "sequentialNumber" TEXT NOT NULL,
    "series" TEXT NOT NULL,
    "numericSequential" INTEGER NOT NULL,
    "accessKey" TEXT NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL,
    "clientId" TEXT NOT NULL,
    "subtotalWithoutVat" DECIMAL(12,2) NOT NULL,
    "subtotalWithVat" DECIMAL(12,2) NOT NULL,
    "totalDiscount" DECIMAL(12,2) NOT NULL,
    "subtotal" DECIMAL(12,2) NOT NULL,
    "totalVat" DECIMAL(12,2) NOT NULL,
    "total" DECIMAL(12,2) NOT NULL,
    "status" "InvoiceStatus" NOT NULL DEFAULT 'ISSUED',
    "generatedXml" TEXT,
    "sriErrorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice_details" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" DECIMAL(10,2) NOT NULL,
    "unitPrice" DECIMAL(10,2) NOT NULL,
    "discount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "subtotal" DECIMAL(12,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invoice_details_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "billing_configurations_tenantId_key" ON "billing_configurations"("tenantId");

-- CreateIndex
CREATE INDEX "users_tenantId_idx" ON "users"("tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "users_tenantId_email_key" ON "users"("tenantId", "email");

-- CreateIndex
CREATE INDEX "clients_tenantId_idx" ON "clients"("tenantId");

-- CreateIndex
CREATE INDEX "products_tenantId_idx" ON "products"("tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "products_tenantId_code_key" ON "products"("tenantId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "invoices_accessKey_key" ON "invoices"("accessKey");

-- CreateIndex
CREATE INDEX "invoices_tenantId_idx" ON "invoices"("tenantId");

-- CreateIndex
CREATE INDEX "invoices_clientId_idx" ON "invoices"("clientId");

-- CreateIndex
CREATE INDEX "invoices_issueDate_idx" ON "invoices"("issueDate");

-- CreateIndex
CREATE INDEX "invoice_details_invoiceId_idx" ON "invoice_details"("invoiceId");

-- CreateIndex
CREATE UNIQUE INDEX "tenants_taxId_key" ON "tenants"("taxId");

-- AddForeignKey
ALTER TABLE "billing_configurations" ADD CONSTRAINT "billing_configurations_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_details" ADD CONSTRAINT "invoice_details_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_details" ADD CONSTRAINT "invoice_details_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
