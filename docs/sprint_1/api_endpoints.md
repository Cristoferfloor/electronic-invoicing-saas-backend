# Documentación de API - Sprint 1: Autenticación
**Base URL**: `http://localhost:3000/api/auth`

Esta guía detalla los endpoints implementados para la gestión de empresas (Tenants) y sesiones de usuario.

---

## 1. Registrar Empresa (Tenant)
Crea una nueva empresa, su configuración de facturación y un usuario administrador inicial.

- **Método**: `POST`
- **Endpoint**: `/register-tenant`
- **Headers**: `Content-Type: application/json`

### Body (Ejemplo)
```json
{
  "nombre_comercial": "Mi Empresa Demo S.A.",
  "razon_social": "Mi Empresa Soluciones Cia. Ltda.",
  "ruc": "1799999999001",
  "direccion": "Av. Amazonas y Naciones Unidas, Quito",
  "telefono": "0991234567",
  "email_empresa": "contacto@miempresa.com",
  "nombre": "Juan",
  "apellido": "Perez",
  "email_admin": "admin@miempresa.com",
  "password": "PasswordSeguro123."
}
```

### Respuesta Exitosa (201 Created)
```json
{
  "success": true,
  "message": "Empresa registrada exitosamente",
  "data": {
    "tenant": {
      "id": "cm6...",
      "nombre_comercial": "Mi Empresa Demo S.A.",
      "ruc": "1799999999001",
      "plan": "FREE",
      "estado_activo": true
    },
    "user": {
      "id": "cm6...",
      "email": "admin@miempresa.com",
      "nombre": "Juan",
      "rol": "ADMIN"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsIn...",
    "refreshToken": "d8c6f6..."
  }
}
```

---

## 2. Iniciar Sesión (Login)
Autentica a un usuario y devuelve tokens de acceso.

- **Método**: `POST`
- **Endpoint**: `/login`

### Body (Ejemplo)
```json
{
  "email": "admin@miempresa.com",
  "password": "PasswordSeguro123."
}
```
> **Nota para pruebas**: El usuario creado por defecto en el seed es:
> - Email: `admin@demo.com`
> - Password: `Admin123.`

### Respuesta Exitosa (200 OK)
```json
{
  "success": true,
  "message": "Inicio de sesión exitoso",
  "data": {
    "user": {
      "id": "cm6...",
      "email": "admin@miempresa.com",
      "nombre": "Juan",
      "apellido": "Perez",
      "rol": "ADMIN",
      "tenantId": "cm6..."
    },
    "tenant": {
      "id": "cm6...",
      "nombre_comercial": "Mi Empresa Demo S.A.",
      "ruc": "1799999999001"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsIn...",
    "refreshToken": "d8c6f6..."
  }
}
```

---

## 3. Renovar Token (Refresh Token)
Obtiene un nuevo `accessToken` cuando el anterior expira, usando el `refreshToken` de larga duración.

- **Método**: `POST`
- **Endpoint**: `/refresh`

### Body (Ejemplo)
```json
{
  "refreshToken": "Pega_aqui_el_refresh_token_recibido_en_login"
}
```

### Respuesta Exitosa (200 OK)
```json
{
  "success": true,
  "message": "Token actualizado correctamente",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsIn... (NUEVO)",
    "refreshToken": "a1b2c3... (NUEVO - Rotación)"
  }
}
```

---

## 4. Cerrar Sesión (Logout)
- **Método**: `POST`
- **Endpoint**: `/logout`
- **Header**: `Authorization: Bearer <accessToken>` (Opcional según implementación, pero recomendado)

### Respuesta Exitosa (200 OK)
```json
{
  "success": true,
  "message": "Sesión cerrada correctamente"
}
```
