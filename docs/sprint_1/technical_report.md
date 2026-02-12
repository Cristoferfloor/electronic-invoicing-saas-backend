# Informe Técnico: Implementación del Sprint 1 - Backend
**Sistema de Facturación Electrónica SaaS Multitenant**

## 1. Resumen Ejecutivo
Se ha completado la configuración inicial del backend y la implementación del módulo de **Autenticación y Gestión Multitenant**. La arquitectura se basa en Node.js con TypeScript, utilizando PostgreSQL como base de datos relacional y Prisma ORM para el manejo de datos. Se ha configurado un entorno dockerizado para la base de datos y se han implementado medidas de seguridad robustas (JWT, bcrypt).

## 2. Tecnologías Implementadas
- **Runtime**: Node.js (v20+)
- **Framework Web**: Express.js
- **Lenguaje**: TypeScript (Tipado estático)
- **Base de Datos**: PostgreSQL 15 (Dockerizada)
- **ORM**: Prisma (Mapeo Objeto-Relacional)
- **Seguridad**:
    - `bcryptjs`: Hashing de contraseñas.
    - `jsonwebtoken`: Manejo de sesiones stateless (Access + Refresh Tokens).
    - `zod`: Validación estricta de datos de entrada.

## 3. Arquitectura de Base de Datos (Schema)
Se diseñó un esquema relacional centrado en la arquitectura **Multitenant (Inquilino Múltiple)** utilizando el patrón de "Discriminador en Tabla Compartida" (Shared Database, Shared Schema).

### Modelos Principales:
1.  **Tenant (Empresa)**: Entidad raíz. Almacena datos fiscales (RUC, Razón Social) y configuración.
2.  **Usuario**: Vinculado a un Tenant. Incluye roles (ADMIN/USUARIO) y credenciales.
3.  **ConfiguracionFacturacion**: Tabla 1:1 con Tenant para manejar secuenciales y firmas electrónicas.
4.  **RefreshToken**: Tabla para manejo seguro de sesiones de larga duración.
5.  **Factura, Cliente, Producto, DetalleFactura**: Tablas transaccionales particionadas lógicamente por `tenantId`.

**Estrategia de Aislamiento:**
Todas las tablas críticas incluyen un campo `tenantId` obligatorio que actúa como discriminador. Esto permite filtrar automáticamente los datos y asegurar que un tenant nunca acceda a la información de otro.

## 4. Módulo de Autenticación
Se implementó un sistema de autenticación completo con el flujo:
`Registro -> Login -> JWT (Access Token) -> Refresh Token`

### Componentes:
- **AuthService**: Contiene la lógica de negocio.
    - `registerTenant`: Crea Tenant, Usuario Admin y Configuración en una transacción atómica (ACID).
    - `login`: Valida credenciales y estado del tenant.
    - `refreshToken`: Permite renovar el token de acceso sin pedir credenciales nuevamente.
- **AuthController**: Maneja las peticiones HTTP y respuestas estandarizadas.
- **AuthRoutes**: Define los endpoints públicos (`/api/auth/*`).
- **Validaciones**: Se utilizan esquemas `Zod` para validar RUC (13 dígitos), emails y fortaleza de contraseñas antes de procesar cualquier solicitud.

## 5. middlewares Implementados
1.  **AuthMiddleware**: Intercepta cada petición protegida, verifica la firma del JWT y decodifica el `tenantId` y `userId`, inyectándolos en el contexto del request.
2.  **RoleMiddleware**: Verifica si el usuario tiene el rol necesario (ej. ADMIN) para acceder a recursos sensibles.
3.  **ErrorMiddleware**: Captura excepciones no manejadas y retorna respuestas JSON consistentes (HTTP 500/400).

## 6. Configuración de Entorno y Despliegue Local
- **Docker Compose**: Se creó un archivo `docker-compose.yml` para levantar PostgreSQL de forma aislada y reproducible.
- **Variables de Entorno (.env)**: Configuración sensible (Base de datos, Secretos JWT) separada del código fuente.
- **Seeding**: Script (`prisma/seed.ts`) para poblar la base de datos con un Tenant de demostración (`Empresa Demo SaaS`) y un usuario administrador inicial (`admin@demo.com`).

## 7. Pruebas Realizadas
- **Conexión a BD**: Verificada mediante migraciones exitosas.
- **Creación de Tablas**: Verificada en PostgreSQL.
- **Seed de Datos**: Verificado con la creación del usuario admin.
- **Levantamiento del Servidor**: Exitoso en puerto 3000.
- **Swagger**: Documentación de API disponible en `/api-docs`.

## 8. Próximos Pasos (Sprint 2)
- Implementar CRUD completo de Usuarios (gestión interna del tenant).
- Implementar endpoints para configuración de perfil de empresa.
- Iniciar desarrollo del Frontend en Angular para consumir estos servicios.
