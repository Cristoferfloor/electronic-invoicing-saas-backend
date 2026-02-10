// Modelos de Facturación
// TABLA: Facturas
// - id (UUID)
// - tenant_id (FK a tenants) - DISCRIMINADOR MULTITENANT
// - cliente_id (FK a clientes)
// - numero_secuencial
// - serie_establecimiento
// - punto_emision
// - fecha_emision (timestamp)
// - fecha_vencimiento
// - subtotal (decimal)
// - iva (decimal) - 15%
// - total (decimal)
// - xml_generado (text)
// - clave_acceso (49 caracteres, único)
// - estado (borrador, emitida, autorizada, cancelada)
// - createdAt, updatedAt

// TABLA: DetallesFactura
// - id (UUID)
// - factura_id (FK a facturas)
// - tenant_id (FK a tenants) - DISCRIMINADOR MULTITENANT
// - producto_id (FK a productos)
// - cantidad
// - precio_unitario
// - descuento
// - subtotal_linea
// - iva_linea
// - total_linea
