// Helper para cálculos de facturación
export const calculateInvoiceTotals = (items: any[]) => {
  let subtotal = 0;
  let iva = 0;
  
  items.forEach(item => {
    const itemSubtotal = item.cantidad * item.precioUnitario - (item.descuento || 0);
    subtotal += itemSubtotal;
    
    if (item.aplicaIva) {
      const itemIva = itemSubtotal * 0.15; // 15% IVA
      iva += itemIva;
    }
  });
  
  return {
    subtotal: parseFloat(subtotal.toFixed(2)),
    iva: parseFloat(iva.toFixed(2)),
    total: parseFloat((subtotal + iva).toFixed(2)),
  };
};

// Helper para generar clave de acceso (49 dígitos)
export const generateAccessKey = (
  fechaEmision: Date,
  ruc: string,
  tipoComprobante: string,
  serie: string,
  secuencial: string,
): string => {
  // Formato: DDMMYYYYRUC+3dig+tipo+serie+secuencial+codigoNumerico+2dígitos
  // Implementar lógica de generación según SRI
  return 'clave-acceso-generada'; // Placeholder
};

// Helper para formatear números
export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('es-EC', {
    style: 'currency',
    currency: 'USD',
  });
};

// Helper para validar RUC
export const validateRUC = (ruc: string): boolean => {
  // Validar formato y dígito verificador RUC ecuatoriano
  return ruc.length === 13 && /^\d+$/.test(ruc);
};
