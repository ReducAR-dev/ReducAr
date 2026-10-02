import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

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

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
