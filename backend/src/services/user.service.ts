// src/services/usuarios.service.ts
import { supabase } from "../config/supabase.js";
import { supabaseAdmin } from "../config/supabase-admin.js";
import type { Usuario } from "../models/usuario.model.js";
import type { UUID, Timestamp } from "../models/common.types.js";
import type { Result } from "../types/common.types.js";
import type {
  CrearPerfilPayload,
  ActualizarPerfilPayload,
} from "../types/usuario.types.js";

// ============================================
// TIPO AUXILIAR: Rol admin
// ============================================

const ROL_ADMIN = 1;

/**
 * Comprueba si un usuario es admin. Se usa internamente antes
 * de ejecutar operaciones administrativas.
 *
 * ⚠️ Usa `supabaseAdmin` para leer el rol sin que RLS interfiera.
 *    Si usaramos el cliente público, RLS podría ocultar la fila
 *    y devolver null, dando un falso negativo.
 */
const esAdmin = async (usuarioId: UUID): Promise<boolean> => {
  const { data, error } = await supabaseAdmin
    .from("usuario")
    .select("rol_id")  // ← antes decía "rolId"
    .eq("id", usuarioId)
    .single();

  if (error || !data) return false;
  return data.rol_id === ROL_ADMIN;
};

// ============================================
// CREACIÓN DE PERFIL
// ============================================

/**
 * Crea la fila en `public.usuario`.
 *
 * ⚠️ MÉTODO DE MANTENIMIENTO, NO ES LA RUTA PRINCIPAL.
 *    En el flujo normal de registro, el trigger `handle_new_user`
 *    de la base de datos crea la fila automáticamente. Este método
 *    existe solo para reparar casos excepcionales (perfiles
 *    faltantes detectados por auditoría o scripts manuales).
 */
export const crearPerfil = async (
  payload: CrearPerfilPayload,
): Promise<Result<Usuario>> => {
  const { data, error } = await supabaseAdmin
    .from("usuario")
    .insert({
      id: payload.id,
      nombre: payload.nombre,
      apellido: payload.apellido ?? null,
      email: payload.email,
      fecha_nacimiento: payload.fecha_nacimiento ?? null,
    })
    .select()
    .single();

  if (error) {
    console.error("❌ usuarios.crearPerfil:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data: data as Usuario };
};

// ============================================
// CONSULTA DEL PROPIO PERFIL
// ============================================

/**
 * Devuelve el perfil del usuario autenticado.
 * El `usuarioId` DEBE venir del JWT validado, nunca del body.
 */
export const obtenerPerfilPropio = async (
  usuarioId: UUID,
): Promise<Result<Usuario>> => {
  const { data, error } = await supabase
    .from("usuario")
    .select("*")
    .eq("id", usuarioId)
    .single();

  if (error) {
    console.error("❌ usuarios.obtenerPerfilPropio:", error.message);
    return { success: false, error: "Perfil no encontrado." };
  }

  return { success: true, data: data as Usuario };
};

// ============================================
// ACTUALIZACIÓN DEL PROPIO PERFIL
// ============================================

/**
 * Actualiza el perfil del usuario autenticado.
 *
 * Reglas:
 *  - Solo se pueden modificar los campos del payload.
 *  - `rolId` y `esta_activo` NO están permitidos aquí.
 *  - El `usuarioId` viene del JWT, no del body.
 */
export const actualizarPerfilPropio = async (
  usuarioId: UUID,
  payload: ActualizarPerfilPayload,
): Promise<Result<Usuario>> => {
  const { data, error } = await supabase
    .from("usuario")
    .update({
      ...payload,
      fecha_actualizacion: new Date().toISOString() as Timestamp,
    })
    .eq("id", usuarioId)
    .select()
    .single();

  if (error) {
    console.error("❌ usuarios.actualizarPerfilPropio:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data: data as Usuario };
};

// ============================================
// SOFT DELETE: BLOQUEAR CUENTA PROPIA
// ============================================

/**
 * "Desactiva" la cuenta del propio usuario.
 * NO borra la fila. Solo cambia `esta_activo` a false.
 */
export const bloquearCuentaPropia = async (
  usuarioId: UUID,
): Promise<Result<null>> => {
  const { error } = await supabase
    .from("usuario")
    .update({
      esta_activo: false,
      fecha_actualizacion: new Date().toISOString() as Timestamp,
    })
    .eq("id", usuarioId);

  if (error) {
    console.error("❌ usuarios.bloquearCuentaPropia:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data: null };
};

// ============================================
// OPERACIONES ADMIN
// ============================================

/**
 * Devuelve el perfil de CUALQUIER usuario.
 * Solo un admin puede llamar a este método.
 *
 * Doble verificación:
 *  1. El backend comprueba que `adminId` sea admin.
 *  2. La consulta se hace con `supabaseAdmin`, que bypassa RLS.
 */
export const obtenerPerfilAdmin = async (
  adminId: UUID,
  objetivoId: UUID,
): Promise<Result<Usuario>> => {
  if (!(await esAdmin(adminId))) {
    return { success: false, error: "No autorizado. Se requiere rol admin." };
  }

  const { data, error } = await supabaseAdmin
    .from("usuario")
    .select("*")
    .eq("id", objetivoId)
    .single();

  if (error) {
    console.error("❌ usuarios.obtenerPerfilAdmin:", error.message);
    return { success: false, error: "Perfil no encontrado." };
  }

  return { success: true, data: data as Usuario };
};

/**
 * Desactiva la cuenta de otro usuario (por penalización).
 *
 * Reglas:
 *  - Solo un admin puede hacerlo.
 *  - Un admin no puede desactivarse a sí mismo.
 */
export const bloquearCuentaAdmin = async (
  adminId: UUID,
  objetivoId: UUID,
): Promise<Result<null>> => {
  if (!(await esAdmin(adminId))) {
    return { success: false, error: "No autorizado. Se requiere rol admin." };
  }

  if (adminId === objetivoId) {
    return { success: false, error: "No podés desactivar tu propia cuenta." };
  }

  const { error } = await supabaseAdmin
    .from("usuario")
    .update({
      esta_activo: false,
      fecha_actualizacion: new Date().toISOString() as Timestamp,
    })
    .eq("id", objetivoId);

  if (error) {
    console.error("❌ usuarios.bloquearCuentaAdmin:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data: null };
};

/**
 * Elimina DEFINITIVAMENTE a un usuario.
 *
 * Reglas:
 *  - Solo un admin puede hacerlo.
 *  - Un admin no puede eliminarse a sí mismo.
 *  - Se elimina de `auth.users`; la fila en `public.usuario` se
 *    borra en cascada por la FK.
 */
export const eliminarCuentaAdmin = async (
  adminId: UUID,
  objetivoId: UUID,
): Promise<Result<null>> => {
  if (!(await esAdmin(adminId))) {
    return { success: false, error: "No autorizado. Se requiere rol admin." };
  }

  if (adminId === objetivoId) {
    return { success: false, error: "No podés eliminarte a vos mismo." };
  }

  const { error } = await supabaseAdmin.auth.admin.deleteUser(objetivoId);

  if (error) {
    console.error("❌ usuarios.eliminarCuentaAdmin:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data: null };
};