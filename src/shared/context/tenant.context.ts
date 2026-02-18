import { AsyncLocalStorage } from 'async_hooks';

/**
 * Almacenamiento local asíncrono para mantener el contexto del Tenant 
 * a través del ciclo de vida de una petición HTTP.
 */
export const tenantContext = new AsyncLocalStorage<{ tenantId: string }>();
