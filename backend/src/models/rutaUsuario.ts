export interface rutaUsuario {
  id: number
  usuarioId: string
  rutaId: number
  estadoId: number
  porcentajeCompletado: number
  estaEnDashboard: boolean
  fechaInicio: string
  fechaFinalizacion: string | null
}
