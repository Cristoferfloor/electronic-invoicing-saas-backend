// Multitenant Interfaces
export interface ITenantContext {
  tenantId: string;
  userId: string;
  email: string;
  role: string;
}

export interface IAuthPayload {
  userId: string;
  tenantId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

// Response Interfaces
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

// Entity Interfaces
export interface IInvoice {
  id: string;
  tenantId: string;
  clientId: string;
  sequentialNumber: string;
  issueDate: Date;
  subtotal: number;
  totalVat: number;
  total: number;
  accessKey: string;
  status: string;
  generatedXml?: string;
}

export interface IInvoiceItem {
  id: string;
  invoiceId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  subtotal: number;
}
