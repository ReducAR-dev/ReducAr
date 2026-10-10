// src/types/auth.types.ts
import type { Request } from "express";
import type { UUID } from "../models/common.types.js";

// ============================================
// PAYLOADS ENTRANTES
// ============================================

export interface SignUpPayload {
  email: string;
  password: string;
  /** Metadatos que Supabase Auth guarda en `raw_user_meta_data`.
   *  El trigger `handle_new_user` los usará para poblar `public.usuario`. */
  metadata?: {
    nombre?: string;
    apellido?: string;
    fecha_nacimiento?: string;
  };
}

export interface SignInPayload {
  email: string;
  password: string;
}

// ============================================
// RESPUESTAS
// ============================================

export interface SignInResult {
  access_token: string;
  refresh_token: string;
  expires_at: number | undefined;
  user: AuthUser;
}

// ============================================
// USUARIO AUTENTICADO (para middleware)
// ============================================

/**
 * Representa al usuario autenticado que el middleware adjunta
 * a la petición de Express tras validar el JWT.
 */
export interface AuthUser {
  id: UUID;
  email: string;
}

/**
 * Tipo que deben usar los controladores protegidos.
 *
 * El middleware valida el JWT y rellena `req.user`.
 * Si `req.user` no existe, el middleware ya habrá cortado la petición
 * con un 401 antes de llegar al controlador.
 */
export interface AuthenticatedRequest extends Request {
  user?: AuthUser;
}