import prisma from '../../../config/database';

export class TenantService {
    /**
     * Obtener los datos del tenant actual incluyendo su configuración de facturación
     */
    static async getTenant(tenantId: string) {
        const tenant = await prisma.tenant.findUnique({
            where: { id: tenantId },
            include: {
                configuration: true,
                _count: {
                    select: {
                        users: true,
                        invoices: true,
                    },
                },
            },
        });

        if (!tenant) {
            throw new Error('Tenant not found');
        }

        return tenant;
    }

    /**
     * Actualizar datos básicos del tenant
     */
    static async updateTenant(tenantId: string, data: any) {
        const { commercialName, legalName, address, phone, email } = data;

        return await prisma.tenant.update({
            where: { id: tenantId },
            data: {
                commercialName,
                legalName,
                address,
                phone,
                email,
            },
        });
    }

    /**
     * Actualizar configuración de facturación del tenant
     */
    static async updateBillingConfig(tenantId: string, data: any) {
        const { establishment, emissionPoint, environment } = data;

        // Verificar si ya existe configuración
        const config = await prisma.billingConfiguration.findUnique({
            where: { tenantId },
        });

        if (config) {
            return await prisma.billingConfiguration.update({
                where: { tenantId },
                data: {
                    establishment,
                    emissionPoint,
                    environment,
                },
            });
        } else {
            return await prisma.billingConfiguration.create({
                data: {
                    tenantId,
                    establishment,
                    emissionPoint,
                    environment,
                    emissionType: 1, // Default Normal
                },
            });
        }
    }

    /**
     * Actualizar el logo del tenant
     */
    static async updateLogo(tenantId: string, logoUrl: string) {
        return await prisma.tenant.update({
            where: { id: tenantId },
            data: { logoUrl },
        });
    }
}
