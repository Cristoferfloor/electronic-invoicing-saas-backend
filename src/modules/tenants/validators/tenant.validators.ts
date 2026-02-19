import { z } from 'zod';

/**
 * Esquema para actualización de datos básicos del tenant
 */
export const updateTenantSchema = z.object({
    commercialName: z.string().min(2, 'El nombre comercial debe tener al menos 2 caracteres').optional(),
    legalName: z.string().min(2, 'La razón social debe tener al menos 2 caracteres').optional(),
    address: z.string().min(5, 'La dirección debe ser más descriptiva').optional(),
    phone: z.string().optional(),
    email: z.string().email('Email inválido').optional(),
});

/**
 * Esquema para configuración de facturación (SRI)
 */
export const updateBillingConfigSchema = z.object({
    establishment: z.string().length(3, 'El código de establecimiento debe tener 3 dígitos').regex(/^\d+$/, 'Solo números'),
    emissionPoint: z.string().length(3, 'El código de punto de emisión debe tener 3 dígitos').regex(/^\d+$/, 'Solo números'),
    environment: z.enum(['TEST', 'PRODUCTION']),
});

/**
 * Esquema para carga de logo
 */
export const uploadLogoSchema = z.object({
    logoUrl: z.string().url('URL de logo inválida'),
});

export type UpdateTenantDto = z.infer<typeof updateTenantSchema>;
export type UpdateBillingConfigDto = z.infer<typeof updateBillingConfigSchema>;
export type UploadLogoDto = z.infer<typeof uploadLogoSchema>;
