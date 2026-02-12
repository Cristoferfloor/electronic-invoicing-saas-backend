import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ResponseHelper } from '../shared/helpers/response.helper';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return ResponseHelper.error(res, 'No se proporcionó token de autenticación', 401);
    }

    const token = authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
        return ResponseHelper.error(res, 'Formato de token inválido', 401);
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;

        // Inyectar datos en el request
        req.user = {
            userId: decoded.userId,
            tenantId: decoded.tenantId,
            rol: decoded.rol
        };
        req.tenantId = decoded.tenantId;

        next();
    } catch (error) {
        return ResponseHelper.error(res, 'Token inválido o expirado', 401);
    }
};

export const roleMiddleware = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return ResponseHelper.error(res, 'Usuario no autenticado', 401);
        }

        if (!allowedRoles.includes(req.user.rol)) {
            return ResponseHelper.error(res, 'No tienes permisos para realizar esta acción', 403);
        }

        next();
    };
};
