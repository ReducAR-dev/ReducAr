export interface Curso {
    cupos_disponibles: number | null
    descripcion_corta: string | null
    descripcion_larga: string | null
    enlace_inscripcion: string
    esta_activo: boolean | null
    fecha_inicio: string | null
    fecha_max_inscripcion: string | null
    fecha_publicacion: string | null
    fecha_termino: string | null
    id: number
    titulo: string
}