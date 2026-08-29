import { supabase } from '../config/supabase';
import { Curso } from '../models/cursos';

export const obtenerCursoPorId = async (id: number): Promise<Curso | null> => {
  const { data, error } = await supabase
    .from("cursos")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    // Si no encuentra el registro, Supabase devuelve un código PGRST116 (Row not found)
    if (error.code === "PGRST116") {
      return null;
    }
    throw new Error(`Error al obtener el curso con ID ${id}: ${error.message}`);
  }

  return data;
};

export const obtenerTodosLosCursos = async (): Promise<Curso[]> => {
  try {

    const { data, error } = await supabase
      .from('cursos')
      .select('*');       
    if (error) {
      console.error('Error en Supabase:', error);
      return [];
    }   
    return data as Curso[];
  } catch (error) {
    console.error('Error en obtenerTodosLosCursos:', error);
    return [];
  }
};
