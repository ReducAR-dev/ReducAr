import type { UUID, Timestamp } from "./common.types.js";

export interface Auditoria {
  id: number;
  usuario_id: UUID | null;
  tipo_accion_id: number | null;
  entidad_tipo: string;
  entidad_id: string | null;
  valores_anteriores: string | null;
  valores_nuevos: string | null;
  ip_address: string | null;
  user_agent: string | null;
  request_id: string | null;
  exito: boolean | null;
  fecha: Timestamp | null;
}