// Interfaces Multitenant
export interface ITenantContext {
  tenantId: string;
  userId: string;
  email: string;
  rol: string;
}

export interface IAuthPayload {
  userId: string;
  tenantId: string;
  email: string;
  rol: string;
  iat?: number;
  exp?: number;
}

// Interfaces de Respuesta
export interface IApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface IPaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

// Interfaces de Entidades
export interface IInvoice {
  id: string;
  tenantId: string;
  clienteId: string;
  numeroSecuencial: string;
  fechaEmision: Date;
  subtotal: number;
  iva: number;
  total: number;
  claveAcceso: string;
  estado: string;
  xmlGenerado?: string;
}

export interface IInvoiceItem {
  id: string;
  invoiceId: string;
  productId: string;
  cantidad: number;
  precioUnitario: number;
  descuento: number;
  subtotal: number;
  iva: number;
  total: number;
}
