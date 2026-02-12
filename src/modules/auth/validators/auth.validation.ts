import { z } from 'zod';

export const registerTenantSchema = z.object({
    // Datos de la Empresa
    nombre_comercial: z.string().min(3, 'El nombre comercial debe tener al menos 3 caracteres'),
    razon_social: z.string().min(3, 'La razón social debe tener al menos 3 caracteres'),
    ruc: z.string().length(13, 'El RUC debe tener exactamente 13 dígitos').regex(/^\d+$/, 'El RUC solo puede contener números'),
    direccion: z.string().min(5, 'La dirección es obligatoria'),
    telefono: z.string().optional(),
    email_empresa: z.string().email('Email de empresa inválido'),

    // Datos del Administrador
    nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    apellido: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
    email_admin: z.string().email('Email de administrador inválido'),
    password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres')
        .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
        .regex(/[0-9]/, 'Debe contener al menos un número'),
});

export const loginSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(1, 'La contraseña es obligatoria'),
});

export const refreshTokenSchema = z.object({
    refreshToken: z.string().min(1, 'El refresh token es obligatorio'),
});
