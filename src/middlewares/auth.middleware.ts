import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ResponseHelper } from '../shared/helpers/response.helper';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return ResponseHelper.error(res, 'No authentication token provided', 401);
    }

    const token = authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
        return ResponseHelper.error(res, 'Invalid token format', 401);
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;

        // Inject data into the request
        req.user = {
            userId: decoded.userId,
            tenantId: decoded.tenantId,
            role: decoded.role
        };
        req.tenantId = decoded.tenantId;

        next();
    } catch (error) {
        return ResponseHelper.error(res, 'Invalid or expired token', 401);
    }
};

export const roleMiddleware = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return ResponseHelper.error(res, 'User not authenticated', 401);
        }

        if (!allowedRoles.includes(req.user.role)) {
            return ResponseHelper.error(res, 'You do not have permission to perform this action', 403);
        }

        next();
    };
};
