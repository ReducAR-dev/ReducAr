// src/services/favorito.service.ts
import { supabaseAdmin } from "../config/supabase-admin.js";
import type { Favorito } from "../models/favorito.model.js";
import type { UUID } from "../models/common.types.js";
import type { Result } from "../types/common.types.js";

// ============================================
// OBTENER FAVORITOS DEL USUARIO
// ============================================

/**
 * Devuelve todos los favoritos del usuario autenticado.
 * El `usuarioId` proviene siempre del JWT validado (`req.user.id`).
 */
export const obtenerFavoritosUsuario = async (
  usuarioId: UUID,
): Promise<Result<Favorito[]>> => {
  const { data, error } = await supabaseAdmin
    .from("favorito")
    .select("*")
    .eq("usuario_id", usuarioId)
    .order("fecha", { ascending: false });

  if (error) {
    console.error("❌ favorito.obtenerFavoritosUsuario:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data: (data ?? []) as Favorito[] };
};

// ============================================
// AGREGAR A FAVORITOS
// ============================================

/**
 * Agrega un curso a la lista de favoritos del usuario autenticado.
 *
 * Reglas de negocio:
 *  - El curso debe existir y estar activo (`esta_activo = true`).
 *  - Un usuario no puede guardar el mismo curso dos veces (UNIQUE compuesto en BD).
 */
export const agregarFavorito = async (
  usuarioId: UUID,
  cursoId: number,
): Promise<Result<Favorito>> => {
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

  // 2. Insertar en la tabla favorito
  const { data, error } = await supabaseAdmin
    .from("favorito")
    .insert({
      usuario_id: usuarioId,
      curso_id: cursoId,
    })
    .select()
    .single();

  if (error) {
    // Código 23505 en PostgreSQL = unique_violation (ya está en favoritos)
    if (error.code === "23505") {
      return {
        success: false,
        error: "Este curso ya se encuentra en tu lista de favoritos.",
      };
    }

    console.error("❌ favorito.agregarFavorito:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data: data as Favorito };
};

// ============================================
// ELIMINAR DE FAVORITOS
// ============================================

/**
 * Elimina un curso de la lista de favoritos del usuario autenticado.
 * Filtra por `usuario_id` y `curso_id` para garantizar que solo borre los suyos.
 */
export const eliminarFavorito = async (
  usuarioId: UUID,
  cursoId: number,
): Promise<Result<null>> => {
  const { data, error } = await supabaseAdmin
    .from("favorito")
    .delete()
    .eq("usuario_id", usuarioId)
    .eq("curso_id", cursoId)
    .select("id");

  if (error) {
    console.error("❌ favorito.eliminarFavorito:", error.message);
    return { success: false, error: error.message };
  }

  if (!data || data.length === 0) {
    return {
      success: false,
      error: "El curso no se encontró en tus favoritos.",
    };
  }

  return { success: true, data: null };
};
