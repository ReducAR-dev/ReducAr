import type { UUID, ISODateOnly, Timestamp } from "./common.types.js";

export interface Usuario {
  id: UUID;
  nombre: string;
  apellido: string | null;
  email: string;
  fecha_nacimiento: ISODateOnly | null;
  foto_perfil: string | null;
  biografia: string | null;
  ubicacion: string | null;
  user_preferencia: string | null;
  rol_id: number | null;
  esta_activo: boolean | null;
  fecha_registro: Timestamp | null;
  fecha_actualizacion: Timestamp | null;
}