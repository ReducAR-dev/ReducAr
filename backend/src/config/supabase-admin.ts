// src/config/supabase-admin.ts
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL!;
const secretKey = process.env.SUPABASE_SECRET_KEY;

if (!secretKey) {
  throw new Error(
    "❌ Falta SUPABASE_SECRET_KEY en el .env. " +
    "Obtenela en Supabase Dashboard → Settings → API → Secret keys."
  );
}

export const supabaseAdmin = createClient(supabaseUrl, secretKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});