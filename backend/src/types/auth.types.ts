import type { Request } from "express";
import type { UUID } from "../models/common.types.js";

export type OAuthProvider = "google" | "github";

export interface SignUpPayload {
  email: string;
  password: string;
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

export interface SignInResult {
  access_token: string;
  refresh_token: string;
  expires_at: number | undefined;
  user: AuthUser;
}

export interface AuthUser {
  id: UUID;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthUser;
  accessToken?: string;
}

// NUEVOS
export interface OAuthUrlResult {
  url: string;
}

export interface OAuthExchangePayload {
  code: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ForgotPasswordResult {
  message: string;
}