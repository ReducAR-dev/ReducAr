export interface reporte {
  id: number
  usuarioId: string
  tipoReporteId: number
  entidadTipo: 'course' | 'user' | 'review' | 'institution'
  entidadId: string | null
  mensaje: string
  estadoId: number
  respuestaAdmin: string | null
  fechaCreacion: string
  fechaResolucion: string | null
}
