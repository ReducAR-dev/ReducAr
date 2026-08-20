import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { Database } from '../types/database.types';

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

// ✅ Ahora el cliente conoce la estructura de tu BD
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);