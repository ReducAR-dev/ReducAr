/**
 * Curso "resumido" para listados. Incluye los joins con
 * categoría / institución ya resueltos por el servicio.
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
 * Curso completo para la vista de detalle.
 */
export interface CursoDetalle {
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