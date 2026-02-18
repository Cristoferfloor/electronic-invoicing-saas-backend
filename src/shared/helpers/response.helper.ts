import { Response } from 'express';

export class ResponseHelper {
    static success(res: Response, data: any, message: string = 'Operation successful', statusCode: number = 200) {
        return res.status(statusCode).json({
            success: true,
            message,
            data,
        });
    }

    static error(res: Response, message: string = 'Internal server error', statusCode: number = 500, error: any = null) {
        return res.status(statusCode).json({
            success: false,
            message,
            error: process.env.NODE_ENV === 'production' ? undefined : error,
        });
    }
}
