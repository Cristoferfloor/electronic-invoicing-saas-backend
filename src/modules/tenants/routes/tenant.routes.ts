import { Router } from 'express';
import { TenantController } from '../controllers/tenant.controller';
import { authMiddleware, roleMiddleware } from '../../../middlewares/auth.middleware';
import { tenantMiddleware } from '../../../middlewares/tenant.middleware';
import { validate } from '../../../middlewares/validate.middleware';
import { updateTenantSchema, updateBillingConfigSchema, uploadLogoSchema } from '../validators/tenant.validators';
import { Role } from '@prisma/client';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tenants
 *   description: Management of the company and billing configuration
 */

// Todas las rutas de tenant requieren autenticación y estar ligadas a un tenant
router.use(authMiddleware);
router.use(tenantMiddleware);

/**
 * @swagger
 * /api/tenant:
 *   get:
 *     summary: Get current tenant data
 *     tags: [Tenants]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tenant data retrieved successfully
 */
router.get('/', TenantController.getMyTenant);

/**
 * @swagger
 * /api/tenant:
 *   put:
 *     summary: Update basic tenant information
 *     tags: [Tenants]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               commercialName:
 *                 type: string
 *               legalName:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tenant updated successfully
 */
router.put('/', roleMiddleware([Role.ADMIN]), validate(updateTenantSchema), TenantController.updateMyTenant);

/**
 * @swagger
 * /api/tenant/billing-config:
 *   put:
 *     summary: Update SRI billing configuration
 *     tags: [Tenants]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               establishment:
 *                 type: string
 *                 example: "001"
 *               emissionPoint:
 *                 type: string
 *                 example: "001"
 *               environment:
 *                 type: string
 *                 enum: [TEST, PRODUCTION]
 *     responses:
 *       200:
 *         description: Billing configuration updated successfully
 */
router.put('/billing-config', roleMiddleware([Role.ADMIN]), validate(updateBillingConfigSchema), TenantController.updateBillingConfig);

/**
 * @swagger
 * /api/tenant/upload-logo:
 *   post:
 *     summary: Update company logo
 *     tags: [Tenants]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               logoUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Logo updated successfully
 */
router.post('/upload-logo', roleMiddleware([Role.ADMIN]), validate(uploadLogoSchema), TenantController.uploadLogo);

export default router;
