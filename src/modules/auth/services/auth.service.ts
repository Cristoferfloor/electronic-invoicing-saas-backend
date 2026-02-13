import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import prisma from '../../../config/database';
import { Role } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret';
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '3600'; // 1 hour
const REFRESH_TOKEN_EXPIRATION = 7 * 24 * 60 * 60; // 7 days

export class AuthService {

    // Generate Tokens
    static generateTokens(userId: string, tenantId: string, role: string) {
        const accessToken = jwt.sign(
            { userId, tenantId, role },
            JWT_SECRET,
            { expiresIn: Number(JWT_EXPIRATION) || '1h' }
        );

        const refreshToken = uuidv4();

        return { accessToken, refreshToken };
    }

    // Register Tenant + Admin User
    static async registerTenant(data: any) {
        const {
            commercialName, legalName, taxId, address, phone, email, // Tenant Data
            firstName, lastName, adminEmail, password // Admin Data
        } = data;

        // Verify uniqueness
        const existingTenant = await prisma.tenant.findUnique({ where: { taxId } });
        if (existingTenant) throw new Error('The TAX ID (RUC) is already registered');

        const existingUser = await prisma.user.findFirst({ where: { email: adminEmail } });
        if (existingUser) throw new Error('The administrator email is already registered');

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10);

        // Transaction to create everything together
        const result = await prisma.$transaction(async (tx) => {
            // 1. Create Tenant
            const newTenant = await tx.tenant.create({
                data: {
                    commercialName,
                    legalName,
                    taxId,
                    address,
                    phone,
                    email,
                    plan: 'FREE',
                    configuration: {
                        create: {
                            establishment: '001',
                            emissionPoint: '001',
                            environment: 'TEST',
                            emissionType: 1
                        }
                    }
                }
            });

            // 2. Create Admin User
            const newUser = await tx.user.create({
                data: {
                    tenantId: newTenant.id,
                    firstName,
                    lastName,
                    email: adminEmail,
                    passwordHash: passwordHash,
                    role: Role.ADMIN,
                    isActive: true
                }
            });

            return { tenant: newTenant, user: newUser };
        });

        // Generate tokens
        const tokens = this.generateTokens(result.user.id, result.tenant.id, Role.ADMIN);

        // Save Refresh Token
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
                firstName: result.user.firstName,
                role: result.user.role
            },
            ...tokens
        };
    }

    // Login
    static async login(email: string, password: string) {
        // Search user
        const user = await prisma.user.findFirst({
            where: { email },
            include: { tenant: true }
        });

        if (!user) throw new Error('Invalid credentials');
        if (!user.isActive) throw new Error('User is inactive');
        if (!user.tenant.isActive) throw new Error('The company is inactive');

        // Verify password
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) throw new Error('Invalid credentials');

        // Generate new tokens
        const tokens = this.generateTokens(user.id, user.tenantId, user.role);

        // Save Refresh Token
        await prisma.refreshToken.create({
            data: {
                userId: user.id,
                token: tokens.refreshToken,
                expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRATION * 1000)
            }
        });

        // Update last login
        await prisma.user.update({
            where: { id: user.id },
            data: { lastLogin: new Date() }
        });

        return {
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
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
            include: { user: true }
        });

        if (!storedToken) throw new Error('Invalid refresh token');
        if (storedToken.isRevoked) throw new Error('Refresh token has been revoked');
        if (storedToken.expiresAt < new Date()) throw new Error('Refresh token has expired');

        const user = storedToken.user;
        const newTokens = this.generateTokens(user.id, user.tenantId, user.role);

        // Revoke the used one and create a new one (Refresh Token Rotation)
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
