import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authMiddleware, roleMiddleware } from '../../../middlewares/auth.middleware';
import { tenantMiddleware } from '../../../middlewares/tenant.middleware';
import { validate } from '../../../middlewares/validate.middleware';
import { createUserSchema, updateUserSchema, changePasswordSchema } from '../validators/user.validators';
import { Role } from '@prisma/client';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Management of users within a company
 */

router.use(authMiddleware);
router.use(tenantMiddleware);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: List all users in the tenant
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', roleMiddleware([Role.ADMIN]), UserController.listUsers);

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get current user profile
 *     tags: [Users]
 */
router.get('/profile', UserController.getProfile);

/**
 * @swagger
 * /api/users/change-password:
 *   put:
 *     summary: Change own password
 *     tags: [Users]
 */
router.put('/change-password', validate(changePasswordSchema), UserController.changePassword);

/**
 * @swagger
 * /api/users/:id:
 *   get:
 *     summary: Get a specific user details
 *     tags: [Users]
 */
router.get('/:id', roleMiddleware([Role.ADMIN]), UserController.getUser);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 */
router.post('/', roleMiddleware([Role.ADMIN]), validate(createUserSchema), UserController.createUser);

/**
 * @swagger
 * /api/users/:id:
 *   put:
 *     summary: Update an existing user
 *     tags: [Users]
 */
router.put('/:id', roleMiddleware([Role.ADMIN]), validate(updateUserSchema), UserController.updateUser);

/**
 * @swagger
 * /api/users/:id:
 *   delete:
 *     summary: Soft-delete a user (sets isActive to false)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', roleMiddleware([Role.ADMIN]), UserController.deleteUser);

export default router;
