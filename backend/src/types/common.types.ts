/**
 * Resultado estándar de un servicio.
 * - Éxito: { success: true, data: T }
 * - Error: { success: false, error: string }
 */
export type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };

/** Respuesta estándar de error HTTP del backend. */
export interface ApiError {
  success: false;
  error: string;
  message: string;
}

/**
 * Parámetros de paginación estándar.
 * El servicio aplica defaults y límites:
 *   - page  → default 1, mínimo 1
 *   - limit → default 30, máximo 100
 */
export interface PaginacionParams {
  page: number;
  limit: number;
}

/**
 * Resultado paginado estándar.
 * Coincide con el contrato del `meta` documentado en reglasNegocio.txt.
 */
export interface PaginatedResult<T> {
  items: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}