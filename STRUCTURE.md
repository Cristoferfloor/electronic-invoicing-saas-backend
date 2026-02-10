# Estructura de Carpetas - Backend Facturación Electrónica SaaS

## 📁 Estructura General del Proyecto

```
electronic-invoicing-saas-backend/
├── src/                          # Código fuente principal
│   ├── config/                   # Configuración de la aplicación
│   │   └── environment.ts        # Variables de entorno y configuración
│   │
│   ├── database/                 # Base de datos
│   │   ├── migrations/           # Migraciones de Prisma
│   │   ├── seeders/              # Scripts de seed (datos iniciales)
│   │   └── scripts/              # Scripts auxiliares de BD
│   │
│   ├── middlewares/              # Middlewares Express
│   │   ├── auth.ts              # Validación de JWT
│   │   ├── tenant.ts            # Filtrado por tenant_id (multitenant)
│   │   ├── authorization.ts     # Validación de permisos por rol
│   │   ├── validation.ts        # Validación de datos de entrada
│   │   ├── logging.ts           # Auditoría de operaciones
│   │   └── errorHandler.ts      # Manejo centralizado de errores
│   │
│   ├── modules/                  # Módulos funcionales (por feature)
│   │
│   ├── shared/                   # Código compartido reutilizable
│   │   ├── constants/
│   │   │   └── app.ts           # Constantes del sistema
│   │   ├── helpers/
│   │   │   └── invoice.ts       # Helpers de cálculos de facturación
│   │   ├── interfaces/
│   │   │   └── index.ts         # Interfaces TypeScript globales
│   │   └── types/
│   │       └── prisma.ts        # Tipos de Prisma
│   │
│   └── utils/                    # Utilidades generales
│       └── index.ts              # Logger, ErrorHandler, ResponseFormatter
│
├── docs/                         # Documentación del sistema
├── uploads/                      # Archivos generados (XMLs, PDFs)
├── .env                          # Variables de entorno (NO GUARDAR EN GIT)
├── .env.example                  # Template de variables de entorno
├── package.json                  # Dependencias del proyecto
├── tsconfig.json                 # Configuración de TypeScript
├── prisma/
│   └── schema.prisma             # Schema de base de datos
└── .gitignore                    # Archivos a ignorar en Git

```

## 📦 Módulos Funcionales (`src/modules/`)

Cada módulo contiene la estructura MVC adaptada:

### 1️⃣ **auth/** - Autenticación
```
auth/
├── routes.ts        # POST /auth/login, /auth/register, /auth/refresh
├── controllers.ts   # login(), register(), refreshToken()
├── services.ts      # validateCredentials(), generateJWT()
├── models.ts        # Modelos Prisma de Usuario
└── validators.ts    # validateEmail(), validatePassword()
```
**Responsabilidad:** Sistema de autenticación con JWT y gestión de tokens

---

### 2️⃣ **tenants/** - Gestión de Empresas (Multitenant)
```
tenants/
├── routes.ts        # GET/POST/PUT/DELETE /tenants
├── controllers.ts   # CRUD de empresas
├── models.ts        # Modelo Tenant (Empresa)
└── services.ts      # Lógica de negocio de tenants
```
**Responsabilidad:** Registro y gestión de empresas en el sistema

---

### 3️⃣ **users/** - Gestión de Usuarios
```
users/
├── routes.ts        # GET/POST/PUT/DELETE /users
├── controllers.ts   # CRUD de usuarios por tenant
├── models.ts        # Modelo Usuario
└── services.ts      # Gestión de permisos y roles
```
**Responsabilidad:** Usuarios dentro de cada tenant con roles

---

### 4️⃣ **clients/** - Gestión de Clientes
```
clients/
├── routes.ts        # GET/POST/PUT/DELETE /clients
├── controllers.ts   # CRUD de clientes
├── models.ts        # Modelo Cliente (Buyer)
└── services.ts      # Búsqueda y filtrado de clientes
```
**Responsabilidad:** Registro y gestión de clientes del tenant

---

### 5️⃣ **products/** - Catálogo de Productos/Servicios
```
products/
├── routes.ts        # GET/POST/PUT/DELETE /products
├── controllers.ts   # CRUD de productos
├── models.ts        # Modelo Producto
└── services.ts      # Gestión de precios y códigos
```
**Responsabilidad:** Catálogo de productos/servicios vendibles

---

### 6️⃣ **invoices/** - ⭐ CORE DEL SISTEMA: Facturación Electrónica
```
invoices/
├── routes.ts        # GET/POST /invoices, GET /invoices/:id/xml
├── controllers.ts   # createInvoice(), generateXML(), downloadXML()
├── models.ts        # Modelos Invoice y InvoiceDetail
├── services.ts      # Lógica de negocio de facturación
│                    # - calculateTotals()
│                    # - generateAccessKey() (49 dígitos)
│                    # - generateSequentialNumber()
│                    # - xmlGenerator.generateInvoiceXML()
│                    # - xmlGenerator.validateXML()
└── validators.ts    # validateInvoiceData(), validateAccessKey()
```
**Responsabilidad:** Emisión de facturas y generación de XMLs según SRI

---

### 7️⃣ **dashboard/** - Reportes y Estadísticas
```
dashboard/
├── routes.ts        # GET /dashboard/stats, /dashboard/sales-monthly
├── controllers.ts   # getStats(), getSalesMonthly(), getTopClients()
└── services.ts      # Cálculos de agregados y métricas
```
**Responsabilidad:** Dashboard con métricas de ventas y reportes

---

### 8️⃣ **reports/** - Reportes Exportables
```
reports/
├── routes.ts        # GET /reports/invoices, /reports/clients
├── controllers.ts   # Generación de reportes
└── services.ts      # Lógica de reportes y exportación
```
**Responsabilidad:** Reportes exportables (CSV, Excel, PDF)

---

## 🏗️ Principios de Arquitectura

### Multitenant (Discriminador por tenant_id)
- **Todas las tablas incluyen `tenant_id` como discriminador**
- Cada query en servicios SIEMPRE filtra por `tenant_id` del usuario autenticado
- Middleware de tenant valida que `tenant_id` del request = `tenant_id` del usuario

### Estructura por Capas
```
REQUEST → ROUTES → CONTROLLERS → SERVICES → DATABASE
                                    ↓
                              VALIDATORS
                                    ↓
                              MIDDLEWARES
```

### Validación en Múltiples Niveles
1. **Nivel de rutas:** Validadores de input
2. **Nivel de servicios:** Validadores de reglas de negocio
3. **Nivel de base de datos:** Constraints y foreign keys
4. **Nivel de middleware:** Autenticación, autorización, tenant

---

## 📊 Diagrama de Relaciones Multitenant

```
┌─────────────┐
│   Tenants   │  (Empresas registradas)
└─────┬───────┘
      │ (1:N)
      ├──→ Users (Usuarios de cada empresa)
      ├──→ Clients (Clientes de cada empresa)
      ├──→ Products (Catálogo de cada empresa)
      └──→ Invoices (Facturas de cada empresa)
            └──→ InvoiceDetails (Detalles de factura)
```

**Campo `tenant_id` está presente en:** Users, Clients, Products, Invoices, InvoiceDetails

---

## 🔐 Flujo de Seguridad Multitenant

```
1. LOGIN
   └─→ generateJWT(userId, tenantId, email, rol)

2. CADA REQUEST
   └─→ Middleware auth: validar JWT
   └─→ Middleware tenant: validar tenant_id coincida
   └─→ Service: filtrar por tenant_id en queries

3. RESPUESTA
   └─→ Solo datos del tenant autenticado
```

---

## 📝 Convenciones de Código

### Nombres de Archivos
- `routes.ts` - Definición de rutas Express
- `controllers.ts` - Lógica de manejo de HTTP
- `services.ts` - Lógica de negocio
- `models.ts` - Definición de modelos (documentación)
- `validators.ts` - Funciones de validación
- `interfaces/` - Tipos TypeScript
- `helpers/` - Funciones reutilizables

### Nomenclatura de Variables
```typescript
// Multitenant - SIEMPRE pasar tenantId
async function getInvoices(tenantId: string, filters?: IFilters) {
  return await prisma.invoices.findMany({
    where: {
      tenantId,        // ← OBLIGATORIO
      ...filters
    }
  });
}

// Respuestas
const response: IApiResponse<Invoice> = {
  success: true,
  data: invoice,
  message: "Factura creada exitosamente"
};
```

---

## 🚀 Próximos Pasos

### 1. Crear `package.json` base
```bash
npm init -y
npm install express prisma @prisma/client jsonwebtoken bcrypt dotenv cors
npm install -D typescript @types/node @types/express ts-node nodemon
```

### 2. Crear `schema.prisma`
- Definir modelo Tenant
- Definir modelo User (con tenant_id)
- Definir modelo Client (con tenant_id)
- Definir modelo Product (con tenant_id)
- Definir modelo Invoice (con tenant_id)
- Definir modelo InvoiceDetail (con tenant_id)

### 3. Crear middleware autenticación JWT

### 4. Crear middleware filtrado por tenant_id

### 5. Iniciar desarrollo módulo por módulo

---

## 📚 Documentación Adicional

- **Migraciones:** `src/database/migrations/`
- **Seeders:** `src/database/seeders/`
- **API Documentation:** `docs/API.md`
- **Architecture:** `docs/ARCHITECTURE.md`
- **Security:** `docs/SECURITY.md`

---

**Última actualización:** 10 de febrero de 2026
