# 📄 Electronic Invoicing SaaS Backend

Sistema de facturación electrónica como servicio (SaaS) con arquitectura multitenant para PyMES ecuatorianas.

> **Proyecto académico:** Escuela Politécnica Nacional - Desarrollo de un sistema de facturación electrónica SaaS con arquitectura multitenant

## 🎯 Objetivos Principales

- Crear un sistema web de facturación electrónica accesible para PyMES
- Implementar arquitectura SaaS multitenant con aislamiento de datos
- Generar facturas electrónicas conformes a especificaciones del SRI Ecuador
- Proporcionar dashboard con reportes y estadísticas
- Garantizar máxima seguridad y aislamiento entre tenants

## 🏗️ Arquitectura

### Patrón: SaaS Multitenant
- **Base de datos compartida** con discriminador `tenant_id`
- **Aislamiento lógico** a nivel de aplicación y base de datos
- **Seguridad multitenant** con JWT y validación por tenant en cada request

### Stack Tecnológico

| Componente | Tecnología | Versión |
|-----------|-----------|---------|
| **Runtime** | Node.js | v20 LTS |
| **Framework** | Express.js | v4+ |
| **Lenguaje** | TypeScript | v5+ |
| **Base de Datos** | PostgreSQL | v14+ |
| **ORM** | Prisma | v5+ |
| **Autenticación** | JWT | RFC 7519 |
| **Validación** | Joi / Zod | Latest |

## 📦 Estructura del Proyecto

```
src/
├── config/           # Configuración de entorno
├── database/         # Migraciones y seeders
├── middlewares/      # Autenticación, tenant, autorización
├── modules/          # Módulos funcionales (Feature-based)
│   ├── auth/        # Autenticación con JWT
│   ├── tenants/     # Gestión de empresas
│   ├── users/       # Gestión de usuarios por tenant
│   ├── clients/     # Catálogo de clientes
│   ├── products/    # Catálogo de productos
│   ├── invoices/    # ⭐ CORE: Facturación electrónica
│   ├── dashboard/   # Reportes y estadísticas
│   └── reports/     # Reportes exportables
├── shared/           # Código compartido (helpers, interfaces, types)
└── utils/            # Utilidades (logger, error handler)
```

Ver [STRUCTURE.md](./STRUCTURE.md) para documentación detallada de la estructura.

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js v20+ instalado
- PostgreSQL v14+ corriendo
- npm v10+

### Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd electronic-invoicing-saas-backend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
# Editar .env con tus valores
```

4. **Ejecutar migraciones de BD**
```bash
npx prisma migrate dev
```

5. **Seedear datos iniciales (opcional)**
```bash
npx prisma db seed
```

6. **Iniciar servidor en desarrollo**
```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

## 📚 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Iniciar servidor con hot-reload
npm run build            # Compilar TypeScript a JavaScript
npm start                # Iniciar en producción

# Testing
npm test                 # Ejecutar pruebas
npm run test:watch      # Pruebas en modo watch
npm run test:coverage   # Cobertura de pruebas

# Base de Datos
npx prisma migrate dev  # Crear y ejecutar migración
npx prisma db seed      # Ejecutar seeders
npx prisma studio      # Abrir Prisma Studio GUI

# Linting y Formato
npm run lint            # Ejecutar ESLint
npm run format          # Formatear con Prettier

# Documentación
npm run docs            # Generar documentación API
```

## 🔐 Seguridad Multitenant

### Filtrado Automático por tenant_id

Cada query a la base de datos incluye filtrado por `tenant_id`:

```typescript
// ✅ CORRECTO - Incluye tenant_id
const invoices = await prisma.invoices.findMany({
  where: {
    tenantId: user.tenantId,  // OBLIGATORIO
    estado: 'emitida'
  }
});

// ❌ INCORRECTO - Sin filtro tenant_id
const invoices = await prisma.invoices.findMany({
  where: {
    estado: 'emitida'  // PELIGRO: Acceso a datos de otros tenants!
  }
});
```

### Middleware de Validación

Todos los endpoints están protegidos por:
1. **Autenticación JWT** - Validar token
2. **Validación de tenant** - Verificar tenant_id del usuario
3. **Autorización por rol** - Validar permisos específicos
4. **Validación de datos** - Esquema de request

## 📝 API Endpoints

### Autenticación
```
POST   /api/auth/register      # Registrar nuevo usuario
POST   /api/auth/login         # Login
POST   /api/auth/refresh       # Refrescar token
POST   /api/auth/logout        # Logout
```

### Tenants (Empresas)
```
GET    /api/tenants            # Listar empresas
POST   /api/tenants            # Crear empresa
GET    /api/tenants/:id        # Obtener detalle
PUT    /api/tenants/:id        # Actualizar empresa
DELETE /api/tenants/:id        # Eliminar empresa
```

### Clientes
```
GET    /api/clients            # Listar clientes
POST   /api/clients            # Crear cliente
GET    /api/clients/:id        # Obtener detalle
PUT    /api/clients/:id        # Actualizar cliente
DELETE /api/clients/:id        # Eliminar cliente
```

### Productos
```
GET    /api/products           # Listar productos
POST   /api/products           # Crear producto
GET    /api/products/:id       # Obtener detalle
PUT    /api/products/:id       # Actualizar producto
DELETE /api/products/:id       # Eliminar producto
```

### Facturas (CORE)
```
GET    /api/invoices           # Listar facturas
POST   /api/invoices           # Crear factura
GET    /api/invoices/:id       # Obtener detalle
PUT    /api/invoices/:id       # Actualizar factura
GET    /api/invoices/:id/xml   # Descargar XML
GET    /api/invoices/:id/pdf   # Descargar PDF
```

### Dashboard
```
GET    /api/dashboard/stats          # Estadísticas generales
GET    /api/dashboard/sales-monthly  # Ventas mensuales
GET    /api/dashboard/top-clients    # Top 5 clientes
GET    /api/dashboard/top-products   # Top 5 productos
```

### Reportes
```
GET    /api/reports/invoices   # Reporte de facturas
GET    /api/reports/clients    # Reporte de clientes
GET    /api/reports/products   # Reporte de productos
```

## 🗄️ Modelo de Base de Datos

### Tablas Principales

| Tabla | Descripción | Discriminador |
|-------|-----------|---|
| **tenants** | Empresas registradas | - |
| **usuarios** | Usuarios del sistema | tenant_id ✅ |
| **clientes** | Clientes de cada empresa | tenant_id ✅ |
| **productos** | Catálogo de cada empresa | tenant_id ✅ |
| **facturas** | Facturas emitidas | tenant_id ✅ |
| **detalle_facturas** | Detalles de facturas | tenant_id ✅ |

**Nota:** Todas las tablas (excepto `tenants`) incluyen `tenant_id` como discriminador multitenant.

### Diagrama ER (Relaciones)

```
Tenants (1) ←→ (N) Usuarios
         ↓
         ├──→ Clientes
         ├──→ Productos
         └──→ Facturas → DetalleFacturas
```

## 📋 Especificaciones SRI

El sistema genera facturas conformes a:
- Resolución NAC-DGERCGC12-00105 del SRI
- Esquema XSD oficial de comprobantes electrónicos
- Clave de acceso de 49 dígitos
- Formato XML válido para autorización

## 🧪 Testing

### Pruebas Unitarias
```bash
npm test -- src/modules/invoices/services.test.ts
```

### Pruebas de Integración
```bash
npm test -- --testPathPattern=integration
```

### Pruebas de Seguridad Multitenant
```bash
npm test -- --testPathPattern=multitenant
```

### Cobertura
```bash
npm run test:coverage
```

## 📖 Documentación

- [STRUCTURE.md](./STRUCTURE.md) - Estructura detallada del proyecto
- [API.md](./docs/API.md) - Documentación completa de API
- [ARCHITECTURE.md](./docs/ARCHITECTURE.md) - Decisiones arquitectónicas
- [SECURITY.md](./docs/SECURITY.md) - Medidas de seguridad
- [DEPLOYMENT.md](./docs/DEPLOYMENT.md) - Guía de despliegue

## 🐛 Reporte de Bugs

Si encuentras un bug, por favor abre un issue describiendo:
1. Comportamiento esperado
2. Comportamiento actual
3. Pasos para reproducir
4. Logs relevantes

## 📄 Licencia

Este proyecto es de código abierto bajo licencia MIT.

## 👥 Contribuidores

- **Estudiante:** [Nombre del estudiante]
- **Director de tesis:** [Nombre del director]

## 📧 Contacto

Para preguntas o sugerencias, contactar a:
- Email: [email del estudiante]
- GitHub: [username]

---

**Última actualización:** 10 de febrero de 2026

**Estado:** Desarrollo activo (Sprint 0/1)
