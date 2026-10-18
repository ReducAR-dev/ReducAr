// src/types/novedad.types.ts

/**
 * Refleja exactamente lo que devuelve GET /api/novedades
 * (tabla `novedad` en snake_case).
 */
export interface Novedad {
  id: number;
  titulo: string;
  descripcion_corta: string | null;
  descripcion_larga: string | null;
  fecha_evento: string; // "YYYY-MM-DD"
  modalidad_id: number | null;
  ubicacion: string | null;
  imagen_url: string | null;
  enlace: string | null;
  esta_activa: boolean | null;
  fecha_creacion: string | null;
  fecha_actualizacion: string | null;
}

/** Meta de paginación que acompaña al listado. */
export interface PaginatedMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}