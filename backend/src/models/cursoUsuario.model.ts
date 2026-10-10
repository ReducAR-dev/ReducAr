// src/models/cursoUsuario.model.ts
import type { UUID, Timestamp } from "./common.types.js";

export interface CursoUsuario {
  id: number;
  usuarioId: UUID | null;
  cursoId: number | null;
  estado_curso: string | null;
  modulosCompletados: number | null;
  fechaAdquisicion: Timestamp | null;
  fechaFinalizacion: Timestamp | null;
}