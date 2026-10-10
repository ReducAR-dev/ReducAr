// src/models/valoracion.model.ts
import type { UUID, Timestamp } from "./common.types.js";

export interface Valoracion {
  id: number;
  usuarioId: UUID | null;
  cursoId: number | null;
  puntuacion: number;
  comentario: string | null;
  estaActiva: boolean | null;
  estaAprobada: boolean | null;
  fechaAprobacion: Timestamp | null;
  ipAddress: string | null;
  userAgent: string | null;
  fecha: Timestamp | null;
}