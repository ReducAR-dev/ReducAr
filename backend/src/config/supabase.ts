// src/config/supabase.ts
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl) {
  throw new Error(
    '❌ Falta SUPABASE_URL en el .env. ' +
    'Cópiala desde Supabase Dashboard → Settings → API → Project URL.'
  );
}

if (!supabaseKey) {
  throw new Error(
    '❌ Falta SUPABASE_PUBLISHABLE_KEY en el .env. ' +
    'Cópiala desde Supabase Dashboard → Settings → API → Publishable key.'
  );
}

/**
 * Cliente principal de Supabase.
 *
 * Usa la publishable key: respeta las políticas RLS.
 * Es la clave correcta para operaciones normales del backend
 * (lecturas públicas, operaciones autenticadas con el JWT del usuario).
 */
export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Verifica la conexión a Supabase.
 *
 * Ejecuta una consulta trivial contra una tabla que no existe.
 * Si la respuesta es un error de "relación no existe", la conexión
 * funcionó (llegamos al servidor y Postgres respondió). Si es un
 * error de red, la conexión falló.
 *
 * Llamar UNA VEZ al arrancar el servidor (en index.ts), nunca por request.
 */
export async function verificarConexion(): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('__connection_test__')
      .select('*')
      .limit(1);

    // PGRST205 = tabla no encontrada en el schema cache.
    // Si llega este error, la conexión funcionó (el servidor respondió).
    if (error && error.code === 'PGRST205') {
      console.log('✅ Conexión a Supabase verificada correctamente.');
      return true;
    }

    // Cualquier otro error significa que no pudimos hablar con Supabase.
    if (error) {
      console.error('❌ Error al conectar con Supabase:', error.message);
      console.error('   Detalle:', error.details ?? 'sin detalles');
      return false;
    }

    // Si llegamos aquí, la tabla existe por casualidad y trajo datos.
    console.log('✅ Conexión a Supabase verificada correctamente.');
    return true;
  } catch (err) {
    const mensaje = err instanceof Error ? err.message : String(err);
    console.error('❌ Error inesperado al verificar la conexión:', mensaje);
    return false;
  }
}