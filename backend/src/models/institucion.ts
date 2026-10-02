export interface institucion {
  id: number
  usuarioId: string
  nombre: string
  descripcion: string | null
  logoUrl: string | null
  sitioWeb: string | null
  emailContacto: string | null
  telefonoContacto: string | null
  ubicacion: string | null
  estaVerificada: boolean
  fechaCreacion: string
}
