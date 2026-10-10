// src/types/user.types.ts

/**
 * Perfil completo del usuario, tal como lo devuelve GET /api/usuarios/yo.
 * Coincide con la tabla `usuario` (snake_case para los campos que
 * vienen de la BD, camelCase para los que ya están normalizados).
 */
export interface PerfilUsuario {
  id: string;
  nombre: string;
  apellido: string | null;
  email: string;
  fecha_nacimiento: string | null;
  fotoPerfil: string | null;
  biografia: string | null;
  ubicacion: string | null;
  user_preferencia: string | null;
  rolId: number | null;
  esta_activo: boolean | null;
  fecha_registro: string | null;
  fecha_actualizacion: string | null;
}