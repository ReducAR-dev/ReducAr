import type { UUID, Timestamp } from "./common.types.js";

export interface Reporte {
  id: number;
  usuario_id: UUID | null;
  tipo_reporte_id: number | null;
  entidad_tipo: string;
  entidad_id: string | null;
  mensaje: string;
  estado_id: number | null;
  respuesta_admin: string | null;
  fecha_creacion: Timestamp | null;
  fecha_resolucion: Timestamp | null;
}