import type { Request, Response } from "express";
import {
  signUp,
  signIn,
  signOut,
  getUserFromToken,
  resetPassword,
  getOAuthUrl,
  exchangeOAuthCodeForSession,
  createSingleUseCode,
  redeemSingleUseCode,
} from "../services/auth.service.js";
import { consumePkce } from "../config/oauth-store.js";
import type { AuthenticatedRequest, OAuthProvider } from "../types/auth.types.js";

// ============================================
// POST /auth/signup — Público
// ============================================

/**
 * Registra un usuario en Supabase Auth.
 *
 * El perfil en `public.usuario` lo crea automáticamente el trigger
 * `handle_new_user` de la base de datos. Este controlador no toca
 * la tabla `usuario`.
 */
export const signUpHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { email, password, nombre, apellido, fecha_nacimiento } = req.body ?? {};

  if (typeof email !== "string" || !email.trim()) {
    res.status(400).json({ success: false, error: "El email es obligatorio." });
    return;
  }
  if (typeof password !== "string" || password.length < 6) {
    res.status(400).json({
      success: false,
      error: "La contraseña es obligatoria y debe tener al menos 6 caracteres.",
    });
    return;
  }
  if (typeof nombre !== "string" || !nombre.trim()) {
    res.status(400).json({ success: false, error: "El nombre es obligatorio." });
    return;
  }

  // Crear usuario en Supabase Auth.
  // Los metadatos son los que el trigger usará para poblar public.usuario.
  const authResultado = await signUp({
    email: email.trim().toLowerCase(),
    password,
    metadata: {
      nombre: nombre.trim(),
      ...(apellido ? { apellido: String(apellido).trim() } : {}),
      ...(fecha_nacimiento ? { fecha_nacimiento: String(fecha_nacimiento) } : {}),
    },
  });

  if (!authResultado.success) {
    res.status(400).json({ success: false, error: authResultado.error });
    return;
  }

  res.status(201).json({
    success: true,
    message: "Usuario registrado exitosamente.",
    data: {
      id: authResultado.data.id,
      email: authResultado.data.email,
    },
  });
};

// ============================================
// POST /auth/login — Público
// ============================================

export const signInHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { email, password } = req.body ?? {};

  if (typeof email !== "string" || !email.trim()) {
    res.status(400).json({ success: false, error: "El email es obligatorio." });
    return;
  }
  if (typeof password !== "string" || !password) {
    res.status(400).json({ success: false, error: "La contraseña es obligatoria." });
    return;
  }

  const resultado = await signIn({
    email: email.trim().toLowerCase(),
    password,
  });

  if (!resultado.success) {
    res.status(401).json({ success: false, error: resultado.error });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Inicio de sesión exitoso.",
    data: resultado.data,
  });
};

// ============================================
// POST /auth/logout — Requiere JWT
// ============================================

export const signOutHandler = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ success: false, error: "No autenticado." });
    return;
  }

  const resultado = await signOut("");

  if (!resultado.success) {
    res.status(500).json({ success: false, error: resultado.error });
    return;
  }

  res.status(200).json({ success: true, message: "Sesión cerrada correctamente." });
};

// ============================================
// GET /auth/me — Requiere JWT
// ============================================

export const meHandler = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ success: false, error: "No autenticado." });
    return;
  }

  res.status(200).json({
    success: true,
    data: req.user,
  });
};

// ============================================
// POST /auth/forgot-password — Público
// ============================================

export const forgotPasswordHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { email } = req.body ?? {};
  if (typeof email !== "string" || !email.trim()) {
    res.status(400).json({ success: false, error: "El email es obligatorio." });
    return;
  }

  const resultado = await resetPassword(email.trim().toLowerCase());

  // Siempre devolvemos 200 con mensaje genérico, exista o no el email.
  res.status(200).json({
    success: true,
    data: resultado.success ? resultado.data : { message: "Si el correo está registrado, vas a recibir un enlace." },
  });
};

// ============================================
// GET /auth/oauth/:provider — Público
// ============================================

const PROVIDERS_VALIDOS: OAuthProvider[] = ["google", "github"];

export const oauthStartHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const providerRaw = Array.isArray(req.params.provider)
    ? req.params.provider[0]
    : req.params.provider;

  if (!providerRaw || !PROVIDERS_VALIDOS.includes(providerRaw as OAuthProvider)) {
    res.status(400).json({
      success: false,
      error: "Proveedor no soportado. Usá 'google' o 'github'.",
    });
    return;
  }

  const resultado = await getOAuthUrl(providerRaw as OAuthProvider);
  if (!resultado.success) {
    res.status(500).json({ success: false, error: resultado.error });
    return;
  }

  res.status(200).json({ success: true, data: resultado.data });
};

// ============================================
// GET /auth/oauth/callback — Lo llama Supabase
// ============================================

export const oauthCallbackHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const frontendUrl = process.env.FRONTEND_URL;
  if (!frontendUrl) {
    res.status(500).send("Configuración incompleta.");
    return;
  }

  // Supabase puede enviar error en vez de code (usuario canceló, etc.)
  const errorParam =
    typeof req.query.error === "string" ? req.query.error : null;
  if (errorParam) {
    const desc =
      typeof req.query.error_description === "string"
        ? req.query.error_description
        : errorParam;
    res.redirect(
      302,
      `${frontendUrl}/auth/callback?error=${encodeURIComponent(desc)}`,
    );
    return;
  }

  const code = typeof req.query.code === "string" ? req.query.code : null;
  const state = typeof req.query.state === "string" ? req.query.state : null;

  if (!code || !state) {
    res.redirect(
      302,
      `${frontendUrl}/auth/callback?error=${encodeURIComponent("Parámetros de OAuth incompletos.")}`,
    );
    return;
  }

  const pkce = consumePkce(state);
  if (!pkce) {
    res.redirect(
      302,
      `${frontendUrl}/auth/callback?error=${encodeURIComponent("Sesión de OAuth expirada. Intentá de nuevo.")}`,
    );
    return;
  }

  const resultado = await exchangeOAuthCodeForSession(code, pkce.codeVerifier);
  if (!resultado.success) {
    res.redirect(
      302,
      `${frontendUrl}/auth/callback?error=${encodeURIComponent(resultado.error)}`,
    );
    return;
  }

  // Generamos código de un solo uso y redirigimos al front.
  // Los tokens NUNCA viajan en la URL.
  const singleUseCode = createSingleUseCode(resultado.data);
  res.redirect(
    302,
    `${frontendUrl}/auth/callback?code=${encodeURIComponent(singleUseCode)}`,
  );
};

// ============================================
// POST /auth/oauth/exchange — Público
// ============================================

export const oauthExchangeHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { code } = req.body ?? {};
  if (typeof code !== "string" || !code) {
    res.status(400).json({ success: false, error: "El código es obligatorio." });
    return;
  }

  const session = redeemSingleUseCode(code);
  if (!session) {
    res.status(400).json({
      success: false,
      error: "Código inválido, expirado o ya utilizado.",
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Sesión iniciada correctamente.",
    data: session,
  });
};