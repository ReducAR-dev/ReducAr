import { getSupabaseWithAuth } from "../config/supabase.js";
import type { UUID } from "../models/common.types.js";
import type { Result, PaginacionParams, PaginatedResult } from "../types/common.types.js";

export interface CursoAdquirido {
  id: number;
  curso_id: number;
  fecha_adquisicion: string;
  fecha_finalizacion: string | null;
  curso: {
    titulo: string;
    imagen_url: string | null;
    precio: number;
    categoria: string;
    modalidad: string;
    institucion: string;
  };
}

// ============================================
// OBTENER CURSOS ADQUIRIDOS
// ============================================
export const obtenerCursosUsuario = async (
  usuarioId: UUID,
  accessToken: string, // ✅ Recibimos el token
  params: PaginacionParams,
): Promise<Result<PaginatedResult<CursoAdquirido>>> => {
  const supabase = getSupabaseWithAuth(accessToken); // ✅ Cliente autenticado
  const from = (params.page - 1) * params.limit;
  const to = from + params.limit - 1;

  const { data, error, count } = await supabase
    .from("curso_usuario")
    .select(`
      id,
      curso_id,
      fecha_adquisicion,
      fecha_finalizacion,
      curso!inner (
        titulo,
        imagen_url,
        precio,
        nombre_propietario,
        categoria!inner ( nombre ),
        modalidad!inner ( nombre )
      )
    `, { count: "exact" })
    .eq("usuario_id", usuarioId) // RLS también valida esto
    .order("fecha_adquisicion", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("❌ cursoUsuario.obtenerCursosUsuario:", error.message);
    return { success: false, error: error.message };
  }

  const items = (data || []).map((c: any) => {
    const cursoData = Array.isArray(c.curso) ? c.curso[0] : c.curso;
    const catData = Array.isArray(cursoData?.categoria) ? cursoData.categoria[0] : cursoData?.categoria;
    const modData = Array.isArray(cursoData?.modalidad) ? cursoData.modalidad[0] : cursoData?.modalidad;

    return {
      id: c.id,
      curso_id: c.curso_id,
      fecha_adquisicion: c.fecha_adquisicion,
      fecha_finalizacion: c.fecha_finalizacion,
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

  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / params.limit));

  return {
    success: true,
    data: {
      items,
      meta: { page: params.page, limit: params.limit, total, totalPages },
    },
  };
};

// ============================================
// ADQUIRIR CURSO GRATUITO
// ============================================
export const adquirirCursoUsuario = async (
  usuarioId: UUID,
  cursoId: number,
  accessToken: string, // ✅ Recibimos el token
): Promise<Result<any>> => {
  const supabase = getSupabaseWithAuth(accessToken); // ✅ Cliente autenticado

  // 1. Verificar que exista, esté activo y SEA GRATUITO
  const { data: cursoExiste, error: cursoError } = await supabase
    .from("curso")
    .select("id, precio, esta_activo")
    .eq("id", cursoId)
    .eq("esta_activo", true)
    .single();

  if (cursoError || !cursoExiste) {
    return { success: false, error: "El curso no existe o no está disponible." };
  }

  if (cursoExiste.precio > 0) {
    return { success: false, error: "Este curso es de pago. La pasarela de pagos aún no está habilitada." };
  }

  // 2. Insertar
  const { data, error } = await supabase
    .from("curso_usuario")
    .insert({
      usuario_id: usuarioId,
      curso_id: cursoId,
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return { success: false, error: "Ya tenés este curso en tu lista." };
    }
    console.error("❌ cursoUsuario.adquirirCursoUsuario:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data };
};

// ============================================
// QUITAR CURSO DE LA LISTA
// ============================================
export const eliminarCursoUsuario = async (
  usuarioId: UUID,
  cursoId: number,
  accessToken: string,
): Promise<Result<null>> => {
  const supabase = getSupabaseWithAuth(accessToken);

  // 🛡️ REGLA DE NEGOCIO: Verificar si el curso es gratuito antes de borrar
  const { data: cursoData, error: cursoError } = await supabase
    .from("curso")
    .select("precio")
    .eq("id", cursoId)
    .single();

  if (cursoError || !cursoData) {
    return { success: false, error: "El curso no existe." };
  }

  if (cursoData.precio > 0) {
    return {
      success: false,
      error: "No podés eliminar un curso de pago de tu lista. Solo se pueden eliminar los cursos gratuitos."
    };
  }

  // 🗑️ Intentar borrar
  const { data, error } = await supabase
    .from("curso_usuario")
    .delete()
    .eq("usuario_id", usuarioId)
    .eq("curso_id", cursoId)
    .select("id");

  if (error) {
    console.error("❌ cursoUsuario.eliminarCursoUsuario:", error.message);
    return { success: false, error: error.message };
  }

  // Si data está vacío, RLS lo bloqueó o el curso no estaba en la lista
  if (!data || data.length === 0) {
    return {
      success: false,
      error: "No se pudo eliminar el curso. Es posible que no esté en tu lista o no tengas permisos.",
    };
  }

  return { success: true, data: null };
};