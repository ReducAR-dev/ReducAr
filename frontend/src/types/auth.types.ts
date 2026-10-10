// src/types/auth.types.ts

export interface ApiSuccess<T> {
  success: true;
  message?: string;
  data: T;
}

export interface ApiErrorBody {
  success: false;
  error: string;
  details?: { path: string; message: string }[];
}

export interface SignupPayload {
  nombre: string;
  apellido: string;
  fecha_nacimiento: string;
  email: string;
  password: string;
}

export interface SignupResult {
  id: string;
  email: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResult {
  access_token: string;
  refresh_token: string;
  expires_at?: number;
  user: { id: string; email: string };
}