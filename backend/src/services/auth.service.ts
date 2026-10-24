// src/services/auth.service.ts
import { supabase } from "../config/supabase.js";
import { savePkce, consumePkce, issueOAuthCode, consumeOAuthCode } from "../config/oauth-store.js";
import {
  generateCodeChallenge,
  generateCodeVerifier,
  generateState,
} from "../utils/pkce.js";
import type { UUID } from "../models/common.types.js";
import type { Result } from "../types/common.types.js";
import type {
  SignUpPayload,
  SignInPayload,
  SignInResult,
  OAuthProvider,
  OAuthUrlResult,
  ForgotPasswordResult,
} from "../types/auth.types.js";

// ============================================
// REGISTRO
// ============================================

export const signUp = async (
  payload: SignUpPayload,
): Promise<Result<{ id: UUID; email: string }>> => {
  const { data, error } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: { data: payload.metadata ?? {} },
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
      user: { id: data.user.id, email: data.user.email ?? "" },
    },
  };
};

// ============================================
// VERIFICACIÓN DE TOKEN
// ============================================

export const getUserFromToken = async (
  accessToken: string,
): Promise<Result<{ id: UUID; email: string }>> => {
  const { data, error } = await supabase.auth.getUser(accessToken);
  if (error) return { success: false, error: error.message };
  if (!data.user) return { success: false, error: "Token inválido o expirado." };
  return {
    success: true,
    data: { id: data.user.id, email: data.user.email ?? "" },
  };
};

// ============================================
// CIERRE DE SESIÓN
// ============================================

export const signOut = async (_accessToken: string): Promise<Result<null>> => {
  const { error } = await supabase.auth.signOut({ scope: "local" });
  if (error) return { success: false, error: error.message };
  return { success: true, data: null };
};

// ============================================
// RECUPERACIÓN DE CONTRASEÑA
// ============================================

export const resetPassword = async (
  email: string,
): Promise<Result<ForgotPasswordResult>> => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.FRONTEND_URL}/reset-password`,
  });

  // Por seguridad, no revelamos si el email existe o no.
  // Siempre devolvemos el mismo mensaje genérico.
  if (error) {
    console.error("❌ auth.resetPassword:", error.message);
    // Aun con error real de Supabase (ej. rate limit), devolvemos
    // el mensaje genérico para no filtrar información.
  }

  return {
    success: true,
    data: {
      message:
        "Si el correo está registrado, vas a recibir un enlace para restablecer tu contraseña.",
    },
  };
};

// ============================================
// OAUTH
// ============================================

/**
 * Construye la URL de autorización de Supabase con PKCE manual.
 * Guarda el code_verifier asociado al state para usarlo en el callback.
 */
export const getOAuthUrl = async (
  provider: OAuthProvider,
): Promise<Result<OAuthUrlResult>> => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const backendUrl = process.env.BACKEND_URL;

  if (!supabaseUrl || !backendUrl) {
    return { success: false, error: "Configuración de OAuth incompleta." };
  }

  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);

  savePkce(state, codeVerifier, provider);

  const url = new URL(`${supabaseUrl}/auth/v1/authorize`);
  url.searchParams.set("provider", provider);
  url.searchParams.set("redirect_to", `${backendUrl}/api/auth/oauth/callback`);
  url.searchParams.set("code_challenge", codeChallenge);
  url.searchParams.set("code_challenge_method", "S256");
  url.searchParams.set("state", state);

  return { success: true, data: { url: url.toString() } };
};

/**
 * Canjea el `code` que Supabase entrega al callback por una sesión real.
 * Usa PKCE: envía auth_code + code_verifier al endpoint /token de Supabase.
 */
export const exchangeOAuthCodeForSession = async (
  code: string,
  codeVerifier: string,
): Promise<Result<SignInResult>> => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return { success: false, error: "Configuración de Supabase incompleta." };
  }

  const response = await fetch(
    `${supabaseUrl}/auth/v1/token?grant_type=pkce`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
      },
      body: JSON.stringify({ auth_code: code, code_verifier: codeVerifier }),
    },
  );

  if (!response.ok) {
    const text = await response.text();
    console.error("❌ exchangeOAuthCodeForSession:", text);
    return { success: false, error: "No se pudo completar el inicio de sesión con OAuth." };
  }

  const data = (await response.json()) as {
    access_token: string;
    refresh_token: string;
    expires_at?: number;
    user: { id: string; email?: string };
  };

  return {
    success: true,
    data: {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_at: data.expires_at,
      user: { id: data.user.id, email: data.user.email ?? "" },
    },
  };
};

/**
 * Genera un código de un solo uso a partir de la sesión OAuth.
 * El front lo canjea después por los tokens reales.
 */
export function createSingleUseCode(session: SignInResult): string {
  return issueOAuthCode({
    access_token: session.access_token,
    refresh_token: session.refresh_token,
    expires_at: session.expires_at,
    user: session.user,
  });
}

/**
 * Canjea un código de un solo uso por la sesión real.
 * Devuelve null si el código no existe, ya se usó o expiró.
 */
export function redeemSingleUseCode(code: string): SignInResult | null {
  const session = consumeOAuthCode(code);
  if (!session) return null;
  return {
    access_token: session.access_token,
    refresh_token: session.refresh_token,
    expires_at: session.expires_at,
    user: session.user,
  };
}