import { z } from 'zod';

export const registerTenantSchema = z.object({
    // Company Data
    commercialName: z.string().min(3, 'Commercial name must be at least 3 characters long'),
    legalName: z.string().min(3, 'Legal name must be at least 3 characters long'),
    taxId: z.string().length(13, 'TAX ID (RUC) must be exactly 13 digits long').regex(/^\d+$/, 'TAX ID can only contain numbers'),
    address: z.string().min(5, 'Address is required'),
    phone: z.string().optional(),
    logoUrl: z.string().optional(),
    email: z.string().email('Invalid company email'),

    // Administrator Data
    firstName: z.string().min(2, 'First name must be at least 2 characters long'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters long'),
    adminEmail: z.string().email('Invalid administrator email'),
    password: z.string().min(8, 'Password must be at least 8 characters long')
        .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
        .regex(/[0-9]/, 'Must contain at least one number'),
});

export const loginSchema = z.object({
    email: z.string().min(1, 'Identifier (Email or RUC) is required'),
    password: z.string().min(1, 'Password is required'),
});

export const refreshTokenSchema = z.object({
    refreshToken: z.string().min(1, 'Refresh token is required'),
});
