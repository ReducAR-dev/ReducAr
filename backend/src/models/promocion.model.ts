import type { ISODateOnly } from "./common.types.js";

export interface Promocion {
  id: number;
  curso_id: number | null;
  titulo: string;
  descuento_porcentaje: number;
  motivo: string | null;
  etiqueta_url: string | null;
  fecha_inicio: ISODateOnly;
  fecha_finalizacion: ISODateOnly;
  orden: number | null;
  esta_activa: boolean | null;
}