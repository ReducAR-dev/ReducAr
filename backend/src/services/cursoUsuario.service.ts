// src/services/cursoUsuario.service.ts
import { supabaseAdmin } from "../config/supabase-admin.js";
import type { CursoUsuario } from "../models/cursoUsuario.model.js";
import type { UUID } from "../models/common.types.js";
import type { Result } from "../types/common.types.js";

// ============================================
// OBTENER CURSOS ADQUIRIDOS DEL USUARIO
// ============================================

/**
 * Devuelve todos los cursos adquiridos por el usuario autenticado.
 * El `usuarioId` proviene siempre del JWT validado (`req.user.id`).
 */
export const obtenerCursosUsuario = async (
  usuarioId: UUID,
): Promise<Result<CursoUsuario[]>> => {
  const { data, error } = await supabaseAdmin
    .from("curso_usuario")
    .select("*")
    .eq("usuario_id", usuarioId)
    .order("fecha_adquisicion", { ascending: false });

  if (error) {
    console.error("❌ cursoUsuario.obtenerCursosUsuario:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data: (data ?? []) as CursoUsuario[] };
};

// ============================================
// ADQUIRIR / COMPRAR CURSO
// ============================================

/**
 * Añade un curso a la lista de cursos adquiridos del usuario autenticado.
 *
 * Reglas de negocio:
 *  - El curso debe existir y estar activo (`esta_activo = true`).
 *  - Un usuario no puede adquirir el mismo curso dos veces (UNIQUE compuesto en BD).
 */
export const adquirirCursoUsuario = async (
  usuarioId: UUID,
  cursoId: number,
): Promise<Result<CursoUsuario>> => {
  // 1. Verificar que el curso exista y esté activo
  const { data: cursoExiste, error: cursoError } = await supabaseAdmin
    .from("curso")
    .select("id")
    .eq("id", cursoId)
    .eq("esta_activo", true)
    .single();

  if (cursoError || !cursoExiste) {
    return {
      success: false,
      error: "El curso no existe o no está disponible.",
    };
  }

  // 2. Insertar en la tabla curso_usuario
  const { data, error } = await supabaseAdmin
    .from("curso_usuario")
    .insert({
      usuario_id: usuarioId,
      curso_id: cursoId,
    })
    .select()
    .single();

  if (error) {
    // Código 23505 en PostgreSQL = unique_violation (ya tiene el curso)
    if (error.code === "23505") {
      return {
        success: false,
        error: "Ya adquiriste este curso anteriormente.",
      };
    }

    console.error("❌ cursoUsuario.adquirirCursoUsuario:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data: data as CursoUsuario };
};

// ============================================
// QUITAR CURSO DE LA LISTA DEL USUARIO
// ============================================

/**
 * Elimina un curso de la lista de cursos del usuario autenticado.
 * Filtra por `usuario_id` y `curso_id` para garantizar que solo borre los suyos.
 */
export const eliminarCursoUsuario = async (
  usuarioId: UUID,
  cursoId: number,
): Promise<Result<null>> => {
  const { data, error } = await supabaseAdmin
    .from("curso_usuario")
    .delete()
    .eq("usuario_id", usuarioId)
    .eq("curso_id", cursoId)
    .select("id");

  if (error) {
    console.error("❌ cursoUsuario.eliminarCursoUsuario:", error.message);
    return { success: false, error: error.message };
  }

  if (!data || data.length === 0) {
    return {
      success: false,
      error: "El curso no se encontró en tu lista de cursos adquiridos.",
    };
  }

  return { success: true, data: null };
};
