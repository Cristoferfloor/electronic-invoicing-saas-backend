import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import prisma from '../../../config/database';
import { Rol } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret';
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '3600'; // 1 hora
const REFRESH_TOKEN_EXPIRATION = 7 * 24 * 60 * 60; // 7 días

export class AuthService {

    // Generar Tokens
    static generateTokens(userId: string, tenantId: string, rol: string) {
        const accessToken = jwt.sign(
            { userId, tenantId, rol },
            JWT_SECRET,
            { expiresIn: Number(JWT_EXPIRATION) || '1h' }
        );

        const refreshToken = uuidv4();

        return { accessToken, refreshToken };
    }

    // Registro de Tenant + Usuario Admin
    static async registerTenant(data: any) {
        const {
            nombre_comercial, razon_social, ruc, direccion, telefono, email_empresa, // Datos Tenant
            nombre, apellido, email_admin, password // Datos Admin
        } = data;

        // Verificar unicidad
        const existingTenant = await prisma.tenant.findUnique({ where: { ruc } });
        if (existingTenant) throw new Error('El RUC ya está registrado');

        const existingUser = await prisma.usuario.findFirst({ where: { email: email_admin } });
        // Nota: El email admin podría repetirse en DIFERENTES tenants en un sistema multitenant real, 
        // pero para seguridad inicial, evitamos admins duplicados globalmente si se prefiere,
        // o validamos por tenant. Aquí validamos global para evitar confusiones al inicio.
        if (existingUser) throw new Error('El email del administrador ya está registrado');

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10);

        // Transacción para crear todo junto
        const result = await prisma.$transaction(async (tx) => {
            // 1. Crear Tenant
            const newTenant = await tx.tenant.create({
                data: {
                    nombre_comercial,
                    razon_social,
                    ruc,
                    direccion,
                    telefono,
                    email: email_empresa,
                    plan: 'FREE',
                    configuracion: {
                        create: {
                            establecimiento: '001',
                            punto_emision: '001',
                            ambiente: 'PRUEBAS',
                            tipo_emision: 1
                        }
                    }
                }
            });

            // 2. Crear Usuario Admin
            const newUser = await tx.usuario.create({
                data: {
                    tenantId: newTenant.id,
                    nombre,
                    apellido,
                    email: email_admin,
                    password_hash: passwordHash,
                    rol: Rol.ADMIN,
                    activo: true
                }
            });

            return { tenant: newTenant, user: newUser };
        });

        // Generar tokens
        const tokens = this.generateTokens(result.user.id, result.tenant.id, Rol.ADMIN);

        // Guardar Refresh Token
        await prisma.refreshToken.create({
            data: {
                userId: result.user.id,
                token: tokens.refreshToken,
                expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRATION * 1000)
            }
        });

        return {
            tenant: result.tenant,
            user: {
                id: result.user.id,
                email: result.user.email,
                nombre: result.user.nombre,
                rol: result.user.rol
            },
            ...tokens
        };
    }

    // Login
    static async login(email: string, password: string) {
        // Buscar usuario en todos los tenants (email es único junto con tenantId, pero aquí asumimos login global por email)
        // Si se permite mismo email en varios tenants, el login debería pedir tenantId o listar opciones.
        // Asumiremos email único global para simplificar o buscaremos el primero.

        // Buscar usuario
        const user = await prisma.usuario.findFirst({
            where: { email },
            include: { tenant: true }
        });

        if (!user) throw new Error('Credenciales inválidas');
        if (!user.activo) throw new Error('Usuario inactivo');
        if (!user.tenant.estado_activo) throw new Error('La empresa está inactiva');

        // Verificar password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) throw new Error('Credenciales inválidas');

        // Generar nuevos tokens
        const tokens = this.generateTokens(user.id, user.tenantId, user.rol);

        // Guardar Refresh Token (y limpiar viejos si se desea)
        await prisma.refreshToken.create({
            data: {
                userId: user.id,
                token: tokens.refreshToken,
                expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRATION * 1000)
            }
        });

        // Actualizar último login
        await prisma.usuario.update({
            where: { id: user.id },
            data: { last_login: new Date() }
        });

        return {
            user: {
                id: user.id,
                email: user.email,
                nombre: user.nombre,
                apellido: user.apellido,
                rol: user.rol,
                tenantId: user.tenantId
            },
            tenant: user.tenant,
            ...tokens
        };
    }

    // Refresh Token
    static async refreshToken(token: string) {
        const storedToken = await prisma.refreshToken.findUnique({
            where: { token },
            include: { usuario: true }
        });

        if (!storedToken) throw new Error('Refresh token inválido');
        if (storedToken.isRevoked) throw new Error('Refresh token revocado');
        if (storedToken.expiresAt < new Date()) throw new Error('Refresh token expirado');

        const user = storedToken.usuario;
        const newTokens = this.generateTokens(user.id, user.tenantId, user.rol);

        // Revocar el usado y crear nuevo (Rotación de Refresh Tokens)
        await prisma.$transaction([
            prisma.refreshToken.update({
                where: { id: storedToken.id },
                data: { isRevoked: true }
            }),
            prisma.refreshToken.create({
                data: {
                    userId: user.id,
                    token: newTokens.refreshToken,
                    expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRATION * 1000)
                }
            })
        ]);

        return newTokens;
    }
}
