# 🚀 Guía de Instalación y Configuración - Sprint 1

## Paso 1: Clonar y Preparar el Proyecto

```bash
# Navegar a la carpeta del proyecto
cd "/home/desarrollo/Descargas/nesj/DESCONOCIDO /electronic-invoicing-saas-backend"

# Verificar estructura
ls -la
```

## Paso 2: Instalar Dependencias Node.js

```bash
# Instalar todas las dependencias especificadas en package.json
npm install

# Verificar instalación
npm list --depth=0
```

**Dependencias principales instaladas:**
- ✅ express - Framework web
- ✅ @prisma/client - Cliente ORM
- ✅ jsonwebtoken - Generación de JWT
- ✅ bcryptjs - Hash de contraseñas
- ✅ typescript - Lenguaje tipado
- ✅ ts-node - Ejecutar TypeScript

## Paso 3: Configurar Base de Datos PostgreSQL

### Opción A: PostgreSQL Local (Recomendado para desarrollo)

#### En Windows:
```bash
# Descargar: https://www.postgresql.org/download/windows/
# Instalar con pgAdmin incluido
# Usuario por defecto: postgres
# Contraseña: la que especifiques en instalación
```

#### En macOS:
```bash
# Con Homebrew
brew install postgresql@15

# Iniciar servicio
brew services start postgresql@15

# Conectar
psql postgres
```

#### En Linux (Ubuntu/Debian):
```bash
# Instalar
sudo apt-get install postgresql postgresql-contrib

# Iniciar servicio
sudo systemctl start postgresql

# Conectar
sudo -u postgres psql
```

### Opción B: PostgreSQL en Docker (Más fácil)

```bash
# Crear contenedor PostgreSQL
docker run --name postgres-invoicing \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=electronic_invoicing_dev \
  -p 5432:5432 \
  -d postgres:15

# Verificar que corre
docker ps

# Ver logs
docker logs postgres-invoicing

# Conectar (opcional)
docker exec -it postgres-invoicing psql -U postgres
```

## Paso 4: Crear Base de Datos

### Con SQL directo:

```sql
CREATE DATABASE electronic_invoicing_dev;
```

### Conectar a la BD:

```bash
psql -U postgres -d electronic_invoicing_dev
```

## Paso 5: Configurar Variables de Entorno

### Crear archivo `.env`:

```bash
# Copiar template a .env
cp .env.example .env

# Editar .env con tus valores
nano .env
# o en Windows
notepad .env
```

### Contenido de `.env`:

```env
# Base de Datos
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/electronic_invoicing_dev"

# JWT
JWT_SECRET="tu_secreto_super_seguro_cambia_esto_en_produccion_12345678"
JWT_REFRESH_SECRET="tu_secreto_refresh_cambia_esto_en_produccion_87654321"
JWT_EXPIRATION=900
REFRESH_TOKEN_EXPIRATION=604800

# Server
PORT=3000
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:4200

# Logging
LOG_LEVEL=debug

# SRI (Ambiente de prueba)
SRI_ENV=testing
```

**⚠️ IMPORTANTE:**
- Nunca commitear `.env` al repositorio
- Cambiar JWT_SECRET en producción
- Usar valores reales para BD

## Paso 6: Verificar Esquema Prisma

```bash
# Validar que schema.prisma sea correcto
npx prisma validate

# Formatear schema
npx prisma format
```

**Salida esperada:**
```
✅ Your schema.prisma is valid
```

## Paso 7: Ejecutar Migraciones

### Crear migración inicial:

```bash
npx prisma migrate dev --name init
```

**Lo que hace:**
1. Crea archivo: `prisma/migrations/[timestamp]_init/migration.sql`
2. Ejecuta SQL en la BD
3. Crea todas las tablas (Tenant, Usuario, Cliente, Producto, Factura, DetalleFactura)
4. Genera cliente Prisma actualizado

**Salida esperada:**
```
✓ Generated Prisma Client (5.8.0) in 234ms

✓ Your database has been created at postgresql://postgres:postgres@localhost:5432/electronic_invoicing_dev

✓ Successfully created 6 new tables

✓ Ran 1 migration in 1.234s
```

### Verificar tablas creadas:

```bash
# Con psql
psql -U postgres -d electronic_invoicing_dev -c "\dt"

# Resultado:
#  tenants
#  usuarios
#  clientes
#  productos
#  facturas
#  detalles_facturas
```

## Paso 8: Ejecutar Script de Seed (Datos Iniciales)

### Crear archivo `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Limpiar datos existentes
  await prisma.detalleFactura.deleteMany();
  await prisma.factura.deleteMany();
  await prisma.producto.deleteMany();
  await prisma.cliente.deleteMany();
  await prisma.usuario.deleteMany();
  await prisma.tenant.deleteMany();

  // Crear tenant de prueba
  const tenant = await prisma.tenant.create({
    data: {
      nombre_comercial: "Panadería Don Pan",
      razon_social: "Panadería Don Pan S.A.",
      ruc: "1234567890001",
      email: "admin@donpan.com",
      direccion: "Calle Principal 123, Quito",
      telefono: "+593 2 555 1234",
    },
  });

  // Crear usuario admin
  const usuario = await prisma.usuario.create({
    data: {
      tenantId: tenant.id,
      email: "admin@donpan.com",
      nombre_completo: "Juan Pérez",
      password_hash: "$2a$10$...hash_bcrypt...",  // Generado con bcryptjs
      rol: "ADMIN",
    },
  });

  // Crear cliente
  const cliente = await prisma.cliente.create({
    data: {
      tenantId: tenant.id,
      nombre: "Tienda La Esquina",
      identificacion: "9876543210001",
      tipo_identificacion: "RUC",
      email: "compras@laesquina.com",
      telefono: "+593 2 666 5555",
      direccion: "Av. Secundaria 456, Quito",
      ciudad: "Quito",
    },
  });

  // Crear producto
  const producto = await prisma.producto.create({
    data: {
      tenantId: tenant.id,
      codigo: "PAN001",
      nombre: "Pan francés (docena)",
      descripcion: "Pan francés fresco diario",
      precio_unitario: "12.50",
      aplica_iva: true,
      unidad_medida: "Docena",
    },
  });

  console.log("✅ Datos seed creados:");
  console.log(`   - Tenant: ${tenant.nombre_comercial}`);
  console.log(`   - Usuario: ${usuario.email}`);
  console.log(`   - Cliente: ${cliente.nombre}`);
  console.log(`   - Producto: ${producto.nombre}`);
}

main()
  .catch(e => {
    console.error("❌ Error en seed:", e);
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

**Salida esperada:**
```
✅ Datos seed creados:
   - Tenant: Panadería Don Pan
   - Usuario: admin@donpan.com
   - Cliente: Tienda La Esquina
   - Producto: Pan francés (docena)
```

## Paso 9: Generar Cliente Prisma

```bash
# Generar tipos de Prisma
npx prisma generate

# Salida esperada:
# ✔ Generated Prisma Client (5.8.0) to ./node_modules/.prisma/client
```

## Paso 10: Abrir Prisma Studio (Verificación Visual)

```bash
# Abre interfaz gráfica para explorar datos
npx prisma studio
```

**Se abrirá en:** `http://localhost:5555`

Allí puedes:
- ✅ Ver todos los datos creados
- ✅ Crear/editar/eliminar registros
- ✅ Explorar relaciones
- ✅ Verificar schema

## Paso 11: Compilar TypeScript

```bash
# Compilar a JavaScript en dist/
npm run build

# Verificar que no hay errores
```

## Paso 12: Iniciar Servidor en Desarrollo

### Primera ejecución (sin código aún):

```bash
npm run dev
```

**Cuando tengas app.ts implementado:**
```
Salida esperada:
✅ Servidor ejecutándose en puerto 3000
✅ Base de datos conectada
```

## 📋 Checklist de Configuración

- [ ] Node.js v18+ instalado (`node --version`)
- [ ] PostgreSQL corriendo (`docker ps` o `psql --version`)
- [ ] `npm install` ejecutado exitosamente
- [ ] `.env` configurado con DATABASE_URL correcto
- [ ] `npx prisma validate` sin errores
- [ ] `npx prisma migrate dev --name init` exitoso
- [ ] Tablas creadas en BD (`\dt` en psql)
- [ ] `npx prisma db seed` ejecutado
- [ ] `npx prisma studio` abre correctamente
- [ ] `npm run build` compila sin errores

## 🐛 Troubleshooting

### Error: "Can't reach database server"
```bash
# Verificar que PostgreSQL está corriendo
docker ps
# o
brew services list

# Si no está corriendo, iniciar
docker start postgres-invoicing
```

### Error: "database does not exist"
```bash
# Crear BD manualmente
createdb -U postgres electronic_invoicing_dev

# O en Docker
docker exec postgres-invoicing createdb -U postgres electronic_invoicing_dev
```

### Error: "password authentication failed"
```
Verificar DATABASE_URL en .env
Formato correcto: postgresql://USER:PASSWORD@HOST:PORT/DATABASE
Ejemplo: postgresql://postgres:postgres@localhost:5432/electronic_invoicing_dev
```

### Error: "Schema syntax error"
```bash
# Validar schema
npx prisma validate

# Formatear automáticamente
npx prisma format
```

### Prisma Studio no abre
```bash
# Reinstalar Prisma
npm install @prisma/client@latest prisma@latest

# Limpiar caché
rm -rf node_modules/.prisma

# Generar cliente
npx prisma generate

# Intentar de nuevo
npx prisma studio
```

## 📚 Próximos Pasos Después de Configuración

1. ✅ Crear `src/app.ts` (servidor Express)
2. ✅ Crear `src/server.ts` (inicialización)
3. ✅ Implementar middlewares
4. ✅ Crear controladores de auth
5. ✅ Probar endpoints en Postman

## 📞 Ayuda y Recursos

- Documentación Prisma: https://www.prisma.io/docs
- Documentación Express: https://expressjs.com
- Documentación PostgreSQL: https://www.postgresql.org/docs
- JWT: https://jwt.io

---

**Ultima actualización:** 10 de febrero de 2026
**Estado:** Listo para uso
