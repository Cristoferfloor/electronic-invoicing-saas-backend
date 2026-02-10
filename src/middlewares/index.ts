// Middleware de autenticación JWT
// Verificar presencia y validez de token
// Extraer payload y validar firma
// Inyectar tenantId y userId en request

// Middleware de tenant
// Validar que el tenantId del request coincida con el del token
// Prevenir acceso a datos de otros tenants
// Inyectar tenantId automáticamente en queries

// Middleware de autorización
// Verificar permisos del usuario según su rol
// Controlar acceso a endpoints específicos

// Middleware de validación
// Validar datos de entrada
// Validar esquemas de request

// Middleware de logging
// Registrar todas las operaciones CRUD
// Auditoría de acciones por usuario

// Middleware de errores
// Capturar y formatear errores
// Retornar respuestas consistentes
