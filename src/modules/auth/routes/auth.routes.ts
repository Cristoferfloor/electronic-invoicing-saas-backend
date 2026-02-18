import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authMiddleware } from '../../../middlewares/auth.middleware';
import { tenantMiddleware } from '../../../middlewares/tenant.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Endpoints for session management and company registration
 */

/**
 * @swagger
 * /api/auth/register-tenant:
 *   post:
 *     summary: Register a new company (Tenant) and administrator user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - commercialName
 *               - legalName
 *               - taxId
 *               - address
 *               - email
 *               - firstName
 *               - lastName
 *               - adminEmail
 *               - password
 *             properties:
 *               commercialName:
 *                 type: string
 *                 example: "My Company S.A."
 *               legalName:
 *                 type: string
 *                 example: "My Company Solutions Cia. Ltda."
 *               taxId:
 *                 type: string
 *                 description: Valid 13-digit TAX ID (RUC)
 *                 example: "1799999999001"
 *               address:
 *                 type: string
 *                 example: "Amazonas Av. and United Nations"
 *               phone:
 *                 type: string
 *                 example: "0999999999"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "contact@mycompany.com"
 *               firstName:
 *                 type: string
 *                 description: Administrator's first name
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 description: Administrator's last name
 *                 example: "Doe"
 *               adminEmail:
 *                 type: string
 *                 format: email
 *                 description: Administrator's login email
 *                 example: "admin@mycompany.com"
 *               password:
 *                 type: string
 *                 description: Minimum 8 characters, 1 uppercase, 1 number
 *                 example: "Secure123."
 *     responses:
 *       201:
 *         description: Company registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     tenant:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         commercialName:
 *                           type: string
 *                     accessToken:
 *                       type: string
 *                     refreshToken:
 *                       type: string
 *       400:
 *         description: Validation error or duplicate data
 */
router.post('/register-tenant', AuthController.registerTenant);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "admin@demo.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "Admin123."
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id: 
 *                           type: string
 *                         email:
 *                           type: string
 *                         role:
 *                           type: string
 *                     accessToken:
 *                       type: string
 *                     refreshToken:
 *                       type: string
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', AuthController.login);

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Renew Access Token using Refresh Token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: "uuid-refresh-token-here"
 *     responses:
 *       200:
 *         description: Token renewed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                     refreshToken:
 *                       type: string
 *       401:
 *         description: Invalid or expired token
 */
router.post('/refresh', AuthController.refreshToken);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Log out (Client must discard tokens)
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Session closed successfully
 */
router.post('/logout', AuthController.logout);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current logged in user profile
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
 */
router.get('/me', authMiddleware, tenantMiddleware, AuthController.getProfile);

export default router;
