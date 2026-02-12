import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import authRoutes from './modules/auth/routes/auth.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Electronic Invoicing SaaS API',
      version: '1.0.0',
      description: 'API REST para sistema de facturación electrónica SaaS multitenant',
      contact: {
        name: 'API Support',
        email: 'support@electronic-invoicing.com'
      }
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server'
      }
    ]
  },
  apis: ['./src/server.ts', './src/modules/**/*.ts']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middlewares Globales
app.use(cors());
app.use(express.json()); // Body parser json

// Documentación
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas de API
app.use('/api/auth', authRoutes);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Endpoint raíz - Hola Mundo
 *     description: Retorna un mensaje de bienvenida del API
 *     tags:
 *       - General
 *     responses:
 *       200:
 *         description: Mensaje de bienvenida exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "¡Hola Mundo! Bienvenido al backend de facturación electrónica SaaS"
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 */
// Ruta básica Hello World
app.get('/', (req, res) => {
  res.json({
    message: '¡Hola Mundo! Bienvenido al backend de facturación electrónica SaaS',
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check
 *     description: Verifica el estado y disponibilidad del servidor
 *     tags:
 *       - General
 *     responses:
 *       200:
 *         description: Servidor disponible
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "healthy"
 *                 uptime:
 *                   type: number
 *                   example: 123.456
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 */
// Ruta de health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Middleware Global de Errores (debe ir al final)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📊 Health check en http://localhost:${PORT}/health`);
  console.log(`📚 Swagger API Docs en http://localhost:${PORT}/api-docs`);
});