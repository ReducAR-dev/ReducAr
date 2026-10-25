/** Envoltorio estándar de éxito que devuelve el backend. */
export interface ApiSuccess<T> {
  success: true;
  message?: string;
  data: T;
}

/** Cuerpo estándar de error que devuelve el backend. */
export interface ApiErrorBody {
  success: false;
  error: string;
  details?: { path: string; message: string }[];
}