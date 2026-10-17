import type { Timestamp, ISODateOnly } from "./common.types.js";

export interface Novedad {
  id: number;
  titulo: string;
  descripcion_corta: string | null;
  descripcion_larga: string | null;
  fecha_evento: ISODateOnly;
  modalidad_id: number | null;
  ubicacion: string | null;
  imagen_url: string | null;
  enlace: string | null;
  esta_activa: boolean | null;
  fecha_creacion: Timestamp | null;
  fecha_actualizacion: Timestamp | null;
}