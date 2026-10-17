import type { UUID, Timestamp } from "./common.types.js";

export interface Valoracion {
  id: number;
  usuario_id: UUID | null;
  curso_id: number | null;
  puntuacion: number;
  comentario: string | null;
  esta_activa: boolean | null;
  esta_aprobada: boolean | null;
  fecha_aprobacion: Timestamp | null;
  ip_address: string | null;
  user_agent: string | null;
  fecha: Timestamp | null;
}