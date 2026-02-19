import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import authRoutes from './modules/auth/routes/auth.routes';
import tenantRoutes from './modules/tenants/routes/tenant.routes';
import userRoutes from './modules/users/routes/user.routes';
import { AuthService } from './modules/auth/services/auth.service';
import path from 'path';

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
      description: 'REST API for a multitenant SaaS electronic invoicing system',
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

// Global Middlewares
app.use(cors());
app.use(express.json()); // Body parser JSON
app.use(express.urlencoded({ extended: true }));

// Static Files (Imágenes/Uploads)
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/tenant', tenantRoutes);
app.use('/api/users', userRoutes);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Root endpoint - Hello World
 *     description: Returns a welcome message from the API
 *     tags:
 *       - General
 *     responses:
 *       200:
 *         description: Welcome message successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hello World! Welcome to the SaaS Electronic Invoicing backend"
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 */
app.get('/', (req, res) => {
  res.json({
    message: 'Hello World! Welcome to the SaaS Electronic Invoicing backend',
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check
 *     description: Verifies server status and availability
 *     tags:
 *       - General
 *     responses:
 *       200:
 *         description: Server is healthy
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
// Health check route
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Global Error Middleware (should be at the end)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📁 Static files server active at /uploads`);
  console.log(`📊 Health check at http://localhost:${PORT}/health`);
  console.log(`📚 Swagger API Docs at http://localhost:${PORT}/api-docs`);

  // --- AUTOMATIC MAINTENANCE ---
  // Clean tokens once at startup
  AuthService.cleanExpiredTokens().catch((err: any) => console.error('Startup cleanup failed:', err));

  // Clean tokens every 24 hours (86,400,000 ms)
  setInterval(() => {
    AuthService.cleanExpiredTokens().catch((err: any) => console.error('Scheduled cleanup failed:', err));
  }, 24 * 60 * 60 * 1000);
});