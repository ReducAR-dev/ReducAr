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
  const { data, error } = await supabaseAdmin 
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
  const { data, error } = await supabaseAdmin 
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
  const { error } = await supabaseAdmin 
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


// ============================================
// SUBIDA DE FOTO DE PERFIL
// ============================================

const BUCKET_AVATARS = "avatars";

/**
 * Sube una imagen al bucket `avatars` y actualiza `foto_perfil` del usuario.
 *
 * Convención del nombre: `<usuarioId>.<extension>`.
 * Si el usuario sube una foto nueva, se sobreescribe la anterior.
 * Eso evita acumular archivos huérfanos en Storage.
 */
export const actualizarFotoPerfil = async (
  usuarioId: UUID,
  file: { buffer: Buffer; mimetype: string; originalname: string },
): Promise<Result<Usuario>> => {
  // 1. Determinar la extensión desde el MIME type.
  const extFromMime: Record<string, string> = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/webp": "webp",
  };
  const extension = extFromMime[file.mimetype];
  if (!extension) {
    return { success: false, error: "Formato de imagen no soportado." };
  }

  // 2. Nombre ÚNICO por subida → evita que el navegador sirva la foto vieja.
  const timestamp = Date.now();
  const filePath = `${usuarioId}-${timestamp}.${extension}`;

  // 3. Guardar cuál era la URL previa (para borrarla después).
  const { data: previo } = await supabaseAdmin
    .from("usuario")
    .select("foto_perfil")
    .eq("id", usuarioId)
    .single();
  const urlPrevia = previo?.foto_perfil ?? null;

  // 4. Subir el nuevo archivo. Ya no usamos upsert (nombre único).
  const { error: uploadError } = await supabaseAdmin.storage
    .from(BUCKET_AVATARS)
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (uploadError) {
    console.error("❌ usuarios.actualizarFotoPerfil.upload:", uploadError.message);
    return { success: false, error: "No se pudo subir la imagen." };
  }

  // 5. Obtener la URL pública del archivo recién subido.
  const { data: publicUrlData } = supabaseAdmin.storage
    .from(BUCKET_AVATARS)
    .getPublicUrl(filePath);

  const publicUrl = publicUrlData.publicUrl;

  // 6. Actualizar la columna foto_perfil en la tabla usuario.
  const { data, error } = await supabaseAdmin
    .from("usuario")
    .update({
      foto_perfil: publicUrl,
      fecha_actualizacion: new Date().toISOString() as Timestamp,
    })
    .eq("id", usuarioId)
    .select()
    .single();

  if (error) {
    // Rollback: si la BD falla, borramos el archivo huérfano que acabamos de subir.
    await supabaseAdmin.storage
      .from(BUCKET_AVATARS)
      .remove([filePath])
      .catch(() => {
        /* best-effort */
      });

    console.error("❌ usuarios.actualizarFotoPerfil.update:", error.message);
    return { success: false, error: error.message };
  }

  // 7. Borrar la imagen vieja (best-effort, no bloqueante).
  if (urlPrevia) {
    const pathViejo = extractStoragePath(urlPrevia, BUCKET_AVATARS);
    if (pathViejo && pathViejo !== filePath) {
      supabaseAdmin.storage
        .from(BUCKET_AVATARS)
        .remove([pathViejo])
        .catch(() => {
          /* si falla el borrado, no rompemos la subida */
        });
    }
  }

  return { success: true, data: data as Usuario };
};

/**
 * Extrae el path interno del bucket desde una URL pública de Supabase.
 *
 * Ej:
 *   entrada: https://xxx.supabase.co/storage/v1/object/public/avatars/user-123-1699.jpg
 *   salida:  user-123-1699.jpg
 */
function extractStoragePath(publicUrl: string, bucket: string): string | null {
  try {
    const marker = `/storage/v1/object/public/${bucket}/`;
    const idx = publicUrl.indexOf(marker);
    if (idx === -1) return null;
    return decodeURIComponent(publicUrl.slice(idx + marker.length));
  } catch {
    return null;
  }
}