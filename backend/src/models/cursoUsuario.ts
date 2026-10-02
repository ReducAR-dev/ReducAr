export interface cursoUsuario {
  id: number
  usuarioId: string
  cursoId: number
  estadoId: number
  modulosCompletados: number
  fechaAdquisicion: string
  fechaFinalizacion: string | null
}
