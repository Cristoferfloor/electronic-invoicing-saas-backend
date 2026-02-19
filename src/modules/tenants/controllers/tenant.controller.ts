import { Request, Response } from 'express';
import { TenantService } from '../services/tenant.service';

export class TenantController {

    static async getMyTenant(req: Request, res: Response) {
        try {
            const tenantId = (req as any).tenantId;
            const tenant = await TenantService.getTenant(tenantId);

            res.json({
                success: true,
                data: tenant
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    static async updateMyTenant(req: Request, res: Response) {
        try {
            const tenantId = (req as any).tenantId;
            const updatedTenant = await TenantService.updateTenant(tenantId, req.body);

            res.json({
                success: true,
                message: 'Empresa actualizada correctamente',
                data: updatedTenant
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    static async updateBillingConfig(req: Request, res: Response) {
        try {
            const tenantId = (req as any).tenantId;
            const updatedConfig = await TenantService.updateBillingConfig(tenantId, req.body);

            res.json({
                success: true,
                message: 'Configuración de facturación actualizada correctamente',
                data: updatedConfig
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    static async uploadLogo(req: Request, res: Response) {
        try {
            const tenantId = (req as any).tenantId;
            // En un caso real, aquí manejaríamos la subida de archivos (multer, etc)
            // Por ahora asuminos que recibimos el logoUrl en el body o una URL procesada
            const { logoUrl } = req.body;

            if (!logoUrl) {
                return res.status(400).json({
                    success: false,
                    message: 'URL del logo es requerida'
                });
            }

            const updatedTenant = await TenantService.updateLogo(tenantId, logoUrl);

            res.json({
                success: true,
                message: 'Logo actualizado correctamente',
                data: {
                    logoUrl: updatedTenant.logoUrl
                }
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
}
