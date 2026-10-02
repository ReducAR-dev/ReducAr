export interface auditoria {
  id: number
  usuarioId: string | null
  tipoAccionId: number
  entidadTipo: 'course' | 'user' | 'review' | 'report' | 'promotion' | 'institution'
  entidadId: string | null
  valoresAnteriores: string | null
  valoresNuevos: string | null
  ipAddress: string | null
  userAgent: string | null
  requestId: string | null
  exito: boolean
  fecha: string
}
