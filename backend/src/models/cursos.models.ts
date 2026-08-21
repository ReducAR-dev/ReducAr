//import { timestamp } from 'supabase'
import { supabase } from '../config/supabase'

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