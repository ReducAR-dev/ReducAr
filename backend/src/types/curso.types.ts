export interface CursoResumen {
  id: number;
  titulo: string;
  descripcion_corta: string; 
  esta_activo: boolean;  

}

export interface Curso {
    id: number;
    titulo: string;
    descripcion_corta: string; 
    descripcion_larga: string; 
    fecha_inicio: Date;
    fecha_termino: Date;
    fecha_max_inscripcion: Date;
    fecha_publicacion: number;  //CAMBIAR Timestamp
    enlace_inscripcion: string;
    cupos_disponibles: number;
    esta_activo: boolean;
}


export type CursoCreacion = Omit<Curso, 'id' | 'fecha_publicacion'>;

// Tipo para actualizar un curso, permite modificar cualquier propiedad excepto 'id'
export type CursoActualizacion = Partial<Omit<Curso, 'id'>>;