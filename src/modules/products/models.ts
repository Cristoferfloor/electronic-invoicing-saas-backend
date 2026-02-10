// Modelo de Producto
// - id (UUID)
// - tenant_id (FK a tenants) - DISCRIMINADOR MULTITENANT
// - codigo (único por tenant)
// - nombre
// - descripcion
// - precio_unitario (decimal)
// - aplica_iva (boolean) - Si aplica IVA 15%
// - codigo_impuesto (SRI)
// - unidad_medida
// - estado_activo
// - createdAt, updatedAt
