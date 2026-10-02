export interface recursoModulo {
  id: number
  moduloId: number
  titulo: string
  tipo: 'pdf' | 'link' | 'video' | 'text'
  url: string
  orden: number | null
}
