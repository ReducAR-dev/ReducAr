// src/config/supabase-admin.ts
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL?.trim();
const serverKey =
  process.env.SUPABASE_SECRET_KEY?.trim() ||
  process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
const publicFallbackKey =
  process.env.SUPABASE_PUBLISHABLE_KEY?.trim() ||
  process.env.SUPABASE_ANON_KEY?.trim();
const supabaseAdminKey = serverKey || publicFallbackKey;

if (!supabaseUrl) {
  throw new Error(
    "❌ Falta SUPABASE_URL en el .env. " +
    "Obtenela en Supabase Dashboard → Settings → API."
  );
}

if (!supabaseAdminKey) {
  throw new Error(
    "❌ Falta una clave de Supabase en el .env. Configurá " +
    "SUPABASE_SECRET_KEY para acceso administrativo o " +
    "SUPABASE_PUBLISHABLE_KEY para iniciar sin privilegios elevados."
  );
}

if (!serverKey) {
  console.warn(
    "⚠️ SUPABASE_SECRET_KEY no está configurada. El backend puede " +
    "iniciar y RedBot funcionará, pero las operaciones administrativas " +
    "de Supabase pueden fallar hasta agregar una secret key válida."
  );
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseAdminKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});

export const isSupabaseAdminConfigured = Boolean(serverKey);
