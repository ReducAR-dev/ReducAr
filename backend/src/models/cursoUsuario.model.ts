// src/models/cursoUsuario.model.ts
import type { UUID, Timestamp } from "./common.types.js";

/**
 * Fila de la tabla `curso_usuario` (progreso del usuario en un curso).
 * Coincide con las columnas reales de la BD.
 */
export interface CursoUsuario {
  id: number;
  usuario_id: UUID | null;
  curso_id: number | null;
  fecha_adquisicion: Timestamp | null;
  fecha_finalizacion: Timestamp | null;
}