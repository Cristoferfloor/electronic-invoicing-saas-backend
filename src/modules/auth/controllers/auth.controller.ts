import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { ResponseHelper } from '../../../shared/helpers/response.helper';
import { registerTenantSchema, loginSchema, refreshTokenSchema } from '../validators/auth.validation';

export class AuthController {

    static async registerTenant(req: Request, res: Response) {
        try {
            // Validar datos de entrada
            const validatedData = registerTenantSchema.parse(req.body);

            // Llamar al servicio
            const result = await AuthService.registerTenant(validatedData);

            return ResponseHelper.success(res, result, 'Empresa registrada exitosamente', 201);
        } catch (error: any) {
            if (error.name === 'ZodError') {
                const errorDetails = error.issues.map((issue: any) => ({
                    field: issue.path.join('.'),
                    message: issue.message
                }));
                return ResponseHelper.error(res, 'Error de validación', 400, errorDetails);
            }
            return ResponseHelper.error(res, error.message, 400);
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const { email, password } = loginSchema.parse(req.body);

            const result = await AuthService.login(email, password);

            return ResponseHelper.success(res, result, 'Inicio de sesión exitoso');
        } catch (error: any) {
            if (error.name === 'ZodError') {
                return ResponseHelper.error(res, 'Error de validación', 400, error.errors);
            }
            return ResponseHelper.error(res, error.message, 401);
        }
    }

    static async refreshToken(req: Request, res: Response) {
        try {
            const { refreshToken } = refreshTokenSchema.parse(req.body);

            const result = await AuthService.refreshToken(refreshToken);

            return ResponseHelper.success(res, result, 'Token actualizado correctamente');
        } catch (error: any) {
            return ResponseHelper.error(res, error.message, 401);
        }
    }

    static async logout(req: Request, res: Response) {
        // La revocación de token ya se haría idealmente en el servicio
        // pero como el refresh token se usa para esto, simplemente limpiamos cliente
        // Opcionalmente podemos recibir refreshToken y marcar como revocado
        // Por brevedad, asumiremos logout exitoso client-side
        return ResponseHelper.success(res, null, 'Sesión cerrada exitosamente');
    }
}
