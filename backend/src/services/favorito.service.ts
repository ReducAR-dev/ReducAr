import { getSupabaseWithAuth } from "../config/supabase.js";
import type { Favorito } from "../models/favorito.model.js";
import type { UUID } from "../models/common.types.js";
import type { Result } from "../types/common.types.js";

export interface FavoritoConCurso {
  id: number;
  curso_id: number;
  fecha: string;
  curso: {
    titulo: string;
    imagen_url: string | null;
    precio: number;
    categoria: string;
    modalidad: string;
    institucion: string;
  }
}

// ============================================
// OBTENER FAVORITOS DEL USUARIO (CON JOIN)
// ============================================

export const obtenerFavoritosUsuario = async (
  usuarioId: UUID,
  accessToken: string,
): Promise<Result<FavoritoConCurso[]>> => {
  const supabase = getSupabaseWithAuth(accessToken);

  const { data, error } = await supabase
    .from("favorito")
    .select(`
      id,
      curso_id,
      fecha,
      curso!inner (
        titulo,
        imagen_url,
        precio,
        nombre_propietario,
        categoria!inner ( nombre ),
        modalidad!inner ( nombre )
      )
    `)
    .eq("usuario_id", usuarioId)
    .order("fecha", { ascending: false });
    
  if (error) {
    console.error("❌ favorito.obtenerFavoritosUsuario:", error.message);
    return { success: false, error: error.message };
  }

  const items = (data || []).map((f: any) => {
    const cursoData = Array.isArray(f.curso) ? f.curso[0] : f.curso;
    const catData = Array.isArray(cursoData?.categoria) ? cursoData.categoria[0] : cursoData?.categoria;
    const modData = Array.isArray(cursoData?.modalidad) ? cursoData.modalidad[0] : cursoData?.modalidad;

    return {
      id: f.id,
      curso_id: f.curso_id,
      fecha: f.fecha,
      curso: {
        titulo: cursoData?.titulo || "Curso no disponible",
        imagen_url: cursoData?.imagen_url || null,
        precio: cursoData?.precio || 0,
        categoria: catData?.nombre || "General",
        modalidad: modData?.nombre || "Virtual",
        institucion: cursoData?.nombre_propietario || "ReducAR",
      }
    };
  });

  return { success: true, data: items };
};

// ============================================
// AGREGAR A FAVORITOS
// ============================================

export const agregarFavorito = async (
  usuarioId: UUID,
  cursoId: number,
  accessToken: string,
): Promise<Result<Favorito>> => {
  const supabase = getSupabaseWithAuth(accessToken);

  // 1. Verificar que el curso exista y esté activo
  const { data: cursoExiste, error: cursoError } = await supabase
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
  const { data, error } = await supabase
    .from("favorito")
    .insert({
      usuario_id: usuarioId,
      curso_id: cursoId,
    })
    .select()
    .single();

  if (error) {
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

export const eliminarFavorito = async (
  usuarioId: UUID,
  cursoId: number,
  accessToken: string,
): Promise<Result<null>> => {
  const supabase = getSupabaseWithAuth(accessToken);

  const { data, error } = await supabase
    .from("favorito")
    .delete()
    .eq("usuario_id", usuarioId) // Filtro de identidad
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