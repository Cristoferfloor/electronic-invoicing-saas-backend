# 🗄️ Guía de Configuración de Prisma ORM

## ¿Qué es Prisma?

Prisma es un **ORM (Object-Relational Mapping)** moderno que simplifica el acceso a bases de datos en Node.js y TypeScript. Proporciona:

- ✅ **Type-safety** - Autocompletado y validación en tiempo de compilación
- ✅ **Migraciones automáticas** - Control de versiones del schema
- ✅ **Prisma Studio** - GUI visual para explorar datos
- ✅ **Relaciones automáticas** - Joins simplificados

## Instalación Inicial

### 1. Instalar Prisma CLI y Client

```bash
npm install @prisma/client
npm install -D prisma
```

### 2. Inicializar Prisma

```bash
npx prisma init
```

Esto crea:
- `prisma/schema.prisma` - Definición de modelos
- `.env` - Variables de entorno

## Configuración de Base de Datos

### En `.env`:

```env
# PostgreSQL local
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/electronic_invoicing_dev"

# PostgreSQL en Docker
DATABASE_URL="postgresql://postgres:postgres@db:5432/electronic_invoicing_dev"

# Conexión remota (producción)
DATABASE_URL="postgresql://user:pass@host.com:5432/db"
```

### Formato de DATABASE_URL:

```
postgresql://[USER]:[PASSWORD]@[HOST]:[PORT]/[DATABASE]
```

## Estructura de schema.prisma

### Componentes principales:

```prisma
// 1. Generator - Genera Prisma Client
generator client {
  provider = "prisma-client-js"
}

// 2. Datasource - Conexión a BD
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// 3. Modelos - Definición de tablas
model Usuario {
  id        String   @id @default(cuid())
  email     String   @unique
  nombre    String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Atributos de Campo

### Tipos de Datos

```prisma
// Números
Int          // Enteros
BigInt       // Enteros grandes
Decimal      // Decimales (use @db.Decimal(10, 2))
Float        // Flotantes

// Texto
String       // Strings
Boolean      // true/false

// Fechas
DateTime     // Timestamp

// Especiales
Json         // JSON
Bytes        // Binarios
```

### Modificadores de Campo

```prisma
// Identificadores
@id              // Clave primaria
@default()       // Valor por defecto
@unique          // Único a nivel global

// Relaciones
@relation()      // Define relación
@updatedAt       // Auto-actualiza timestamp
onDelete: Cascade  // Elimina datos relacionados

// Base de Datos
@db.Decimal(10, 2)  // Especifica tipo de BD
@db.Text            // Text largo
```

## Relaciones Multitenant

### Patrón: Discriminador tenant_id

Todos los modelos multitenant incluyen:

```prisma
model Cliente {
  id        String @id @default(cuid())
  tenantId  String  // ← DISCRIMINADOR
  nombre    String
  
  tenant    Tenant @relation(fields: [tenantId], references: [id])
  
  @@index([tenantId])  // ← ÍNDICE PARA PERFORMANCE
  @@map("clientes")
}
```

### Relaciones Comunes

**Uno a Muchos (1:N)**
```prisma
// Un tenant tiene muchos usuarios
model Tenant {
  usuarios Usuario[]
}

model Usuario {
  tenantId String
  tenant   Tenant @relation(fields: [tenantId], references: [id])
}
```

**Muchos a Uno (N:1)**
```prisma
// Muchos clientes pertenecen a un tenant
model Cliente {
  tenantId String
  tenant   Tenant @relation(fields: [tenantId], references: [id])
}
```

**Muchos a Muchos (N:N)**
```prisma
model Usuario {
  roles     Rol[]
}

model Rol {
  usuarios  Usuario[]
}
```

## Migraciones

### ¿Qué es una migración?

Una migración es un archivo SQL que registra cambios en el schema de la BD.

### Workflow de Migraciones

```bash
# 1. Editar schema.prisma

# 2. Crear migración
npx prisma migrate dev --name descripcion

# 3. Aplicar migración a BD
# (se ejecuta automáticamente con --name)

# 4. Prisma genera cliente actualizado
# (automático)
```

### Comandos de Migraciones

```bash
# Crear migración en desarrollo
npx prisma migrate dev --name init

# Ver migraciones aplicadas
npx prisma migrate status

# Rollback de migración (desarrollo)
npx prisma migrate resolve --rolled-back init

# Aplicar migraciones en producción
npx prisma migrate deploy

# Reset completo (CUIDADO - borra datos)
npx prisma migrate reset

# Reset + seed
npx prisma migrate reset --skip-generate
```

## Prisma Studio (GUI)

Herramienta visual para explorar y editar datos:

```bash
npx prisma studio
```

Abre navegador en `http://localhost:5555`

Funcionalidades:
- ✅ Ver/editar registros
- ✅ Crear registros nuevos
- ✅ Eliminar registros
- ✅ Filtrar y buscar
- ✅ Exportar datos

## Seeding (Datos Iniciales)

### Archivo `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Crear tenant
  const tenant = await prisma.tenant.create({
    data: {
      nombre_comercial: "Mi Empresa",
      razon_social: "Mi Empresa S.A.",
      ruc: "1234567890001",
      email: "empresa@example.com",
      direccion: "Quito, Ecuador",
    },
  });

  // Crear usuario
  const usuario = await prisma.usuario.create({
    data: {
      tenantId: tenant.id,
      email: "admin@empresa.com",
      nombre_completo: "Administrador",
      password_hash: "hasheado_con_bcrypt",
      rol: "ADMIN",
    },
  });

  console.log("✅ Datos seed creados");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

### Ejecutar seed:

```bash
npx prisma db seed
```

## Queries con Prisma Client

### Importar cliente

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
```

### Operaciones CRUD

**CREATE**
```typescript
// Crear usuario
const usuario = await prisma.usuario.create({
  data: {
    email: "user@example.com",
    tenantId: "tenant123",
    nombre_completo: "Juan Pérez",
    password_hash: "hash",
    rol: "USUARIO",
  },
});
```

**READ**
```typescript
// Obtener uno por ID
const usuario = await prisma.usuario.findUnique({
  where: { id: "user123" },
});

// Obtener muchos (multitenant - IMPORTANTE)
const usuarios = await prisma.usuario.findMany({
  where: {
    tenantId: "tenant123",  // ← SIEMPRE FILTRAR POR TENANT
  },
});

// Buscar con condiciones
const activos = await prisma.usuario.findMany({
  where: {
    tenantId: "tenant123",
    activo: true,
  },
});
```

**UPDATE**
```typescript
const actualizado = await prisma.usuario.update({
  where: { id: "user123" },
  data: {
    nombre_completo: "Juan Pérez García",
  },
});
```

**DELETE**
```typescript
await prisma.usuario.delete({
  where: { id: "user123" },
});
```

## Validación de Schema

```bash
# Validar que schema sea correcto
npx prisma validate

# Formatear schema automáticamente
npx prisma format
```

## Generación de Tipos

```bash
# Generar tipos de Prisma
npx prisma generate

# Se genera en node_modules/.prisma/client
```

Usar tipos generados:

```typescript
import { Usuario, Factura } from '@prisma/client';

function procesarUsuario(usuario: Usuario) {
  console.log(usuario.email);
}
```

## Buenas Prácticas

### ✅ CORRECTO - Con tenant_id

```typescript
// Siempre filtrar por tenant_id
const clientes = await prisma.cliente.findMany({
  where: {
    tenantId: user.tenantId,  // ← OBLIGATORIO
    activo: true,
  },
});
```

### ❌ INCORRECTO - Sin tenant_id

```typescript
// PELIGRO - Acceso a todos los datos del sistema
const clientes = await prisma.cliente.findMany({
  where: { activo: true },
});
```

### ✅ ÍNDICES PARA PERFORMANCE

```prisma
model Cliente {
  id       String @id
  tenantId String
  
  // Índice simple
  @@index([tenantId])
  
  // Índice compuesto
  @@index([tenantId, activo])
}
```

## Troubleshooting

### Error: "Can't reach database server"
```
Solución: Verificar que PostgreSQL esté corriendo
         docker ps  (si usas Docker)
         Verificar DATABASE_URL en .env
```

### Error: "User doesn't have permissions"
```
Solución: Verificar permisos del usuario en PostgreSQL
         ALTER ROLE usuario WITH CREATEDB;
```

### Error: "Foreign key constraint fails"
```
Solución: Verificar que tenantId existe antes de crear registro
         Usar onDelete: Cascade en relaciones
```

## Próximos Pasos

1. ✅ Instalar Prisma
2. ✅ Configurar DATABASE_URL
3. ✅ Definir schema.prisma
4. ✅ Crear migraciones: `npx prisma migrate dev --name init`
5. ✅ Ejecutar seed: `npx prisma db seed`
6. ✅ Abrir Prisma Studio: `npx prisma studio`

---

**Referencia:** [Documentación oficial de Prisma](https://www.prisma.io/docs)
