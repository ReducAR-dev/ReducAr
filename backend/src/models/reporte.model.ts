// src/models/reporte.model.ts
import type { UUID, Timestamp } from "./common.types.js";

export interface Reporte {
  id: number;
  usuarioId: UUID | null;
  tipoReporteId: number | null;
  entidadTipo: string;
  entidadId: string | null;
  mensaje: string;
  estadoId: number | null;
  respuestaAdmin: string | null;
  fechaCreacion: Timestamp | null;
  fechaResolucion: Timestamp | null;
}