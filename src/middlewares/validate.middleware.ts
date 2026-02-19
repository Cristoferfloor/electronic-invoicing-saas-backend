import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodError } from 'zod';

/**
 * Middleware de validación genérico para esquemas Zod
 * @param schema Esquema de Zod a validar
 */
export const validate = (schema: ZodObject<any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    success: false,
                    message: 'Error de validación',
                    errors: error.issues.map((err: any) => ({
                        field: err.path.join('.'),
                        message: err.message
                    }))
                });
            }
            return res.status(500).json({
                success: false,
                message: 'Error interno en la validación'
            });
        }
    };
};
