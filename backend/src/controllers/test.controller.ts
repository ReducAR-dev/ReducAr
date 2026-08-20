// backend/src/controllers/test.controller.ts
import { Request, Response } from 'express';
import { supabase } from '../config/supabase.js'; // <-- Importa desde config

export const testSupabaseConnection = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('cursos')
      .select('*')
      .limit(1);

    if (error) {
      throw error;
    }

    res.status(200).json({
      success: true,
      message: '✅ Conexión a Supabase establecida correctamente.',
      data: data || 'No se encontraron cursos en la tabla.'
    });

  } catch (error: any) {
    console.error('❌ Error al conectar con Supabase:', error.message);
    res.status(500).json({
      success: false,
      message: '❌ Error al conectar con Supabase.',
      error: error.message
    });
  }
};