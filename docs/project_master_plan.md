# 📅 PLAN DE SPRINTS - SISTEMA DE GESTIÓN DE PERMISOS

**Proyecto:** Sistema Multitenant de Gestión de Permisos y Vacaciones  
**Duración Total:** 32 semanas (8 meses)  
**Inicio:** 10 de febrero de 2025  
**Fin Estimado:** 10 de octubre de 2025  

---

## 📊 RESUMEN DE SPRINTS

| Sprint | Nombre | Duración | Semanas | Estado |
|--------|--------|----------|---------|--------|
| 0.1 | Backend Setup | 1 semana | 1-1 | ⏳ No iniciado |
| 0.2 | Frontend Setup | 1 semana | 2-2 | ⏳ No iniciado |
| 1.1 | Backend Autenticación | 1 semana | 3-3 | ⏳ No iniciado |
| 1.2 | Frontend Autenticación | 1 semana | 4-4 | ⏳ No iniciado |
| 2.1 | Backend Usuarios | 1 semana | 5-5 | ⏳ No iniciado |
| 2.2 | Frontend Usuarios | 1 semana | 6-6 | ⏳ No iniciado |
| 3.1 | Backend Roles & Permisos | 1 semana | 7-7 | ⏳ No iniciado |
| 3.2 | Frontend Roles & Permisos | 1 semana | 8-8 | ⏳ No iniciado |
| 4.1 | Backend Empresas & Departamentos | 1 semana | 9-9 | ⏳ No iniciado |
| 4.2 | Frontend Empresas & Departamentos | 1 semana | 10-10 | ⏳ No iniciado |
| 5.1 | Backend Tipos de Permisos | 1 semana | 11-11 | ⏳ No iniciado |
| 5.2 | Frontend Tipos de Permisos | 1 semana | 12-12 | ⏳ No iniciado |
| 6.1 | Backend Solicitudes | 1 semana | 13-13 | ⏳ No iniciado |
| 6.2 | Frontend Solicitudes | 1 semana | 14-14 | ⏳ No iniciado |
| 7.1 | Backend Aprobaciones | 1 semana | 15-15 | ⏳ No iniciado |
| 7.2 | Frontend Aprobaciones | 1 semana | 16-16 | ⏳ No iniciado |
| 8.1 | Backend Calendario | 1 semana | 17-17 | ⏳ No iniciado |
| 8.2 | Frontend Calendario | 1 semana | 18-18 | ⏳ No iniciado |
| 9.1 | Backend Notificaciones | 1 semana | 19-19 | ⏳ No iniciado |
| 9.2 | Frontend Notificaciones | 1 semana | 20-20 | ⏳ No iniciado |
| 10.1 | Backend Reportes | 1 semana | 21-21 | ⏳ No iniciado |
| 10.2 | Frontend Reportes | 1 semana | 22-22 | ⏳ No iniciado |
| 11.1 | Backend Auditoría | 1 semana | 23-23 | ⏳ No iniciado |
| 11.2 | Frontend Auditoría | 1 semana | 24-24 | ⏳ No iniciado |
| 12.1 | Backend Administración | 1 semana | 25-25 | ⏳ No iniciado |
| 12.2 | Frontend Administración | 1 semana | 26-26 | ⏳ No iniciado |
| 13.1 | Testing & Optimización Backend | 2 semanas | 27-28 | ⏳ No iniciado |
| 13.2 | Testing & Optimización Frontend | 2 semanas | 29-30 | ⏳ No iniciado |
| 14.1 | Deployment Preparation | 1 semana | 31-31 | ⏳ No iniciado |
| 14.2 | Documentación & Training | 1 semana | 32-32 | ⏳ No iniciado |
| 15.1 | UAT | 1 semana | 33-33 | ⏳ No iniciado |
| 15.2 | Launch & Post-Launch | 1 semana | 34-34 | ⏳ No iniciado |

---

## FASE 0: SETUP & FOUNDATION (2 semanas)

### SPRINT 0.1 - BACKEND SETUP
**Duración:** 1 semana | **Semanas:** 1-1 | **Fechas:** 10-14 Feb | **Estado:** ⏳

#### 📋 Tareas Principales

- [ ] Crear proyecto NestJS con arquitectura modular
- [ ] Configurar TypeORM + MySQL
- [ ] Crear archivo .env y configuraciones
- [ ] Implementar Guards globales (JwtAuthGuard, RolesGuard)
- [ ] Implementar Interceptors (LoggingInterceptor, TransformInterceptor)
- [ ] Implementar Filters (HttpExceptionFilter, AllExceptionsFilter)
- [ ] Implementar Pipes (ValidationPipe)
- [ ] Crear decorators (@Roles, @CurrentUser, @Public)
- [ ] Implementar utilidades (date.utils, encryption.utils, response.utils)
- [ ] Configurar Swagger para documentación
- [ ] Configurar CORS
- [ ] Crear todas las migrations de base de datos (23 tablas)
- [ ] Crear seeders iniciales
- [ ] Ejecutar migrations y seeders
- [ ] Probar conexión y estructura de BD

#### 🎁 Entregables
- Backend ejecutándose en localhost:3000
- Base de datos con 23 tablas y datos seed
- Swagger disponible en /api/docs
- Estructura modular lista

#### ✅ Criterios de Aceptación
- [ ] Backend responde correctamente
- [ ] BD tiene todas las tablas con relaciones correctas
- [ ] Seeders insertaron datos iniciales correctamente
- [ ] Swagger documenta estructura básica
- [ ] Guards, interceptors y filters funcionan

#### 👥 Equipo Asignado
- Backend Developer (1)
- DevOps/DBA (0.5)

#### 📊 Estimación
- 40-50 horas

---

### SPRINT 0.2 - FRONTEND SETUP
**Duración:** 1 semana | **Semanas:** 2-2 | **Fechas:** 17-21 Feb | **Estado:** ⏳

#### 📋 Tareas Principales

- [ ] Crear proyecto Angular 19 con standalone components
- [ ] Configurar estructura de carpetas (core, shared, features)
- [ ] Crear environments (development, production)
- [ ] Configurar HttpClient y constantes API
- [ ] Crear servicios core (http.service, storage.service, token.service)
- [ ] Crear guards base (auth.guard)
- [ ] Crear interceptors (auth.interceptor, error.interceptor, loading.interceptor)
- [ ] Implementar componentes UI base
- [ ] Implementar layout completo
- [ ] Crear pipes comunes
- [ ] Crear directives
- [ ] Configurar estilos globales y variables CSS
- [ ] Configurar routing base
- [ ] Crear componentes comunes

#### 🎁 Entregables
- Frontend ejecutándose en localhost:4200
- Layout completo y responsive
- Componentes UI reutilizables
- Sistema de routing configurado

#### ✅ Criterios de Aceptación
- [ ] Frontend carga correctamente
- [ ] Layout se visualiza correctamente
- [ ] Componentes UI son reutilizables
- [ ] Estilos globales aplicados
- [ ] Routing funciona correctamente

#### 👥 Equipo Asignado
- Frontend Developer (1)

#### 📊 Estimación
- 40-50 horas

---

## FASE 1: AUTENTICACIÓN (2 semanas)

### SPRINT 1.1 - BACKEND AUTENTICACIÓN
**Duración:** 1 semana | **Semanas:** 3-3 | **Fechas:** 24-28 Feb | **Estado:** ⏳

#### 📋 Tareas Principales

**Auth Module - Configuración Base:**
- [ ] Crear módulo de autenticación
- [ ] Configurar JWT en jwt.config.ts
- [ ] Configurar Passport strategies

**Endpoints de Autenticación:**
- [ ] POST /auth/register - Registro de nuevos usuarios
- [ ] POST /auth/login - Inicio de sesión
- [ ] POST /auth/logout - Cerrar sesión
- [ ] POST /auth/refresh - Renovar access token
- [ ] POST /auth/forgot-password - Solicitar reset
- [ ] POST /auth/reset-password - Restablecer contraseña

**Strategies:**
- [ ] Crear jwt.strategy.ts
- [ ] Crear local.strategy.ts

**DTOs:**
- [ ] register.dto.ts
- [ ] login.dto.ts
- [ ] refresh-token.dto.ts
- [ ] forgot-password.dto.ts
- [ ] reset-password.dto.ts

**Entities:**
- [ ] refresh-token.entity.ts
- [ ] password-reset.entity.ts

**Services:**
- [ ] auth.service.ts con todos los métodos

**Email Service:**
- [ ] Configurar Nodemailer
- [ ] Crear templates de email

**Guards:**
- [ ] jwt-auth.guard.ts
- [ ] Aplicar guard globalmente

**Validaciones:**
- [ ] Email formato válido
- [ ] Password reglas de fortaleza
- [ ] Confirmación de password

**Testing:**
- [ ] Test unitario: AuthService.register()
- [ ] Test unitario: AuthService.login()
- [ ] Test integración: POST /auth/register
- [ ] Test integración: POST /auth/login

**Documentación:**
- [ ] Documentar todos los endpoints en Swagger

#### 🎁 Entregables
- API de autenticación completa y funcional
- Sistema de JWT con access y refresh tokens
- Recuperación de contraseña por email
- Endpoints documentados en Swagger
- Tests básicos pasando

#### ✅ Criterios de Aceptación
- [ ] Usuario puede registrarse y recibe email
- [ ] Usuario puede hacer login y obtiene tokens
- [ ] Access token expira en 15 minutos
- [ ] Refresh token permite renovar access token
- [ ] Usuario puede recuperar contraseña
- [ ] Link de reset expira en 1 hora
- [ ] Tokens revocados no funcionan
- [ ] Passwords se guardan hasheadas
- [ ] Tests pasan exitosamente
- [ ] Swagger documenta correctamente

#### 👥 Equipo Asignado
- Backend Developer (1)
- QA/Tester (0.5)

#### 📊 Estimación
- 40-50 horas

---

### SPRINT 1.2 - FRONTEND AUTENTICACIÓN
**Duración:** 1 semana | **Semanas:** 4-4 | **Fechas:** 3-7 Mar | **Estado:** ⏳

#### 📋 Tareas Principales

**Configuración Inicial:**
- [ ] Crear feature module de auth
- [ ] Configurar rutas (/login, /register, /forgot-password, /reset-password)

**Componente Login:**
- [ ] Crear login.component.ts (standalone)
- [ ] Template con formulario reactivo
- [ ] Validaciones en tiempo real
- [ ] Manejo de errores
- [ ] Estilos responsive

**Componente Register:**
- [ ] Crear register.component.ts (standalone)
- [ ] Formulario con todos los campos
- [ ] Indicador de fortaleza de contraseña
- [ ] Manejo de errores

**Componente Forgot Password:**
- [ ] Crear forgot-password.component.ts
- [ ] Envío de email de recuperación

**Componente Reset Password:**
- [ ] Crear reset-password.component.ts
- [ ] Capturar token de URL

**Services:**
- [ ] Crear auth.service.ts
- [ ] Crear token.service.ts

**Guards:**
- [ ] Crear auth.guard.ts
- [ ] Aplicar a rutas protegidas

**Interceptors:**
- [ ] Crear auth.interceptor.ts
- [ ] Crear error.interceptor.ts

**Models:**
- [ ] login.model.ts
- [ ] auth-response.model.ts

**Shared Components:**
- [ ] Crear password-strength.component.ts

**Testing:**
- [ ] Test unitario: AuthService
- [ ] Test unitario: TokenService
- [ ] Test componente: LoginComponent
- [ ] Test E2E: Flujo completo de login

#### 🎁 Entregables
- Sistema de login/logout funcional
- Página de registro con validaciones
- Recuperación de contraseña
- Manejo automático de refresh token
- Guards e interceptors configurados
- Diseño responsive y moderno

#### ✅ Criterios de Aceptación
- [ ] Usuario puede hacer login y es redirigido
- [ ] Token se guarda en localStorage
- [ ] Token se agrega a todas las requests
- [ ] Al expirar access token, se renueva automáticamente
- [ ] Usuario puede registrarse con validaciones
- [ ] Usuario puede recuperar contraseña
- [ ] Sesión persiste después de refrescar
- [ ] Rutas protegidas redirigen a login
- [ ] Logout elimina tokens y redirige
- [ ] Responsive en móvil, tablet, desktop
- [ ] Mensajes de error claros

#### 👥 Equipo Asignado
- Frontend Developer (1)
- QA/Tester (0.5)

#### 📊 Estimación
- 40-50 horas

---

## FASE 2: USUARIOS (2 semanas)

### SPRINT 2.1 - BACKEND USUARIOS
**Duración:** 1 semana | **Semanas:** 5-5 | **Fechas:** 10-14 Mar | **Estado:** ⏳

#### 📋 Tareas Principales

**Users Module - Estructura:**
- [ ] Crear módulo en /src/modules/users
- [ ] Configurar relaciones

**Endpoints CRUD:**
- [ ] GET /users - Listar usuarios (con paginación y filtros)
- [ ] GET /users/:id - Obtener un usuario
- [ ] POST /users - Crear usuario
- [ ] PUT /users/:id - Actualizar usuario
- [ ] DELETE /users/:id - Eliminar usuario (soft delete)

**Endpoints de Perfil:**
- [ ] GET /users/profile - Obtener perfil propio
- [ ] PUT /users/profile - Actualizar perfil propio
- [ ] POST /users/profile/upload-image - Subir foto

**Endpoint Cambio de Contraseña:**
- [ ] PUT /users/change-password

**DTOs:**
- [ ] create-user.dto.ts
- [ ] update-user.dto.ts
- [ ] update-profile.dto.ts
- [ ] change-password.dto.ts
- [ ] user-filter.dto.ts

**Entity:**
- [ ] Actualizar user.entity.ts

**Service:**
- [ ] users.service.ts completo

**Validaciones:**
- [ ] Email unique
- [ ] EmployeeCode unique
- [ ] Password reglas
- [ ] Relaciones válidas

**Permisos:**
- [ ] PermissionGuard
- [ ] Decorador @RequirePermissions()

**Testing:**
- [ ] Test unitario: UsersService.create()
- [ ] Test unitario: UsersService.findAll()
- [ ] Test integración: GET /users
- [ ] Test integración: POST /users
- [ ] Test integración: PUT /users/change-password
- [ ] Validaciones unitarias

#### 🎁 Entregables
- API CRUD completa de usuarios
- Sistema de perfil de usuario
- Cambio de contraseña con validaciones
- Upload de foto de perfil
- Paginación y filtros funcionando
- Permisos por endpoint

#### ✅ Criterios de Aceptación
- [ ] ADMIN puede crear, editar, eliminar usuarios
- [ ] Usuario puede ver y editar su perfil
- [ ] Usuario puede cambiar su contraseña
- [ ] Validaciones funcionan correctamente
- [ ] Paginación funciona con filtros
- [ ] Búsqueda encuentra usuarios
- [ ] Solo usuarios autorizados acceden
- [ ] Foto se sube correctamente
- [ ] Soft delete funciona
- [ ] Tests pasan

#### 👥 Equipo Asignado
- Backend Developer (1)
- QA/Tester (0.5)

#### 📊 Estimación
- 40-50 horas

---

### SPRINT 2.2 - FRONTEND USUARIOS
**Duración:** 1 semana | **Semanas:** 6-6 | **Fechas:** 17-21 Mar | **Estado:** ⏳

#### 📋 Tareas Principales

**Configuración:**
- [ ] Crear feature en /src/app/features/users
- [ ] Configurar rutas

**Página User List:**
- [ ] Crear user-list.component.ts
- [ ] Tabla responsive con columnas
- [ ] Barra de búsqueda
- [ ] Filtros dinámicos
- [ ] Paginación
- [ ] Eliminar con confirmación

**Página User Detail:**
- [ ] Crear user-detail.component.ts
- [ ] Mostrar información completa

**Página User Profile (Perfil Propio):**
- [ ] Crear user-profile.component.ts
- [ ] Editar datos personales
- [ ] Cambiar contraseña
- [ ] Upload de foto

**Componente User Form:**
- [ ] Crear user-form.component.ts reutilizable
- [ ] Modo create/edit
- [ ] Todos los campos necesarios
- [ ] Validaciones

**Componente Change Password Form:**
- [ ] Crear change-password-form.component.ts
- [ ] Indicador de fortaleza

**Services:**
- [ ] users-api.service.ts
- [ ] Todos los métodos CRUD

**Models:**
- [ ] user.model.ts
- [ ] DTOs de frontend

**Dashboard Updates:**
- [ ] Agregar widget "Mi Perfil"

**Testing:**
- [ ] Test componente: UserListComponent
- [ ] Test componente: UserFormComponent
- [ ] Test E2E: Crear usuario

#### 🎁 Entregables
- Listado de usuarios con búsqueda y filtros
- Formulario de creación/edición
- Página de perfil propio
- Cambio de contraseña
- Upload de foto
- Detalle de usuario

#### ✅ Criterios de Aceptación
- [ ] ADMIN ve lista de usuarios
- [ ] Búsqueda funciona en tiempo real
- [ ] Filtros funcionan correctamente
- [ ] Paginación navega entre páginas
- [ ] ADMIN puede crear usuarios
- [ ] Validaciones claras
- [ ] Usuario puede editar su perfil
- [ ] Cambio de contraseña funciona
- [ ] Foto se sube y se ve
- [ ] Eliminar pide confirmación
- [ ] Tabla responsive en mobile

#### 👥 Equipo Asignado
- Frontend Developer (1)
- QA/Tester (0.5)

#### 📊 Estimación
- 40-50 horas

---

## FASE 3: ROLES Y PERMISOS (2 semanas)

### SPRINT 3.1 - BACKEND ROLES & PERMISOS
**Duración:** 1 semana | **Semanas:** 7-7 | **Fechas:** 24-28 Mar | **Estado:** ⏳

#### 📋 Tareas Principales

**Roles Module:**
- [ ] Crear módulo en /src/modules/roles
- [ ] GET /roles - Listar roles
- [ ] GET /roles/:id - Obtener un rol
- [ ] POST /roles - Crear rol
- [ ] PUT /roles/:id - Actualizar rol
- [ ] DELETE /roles/:id - Eliminar rol

**Endpoints de Permisos de Rol:**
- [ ] GET /roles/:id/permissions
- [ ] POST /roles/:id/permissions
- [ ] POST /roles/:id/permissions/add
- [ ] DELETE /roles/:roleId/permissions/:permissionId

**Permissions Module:**
- [ ] GET /permissions - Listar permisos
- [ ] GET /permissions/:id
- [ ] POST /permissions
- [ ] PUT /permissions/:id
- [ ] DELETE /permissions/:id

**DTOs:**
- [ ] create-role.dto.ts
- [ ] update-role.dto.ts
- [ ] assign-permissions.dto.ts
- [ ] create-permission.dto.ts

**Entities:**
- [ ] role.entity.ts
- [ ] permission.entity.ts
- [ ] role-permission.entity.ts

**Services:**
- [ ] roles.service.ts
- [ ] permissions.service.ts

**Guards & Decorators:**
- [ ] Actualizar roles.guard.ts
- [ ] Crear permission.guard.ts
- [ ] Decorador @Roles()
- [ ] Decorador @RequirePermissions()
- [ ] Decorador @RequireAnyPermission()

**Seeders:**
- [ ] Seeder con permisos por módulo

**Validaciones:**
- [ ] Nombre único
- [ ] Código único
- [ ] No eliminar roles de sistema

**Testing:**
- [ ] Test unitario: RolesService
- [ ] Test integración: POST /roles
- [ ] Test guard: RolesGuard
- [ ] Test guard: PermissionGuard

#### 🎁 Entregables
- API de roles y permisos
- Sistema de permisos granulares
- Guards funcionales
- Seeders con permisos
- Jerarquía de roles

#### ✅ Criterios de Aceptación
- [ ] ADMIN puede crear y editar roles
- [ ] ADMIN puede asignar permisos
- [ ] RolesGuard verifica correctamente
- [ ] PermissionGuard verifica correctamente
- [ ] Jerarquía funciona
- [ ] No se pueden eliminar roles de sistema
- [ ] No se pueden eliminar con usuarios
- [ ] Permisos agrupados por módulo
- [ ] Tests pasan

#### 👥 Equipo Asignado
- Backend Developer (1)
- QA/Tester (0.5)

#### 📊 Estimación
- 40-50 horas

---

### SPRINT 3.2 - FRONTEND ROLES & PERMISOS
**Duración:** 1 semana | **Semanas:** 8-8 | **Fechas:** 31 Mar-4 Abr | **Estado:** ⏳

#### 📋 Tareas Principales

**Configuración:**
- [ ] Crear feature en /src/app/features/roles
- [ ] Configurar rutas

**Página Role List:**
- [ ] Crear role-list.component.ts
- [ ] Grid de cards coloreadas
- [ ] Mostrar información de cada rol

**Página Role Detail:**
- [ ] Crear role-detail.component.ts
- [ ] Tabs con info, permisos, usuarios

**Componente Role Form:**
- [ ] Crear role-form.component.ts
- [ ] Formulario de creación/edición

**Componente Permission Tree:**
- [ ] Crear permission-tree.component.ts
- [ ] Árbol de permisos interactivo
- [ ] Checkboxes padre/hijo

**Shared Directives:**
- [ ] has-permission.directive.ts
- [ ] has-any-permission.directive.ts
- [ ] has-role.directive.ts

**Shared Guards:**
- [ ] role.guard.ts
- [ ] permission.guard.ts

**Services:**
- [ ] roles-api.service.ts
- [ ] permissions-api.service.ts

**Models:**
- [ ] role.model.ts
- [ ] permission.model.ts

**Layout Updates:**
- [ ] Aplicar directivas en menú

**Página 403:**
- [ ] Crear componente forbidden

**Testing:**
- [ ] Test directiva: *hasPermission
- [ ] Test componente: PermissionTreeComponent
- [ ] Test E2E: Crear rol y asignar permisos

#### 🎁 Entregables
- Gestión visual de roles
- Árbol de permisos interactivo
- Directivas de control de UI
- Guards para rutas
- Asignación de permisos intuitiva
- Página 403

#### ✅ Criterios de Aceptación
- [ ] ADMIN ve lista de roles
- [ ] ADMIN crea roles nuevos
- [ ] ADMIN asigna permisos con árbol
- [ ] Árbol es intuitivo
- [ ] Checkboxes funcionan correctamente
- [ ] Búsqueda filtra
- [ ] No se editan roles de sistema
- [ ] No se eliminan con usuarios
- [ ] Directivas ocultan elementos
- [ ] Guards protegen rutas
- [ ] Usuario sin permisos ve 403

#### 👥 Equipo Asignado
- Frontend Developer (1)
- QA/Tester (0.5)

#### 📊 Estimación
- 40-50 horas

---

## FASE 4: EMPRESAS Y ÁREAS (2 semanas)

### SPRINT 4.1 - BACKEND COMPANIES & DEPARTMENTS
**Duración:** 1 semana | **Semanas:** 9-9 | **Fechas:** 7-11 Abr | **Estado:** ⏳

#### 📋 Tareas Principales

**Companies Module:**
- [ ] Crear módulo en /src/modules/companies
- [ ] GET /companies - Listar empresas
- [ ] GET /companies/:id - Obtener una empresa
- [ ] POST /companies - Crear empresa
- [ ] PUT /companies/:id - Actualizar empresa
- [ ] DELETE /companies/:id - Eliminar empresa
- [ ] POST /companies/:id/upload-logo - Subir logo

**Departments:**
- [ ] GET /departments - Listar departamentos
- [ ] GET /departments/:id - Obtener departamento
- [ ] GET /departments/:id/tree - Árbol organizacional
- [ ] GET /departments/:id/employees - Empleados
- [ ] POST /departments - Crear departamento
- [ ] PUT /departments/:id - Actualizar
- [ ] DELETE /departments/:id - Eliminar
- [ ] PUT /departments/:id/manager - Asignar manager

**DTOs:**
- [ ] create-company.dto.ts
- [ ] update-company.dto.ts
- [ ] create-department.dto.ts
- [ ] update-department.dto.ts

**Entities:**
- [ ] company.entity.ts
- [ ] department.entity.ts

**Services:**
- [ ] companies.service.ts
- [ ] departments.service.ts

**Validaciones:**
- [ ] Código único
- [ ] Parent department validación
- [ ] No permitir ciclos

**Algoritmo Detección de Ciclos:**
- [ ] validateNoCircularDependency()

**Testing:**
- [ ] Test: validar ciclos
- [ ] Test: buildTree()
- [ ] Test integración

#### 🎁 Entregables
- API de empresas y departamentos
- Estructura jerárquica
- Validación de ciclos
- Árbol organizacional

#### ✅ Criterios de Aceptación
- [ ] SUPER_ADMIN crea empresas
- [ ] ADMIN crea departamentos
- [ ] Código único
- [ ] Pueden tener subdepartamentos
- [ ] Árbol se construye correctamente
- [ ] No se crean ciclos
- [ ] Manager ve su departamento
- [ ] No elimina con empleados
- [ ] Logo se sube
- [ ] Tests pasan

#### 👥 Equipo Asignado
- Backend Developer (1)
- QA/Tester (0.5)

#### 📊 Estimación
- 40-50 horas

---

### SPRINT 4.2 - FRONTEND COMPANIES & DEPARTMENTS
**Duración:** 1 semana | **Semanas:** 10-10 | **Fechas:** 14-18 Abr | **Estado:** ⏳

#### 📋 Tareas Principales

**Configuración:**
- [ ] Crear feature en /src/app/features/companies
- [ ] Configurar rutas

**Página Company List:**
- [ ] Crear company-list.component.ts
- [ ] Grid de cards

**Página Company Detail:**
- [ ] Crear company-detail.component.ts
- [ ] Tabs con información

**Componente Company Form:**
- [ ] Crear company-form.component.ts
- [ ] Formulario con upload de logo

**Página Department List:**
- [ ] Crear department-list.component.ts
- [ ] Tabla con jerarquía visual

**Página Department Detail:**
- [ ] Crear department-detail.component.ts
- [ ] Breadcrumb de jerarquía

**Componente Department Form:**
- [ ] Crear department-form.component.ts

**Componente Org Chart:**
- [ ] Crear org-chart.component.ts
- [ ] Organigrama visual interactivo

**Componente Department Tree:**
- [ ] Crear department-tree.component.ts

**Services:**
- [ ] companies-api.service.ts
- [ ] departments-api.service.ts

**Models:**
- [ ] company.model.ts
- [ ] department.model.ts
- [ ] department-tree.model.ts

**Shared Components:**
- [ ] breadcrumb.component.ts

**Testing:**
- [ ] Test componente: OrgChartComponent
- [ ] Test E2E

#### 🎁 Entregables
- Gestión de empresas
- Gestión de departamentos con jerarquía
- Organigrama visual
- Vista de árbol
- Upload de logo
- Asignación de managers

#### ✅ Criterios de Aceptación
- [ ] SUPER_ADMIN crea empresas
- [ ] ADMIN crea departamentos
- [ ] Logo se sube
- [ ] Jerarquía visual
- [ ] Organigrama interactivo
- [ ] No se crean ciclos
- [ ] Manager se asigna fácilmente
- [ ] Árbol navegable
- [ ] Breadcrumb muestra jerarquía
- [ ] Responsive

#### 👥 Equipo Asignado
- Frontend Developer (1)
- QA/Tester (0.5)

#### 📊 Estimación
- 40-50 horas

---

## FASE 5: TIPOS DE PERMISOS (2 semanas)

### SPRINT 5.1 - BACKEND PERMISSION TYPES
**Duración:** 1 semana | **Semanas:** 11-11 | **Fechas:** 21-25 Abr | **Estado:** ⏳

#### 📋 Tareas Principales

**Permission Types Module:**
- [ ] Crear módulo en /src/modules/permission-types
- [ ] GET /permission-types
- [ ] GET /permission-types/:id
- [ ] POST /permission-types
- [ ] PUT /permission-types/:id
- [ ] DELETE /permission-types/:id
- [ ] PUT /permission-types/reorder

**Endpoints de Políticas:**
- [ ] GET /departments/:id/policies
- [ ] GET /departments/:id/policies/:typeId
- [ ] POST /departments/:id/policies
- [ ] PUT /departments/:id/policies/:policyId
- [ ] DELETE /departments/:id/policies/:policyId

**Endpoint Política Aplicable:**
- [ ] GET /users/:id/applicable-policies

**Calendar Module:**
- [ ] GET /holidays
- [ ] GET /holidays/:id
- [ ] POST /holidays
- [ ] PUT /holidays/:id
- [ ] DELETE /holidays/:id
- [ ] GET /holidays/between
- [ ] POST /holidays/import
- [ ] POST /holidays/recurring/process

**Working Days:**
- [ ] GET /working-days-config
- [ ] PUT /working-days-config
- [ ] POST /working-days/calculate

**DTOs:**
- [ ] create-permission-type.dto.ts
- [ ] create-policy.dto.ts
- [ ] create-holiday.dto.ts
- [ ] etc.

**Entities:**
- [ ] permission-type.entity.ts
- [ ] department-permission-policy.entity.ts
- [ ] holiday.entity.ts
- [ ] working-days-config.entity.ts

**Services:**
- [ ] permission-types.service.ts
- [ ] department-policies.service.ts
- [ ] holidays.service.ts
- [ ] working-days.service.ts

**Seeders:**
- [ ] Tipos de permisos por defecto

**Validaciones:**
- [ ] Código único
- [ ] Valores sensatos

**Testing:**
- [ ] Test unitario: PermissionTypesService
- [ ] Test cálculo de días laborables

#### 🎁 Entregables
- API de tipos de permisos
- Sistema de políticas por departamento
- Cálculo de días laborables
- Gestión de feriados
- Configuración por empresa

#### ✅ Criterios de Aceptación
- [ ] ADMIN crea tipos
- [ ] Tipos tienen configuración completa
- [ ] ADMIN configura políticas por dept
- [ ] Políticas sobrescriben global
- [ ] Cálculo de días correcto
- [ ] Fines de semana excluidos
- [ ] Feriados excluidos
- [ ] ADMIN gestiona feriados
- [ ] Feriados recurrentes se procesan
- [ ] Tests pasan

#### 👥 Equipo Asignado
- Backend Developer (1)
- QA/Tester (0.5)

#### 📊 Estimación
- 40-50 horas

---

### SPRINT 5.2 - FRONTEND PERMISSION TYPES
**Duración:** 1 semana | **Semanas:** 12-12 | **Fechas:** 28 Abr-2 May | **Estado:** ⏳

#### 📋 Tareas Principales

**Configuración:**
- [ ] Crear feature en /src/app/features/permission-types
- [ ] Configurar rutas

**Página Type List:**
- [ ] Crear componente de lista
- [ ] Grid de cards coloreadas
- [ ] Drag & drop para reordenar

**Página Type Detail:**
- [ ] Crear componente
- [ ] Tabs con info

**Componente Type Form:**
- [ ] Crear componente
- [ ] Color picker
- [ ] Icon picker

**Página Policies Configuration:**
- [ ] Crear componente de configuración
- [ ] Modal de personalización

**Componente Balance Display:**
- [ ] Crear componente
- [ ] Progress bar visual
- [ ] Alertas por bajo balance

**Componente Holiday Management:**
- [ ] Crear componente simple
- [ ] Upload CSV
- [ ] Modal de formulario

**Services:**
- [ ] permission-types-api.service.ts
- [ ] department-policies-api.service.ts
- [ ] holidays-api.service.ts
- [ ] working-days-api.service.ts

**Dashboard Updates:**
- [ ] Sección balance de permisos

**Testing:**
- [ ] Test componente: BalanceDisplayComponent
- [ ] Test E2E

#### 🎁 Entregables
- Gestión visual de tipos
- Drag & drop
- Sistema de políticas
- Balance claro
- Gestión de feriados
- Import CSV

#### ✅ Criterios de Aceptación
- [ ] ADMIN crea tipos con colores
- [ ] Drag & drop reordena
- [ ] Color/icon picker intuitivos
- [ ] Políticas por dept fáciles
- [ ] Diferencias visuales claras
- [ ] Balance con progress bars
- [ ] Alerta cuando bajo
- [ ] ADMIN ajusta balance
- [ ] Feriados se gestionan
- [ ] Import CSV funciona

#### 👥 Equipo Asignado
- Frontend Developer (1)
- QA/Tester (0.5)

#### 📊 Estimación
- 40-50 horas

---

## FASE 6: SOLICITUDES DE PERMISOS (2 semanas)

### SPRINT 6.1 - BACKEND PERMISSION REQUESTS
**Duración:** 1 semana | **Semanas:** 13-13 | **Fechas:** 5-9 May | **Estado:** ⏳

#### 📋 Tareas Principales

**Permission Requests Module:**
- [ ] Crear módulo en /src/modules/permission-requests
- [ ] GET /permission-requests - Todas
- [ ] GET /permission-requests/my-requests - Mis solicitudes
- [ ] GET /permission-requests/:id - Detalle
- [ ] POST /permission-requests - Crear
- [ ] PUT /permission-requests/:id - Actualizar
- [ ] PUT /permission-requests/:id/cancel - Cancelar
- [ ] POST /permission-requests/:id/upload-document

**Endpoints de Balance:**
- [ ] GET /balances/user/:userId
- [ ] GET /balances/user/:userId/year/:year
- [ ] POST /balances/initialize
- [ ] PUT /balances/:id/adjust
- [ ] POST /balances/carry-over

**DTOs:**
- [ ] create-permission-request.dto.ts
- [ ] update-permission-request.dto.ts
- [ ] cancel-request.dto.ts
- [ ] request-filter.dto.ts
- [ ] adjust-balance.dto.ts

**Entities:**
- [ ] permission-request.entity.ts
- [ ] permission-balance.entity.ts

**Services:**
- [ ] permission-requests.service.ts
- [ ] permission-balance.service.ts
- [ ] permission-calculation.service.ts

**Validaciones Críticas:**
- [ ] Balance suficiente
- [ ] No hay overlapping
- [ ] StartDate no es pasado
- [ ] Días consecutivos máx
- [ ] Documento si requerido

**Lógica de Balance:**
- [ ] Al crear: pending +=
- [ ] Al aprobar: pending -=, used +=
- [ ] Al rechazar: pending -=
- [ ] Al cancelar: pending -=

**Testing:**
- [ ] Test: calculateDays()
- [ ] Test: detectConflicts()
- [ ] Test: updateBalance()
- [ ] Test integración
- [ ] Test validaciones

#### 🎁 Entregables
- API de solicitudes
- Validaciones automáticas
- Gestión de balances
- Cálculo de días
- Detección de conflictos
- Upload de documentos

#### ✅ Criterios de Aceptación
- [ ] Usuario crea con días disponibles
- [ ] Sistema valida antes de crear
- [ ] Conflictos se detectan
- [ ] Días se calculan correctamente
- [ ] Balance se actualiza
- [ ] No negativos
- [ ] Usuario cancela pendientes
- [ ] Documento se sube
- [ ] Notificaciones se envían
- [ ] Tests pasan

#### 👥 Equipo Asignado
- Backend Developer (1)
- Backend Developer (0.5)
- QA/Tester (0.5)

#### 📊 Estimación
- 50-60 horas

---

### SPRINT 6.2 - FRONTEND PERMISSION REQUESTS
**Duración:** 1 semana | **Semanas:** 14-14 | **Fechas:** 12-16 May | **Estado:** ⏳

#### 📋 Tareas Principales

**Configuración:**
- [ ] Crear feature en /src/app/features/permission-requests
- [ ] Configurar rutas

**Página Create Request (Wizard):**
- [ ] Paso 1: Seleccionar tipo
- [ ] Paso 2: Configurar fechas
- [ ] Paso 3: Detalles y justificación

**Página My Requests:**
- [ ] Crear componente
- [ ] Tabs para filtrar (todas, pendientes, etc.)
- [ ] Tabla responsive

**Página Request List (Admin/Manager):**
- [ ] Similar pero con todas

**Página Request Detail:**
- [ ] Crear componente
- [ ] Mostrar información completa
- [ ] Balance proyectado

**Componente Request Form:**
- [ ] Crear componente reutilizable

**Componente Request Status Badge:**
- [ ] Badge coloreado

**Componente Balance Preview:**
- [ ] Mini card

**Services:**
- [ ] permission-requests-api.service.ts
- [ ] balance-api.service.ts

**Testing:**
- [ ] Test componente: RequestForm
- [ ] Test componente: BalancePreview
- [ ] Test E2E

#### 🎁 Entregables
- Formulario intuitivo en 3 pasos
- Validaciones en tiempo real
- Listado personal
- Listado general
- Detalle completo
- Cancelación

#### ✅ Criterios de Aceptación
- [ ] Usuario crea en 3 pasos
- [ ] Validaciones claras
- [ ] Calendario muestra info
- [ ] Días auto-calculan
- [ ] Alerta sin días
- [ ] Balance antes/después
- [ ] Documento drag & drop
- [ ] Usuario ve todas sus solicitudes
- [ ] Filtros y búsqueda
- [ ] Cancelar pide confirmación
- [ ] Dashboard muestra últimas
- [ ] Responsive

#### 👥 Equipo Asignado
- Frontend Developer (1)
- Frontend Developer (0.5)
- QA/Tester (0.5)

#### 📊 Estimación
- 50-60 horas

---

## FASE 7: APROBACIONES (2 semanas)

### SPRINT 7.1 - BACKEND APPROVALS
**Duración:** 1 semana | **Semanas:** 15-15 | **Fechas:** 19-23 May | **Estado:** ⏳

#### 📋 Tareas Principales

**Approval Hierarchy Module:**
- [ ] Crear módulo
- [ ] GET /approval-hierarchy/department/:id
- [ ] GET /approval-hierarchy/department/:id/type/:typeId
- [ ] POST /approval-hierarchy
- [ ] PUT /approval-hierarchy/:id
- [ ] DELETE /approval-hierarchy/:id
- [ ] GET /approval-hierarchy/applicable

**Approvals Module:**
- [ ] GET /approvals/pending
- [ ] GET /approvals/history
- [ ] GET /approvals/request/:requestId
- [ ] POST /approvals/:requestId/approve
- [ ] POST /approvals/:requestId/reject

**Delegations Module:**
- [ ] GET /delegations
- [ ] GET /delegations/active
- [ ] POST /delegations
- [ ] PUT /delegations/:id
- [ ] DELETE /delegations/:id
- [ ] GET /delegations/user/:userId/active

**DTOs:**
- [ ] create-approval-hierarchy.dto.ts
- [ ] approve-request.dto.ts
- [ ] reject-request.dto.ts
- [ ] create-delegation.dto.ts

**Entities:**
- [ ] approval-hierarchy.entity.ts
- [ ] approval.entity.ts
- [ ] approval-history.entity.ts
- [ ] delegation.entity.ts

**Services:**
- [ ] approvals.service.ts
- [ ] approval-workflow.service.ts
- [ ] approval-hierarchy.service.ts
- [ ] delegations.service.ts

**Notifications:**
- [ ] Notificaciones en cada etapa
- [ ] Recordatorios

**Cron Jobs:**
- [ ] Job escalamiento automático
- [ ] Job recordatorios

**Testing:**
- [ ] Test: determineApprover()
- [ ] Test: processApproval()
- [ ] Test integración
- [ ] Test workflow
- [ ] Test delegación
- [ ] Test escalamiento

#### 🎁 Entregables
- API de aprobaciones multinivel
- Jerarquía configurable
- Workflow automático
- Sistema de delegaciones
- Escalamiento automático
- Notificaciones

#### ✅ Criterios de Aceptación
- [ ] Solicitud pasa todos niveles
- [ ] Solo aprobador actual aprueba
- [ ] Workflow determina siguiente
- [ ] Balance se actualiza al aprobar
- [ ] Balance se libera al rechazar
- [ ] Delegaciones transfieren
- [ ] Escalamiento funciona
- [ ] Notificaciones en cada etapa
- [ ] Historial registra todo
- [ ] Tests pasan

#### 👥 Equipo Asignado
- Backend Developer (1)
- Backend Developer (0.5)
- QA/Tester (0.5)

#### 📊 Estimación
- 50-60 horas

---

### SPRINT 7.2 - FRONTEND APPROVALS
**Duración:** 1 semana | **Semanas:** 16-16 | **Fechas:** 26-30 May | **Estado:** ⏳

#### 📋 Tareas Principales

**Configuración:**
- [ ] Crear feature en /src/app/features/approvals
- [ ] Configurar rutas

**Página Pending Approvals:**
- [ ] Crear componente
- [ ] Header con badge
- [ ] Vista tabla/cards
- [ ] Filtros

**Modal/Página Approval Form:**
- [ ] Crear componente
- [ ] Información solicitud
- [ ] Información solicitante
- [ ] Balance
- [ ] Calendario equipo
- [ ] Timeline aprobaciones
- [ ] Formulario de decisión

**Modal Reject Form:**
- [ ] Campo motivo obligatorio

**Página Approval History:**
- [ ] Crear componente
- [ ] Tabla con aprobaciones

**Componente Approval Timeline:**
- [ ] Crear componente
- [ ] Timeline visual

**Página Delegation Management:**
- [ ] Crear componente
- [ ] Mis delegaciones
- [ ] Recibidas
- [ ] Historial

**Modal Delegation Form:**
- [ ] Crear componente

**Indicador en Header:**
- [ ] Badge si delegación activa

**Dashboard Updates:**
- [ ] Card solicitudes pendientes
- [ ] Ausencias de hoy
- [ ] Alertas equipo

**Request Detail Updates:**
- [ ] Integrar Timeline
- [ ] Botones aprobación

**Services:**
- [ ] approvals-api.service.ts
- [ ] delegations-api.service.ts

**Testing:**
- [ ] Test componente: ApprovalTimelineComponent
- [ ] Test E2E

#### 🎁 Entregables
- Interfaz de aprobaciones
- Timeline visual
- Sistema delegaciones
- Historial aprobaciones
- Dashboard con pendientes
- Notificaciones

#### ✅ Criterios de Aceptación
- [ ] Aprobador ve pendientes
- [ ] Puede aprobar/rechazar
- [ ] Rechazo requiere motivo
- [ ] Timeline muestra flujo
- [ ] Balance se muestra
- [ ] Calendario equipo ayuda
- [ ] Delegaciones fáciles
- [ ] Indicador delegación
- [ ] Dashboard con pendientes
- [ ] Notificaciones alertan
- [ ] Responsive

#### 👥 Equipo Asignado
- Frontend Developer (1)
- Frontend Developer (0.5)
- QA/Tester (0.5)

#### 📊 Estimación
- 50-60 horas

---

## FASE 8: CALENDARIO Y FERIADOS (2 semanas)

### SPRINT 8.1 - BACKEND CALENDAR
**Duración:** 1 semana | **Semanas:** 17-17 | **Fechas:** 2-6 Jun | **Estado:** ⏳

#### 📋 Tareas Principales

**Calendar Module (Complete):**
- [ ] GET /calendar/month/:year/:month
- [ ] GET /calendar/user/:userId/month/:year/:month
- [ ] GET /calendar/team/:departmentId
- [ ] GET /calendar/export
- [ ] Endpoints de feriados
- [ ] Working days endpoints
- [ ] Import feriados CSV
- [ ] Calcular días laborables

**Services:**
- [ ] calendar.service.ts
- [ ] holidays.service.ts
- [ ] working-days.service.ts

**Cron Job:**
- [ ] Procesar feriados recurrentes

**Testing:**
- [ ] Test integración
- [ ] Test cálculos

#### 🎁 Entregables
- API calendario completo
- Calendario mensual
- Calendario equipo
- Import feriados
- Export iCal

#### ✅ Criterios de Aceptación
- [ ] Calendario incluye feriados
- [ ] Manager ve equipo
- [ ] Ausencias simultáneas detectadas
- [ ] Feriados import correctamente
- [ ] CSV con errores clara
- [ ] Usuario exporta a iCal
- [ ] Feriados recurrentes crean
- [ ] Tests pasan

#### 👥 Equipo Asignado
- Backend Developer (1)

#### 📊 Estimación
- 30-40 horas

---

### SPRINT 8.2 - FRONTEND CALENDAR
**Duración:** 1 semana | **Semanas:** 18-18 | **Fechas:** 9-13 Jun | **Estado:** ⏳

#### 📋 Tareas Principales

**Configuración:**
- [ ] Crear feature
- [ ] Instalar FullCalendar

**Página Calendar View:**
- [ ] Crear componente
- [ ] Calendario mensual
- [ ] Eventos coloreados
- [ ] Interactividad

**Página Team Calendar:**
- [ ] Crear componente manager

**Página Holiday Management:**
- [ ] Crear componente admin

**Componente Holiday Form:**
- [ ] Crear formulario

**Componente Calendar Widget:**
- [ ] Mini calendario

**Componente Upcoming Events:**
- [ ] Widget próximos eventos

**Services:**
- [ ] calendar-api.service.ts
- [ ] holidays-api.service.ts

**Dashboard Updates:**
- [ ] Calendar Widget
- [ ] Upcoming Events

**Testing:**
- [ ] Test componente

#### 🎁 Entregables
- Calendario personal interactivo
- Calendario equipo
- Gestión feriados
- Import CSV
- Export iCal
- Widgets dashboard

#### ✅ Criterios de Aceptación
- [ ] Usuario ve calendario
- [ ] Feriados claros
- [ ] Click crea solicitud
- [ ] Manager ve equipo
- [ ] Conflictos detectados
- [ ] Admin gestiona feriados
- [ ] Import valida
- [ ] User exporta iCal
- [ ] Calendario responsive

#### 👥 Equipo Asignado
- Frontend Developer (1)

#### 📊 Estimación
- 40-50 horas

---

## FASE 9: NOTIFICACIONES (2 semanas)

### SPRINT 9.1 - BACKEND NOTIFICATIONS
**Duración:** 1 semana | **Semanas:** 19-19 | **Fechas:** 16-20 Jun | **Estado:** ⏳

#### 📋 Tareas Principales

**Notifications Module (Complete):**
- [ ] GET /notifications
- [ ] GET /notifications/unread-count
- [ ] PUT /notifications/:id/read
- [ ] PUT /notifications/read-all
- [ ] DELETE /notifications/:id
- [ ] GET /notifications/preferences
- [ ] PUT /notifications/preferences

**Email Service (Complete):**
- [ ] Completar Nodemailer
- [ ] Sistema reintentos
- [ ] Templates HTML
- [ ] Cola de emails

**Services:**
- [ ] notifications.service.ts
- [ ] email.service.ts
- [ ] notification-templates.service.ts
- [ ] notification-preferences.service.ts

**Cron Jobs:**
- [ ] Recordatorios aprobación
- [ ] Balance bajo
- [ ] Reintentos emails

**Testing:**
- [ ] Test unitario
- [ ] Test eventos
- [ ] Test templates

#### 🎁 Entregables
- Notificaciones in-app
- Emails con templates
- Preferencias por usuario
- Cola con reintentos
- Jobs automáticos

#### ✅ Criterios de Aceptación
- [ ] Notificaciones se crean
- [ ] Usuario recibe in-app
- [ ] Usuario recibe emails
- [ ] Templates profesionales
- [ ] Emails con reintentos
- [ ] Usuario configura
- [ ] Contador preciso
- [ ] Recordatorios automáticos
- [ ] Tests pasan

#### 👥 Equipo Asignado
- Backend Developer (1)

#### 📊 Estimación
- 40-50 horas

---

### SPRINT 9.2 - FRONTEND NOTIFICATIONS
**Duración:** 1 semana | **Semanas:** 20-20 | **Fechas:** 23-27 Jun | **Estado:** ⏳

#### 📋 Tareas Principales

**Componente Notification Bell:**
- [ ] Crear en header
- [ ] Badge con contador
- [ ] Dropdown

**Página Notification Center:**
- [ ] Crear componente
- [ ] Lista completa
- [ ] Filtros

**Página Notification Preferences:**
- [ ] Crear componente
- [ ] Tabla de eventos
- [ ] Toggles on/off

**Componente Notification Item:**
- [ ] Componente reutilizable

**Toast Notifications:**
- [ ] Real-time alerts

**Real-time (Opcional):**
- [ ] WebSockets/SSE

**Services:**
- [ ] notifications-api.service.ts
- [ ] notification-preferences-api.service.ts

**Testing:**
- [ ] Test componente

#### 🎁 Entregables
- Bell funcional en header
- Centro notificaciones
- Configuración preferencias
- Toast real-time
- Sistema tiempo real (opt)

#### ✅ Criterios de Aceptación
- [ ] Bell muestra contador
- [ ] Dropdown muestra últimas
- [ ] Click marca leída
- [ ] Centro muestra todas
- [ ] Usuario configura
- [ ] Toggles funcionan
- [ ] Toast alertan
- [ ] Tiempo real funciona (opt)
- [ ] Sonidos opcionales
- [ ] Responsive

#### 👥 Equipo Asignado
- Frontend Developer (1)

#### 📊 Estimación
- 40-50 horas

---

## FASE 10: REPORTES Y DASHBOARDS (2 semanas)

### SPRINT 10.1 - BACKEND REPORTS
**Duración:** 1 semana | **Semanas:** 21-21 | **Fechas:** 30 Jun-4 Jul | **Estado:** ⏳

#### 📋 Tareas Principales

**Reports Module:**
- [ ] POST /reports/usage
- [ ] POST /reports/approvals
- [ ] POST /reports/balance
- [ ] POST /reports/absences
- [ ] POST /reports/custom
- [ ] GET /reports/:reportId/export

**Dashboards Module:**
- [ ] GET /dashboards/employee
- [ ] GET /dashboards/manager
- [ ] GET /dashboards/admin

**Services:**
- [ ] reports.service.ts
- [ ] reports-export.service.ts
- [ ] dashboards.service.ts

**Exportación:**
- [ ] PDF con PDFKit
- [ ] Excel con ExcelJS
- [ ] CSV

**Caché:**
- [ ] Implementar caché

**Testing:**
- [ ] Test unitario
- [ ] Test integración

#### 🎁 Entregables
- API reportes con 4 tipos
- Exportación múltiples formatos
- Dashboards personalizados
- KPIs precisos
- Caché para performance

#### ✅ Criterios de Aceptación
- [ ] ADMIN genera reportes
- [ ] Datos precisos
- [ ] Exportación funciona
- [ ] PDFs profesionales
- [ ] Excel correcto
- [ ] Dashboards rápidos
- [ ] KPIs precisos
- [ ] Caché mejora
- [ ] Tests pasan

#### 👥 Equipo Asignado
- Backend Developer (1)

#### 📊 Estimación
- 40-50 horas

---

### SPRINT 10.2 - FRONTEND REPORTS
**Duración:** 1 semana | **Semanas:** 22-22 | **Fechas:** 7-11 Jul | **Estado:** ⏳

#### 📋 Tareas Principales

**Configuración:**
- [ ] Crear feature
- [ ] Instalar Chart.js

**Página Reports List:**
- [ ] Grid de catálogo

**Página Generate Report:**
- [ ] Componente generación

**Página Report View:**
- [ ] Visualización completa

**Componente Report Filters:**
- [ ] Reutilizable

**Componente Chart Widget:**
- [ ] Reutilizable

**Página Analytics Dashboard:**
- [ ] Para admin

**Employee Dashboard:**
- [ ] Actualización

**Manager Dashboard:**
- [ ] Actualización

**Services:**
- [ ] reports-api.service.ts
- [ ] dashboards-api.service.ts
- [ ] export.service.ts

**Testing:**
- [ ] Test componente

#### 🎁 Entregables
- Catálogo reportes
- Generador con filtros
- Visualización interactiva
- Exportación múltiples formatos
- Dashboard analítico
- Dashboard personal
- Dashboard manager

#### ✅ Criterios de Aceptación
- [ ] ADMIN genera reportes
- [ ] Filtros claros
- [ ] Gráficas interactivas
- [ ] Datos precisos
- [ ] Exportación funciona
- [ ] PDFs profesionales
- [ ] Excel correcto
- [ ] Dashboard admin destaca
- [ ] Alertas útiles
- [ ] Dashboard personal
- [ ] Dashboard manager
- [ ] Responsive

#### 👥 Equipo Asignado
- Frontend Developer (1)

#### 📊 Estimación
- 40-50 horas

---

## FASE 11: AUDITORÍA E HISTORIAL (2 semanas)

### SPRINT 11.1 - BACKEND AUDIT
**Duración:** 1 semana | **Semanas:** 23-23 | **Fechas:** 14-18 Jul | **Estado:** ⏳

#### 📋 Tareas Principales

**Audit Module:**
- [ ] Crear módulo
- [ ] Audit Interceptor global
- [ ] GET /audit
- [ ] GET /audit/:id
- [ ] GET /audit/entity/:entityType/:entityId
- [ ] GET /audit/user/:userId
- [ ] GET /audit/stats

**Entities:**
- [ ] audit-log.entity.ts

**Services:**
- [ ] audit.service.ts

**Retention Policy:**
- [ ] Job limpieza automática

**Testing:**
- [ ] Test interceptor
- [ ] Test unitario
- [ ] Test integración

#### 🎁 Entregables
- Auditoría automática
- Interceptor global
- Logs de operaciones
- API consulta completa
- Estadísticas
- Política retención

#### ✅ Criterios de Aceptación
- [ ] Operaciones registradas
- [ ] Logs incluyen old/new
- [ ] IP y User-Agent
- [ ] Passwords no guardados
- [ ] ADMIN consulta con filtros
- [ ] Historial entidad completo
- [ ] Performance no afectado
- [ ] Logs antiguos eliminados
- [ ] Tests pasan

#### 👥 Equipo Asignado
- Backend Developer (1)

#### 📊 Estimación
- 30-40 horas

---

### SPRINT 11.2 - FRONTEND AUDIT
**Duración:** 1 semana | **Semanas:** 24-24 | **Fechas:** 21-25 Jul | **Estado:** ⏳

#### 📋 Tareas Principales

**Configuración:**
- [ ] Crear feature
- [ ] Solo admin

**Página Audit Log:**
- [ ] Componente logs
- [ ] Filtros avanzados
- [ ] Tabla
- [ ] Export

**Modal/Página Detail:**
- [ ] Detalle log completo

**Componente Filters:**
- [ ] Reutilizable

**Página Activity Timeline:**
- [ ] Vista alternativa

**Página Statistics:**
- [ ] Estadísticas auditoría

**Componente Diff Viewer:**
- [ ] Ver cambios

**Services:**
- [ ] audit-api.service.ts

**Testing:**
- [ ] Test componente

#### 🎁 Entregables
- Interfaz auditoría
- Filtros avanzados
- Diff visual
- Activity timeline
- Estadísticas

#### ✅ Criterios de Aceptación
- [ ] ADMIN ve logs
- [ ] Filtros funcionan
- [ ] Búsqueda rápida
- [ ] Detalle completo
- [ ] Diff visual claro
- [ ] Usuario y navegador claros
- [ ] Timeline cronológica
- [ ] Estadísticas útiles
- [ ] Exportación funciona
- [ ] Responsive

#### 👥 Equipo Asignado
- Frontend Developer (1)

#### 📊 Estimación
- 30-40 horas

---

## FASE 12: ADMINISTRACIÓN GENERAL (2 semanas)

### SPRINT 12.1 - BACKEND ADMINISTRATION
**Duración:** 1 semana | **Semanas:** 25-25 | **Fechas:** 28 Jul-1 Ago | **Estado:** ⏳

#### 📋 Tareas Principales

**Administration Module:**
- [ ] GET /administration/settings
- [ ] GET /administration/settings/:key
- [ ] PUT /administration/settings/:key
- [ ] POST /administration/settings
- [ ] POST /administration/settings/reset
- [ ] GET /administration/health
- [ ] GET /administration/stats

**Entities:**
- [ ] system-setting.entity.ts

**Services:**
- [ ] administration.service.ts
- [ ] system-health.service.ts

**Seeders:**
- [ ] Configuraciones por defecto

**Testing:**
- [ ] Test unitario
- [ ] Test integración
- [ ] Test validación

#### 🎁 Entregables
- API administración
- Configuración global
- Health check
- Estadísticas
- Seeders

#### ✅ Criterios de Aceptación
- [ ] ADMIN ve configuraciones
- [ ] ADMIN actualiza
- [ ] Validaciones tipo
- [ ] Cambios en audit
- [ ] Health check correcto
- [ ] Estadísticas precisas
- [ ] Valores por defecto sensatos
- [ ] Tests pasan

#### 👥 Equipo Asignado
- Backend Developer (1)

#### 📊 Estimación
- 30-40 horas

---

### SPRINT 12.2 - FRONTEND ADMINISTRATION
**Duración:** 1 semana | **Semanas:** 26-26 | **Fechas:** 4-8 Ago | **Estado:** ⏳

#### 📋 Tareas Principales

**Configuración:**
- [ ] Crear feature
- [ ] Solo admin

**Página System Settings:**
- [ ] Componente configuración
- [ ] Tabs por categoría
- [ ] Formulario dinámico

**Página Approval Hierarchy:**
- [ ] Configuración jerarquía
- [ ] Selector departamento
- [ ] Visualización

**Componente Settings Form:**
- [ ] Reutilizable

**Componente Hierarchy Builder:**
- [ ] Constructor visual

**Página System Health:**
- [ ] Health check
- [ ] Estadísticas

**Services:**
- [ ] administration-api.service.ts
- [ ] system-health-api.service.ts

**Guards:**
- [ ] Solo admin

**Testing:**
- [ ] Test componente

#### 🎁 Entregables
- Panel administración
- Configuración sistema
- Constructor jerarquía
- Página health
- Estadísticas

#### ✅ Criterios de Aceptación
- [ ] ADMIN accede fácil
- [ ] Organizadas por categoría
- [ ] Inputs apropiados
- [ ] Validaciones claras
- [ ] Guardar actualiza
- [ ] Restaurar funciona
- [ ] Jerarquía visual
- [ ] Drag & drop reordena
- [ ] Preview claro
- [ ] Health actualizado
- [ ] Alertas si problemas
- [ ] Responsive

#### 👥 Equipo Asignado
- Frontend Developer (1)

#### 📊 Estimación
- 30-40 horas

---

## FASE 13: TESTING Y OPTIMIZACIÓN (4 semanas)

### SPRINT 13.1 - BACKEND TESTING & OPTIMIZATION
**Duración:** 2 semanas | **Semanas:** 27-28 | **Fechas:** 11-25 Ago | **Estado:** ⏳

#### 📋 Tareas Principales

**Unit Testing:**
- [ ] AuthService suite
- [ ] PermissionCalculationService suite
- [ ] ApprovalWorkflowService suite
- [ ] BalanceService suite
- [ ] WorkingDaysService suite

**Integration Testing:**
- [ ] Flujo autenticación E2E
- [ ] Flujo solicitud E2E
- [ ] Flujo aprobación E2E
- [ ] Flujo rechazo E2E
- [ ] Flujo delegación E2E

**Performance Testing:**
- [ ] Identificar queries lentos
- [ ] Optimizar N+1
- [ ] Agregar índices
- [ ] Analizar con EXPLAIN
- [ ] Implementar caché
- [ ] Optimizar responses
- [ ] Benchmark endpoints

**Load Testing:**
- [ ] Simular carga
- [ ] Medir métricas
- [ ] 100 usuarios concurrentes

**Security Audit:**
- [ ] npm audit
- [ ] Validación inputs
- [ ] Autenticación y autorización
- [ ] Rate limiting
- [ ] Helmet.js
- [ ] Revisión logs

**Code Quality:**
- [ ] ESLint
- [ ] Prettier
- [ ] Code review
- [ ] Refactoring
- [ ] JSDoc

**API Documentation:**
- [ ] Swagger completo

**Database Optimization:**
- [ ] Índices
- [ ] Integridad referencial
- [ ] Testing backup

#### 🎁 Entregables
- Tests completos
- Coverage 70%+
- Performance optimizado
- Seguridad auditada
- Código limpio
- Documentación API

#### ✅ Criterios de Aceptación
- [ ] Tests pasan
- [ ] Coverage >= 70%
- [ ] Vulnerabilidades 0 críticas
- [ ] Endpoints < 100ms
- [ ] 100 usuarios concurrentes
- [ ] Linter sin errores
- [ ] Swagger documenta todo
- [ ] Backups funcionan

#### 👥 Equipo Asignado
- Backend Developer (1)
- Backend Developer (1)
- QA/Tester (1)

#### 📊 Estimación
- 80-100 horas

---

### SPRINT 13.2 - FRONTEND TESTING & OPTIMIZATION
**Duración:** 2 semanas | **Semanas:** 29-30 | **Fechas:** 1-15 Sep | **Estado:** ⏳

#### 📋 Tareas Principales

**Unit Testing:**
- [ ] LoginComponent
- [ ] RequestFormComponent
- [ ] ApprovalFormComponent
- [ ] BalanceDisplayComponent

**Component Testing:**
- [ ] Con dependencias
- [ ] Mocking servicios

**E2E Testing:**
- [ ] Cypress/Playwright
- [ ] Login flow
- [ ] Create request flow
- [ ] Approve flow

**Performance:**
- [ ] Lazy loading módulos
- [ ] OnPush Change Detection
- [ ] Render optimization
- [ ] Asset optimization
- [ ] Virtual scrolling
- [ ] Bundle size

**Lighthouse Audit:**
- [ ] Performance > 90
- [ ] Accessibility > 90
- [ ] Best Practices > 90

**Accessibility:**
- [ ] Contraste colores
- [ ] Labels formularios
- [ ] Navegación teclado
- [ ] ARIA attributes
- [ ] Screen reader

**Responsive:**
- [ ] Mobile, tablet, desktop
- [ ] Hamburger menu
- [ ] Tablas responsive
- [ ] Formularios
- [ ] Dashboards

**Browser Testing:**
- [ ] Chrome, Firefox, Safari, Edge
- [ ] Mobile browsers

**Code Quality:**
- [ ] ESLint
- [ ] Prettier
- [ ] Code review
- [ ] Refactoring

#### 🎁 Entregables
- Tests completos
- Coverage 60%+
- Performance Lighthouse >90
- Accesibilidad WCAG AA
- Responsive todos los dispositivos
- Cross-browser compatible

#### ✅ Criterios de Aceptación
- [ ] Tests pasan
- [ ] Coverage >= 60%
- [ ] Lighthouse Performance >90
- [ ] Lighthouse Accessibility >90
- [ ] Load < 2s en 3G
- [ ] Funciona todos browsers
- [ ] Responsive
- [ ] Navegable teclado
- [ ] Screen reader compatible

#### 👥 Equipo Asignado
- Frontend Developer (1)
- Frontend Developer (1)
- QA/Tester (1)

#### 📊 Estimación
- 80-100 horas

---

## FASE 14: DEPLOYMENT & DOCUMENTACIÓN (2 semanas)

### SPRINT 14.1 - DEPLOYMENT PREPARATION
**Duración:** 1 semana | **Semanas:** 31-31 | **Fechas:** 18-22 Sep | **Estado:** ⏳

#### 📋 Tareas Principales

**Backend:**
- [ ] Configuración producción
- [ ] Variables de entorno
- [ ] Secrets management
- [ ] Plan migración BD
- [ ] Scripts backup
- [ ] Scripts rollback
- [ ] CI/CD pipeline
- [ ] Deployment options
- [ ] Server configuration
- [ ] Monitoring & logging

**Frontend:**
- [ ] Build optimizado
- [ ] Bundle size check
- [ ] Environment configuración
- [ ] No secrets expuestos
- [ ] Deployment options

**Database:**
- [ ] BD producción
- [ ] Backups automatizados
- [ ] Configuración MySQL

**Documentation:**
- [ ] README.md backend
- [ ] DEPLOYMENT.md backend
- [ ] API.md
- [ ] ARCHITECTURE.md
- [ ] CHANGELOG.md
- [ ] README.md frontend
- [ ] COMPONENTS.md
- [ ] DEPLOYMENT.md frontend

#### 🎁 Entregables
- Configuración producción
- CI/CD funcional
- Scripts deployment
- Servidor configurado
- Monitoring activo
- Documentación completa

#### 👥 Equipo Asignado
- DevOps (1)
- Backend Developer (0.5)
- Frontend Developer (0.5)

#### 📊 Estimación
- 40-50 horas

---

### SPRINT 14.2 - DOCUMENTATION & TRAINING
**Duración:** 1 semana | **Semanas:** 32-32 | **Fechas:** 25-29 Sep | **Estado:** ⏳

#### 📋 Tareas Principales

**User Documentation:**
- [ ] Manual de usuario completo
- [ ] Guía del empleado
- [ ] Guía del manager
- [ ] Guía del administrador

**FAQs & Support:**
- [ ] Documento FAQs
- [ ] Support documentation

**Training Materials:**
- [ ] Presentación del sistema
- [ ] Video tutoriales
- [ ] Guía para trainers
- [ ] Quick start guides

**Technical Documentation:**
- [ ] System requirements
- [ ] Backup & recovery
- [ ] Troubleshooting guide
- [ ] Release notes

#### 🎁 Entregables
- Manual completo
- FAQs
- Presentación
- Videos (opcional)
- Guía trainers
- Quick starts
- Documentación técnica
- Release notes

#### 👥 Equipo Asignado
- Technical Writer (1)
- Product Owner (0.5)

#### 📊 Estimación
- 30-40 horas

---

## FASE 15: UAT & LAUNCH (2 semanas)

### SPRINT 15.1 - USER ACCEPTANCE TESTING
**Duración:** 1 semana | **Semanas:** 33-33 | **Fechas:** 2-6 Oct | **Estado:** ⏳

#### 📋 Tareas Principales

- [ ] Crear plan UAT
- [ ] Seleccionar usuarios prueba
- [ ] Preparar ambiente UAT
- [ ] Crear escenarios prueba
- [ ] Sesión onboarding
- [ ] Período pruebas 3-5 días
- [ ] Recopilación feedback
- [ ] Análisis usabilidad
- [ ] Crear tickets issues
- [ ] Triaging diario
- [ ] Corregir P0/P1
- [ ] Testing regresión
- [ ] Migración datos (si aplica)
- [ ] Reunión cierre UAT
- [ ] UAT Report

#### 🎁 Entregables
- Plan UAT completado
- Escenarios ejecutados
- Issues identificados
- Issues corregidos
- Feedback recopilado
- UAT Report
- Aprobación stakeholders

#### ✅ Criterios de Aceptación
- [ ] Escenarios probados
- [ ] 3 roles participaron
- [ ] 0 issues críticos
- [ ] >80% altos corregidos
- [ ] Feedback positivo
- [ ] Stakeholders aprueban

#### 👥 Equipo Asignado
- QA Lead (1)
- QA/Tester (2-3)
- Developer (1)

#### 📊 Estimación
- 40-50 horas

---

### SPRINT 15.2 - LAUNCH & POST-LAUNCH
**Duración:** 1 semana | **Semanas:** 34-34 | **Fechas:** 9-13 Oct | **Estado:** ⏳

#### 📋 Tareas Principales

- [ ] Pre-launch checklist
- [ ] Verificar ambiente
- [ ] Verificar configuraciones
- [ ] Data final
- [ ] Testing producción
- [ ] Sesiones capacitación
- [ ] Communication plan
- [ ] Ejecutar go-live
- [ ] Monitoreo intensivo
- [ ] Respuesta rápida
- [ ] Soporte activo
- [ ] Recopilación feedback inicial
- [ ] Métricas adopción
- [ ] Daily stand-up
- [ ] Análisis métricas
- [ ] Retrospectiva
- [ ] Handoff soporte
- [ ] Plan mejoras continuas

#### 🎁 Entregables
- Sistema en producción
- Usuarios capacitados
- Soporte activo
- Métricas recopiladas
- Feedback analizado
- Plan mejoras

#### ✅ Criterios de Aceptación
- [ ] Sistema accesible
- [ ] Capacitaciones completas
- [ ] Usuarios usando
- [ ] 0 issues críticos
- [ ] Adopción positiva
- [ ] Satisfacción >80%
- [ ] Soporte funcionando

#### 👥 Equipo Asignado
- Product Owner (1)
- Tech Lead (1)
- DevOps (1)
- QA Lead (1)
- Support Team (2)

#### 📊 Estimación
- 40-50 horas

---

## 📊 RESUMEN GENERAL

| Métrica | Valor |
|---------|-------|
| **Duración Total** | 32 semanas (8 meses) |
| **Número de Sprints** | 32 sprints (1 semana cada uno) |
| **Equipo Recomendado** | 4-6 personas |
| **Costo Estimado** | $80K - $120K USD |
| **Funcionalidades** | 12 módulos principales |
| **Líneas de Código** | 50K+ (frontend + backend) |
| **Cobertura de Tests** | 70%+ backend, 60%+ frontend |
| **Performance** | Queries < 100ms |
| **Usuarios Soportados** | 100+ concurrentes |

---

## 📌 NOTAS IMPORTANTES

1. **Flexibilidad:** Este plan es adaptable. Los sprints pueden reorganizarse según necesidades.

2. **Dependencias:** Los sprints deben seguir el orden indicado para evitar bloqueos.

3. **Recursos:** Los números de equipo son estimaciones. Pueden ajustarse según disponibilidad.

4. **Horas:** Las estimaciones incluyen análisis, desarrollo, testing y documentación.

5. **Riesgos:** Identificar riesgos al inicio de cada fase y ajustar cronograma si es necesario.

6. **Comunicación:** Reuniones diarias del equipo para sincronización.

7. **Calidad:** Priorizar calidad sobre velocidad.

8. **Documentación:** Mantener documentación actualizada en paralelo.

9. **Testing:** Testing desde el inicio, no esperar al final.

10. **Feedback:** Incorporar feedback continuamente.

---

**Última actualización:** 10 de febrero de 2026  
**Versión:** 1.0  
**Estado:** ✅ Listo para ejecutar
