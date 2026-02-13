import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting seed...');

    // 1. Create Demo Tenant
    const tenant = await prisma.tenant.upsert({
        where: { taxId: '1799999999001' },
        update: {},
        create: {
            commercialName: 'Empresa Demo SaaS',
            legalName: 'Empresa Demo S.A.',
            taxId: '1799999999001',
            address: 'Amazonas Av. and United Nations',
            email: 'contact@demo-company.com',
            phone: '0999999999',
            plan: 'PREMIUM',
            configuration: {
                create: {
                    establishment: '001',
                    emissionPoint: '001',
                    environment: 'TEST',
                    emissionType: 1
                }
            }
        },
    });

    console.log(`🏢 Tenant created: ${tenant.commercialName}`);

    // 2. Create Admin User
    const passwordHash = await bcrypt.hash('Admin123.', 10);

    const admin = await prisma.user.upsert({
        where: {
            tenantId_email: {
                tenantId: tenant.id,
                email: 'admin@demo.com'
            }
        },
        update: {},
        create: {
            tenantId: tenant.id,
            firstName: 'Super',
            lastName: 'Admin',
            email: 'admin@demo.com',
            passwordHash: passwordHash,
            role: Role.ADMIN,
            isActive: true
        },
    });

    console.log(`👤 Admin User created: ${admin.email} (Password: Admin123.)`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
