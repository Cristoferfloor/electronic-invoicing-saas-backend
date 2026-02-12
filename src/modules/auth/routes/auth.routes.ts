import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Endpoints para gestión de sesiones y registro de empresas
 */

/**
 * @swagger
 * /api/auth/register-tenant:
 *   post:
 *     summary: Registrar una nueva empresa (Tenant) y usuario administrador
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre_comercial
 *               - razon_social
 *               - ruc
 *               - direccion
 *               - email_empresa
 *               - nombre
 *               - apellido
 *               - email_admin
 *               - password
 *             properties:
 *               nombre_comercial:
 *                 type: string
 *                 example: "Mi Empresa S.A."
 *               razon_social:
 *                 type: string
 *                 example: "Mi Empresa Soluciones Cia. Ltda."
 *               ruc:
 *                 type: string
 *                 description: RUC válido de 13 dígitos
 *                 example: "1799999999001"
 *               direccion:
 *                 type: string
 *                 example: "Av. Amazonas y Naciones Unidas"
 *               telefono:
 *                 type: string
 *                 example: "0999999999"
 *               email_empresa:
 *                 type: string
 *                 format: email
 *                 example: "contacto@miempresa.com"
 *               nombre:
 *                 type: string
 *                 description: Nombre del administrador
 *                 example: "Juan"
 *               apellido:
 *                 type: string
 *                 description: Apellido del administrador
 *                 example: "Perez"
 *               email_admin:
 *                 type: string
 *                 format: email
 *                 description: Email para inicio de sesión del admin
 *                 example: "admin@miempresa.com"
 *               password:
 *                 type: string
 *                 description: Mínimo 8 caracteres, 1 mayúscula, 1 número
 *                 example: "Segura123."
 *     responses:
 *       201:
 *         description: Empresa registrada exitosamente
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
 *                         nombre_comercial:
 *                           type: string
 *                     accessToken:
 *                       type: string
 *                     refreshToken:
 *                       type: string
 *       400:
 *         description: Error de validación o datos duplicados
 */
router.post('/register-tenant', AuthController.registerTenant);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Autenticación]
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
 *         description: Login exitoso
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
 *                         rol:
 *                           type: string
 *                     accessToken:
 *                       type: string
 *                     refreshToken:
 *                       type: string
 *       401:
 *         description: Credenciales inválidas
 */
router.post('/login', AuthController.login);

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Renovar Access Token usando Refresh Token
 *     tags: [Autenticación]
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
 *                 example: "uuid-refresh-token-aqui"
 *     responses:
 *       200:
 *         description: Token renovado exitosamente
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
 *         description: Token inválido o expirado
 */
router.post('/refresh', AuthController.refreshToken);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Cerrar sesión (Cliente debe descartar tokens)
 *     tags: [Autenticación]
 *     responses:
 *       200:
 *         description: Sesión cerrada correctamente
 */
router.post('/logout', AuthController.logout);

export default router;

