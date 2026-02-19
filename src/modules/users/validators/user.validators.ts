import { z } from 'zod';

const passwordSchema = z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'La contraseña debe contener al menos una mayúscula')
    .regex(/[a-z]/, 'La contraseña debe contener al menos una minúscula')
    .regex(/\d/, 'La contraseña debe contener al menos un número');

/**
 * Schema for creating a new user in the tenant
 */
export const createUserSchema = z.object({
    firstName: z
        .string()
        .trim()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(100, 'El nombre no puede superar los 100 caracteres'),

    lastName: z
        .string()
        .trim()
        .min(2, 'El apellido debe tener al menos 2 caracteres')
        .max(100, 'El apellido no puede superar los 100 caracteres'),

    email: z
        .string()
        .email('El correo electrónico no tiene un formato válido')
        .toLowerCase(),

    password: passwordSchema,

    role: z.enum(['ADMIN', 'USER']).optional().default('USER'),
});

/**
 * Schema for updating an existing user
 */
export const updateUserSchema = z.object({
    firstName: z
        .string()
        .trim()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(100, 'El nombre no puede superar los 100 caracteres')
        .optional(),

    lastName: z
        .string()
        .trim()
        .min(2, 'El apellido debe tener al menos 2 caracteres')
        .max(100, 'El apellido no puede superar los 100 caracteres')
        .optional(),

    role: z.enum(['ADMIN', 'USER']).optional(),

    isActive: z.boolean().optional(),
});

/**
 * Schema for changing the current user's password
 */
export const changePasswordSchema = z
    .object({
        currentPassword: z.string().min(1, 'La contraseña actual es requerida'),
        newPassword: passwordSchema,
        confirmPassword: z.string().min(1, 'Confirma la nueva contraseña'),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: 'Las contraseñas no coinciden',
        path: ['confirmPassword'],
    });

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
export type ChangePasswordDto = z.infer<typeof changePasswordSchema>;
