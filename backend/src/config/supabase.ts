import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Carga las variables de entorno desde el archivo .env
dotenv.config();

// Lee las variables de entorno
const supabaseUrl: string | undefined = process.env.SUPABASE_URL;
const supabaseAnonKey: string | undefined = process.env.SUPABASE_ANON_KEY;

// Validación: si falta alguna, el servidor no debería arrancar
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    '❌ Faltan variables de entorno para conectar con Supabase.\n' +
    'Asegúrate de que SUPABASE_URL y SUPABASE_ANON_KEY estén definidas en tu archivo .env'
  );
}

// Crea y exporta una única instancia del cliente de Supabase
// La anotación de tipo `SupabaseClient` es opcional, pero ayuda con el autocompletado
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);