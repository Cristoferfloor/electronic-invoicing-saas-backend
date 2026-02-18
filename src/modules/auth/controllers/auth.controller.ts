import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { ResponseHelper } from '../../../shared/helpers/response.helper';
import { registerTenantSchema, loginSchema, refreshTokenSchema } from '../validators/auth.validation';

export class AuthController {

    static async registerTenant(req: Request, res: Response) {
        try {
            // Validate input data
            const validatedData = registerTenantSchema.parse(req.body);

            // Call service
            const result = await AuthService.registerTenant(validatedData);

            return ResponseHelper.success(res, result, 'Company registered successfully', 201);
        } catch (error: any) {
            if (error.name === 'ZodError' || (error.constructor && error.constructor.name === 'ZodError')) {
                const issues = error.issues || [];
                const errorDetails = issues.map((issue: any) => ({
                    field: issue.path.join('.'),
                    message: issue.message
                }));
                return ResponseHelper.error(res, 'Validation error', 400, errorDetails);
            }
            return ResponseHelper.error(res, error.message, 400);
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const { email, password } = loginSchema.parse(req.body);
            const result = await AuthService.login(email, password);

            return ResponseHelper.success(res, result, 'Login successful');
        } catch (error: any) {
            if (error.name === 'ZodError' || (error.constructor && error.constructor.name === 'ZodError')) {
                const issues = error.issues || [];
                const errorDetails = issues.map((issue: any) => ({
                    field: issue.path.join('.'),
                    message: issue.message
                }));
                return ResponseHelper.error(res, 'Validation error', 400, errorDetails);
            }
            return ResponseHelper.error(res, error.message, 401);
        }
    }

    static async refreshToken(req: Request, res: Response) {
        try {
            const { refreshToken } = refreshTokenSchema.parse(req.body);

            const result = await AuthService.refreshToken(refreshToken);

            return ResponseHelper.success(res, result, 'Token refreshed successfully');
        } catch (error: any) {
            return ResponseHelper.error(res, error.message, 401);
        }
    }

    static async getProfile(req: Request, res: Response) {
        try {
            const userId = req.user?.userId;
            if (!userId) throw new Error('User context not found');

            const result = await AuthService.getProfile(userId);
            return ResponseHelper.success(res, result, 'User profile retrieved');
        } catch (error: any) {
            return ResponseHelper.error(res, error.message, 404);
        }
    }

    static async logout(req: Request, res: Response) {
        try {
            const { refreshToken } = req.body;
            if (refreshToken) {
                await AuthService.logout(refreshToken);
            }
            return ResponseHelper.success(res, null, 'Logged out successfully');
        } catch (error: any) {
            return ResponseHelper.error(res, error.message, 500);
        }
    }
}
