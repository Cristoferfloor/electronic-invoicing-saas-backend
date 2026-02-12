# 📋 PLAN DE DOCUMENTACIÓN - SPRINT 1

## Electronic Invoicing SaaS Backend
### Periodo: 2 semanas (Semanas 3-4 del Proyecto)
### Objetivo: Infraestructura Base y Autenticación

---

## 🎯 Objetivo del Sprint

Establecer la **infraestructura base** del sistema con:
- ✅ Configuración de base de datos PostgreSQL
- ✅ Schema de Prisma completo (modelos multitenant)
- ✅ Migraciones de base de datos
- ✅ Sistema de autenticación JWT
- ✅ Middlewares de seguridad
- ✅ Estructura base de Express.js

---

## 📊 Desglose de Tareas del Sprint 1

### SEMANA 1: Configuración Base y Prisma

#### **Tarea 1.1: Configuración del Proyecto Node.js** (3-4 horas)
**Descripción:** Inicializar proyecto con dependencias base

**Subtareas:**
- [ ] Crear `package.json` con dependencias principales
- [ ] Instalar dependencias: Express, Prisma, TypeScript, JWT
- [ ] Crear `tsconfig.json` para TypeScript
- [ ] Crear `.gitignore` apropiado
- [ ] Configurar scripts npm (dev, build, start)

**Dependencias a instalar:**
```bash
npm install express cors dotenv bcryptjs jsonwebtoken uuid
npm install @prisma/client
npm install -D typescript @types/node @types/express ts-node nodemon @types/jsonwebtoken
```

**Archivos que se crearán:**
- `package.json`
- `tsconfig.json`
- `.env` (desde .env.example)

**Criterios de aceptación:**
- ✅ `npm install` instala sin errores
- ✅ `npm run dev` inicia servidor
- ✅ TypeScript compila sin errores

---

#### **Tarea 1.2: Configuración de Prisma** (2-3 horas)
**Descripción:** Inicializar Prisma ORM en el proyecto

**Subtareas:**
- [ ] Ejecutar `npx prisma init`
- [ ] Crear `.env` con `DATABASE_URL` (PostgreSQL local)
- [ ] Crear `prisma/schema.prisma` base
- [ ] Configurar provider = "postgresql"
- [ ] Crear conexión a PostgreSQL

**Comandos:**
```bash
npx prisma init
# Configurar DATABASE_URL en .env
DATABASE_URL="postgresql://user:password@localhost:5432/electronic_invoicing_dev"
```

**Archivos que se crearán:**
- `prisma/.env` (dentro de .gitignore)
- `prisma/schema.prisma`

**Criterios de aceptación:**
- ✅ Prisma genera cliente exitosamente
- ✅ Conexión a base de datos funciona
- ✅ `npx prisma studio` abre sin errores

---

#### **Tarea 1.3: Diseño del Schema de Base de Datos Multitenant** (4-5 horas)
**Descripción:** Diseñar y crear modelo de datos multitenant

**Modelos a crear:**

**1. Tenant** (Empresa)
```prisma
model Tenant {
  id String @id @default(cuid())
  nombre_comercial String
  razon_social String
  ruc String @unique
  direccion String
  telefono String?
  email String @unique
  estado_activo Boolean @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relaciones
  usuarios Usuario[]
  clientes Cliente[]
  productos Producto[]
  facturas Factura[]
}
```

**2. Usuario** (Con tenant_id - DISCRIMINADOR)
```prisma
model Usuario {
  id String @id @default(cuid())
  tenantId String
  email String
  nombre_completo String
  password_hash String
  rol enum(ADMIN, USUARIO)
  activo Boolean @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relaciones
  tenant Tenant @relation(fields: [tenantId], references: [id])
  
  @@unique([tenantId, email])
}
```

**3. Cliente** (Con tenant_id - DISCRIMINADOR)
```prisma
model Cliente {
  id String @id @default(cuid())
  tenantId String
  nombre String
  identificacion String
  tipo_identificacion enum(RUC, CEDULA, PASAPORTE)
  email String?
  telefono String?
  direccion String?
  ciudad String?
  activo Boolean @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relaciones
  tenant Tenant @relation(fields: [tenantId], references: [id])
  facturas Factura[]
  
  @@index([tenantId])
}
```

**4. Producto** (Con tenant_id - DISCRIMINADOR)
```prisma
model Producto {
  id String @id @default(cuid())
  tenantId String
  codigo String
  nombre String
  descripcion String?
  precio_unitario Decimal @db.Decimal(10, 2)
  aplica_iva Boolean @default(true)
  codigo_impuesto String?
  unidad_medida String?
  activo Boolean @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relaciones
  tenant Tenant @relation(fields: [tenantId], references: [id])
  detallesFactura DetalleFactura[]
  
  @@unique([tenantId, codigo])
  @@index([tenantId])
}
```

**5. Factura** (Con tenant_id - DISCRIMINADOR)
```prisma
model Factura {
  id String @id @default(cuid())
  tenantId String
  clienteId String
  numero_secuencial String
  serie_establecimiento String
  punto_emision String
  fecha_emision DateTime @default(now())
  fecha_vencimiento DateTime?
  subtotal Decimal @db.Decimal(12, 2)
  iva Decimal @db.Decimal(12, 2)
  total Decimal @db.Decimal(12, 2)
  xml_generado String?
  clave_acceso String @unique
  estado enum(BORRADOR, EMITIDA, AUTORIZADA, CANCELADA) @default(BORRADOR)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relaciones
  tenant Tenant @relation(fields: [tenantId], references: [id])
  cliente Cliente @relation(fields: [clienteId], references: [id])
  detalles DetalleFactura[]
  
  @@index([tenantId])
  @@index([clienteId])
}
```

**6. DetalleFactura** (Con tenant_id - DISCRIMINADOR)
```prisma
model DetalleFactura {
  id String @id @default(cuid())
  facturaId String
  tenantId String
  productoId String
  cantidad Decimal @db.Decimal(10, 2)
  precio_unitario Decimal @db.Decimal(10, 2)
  descuento Decimal @db.Decimal(10, 2) @default(0)
  subtotal_linea Decimal @db.Decimal(12, 2)
  iva_linea Decimal @db.Decimal(12, 2)
  total_linea Decimal @db.Decimal(12, 2)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relaciones
  factura Factura @relation(fields: [facturaId], references: [id], onDelete: Cascade)
  producto Producto @relation(fields: [productoId], references: [id])
  
  @@index([facturaId])
  @@index([tenantId])
}
```

**Archivos que se crearán:**
- `prisma/schema.prisma` (completo)

**Criterios de aceptación:**
- ✅ Schema valida sin errores
- ✅ Todos los modelos incluyen `tenantId` (excepto Tenant)
- ✅ Relaciones están correctamente definidas
- ✅ `npx prisma validate` sin errores

---

#### **Tarea 1.4: Crear y Ejecutar Migraciones Iniciales** (2-3 horas)
**Descripción:** Crear migraciones de Prisma y aplicarlas a la BD

**Subtareas:**
- [ ] Crear migración inicial: `init`
- [ ] Aplicar migración a base de datos
- [ ] Verificar tablas creadas en PostgreSQL
- [ ] Crear archivo de seed (datos iniciales)

**Comandos:**
```bash
npx prisma migrate dev --name init
npx prisma db seed
```

**Archivos que se crearán:**
- `prisma/migrations/[timestamp]_init/migration.sql`
- `prisma/seed.ts`

**Criterios de aceptación:**
- ✅ Migraciones se ejecutan sin errores
- ✅ Tablas existen en PostgreSQL
- ✅ Datos de seed se insertan correctamente
- ✅ `npx prisma studio` muestra datos

---

### SEMANA 2: Autenticación JWT y Middlewares

#### **Tarea 2.1: Implementar Sistema de Autenticación JWT** (4-5 horas)
**Descripción:** Crear sistema de login, registro y tokens JWT

**Subtareas:**
- [ ] Crear servicio de autenticación en `src/modules/auth/services.ts`
- [ ] Implementar generación de JWT
- [ ] Implementar generación de refresh tokens
- [ ] Implementar validación de contraseñas con bcryptjs
- [ ] Crear controladores de auth en `src/modules/auth/controllers.ts`
- [ ] Crear rutas de auth en `src/modules/auth/routes.ts`

**Funcionalidades:**
```typescript
// Funciones a implementar:
- register(email, password, tenantId) → JWT + Refresh Token
- login(email, password) → JWT + Refresh Token
- refreshToken(refreshToken) → JWT
- validateToken(token) → Payload
- hashPassword(password) → hash
- comparePassword(password, hash) → boolean
```

**Endpoints:**
```
POST /api/auth/register      # Registrar usuario
POST /api/auth/login         # Login
POST /api/auth/refresh       # Refrescar token
```

**Archivos que se crearán:**
- `src/modules/auth/services.ts` (completo)
- `src/modules/auth/controllers.ts` (completo)
- `src/modules/auth/routes.ts` (completo)

**Criterios de aceptación:**
- ✅ Login genera JWT válido
- ✅ Refresh token funciona correctamente
- ✅ Tokens expiran correctamente
- ✅ Contraseñas hasheadas con bcrypt
- ✅ Pruebas en Postman exitosas

---

#### **Tarea 2.2: Implementar Middleware de Autenticación** (2-3 horas)
**Descripción:** Crear middleware para validar JWT en cada request

**Subtareas:**
- [ ] Crear middleware de autenticación en `src/middlewares/`
- [ ] Validar presencia de token
- [ ] Validar firma del token
- [ ] Inyectar usuario en request
- [ ] Manejar errores de token expirado/inválido

**Archivo:** `src/middlewares/auth.middleware.ts`

**Funcionalidad:**
```typescript
export const authMiddleware = (req, res, next) => {
  // 1. Extraer token del header
  // 2. Validar JWT
  // 3. Inyectar en req.user
  // 4. Llamar next()
}
```

**Criterios de aceptación:**
- ✅ Middleware valida tokens correctamente
- ✅ Rechaza tokens inválidos
- ✅ Rechaza tokens expirados
- ✅ Inyecta datos del usuario en request

---

#### **Tarea 2.3: Implementar Middleware de Validación de Tenant** (2-3 horas)
**Descripción:** Crear middleware para asegurar aislamiento multitenant

**Subtareas:**
- [ ] Crear middleware de tenant en `src/middlewares/`
- [ ] Validar que tenantId del token coincida con tenantId del request
- [ ] Filtrar automáticamente queries por tenantId
- [ ] Prevenir acceso cruzado entre tenants

**Archivo:** `src/middlewares/tenant.middleware.ts`

**Funcionalidad:**
```typescript
export const tenantMiddleware = (req, res, next) => {
  // 1. Obtener tenantId del usuario (del JWT)
  // 2. Validar que coincida con tenantId de la ruta/query
  // 3. Inyectar tenantId en req.tenantId
  // 4. Prevenir acceso a otros tenants
}
```

**Criterios de aceptación:**
- ✅ Previene acceso a otros tenants
- ✅ Inyecta tenantId automáticamente
- ✅ Valida coincidencia de IDs

---

#### **Tarea 2.4: Crear Archivo Principal Express (app.ts)** (2-3 horas)
**Descripción:** Crear servidor Express con todas las rutas y middlewares

**Subtareas:**
- [ ] Crear `src/app.ts` principal
- [ ] Configurar middlewares (CORS, JSON, logging)
- [ ] Registrar rutas de módulos
- [ ] Configurar manejo de errores
- [ ] Crear `src/server.ts` para iniciar servidor

**Archivos que se crearán:**
- `src/app.ts` (Aplicación Express)
- `src/server.ts` (Inicialización del servidor)

**Criterios de aceptación:**
- ✅ Servidor inicia sin errores
- ✅ Endpoints de auth funcionales
- ✅ Middlewares se ejecutan correctamente
- ✅ Errores se manejan centralizadamente

---

#### **Tarea 2.5: Pruebas Funcionales del Sprint 1** (3-4 horas)
**Descripción:** Probar funcionalidades principales

**Subtareas:**
- [ ] Pruebas de registro de usuario
- [ ] Pruebas de login
- [ ] Pruebas de refresh token
- [ ] Pruebas de aislamiento multitenant
- [ ] Pruebas en Postman con colección

**Archivos que se crearán:**
- `docs/postman/Electronic-Invoicing-API.postman_collection.json`
- `docs/TESTING-SPRINT-1.md`

**Criterios de aceptación:**
- ✅ Todos los endpoints funcionan
- ✅ Tokens se validan correctamente
- ✅ Aislamiento multitenant funciona
- ✅ No hay acceso cruzado entre tenants

---

## 📅 Cronograma Detallado

### **SEMANA 1**

| Día | Tarea | Horas | Estado |
|-----|-------|-------|--------|
| Lun-Mar | 1.1 - Config Node.js | 3-4 | [ ] |
| Mar-Mié | 1.2 - Config Prisma | 2-3 | [ ] |
| Mié-Jue | 1.3 - Schema BD | 4-5 | [ ] |
| Jue-Vie | 1.4 - Migraciones | 2-3 | [ ] |
| **Total Semana 1** | | **11-15 horas** | |

### **SEMANA 2**

| Día | Tarea | Horas | Estado |
|-----|-------|-------|--------|
| Lun-Mar | 2.1 - Auth JWT | 4-5 | [ ] |
| Mar-Mié | 2.2 - Middleware Auth | 2-3 | [ ] |
| Mié-Jue | 2.3 - Middleware Tenant | 2-3 | [ ] |
| Jue | 2.4 - app.ts y server.ts | 2-3 | [ ] |
| Vie | 2.5 - Pruebas | 3-4 | [ ] |
| **Total Semana 2** | | **13-18 horas** | |

| **TOTAL SPRINT 1** | | **24-33 horas** |
|---|---|---|

---

## 🛠️ Tecnologías y Herramientas

### Backend Base
- **Express.js** - Framework web
- **TypeScript** - Lenguaje de programación
- **Prisma** - ORM para base de datos
- **PostgreSQL** - Base de datos relacional

### Seguridad
- **jsonwebtoken** - Generación de JWT
- **bcryptjs** - Hash de contraseñas
- **cors** - Control de CORS
- **dotenv** - Variables de entorno

### Desarrollo
- **ts-node** - Ejecutar TypeScript directamente
- **nodemon** - Hot-reload en desarrollo
- **Postman** - Testing de API

---

## 📦 Estructura de Carpetas al Final del Sprint 1

```
src/
├── app.ts                    ← Aplicación Express
├── server.ts                 ← Inicialización servidor
├── config/
│   └── environment.ts        ← Variables de entorno
├── middlewares/
│   ├── auth.middleware.ts   ← Validación JWT
│   ├── tenant.middleware.ts ← Validación multitenant
│   └── error.middleware.ts  ← Manejo de errores
├── modules/
│   └── auth/
│       ├── routes.ts        ← Rutas /auth
│       ├── controllers.ts   ← Lógica HTTP
│       ├── services.ts      ← Autenticación (JWT, hash)
│       ├── models.ts        ← Documentación
│       └── validators.ts    ← Validaciones
├── shared/
│   ├── interfaces/index.ts  ← Tipos TypeScript
│   └── helpers/
│       └── invoice.ts       ← Helper functions
└── utils/
    └── index.ts             ← Logger, ErrorHandler

prisma/
├── schema.prisma            ← Modelos de BD
├── seed.ts                  ← Datos iniciales
└── migrations/
    └── [timestamp]_init/    ← Migración inicial

.env                          ← Variables de entorno
.env.example                  ← Template variables
tsconfig.json                 ← Config TypeScript
package.json                  ← Dependencias
```

---

## ✅ Definición de "Hecho" (Definition of Done)

Para que una tarea se considere completada debe cumplir:

- [ ] Código implementado según especificación
- [ ] Código compilable sin errores TypeScript
- [ ] Código sin console.logs innecesarios
- [ ] Manejo de errores implementado
- [ ] Comentarios en código complejo
- [ ] Pruebas manuales exitosas
- [ ] Documentación de cambios actualizada
- [ ] Commit en Git con mensaje descriptivo

---

## 🎯 Objetivos de Aceptación del Sprint 1

Al final del Sprint 1, el sistema debe tener:

### Funcional
- ✅ Servidor Express corriendo sin errores
- ✅ Conexión a PostgreSQL funcionando
- ✅ Base de datos con todos los modelos creados
- ✅ Sistema de registro de usuarios funcional
- ✅ Sistema de login con JWT funcional
- ✅ Refresh de tokens funcionando
- ✅ Aislamiento multitenant implementado

### Técnico
- ✅ Schema Prisma validado
- ✅ Migraciones ejecutadas exitosamente
- ✅ Middlewares de seguridad activos
- ✅ TypeScript sin errores
- ✅ Manejo de errores centralizado

### Documentación
- ✅ API endpoints documentados en Postman
- ✅ Instrucciones de inicio en README
- ✅ Documentación del schema en STRUCTURE.md
- ✅ Documentación de seguridad en SECURITY.md

---

## 📝 Entregables del Sprint 1

1. **Código Fuente**
   - Implementación completa de auth
   - Middlewares de seguridad
   - Configuración de Prisma

2. **Base de Datos**
   - Schema Prisma definido
   - Migraciones ejecutadas
   - Datos de seed insertados

3. **Documentación**
   - Plan de Sprint (este documento)
   - Resultados de pruebas
   - Postman collection
   - Instrucciones de setup

4. **Commits Git**
   - Mínimo 15-20 commits
   - Mensajes descriptivos

---

## 🐛 Riesgos Identificados

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|---|---|---|
| Conexión a PostgreSQL falla | Media | Alto | Usar Docker para BD local |
| Schema incorrecto | Media | Alto | Validar con `npx prisma validate` |
| JWT malconfigutado | Baja | Alto | Pruebas exhaustivas en Postman |
| Aislamiento multitenant incompleto | Media | Crítico | Pruebas específicas de seguridad |

---

## 📊 Métricas de Éxito

- ✅ Cobertura de código: >80% en módulo auth
- ✅ Endpoints: 100% funcionales
- ✅ Tiempo: <33 horas de desarrollo
- ✅ Errores: 0 errores críticos
- ✅ Tests: 100% de endpoints probados

---

## 🎓 Aprendizajes Esperados

- Configuración completa de Prisma ORM
- Diseño de schema multitenant
- Implementación de JWT en Express
- Seguridad multitenant
- Gestión de middlewares en Express

---

**Documento de Plan - Sprint 1**
Fecha: 10 de febrero de 2026
Estado: Listo para ejecución
