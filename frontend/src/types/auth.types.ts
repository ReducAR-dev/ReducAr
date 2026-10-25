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

/** Proveedores OAuth que soporta el proyecto. */
export type OAuthProvider = "google" | "github";

/** Respuesta del backend al pedir la URL de autorización. */
export interface OAuthUrlResult {
  url: string;
}

/** Payload para pedir el mail de recuperación. */
export interface ForgotPasswordPayload {
  email: string;
}

/** Payload para cambiar la contraseña una vez que el usuario tiene el token de recuperación. */
export interface ResetPasswordPayload {
  access_token: string;
  new_password: string;
}

/** Respuesta genérica de operaciones de recuperación. */
export interface ForgotPasswordResult {
  message: string;
}