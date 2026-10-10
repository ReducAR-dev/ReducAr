// src/types/common.types.ts

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