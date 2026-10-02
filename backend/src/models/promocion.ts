export interface promocion {
  id: number
  cursoId: number
  creadorId: string
  titulo: string
  descuentoPorcentaje: number
  motivo: string | null
  etiquetaUrl: string | null
  fechaInicio: string
  fechaFinalizacion: string
  orden: number | null
  esForzada: boolean
  montoSubsidiado: number | null
  estaActiva: boolean
}
