import prisma from '../../../config/database';
import bcrypt from 'bcryptjs';

export class UserService {

    /**
     * Listar usuarios de un tenant con paginación y búsqueda
     */
    static async listUsers(tenantId: string, options: any) {
        const { page = 1, limit = 10, search = '', role, isActive } = options;
        const skip = (Number(page) - 1) * Number(limit);
        const take = Number(limit);

        const where: any = {
            tenantId,
            OR: [
                { firstName: { contains: search, mode: 'insensitive' } },
                { lastName: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
            ],
        };

        if (role) where.role = role;
        if (isActive !== undefined) where.isActive = isActive === 'true';

        const [users, total] = await Promise.all([
            prisma.user.findMany({
                where,
                skip,
                take,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    role: true,
                    isActive: true,
                    lastLogin: true,
                    createdAt: true,
                },
            }),
            prisma.user.count({ where }),
        ]);

        return {
            users,
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / Number(limit)),
        };
    }

    /**
     * Obtener un usuario por ID (verificando tenant)
     */
    static async getUserById(userId: string, tenantId: string) {
        const user = await prisma.user.findFirst({
            where: { id: userId, tenantId },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                role: true,
                isActive: true,
                lastLogin: true,
                createdAt: true,
            },
        });

        if (!user) throw new Error('Usuario no encontrado');
        return user;
    }

    /**
     * Crear un nuevo usuario en el tenant
     */
    static async createUser(tenantId: string, data: any) {
        const { firstName, lastName, email, password, role } = data;

        // Verificar si el email ya existe
        const existingUser = await prisma.user.findFirst({ where: { email } });
        if (existingUser) throw new Error('El correo electrónico ya está registrado');

        const passwordHash = await bcrypt.hash(password, 10);

        return await prisma.user.create({
            data: {
                tenantId,
                firstName,
                lastName,
                email,
                passwordHash,
                role,
                isActive: true,
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                role: true,
            },
        });
    }

    /**
     * Actualizar un usuario
     */
    static async updateUser(userId: string, tenantId: string, data: any) {
        const { firstName, lastName, role, isActive } = data;

        // Verificar que el usuario pertenezca al tenant
        const user = await prisma.user.findFirst({ where: { id: userId, tenantId } });
        if (!user) throw new Error('Usuario no encontrado en su empresa');

        // No permitir desactivar al último admin si se está intentando desactivar
        if (isActive === false && user.role === 'ADMIN') {
            const adminCount = await prisma.user.count({
                where: { tenantId, role: 'ADMIN', isActive: true }
            });
            if (adminCount <= 1) {
                throw new Error('No puede desactivar al único administrador de la empresa');
            }
        }

        return await prisma.user.update({
            where: { id: userId },
            data: {
                firstName,
                lastName,
                role,
                isActive,
            },
        });
    }

    /**
     * Cambio de contraseña
     */
    static async changePassword(userId: string, data: any) {
        const { currentPassword, newPassword } = data;

        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new Error('Usuario no encontrado');

        const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
        if (!isMatch) throw new Error('La contraseña actual es incorrecta');

        const passwordHash = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { id: userId },
            data: { passwordHash },
        });

        // Revocar tokens después de cambio de contraseña podría ser buena idea
        await prisma.refreshToken.deleteMany({ where: { userId } });
    }
}
