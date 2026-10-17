import type { ISODateOnly, Timestamp } from "./common.types.js";

export interface Curso {
  id: number;
  nombre_propietario: string | null;
  categoria_id: number | null;
  titulo: string;
  descripcion_corta: string | null;
  descripcion_larga: string | null;
  modalidad_id: number | null;
  nivel_id: number | null;
  tipo_certificado_id: number | null;
  duracion_dias: number | null;
  precio: number | null;
  fecha_inicio: ISODateOnly | null;
  fecha_termino: ISODateOnly | null;
  fecha_max_inscripcion: ISODateOnly | null;
  fecha_publicacion: Timestamp | null;
  enlace_inscripcion: string | null;
  cupos_disponibles: number | null;
  esta_activo: boolean | null;
  imagen_url: string | null;
}