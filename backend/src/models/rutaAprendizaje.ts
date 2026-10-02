export interface rutaAprendizaje {
  id: number
  creadorId: string | null
  titulo: string
  descripcion: string
  imagenUrl: string | null
  nivelId: number
  categoriaId: number | null
  esPredeterminada: boolean
  estaActiva: boolean
}
