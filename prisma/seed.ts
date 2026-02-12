import { PrismaClient, Rol } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Iniciando seed...');

    // 1. Crear Tenant Demo
    const tenant = await prisma.tenant.upsert({
        where: { ruc: '1799999999001' },
        update: {},
        create: {
            nombre_comercial: 'Empresa Demo SaaS',
            razon_social: 'Empresa Demo S.A.',
            ruc: '1799999999001',
            direccion: 'Av. Amazonas y Naciones Unidas',
            email: 'contacto@empresa-demo.com',
            telefono: '0999999999',
            plan: 'PREMIUM',
            configuracion: {
                create: {
                    establecimiento: '001',
                    punto_emision: '001',
                    ambiente: 'PRUEBAS',
                    tipo_emision: 1
                }
            }
        },
    });

    console.log(`🏢 Tenant creado: ${tenant.nombre_comercial}`);

    // 2. Crear Usuario Admin
    const passwordHash = await bcrypt.hash('Admin123.', 10);

    // Usamos findFirst porque el unique es compuesto en el modelo pero no en la API Fluent de prisma en upsert directo a veces
    // Para upsert con unique compuesto @@unique([tenantId, email]):
    const admin = await prisma.usuario.upsert({
        where: {
            tenantId_email: {
                tenantId: tenant.id,
                email: 'admin@demo.com'
            }
        },
        update: {},
        create: {
            tenantId: tenant.id,
            nombre: 'Super',
            apellido: 'Admin',
            email: 'admin@demo.com',
            password_hash: passwordHash,
            rol: Rol.ADMIN,
            activo: true
        },
    });

    console.log(`👤 Usuario Admin creado: ${admin.email} (Password: Admin123.)`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
