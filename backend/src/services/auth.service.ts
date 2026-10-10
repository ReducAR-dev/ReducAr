// src/services/auth.service.ts
import { supabase } from "../config/supabase.js";
import type { UUID } from "../models/common.types.js";
import type { Result } from "../types/common.types.js";
import type {
  SignUpPayload,
  SignInPayload,
  SignInResult,
} from "../types/auth.types.js";

// ============================================
// REGISTRO
// ============================================

/**
 * Registra un usuario en Supabase Auth.
 *
 * ⚠️ NO inserta en `public.usuario`. Eso lo hace el trigger
 *    `handle_new_user` automáticamente cuando Supabase Auth
 *    confirma la creación del usuario.
 */
export const signUp = async (
  payload: SignUpPayload,
): Promise<Result<{ id: UUID; email: string }>> => {
  const { data, error } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      data: payload.metadata ?? {},
    },
  });

  if (error) {
    console.error("❌ auth.signUp:", error.message);
    return { success: false, error: error.message };
  }

  if (!data.user) {
    return { success: false, error: "No se pudo crear el usuario en Auth." };
  }

  return {
    success: true,
    data: { id: data.user.id, email: data.user.email ?? "" },
  };
};

// ============================================
// INICIO DE SESIÓN
// ============================================

/**
 * Inicia sesión. Devuelve los tokens JWT que el frontend
 * debe guardar para autenticar peticiones posteriores.
 */
export const signIn = async (
  payload: SignInPayload,
): Promise<Result<SignInResult>> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: payload.email,
    password: payload.password,
  });

  if (error) {
    console.error("❌ auth.signIn:", error.message);
    return { success: false, error: error.message };
  }

  if (!data.session || !data.user) {
    return { success: false, error: "Credenciales inválidas." };
  }

  return {
    success: true,
    data: {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      expires_at: data.session.expires_at,
      user: {
        id: data.user.id,
        email: data.user.email ?? "",
      },
    },
  };
};

// ============================================
// VERIFICACIÓN DE TOKEN (JWT)
// ============================================

/**
 * Valida un JWT y devuelve el usuario de Auth.
 *
 * Este es el método central que usa el middleware de Express
 * para saber quién es el usuario que hace la petición.
 *
 * ⚠️ Llama a `getUser(token)` que verifica la firma del token
 *    contra los servidores de Supabase. NUNCA confíes en decodificar
 *    el JWT localmente sin verificar la firma.
 */
export const getUserFromToken = async (
  accessToken: string,
): Promise<Result<{ id: UUID; email: string }>> => {
  const { data, error } = await supabase.auth.getUser(accessToken);

  if (error) {
    return { success: false, error: error.message };
  }

  if (!data.user) {
    return { success: false, error: "Token inválido o expirado." };
  }

  return {
    success: true,
    data: { id: data.user.id, email: data.user.email ?? "" },
  };
};

// ============================================
// CIERRE DE SESIÓN
// ============================================

/**
 * Cierra la sesión del usuario. En el backend, `signOut` solo
 * invalida la sesión si se le pasa el refresh token. Si el frontend
 * borra sus tokens, es suficiente. Este método queda como referencia.
 */
export const signOut = async (accessToken: string): Promise<Result<null>> => {
  const { error } = await supabase.auth.signOut({ scope: "local" });

  if (error) {
    console.error("❌ auth.signOut:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data: null };
};

// ============================================
// RECUPERACIÓN DE CONTRASEÑA
// ============================================

/**
 * Envía un correo de recuperación de contraseña.
 * No requiere que el usuario esté autenticado.
 */
export const resetPassword = async (email: string): Promise<Result<null>> => {
  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    console.error("❌ auth.resetPassword:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data: null };
};