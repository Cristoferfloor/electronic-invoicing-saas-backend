#!/bin/bash

# Script para inicializar el proyecto backend
# Uso: chmod +x init-project.sh && ./init-project.sh

echo "🚀 Inicializando Electronic Invoicing SaaS Backend..."
echo ""

# 1. Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# 2. Copiar .env
echo "⚙️ Configurando variables de entorno..."
if [ ! -f .env ]; then
  cp .env.example .env
  echo "✅ Archivo .env creado. Edita los valores según tu ambiente."
else
  echo "✅ Archivo .env ya existe."
fi

# 3. Crear estructura de carpetas (si no existen)
echo "📁 Verificando estructura de carpetas..."
mkdir -p src/database/{migrations,seeders,scripts}
mkdir -p src/modules/{auth,tenants,users,clients,products,invoices,dashboard,reports}/{controllers,services,routes,models,validators}
mkdir -p src/shared/{constants,helpers,interfaces,types}
mkdir -p src/middlewares
mkdir -p src/config
mkdir -p src/utils
mkdir -p docs
mkdir -p uploads

echo "✅ Estructura de carpetas lista."
echo ""

# 4. Información final
cat << 'EOF'

╔═══════════════════════════════════════════════════════════════════════════════╗
║                                                                               ║
║          ✅ INICIALIZACIÓN COMPLETADA                                        ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝

📝 SIGUIENTES PASOS:

1. EDITAR VARIABLES DE ENTORNO
   nano .env
   - Cambiar DATABASE_URL con tu conexión PostgreSQL
   - Cambiar JWT_SECRET con valor seguro
   - Cambiar NODE_ENV según ambiente

2. CREAR SCHEMA DE BASE DE DATOS
   Editar: prisma/schema.prisma
   - Definir modelo Tenant
   - Definir modelo User (con tenant_id)
   - Definir modelo Client (con tenant_id)
   - Definir modelo Product (con tenant_id)
   - Definir modelo Invoice (con tenant_id)
   - Definir modelo InvoiceDetail (con tenant_id)

3. EJECUTAR MIGRACIONES
   npx prisma migrate dev --name init

4. GENERAR CLIENTE PRISMA
   npx prisma generate

5. INICIAR EN DESARROLLO
   npm run dev

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📚 DOCUMENTACIÓN:

Ver estructura detallada:
  cat STRUCTURE.md

Ver README del proyecto:
  cat README.md

Ver variables de entorno:
  cat .env.example

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 ESTRUCTURA DE MÓDULOS LISTA:

✅ auth/          → Autenticación JWT
✅ tenants/       → Gestión de empresas
✅ users/         → Gestión de usuarios
✅ clients/       → Catálogo de clientes
✅ products/      → Catálogo de productos
✅ invoices/      → ⭐ Facturación electrónica
✅ dashboard/     → Reportes y estadísticas
✅ reports/       → Exportación de reportes

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 TIPS ÚTILES:

Abrir Prisma Studio (GUI visual de BD):
  npx prisma studio

Ver logs en tiempo real:
  npm run dev

Ejecutar migraciones:
  npx prisma migrate dev

Reset base de datos:
  npx prisma migrate reset

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

¡El proyecto está listo para desarrollo! 🚀

EOF

echo ""
