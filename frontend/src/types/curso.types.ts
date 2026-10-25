/** 
 * Coincide con la fila exacta de la tabla `curso` en Supabase.
 * Se usará principalmente para el panel de administración.
 */
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
  fecha_inicio: string | null;
  fecha_termino: string | null;
  fecha_max_inscripcion: string | null;
  fecha_publicacion: string | null;
  enlace_inscripcion: string | null;
  cupos_disponibles: number | null;
  esta_activo: boolean | null;
  imagen_url: string | null;
}

/** 
 * El objeto que devuelve el backend para los listados públicos.
 * Ya incluye los nombres de las tablas relacionadas (joins) resueltos.
 */
export interface CursoResumen {
  id: number;
  titulo: string;
  institucion: string;
  categoria: string;
  descripcion_corta: string;
  modalidad: string;
  precio: number;
  imagen_url: string | null;
}

/** 
 * El objeto para la vista de detalle (incluye más campos de la tabla).
 */
export interface CursoDetalle {
  imagen_url: string;
  id: number;
  institucion: string;
  categoria: string;
  titulo: string;
  descripcion_larga: string;
  modalidad: string;
  nivel: string;
  tipo_certificado: string;
  duracion_dias: number;
  precio: number;
  fecha_inicio: string;
  fecha_termino: string;
  fecha_max_inscripcion: string;
  enlace_inscripcion: string;
  cupos_disponibles: number;
}