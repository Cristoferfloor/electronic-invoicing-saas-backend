import { PrismaClient } from '@prisma/client';

// Instancia única de PrismaClient para evitar múltiples conexiones
const prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

export default prisma;
