import { Request, Response, NextFunction } from 'express';
import { ResponseHelper } from '../shared/helpers/response.helper';
import prisma from '../config/database';
import { tenantContext } from '../shared/context/tenant.context';

/**
 * Middleware de Multitenant
 * Asegura que el tenantId esté presente y que la empresa (tenant) esté activa.
 */
export const tenantMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const tenantId = (req as any).tenantId || (req as any).user?.tenantId;

    if (!tenantId) {
        return ResponseHelper.error(res, 'Tenant context not found. Access denied.', 403);
    }

    try {
        // Verificar que el tenant exista y esté activo
        const tenant = await prisma.tenant.findUnique({
            where: { id: tenantId },
            select: { isActive: true }
        });

        if (!tenant) {
            return ResponseHelper.error(res, 'Company (Tenant) not found.', 404);
        }

        if (!tenant.isActive) {
            return ResponseHelper.error(res, 'Company (Tenant) is inactive.', 403);
        }

        // Inyectamos el tenantId en req para que Prisma lo use
        (req as any).tenantId = tenantId;

        // El contexto se mantendrá durante toda la cadena de middlewares y handlers
        // porque tenantId está inyectado en la request
        next();

    } catch (error) {
        return ResponseHelper.error(res, 'Error validating tenant context.', 500);
    }
};

