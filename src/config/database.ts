import { PrismaClient } from '@prisma/client';
import { tenantContext } from '../shared/context/tenant.context';

// Instancia base de PrismaClient
const prismaBase = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
});

/**
 * Extensión de Prisma para Multitenancy
 * Agrega automáticamente el filtro { tenantId } a todas las consultas
 * y asegura que los nuevos registros tengan el tenantId correcto.
 */
const prisma = prismaBase.$extends({
    query: {
        $allModels: {
            async $allOperations({ model, operation, args, query }) {
                // Intentar obtener tenantId del contexto primero
                let tenantId: string | undefined;
                
                try {
                    const context = tenantContext.getStore();
                    tenantId = context?.tenantId;
                } catch (e) {
                    // Si el contexto no funciona, ignorar
                }

                // Si no hay tenantId en el contexto, ejecutar sin filtro
                if (!tenantId) {
                    return query(args);
                }

                // Lista de modelos que NO tienen tenantId directo (globales o con relación 1:1 especial)
                const globalModels = ['Tenant', 'BillingConfiguration', 'RefreshToken'];
                if (globalModels.includes(model)) {
                    return query(args);
                }

                const extendedArgs = args as any;

                // Inyectar tenantId en operaciones de lectura/escritura
                if (['findMany', 'findFirst', 'count', 'aggregate', 'groupBy', 'update', 'updateMany', 'upsert', 'delete', 'deleteMany'].includes(operation)) {
                    extendedArgs.where = { ...extendedArgs.where, tenantId };
                } else if (operation === 'create') {
                    extendedArgs.data = { ...extendedArgs.data, tenantId };
                } else if (operation === 'createMany') {
                    if (Array.isArray(extendedArgs.data)) {
                        extendedArgs.data = extendedArgs.data.map((item: any) => ({ ...item, tenantId }));
                    }
                }

                return query(extendedArgs);
            },
        },
    },
});

export default prisma;
