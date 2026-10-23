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

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function verificarConexion(): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('__connection_test__')
      .select('*')
      .limit(1);

    if (error && error.code === 'PGRST205') {
      console.log('✅ Conexión a Supabase verificada correctamente.');
      return true;
    }

    if (error) {
      console.error('❌ Error al conectar con Supabase:', error.message);
      return false;
    }

    return true;
  } catch (err) {
    console.error('❌ Error inesperado al verificar la conexión:', err);
    return false;
  }
}

export const getSupabaseWithAuth = (accessToken: string) => {
  return createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
};