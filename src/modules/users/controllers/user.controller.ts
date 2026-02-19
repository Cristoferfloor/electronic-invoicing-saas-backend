import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {

    static async listUsers(req: Request, res: Response) {
        try {
            const tenantId = (req as any).tenantId;
            const result = await UserService.listUsers(tenantId, req.query);

            res.json({
                success: true,
                data: result
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    static async getUser(req: Request, res: Response) {
        try {
            const tenantId = (req as any).tenantId;
            const { id } = req.params;
            const user = await UserService.getUserById(id, tenantId);

            res.json({
                success: true,
                data: user
            });
        } catch (error: any) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }

    static async createUser(req: Request, res: Response) {
        try {
            const tenantId = (req as any).tenantId;
            const newUser = await UserService.createUser(tenantId, req.body);

            res.status(201).json({
                success: true,
                message: 'Usuario creado correctamente',
                data: newUser
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    static async updateUser(req: Request, res: Response) {
        try {
            const tenantId = (req as any).tenantId;
            const { id } = req.params;
            const updatedUser = await UserService.updateUser(id, tenantId, req.body);

            res.json({
                success: true,
                message: 'Usuario actualizado correctamente',
                data: updatedUser
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    static async changePassword(req: Request, res: Response) {
        try {
            const userId = (req as any).user.userId;
            await UserService.changePassword(userId, req.body);

            res.json({
                success: true,
                message: 'Contraseña actualizada correctamente. Por seguridad, su sesión ha sido cerrada en otros dispositivos.'
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    static async getProfile(req: Request, res: Response) {
        try {
            const userId = (req as any).user.userId;
            const tenantId = (req as any).tenantId;
            const user = await UserService.getUserById(userId, tenantId);
            res.json({
                success: true,
                data: user
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    static async deleteUser(req: Request, res: Response) {
        try {
            const tenantId = (req as any).tenantId;
            const { id } = req.params;

            // Soft delete: set isActive = false
            await UserService.updateUser(id, tenantId, { isActive: false });

            res.json({
                success: true,
                message: 'Usuario desactivado correctamente'
            });
        } catch (error: any) {
            const status = error.message.includes('último administrador') ? 403 : 400;
            res.status(status).json({
                success: false,
                message: error.message
            });
        }
    }
}
