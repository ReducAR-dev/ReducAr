// src/types/usuario.types.ts
import type { UUID } from "../models/common.types.js";

// ============================================
// CREACIÓN DE PERFIL (uso interno)
// ============================================

export interface CrearPerfilPayload {
  id: UUID;
  nombre: string;
  apellido?: string;
  email: string;
  fecha_nacimiento?: string;
}

// ============================================
// ACTUALIZACIÓN DEL PROPIO PERFIL
// ============================================

/**
 * Campos que el usuario puede modificar de su propio perfil.
 * `rolId` y `esta_activo` NO están aquí: solo un admin puede cambiarlos.
 */
export interface ActualizarPerfilPayload {
  nombre?: string;
  apellido?: string | null;
  fecha_nacimiento?: string | null;
  fotoPerfil?: string | null;
  biografia?: string | null;
  ubicacion?: string | null;
  user_preferencia?: string | null;
}