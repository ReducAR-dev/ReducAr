export interface curso {
  id: number
  publicadorId: string
  categoriaId: number
  titulo: string
  descripcionCorta: string | null
  descripcionLarga: string | null
  modalidadId: number
  nivelId: number
  tipoCertificadoId: number
  duracionDias: number | null
  precio: number
  fechaInicio: string | null
  fechaTermino: string | null
  fechaMaxInscripcion: string | null
  fechaPublicacion: string
  enlaceInscripcion: string | null
  esInterno: boolean
  cuposDisponibles: number | null
  estaActivo: boolean
}
