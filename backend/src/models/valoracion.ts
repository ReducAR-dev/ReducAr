export interface valoracion {
  id: number
  usuarioId: string
  cursoId: number
  puntuacion: number
  comentario: string | null
  estaActiva: boolean
  estaAprobada: boolean
  fechaAprobacion: string | null
  ipAddress: string | null
  userAgent: string | null
  fecha: string
}
