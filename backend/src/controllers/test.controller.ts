// backend/src/controllers/test.controller.ts
import { Request, Response } from 'express';
import { supabase } from '../config/supabase.js'; // Ajusta la ruta según tu estructura

export const testSupabaseConnection = async (req: Request, res: Response) => {
  try {
    // Intenta hacer una consulta simple a la tabla 'cursos'.
    // Usamos 'select' con un límite de 1 para que sea rápido.
    const { data, error } = await supabase
      .from('cursos')
      .select('*')
      .limit(1);

    if (error) {
      // Si hay un error de Supabase, lo lanzamos para que lo capture el catch
      throw error;
    }

    // Si llega aquí, la conexión fue exitosa.
    // Devolvemos un mensaje de éxito junto con los datos (o un mensaje si no hay cursos).
    res.status(200).json({
      success: true,
      message: '✅ Conexión a Supabase establecida correctamente.',
      data: data || 'No se encontraron cursos en la tabla.'
    });

  } catch (error: any) {
    // Capturamos cualquier error (de red, de autenticación, de consulta, etc.)
    console.error('❌ Error al conectar con Supabase:', error.message);
    res.status(500).json({
      success: false,
      message: '❌ Error al conectar con Supabase.',
      error: error.message
    });
  }
};