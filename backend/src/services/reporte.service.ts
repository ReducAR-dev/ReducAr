// src/services/reporte.service.ts
import { supabaseAdmin } from "../config/supabase-admin.js";
import type { Reporte } from "../models/reporte.model.js";
import type { UUID, Timestamp } from "../models/common.types.js";
import type {
  Result,
  PaginatedResult,
  PaginacionParams,
} from "../types/common.types.js";
import type {
  CrearReportePayload,
  ResolverReportePayload,
} from "../schema/reporte.schema.js";

const ROL_ADMIN = 1;
const ESTADO_PENDIENTE = 1;

// ============================================
// HELPERS
// ============================================

/**
 * Verifica si un usuario tiene rol de administrador.
 * Usa `supabaseAdmin` para evitar bloqueos de RLS.
 */
const esAdmin = async (usuarioId: UUID): Promise<boolean> => {
  const { data, error } = await supabaseAdmin
    .from("usuario")
    .select("rol_id")
    .eq("id", usuarioId)
    .single();

  if (error || !data) return false;
  return data.rol_id === ROL_ADMIN;
};

/**
 * Normaliza los parámetros de paginación (default page=1, limit=30, max=100).
 */
const normalizarPaginacion = (
  params?: Partial<PaginacionParams>,
): PaginacionParams => {
  const page = params?.page && params.page > 0 ? params.page : 1;
  const rawLimit = params?.limit && params.limit > 0 ? params.limit : 30;
  const limit = Math.min(rawLimit, 100);
  return { page, limit };
};

// ============================================
// CREAR REPORTE (Usuario autenticado)
// ============================================

/**
 * Crea un nuevo reporte aplicando las reglas de negocio:
 *  1. El tipo de reporte debe existir en `tipo_reporte`.
 *  2. El usuario no puede reportarse a sí mismo (ni su propia valoración).
 *  3. La entidad reportada (`curso`, `usuario` o `valoracion`) debe existir.
 *  4. Un usuario no puede reportar dos veces la misma entidad.
 *  5. Nace siempre con `estado_id = 1` (pending), sin respuesta ni fecha de resolución.
 */
export const crearReporte = async (
  usuarioId: UUID,
  payload: CrearReportePayload,
): Promise<Result<Reporte>> => {
  const { tipo_reporte_id, entidad_tipo, entidad_id, mensaje } = payload;

  // 1. Verificar que el tipo de reporte exista
  const { data: tipoExiste, error: tipoError } = await supabaseAdmin
    .from("tipo_reporte")
    .select("id")
    .eq("id", tipo_reporte_id)
    .single();

  if (tipoError || !tipoExiste) {
    return { success: false, error: "El tipo de reporte no es válido." };
  }

  // 2. Validar existencia de la entidad y que no se reporte a sí mismo
  if (entidad_tipo === "usuario") {
    if (entidad_id === usuarioId) {
      return {
        success: false,
        error: "No podés reportarte a vos mismo.",
      };
    }

    const { data: usuarioObjetivo, error: userErr } = await supabaseAdmin
      .from("usuario")
      .select("id")
      .eq("id", entidad_id)
      .single();

    if (userErr || !usuarioObjetivo) {
      return {
        success: false,
        error: "El usuario que intentás reportar no existe.",
      };
    }
  } else if (entidad_tipo === "curso") {
    const cursoId = Number.parseInt(entidad_id, 10);
    if (!Number.isInteger(cursoId) || cursoId <= 0) {
      return { success: false, error: "ID de curso inválido." };
    }

    const { data: cursoObjetivo, error: cursoErr } = await supabaseAdmin
      .from("curso")
      .select("id")
      .eq("id", cursoId)
      .single();

    if (cursoErr || !cursoObjetivo) {
      return {
        success: false,
        error: "El curso que intentás reportar no existe.",
      };
    }
  } else if (entidad_tipo === "valoracion") {
    const valoracionId = Number.parseInt(entidad_id, 10);
    if (!Number.isInteger(valoracionId) || valoracionId <= 0) {
      return { success: false, error: "ID de valoración inválido." };
    }

    const { data: valoracionObjetivo, error: valErr } = await supabaseAdmin
      .from("valoracion")
      .select("id, usuario_id")
      .eq("id", valoracionId)
      .single();

    if (valErr || !valoracionObjetivo) {
      return {
        success: false,
        error: "La valoración que intentás reportar no existe.",
      };
    }

    if (valoracionObjetivo.usuario_id === usuarioId) {
      return {
        success: false,
        error: "No podés reportar tu propio comentario o valoración.",
      };
    }
  }

  // 3. Verificar que el usuario no haya reportado antes a la misma entidad
  const { count, error: dupError } = await supabaseAdmin
    .from("reporte")
    .select("*", { count: "exact", head: true })
    .eq("usuario_id", usuarioId)
    .eq("entidad_tipo", entidad_tipo)
    .eq("entidad_id", entidad_id);

  if (dupError) {
    console.error("❌ reporte.crearReporte (duplicado):", dupError.message);
    return { success: false, error: dupError.message };
  }

  if (count && count > 0) {
    return {
      success: false,
      error: "Ya enviaste un reporte sobre este elemento anteriormente.",
    };
  }

  // 4. Insertar el reporte con valores iniciales forzados por el backend
  const { data, error } = await supabaseAdmin
    .from("reporte")
    .insert({
      usuario_id: usuarioId,
      tipo_reporte_id,
      entidad_tipo,
      entidad_id,
      mensaje,
      estado_id: ESTADO_PENDIENTE,
      respuesta_admin: null,
      fecha_resolucion: null,
    })
    .select()
    .single();

  if (error) {
    console.error("❌ reporte.crearReporte:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data: data as Reporte };
};

// ============================================
// OBTENER REPORTES PROPIOS (Usuario autenticado)
// ============================================

/**
 * Devuelve el historial de reportes enviados por el propio usuario.
 */
export const obtenerMisReportes = async (
  usuarioId: UUID,
): Promise<Result<Reporte[]>> => {
  const { data, error } = await supabaseAdmin
    .from("reporte")
    .select("*")
    .eq("usuario_id", usuarioId)
    .order("fecha_creacion", { ascending: false });

  if (error) {
    console.error("❌ reporte.obtenerMisReportes:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data: (data ?? []) as Reporte[] };
};

// ============================================
// OPERACIONES ADMIN
// ============================================

export interface FiltrosReporte extends Partial<PaginacionParams> {
  estado_id?: number;
}

/**
 * Listado paginado de todos los reportes para el panel de administración.
 * Permite filtrar opcionalmente por `estado_id`.
 */
export const obtenerReportesAdmin = async (
  adminId: UUID,
  filtros?: FiltrosReporte,
): Promise<Result<PaginatedResult<Reporte>>> => {
  if (!(await esAdmin(adminId))) {
    return { success: false, error: "No autorizado. Se requiere rol admin." };
  }

  const { page, limit } = normalizarPaginacion(filtros);
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabaseAdmin.from("reporte").select("*", { count: "exact" });

  if (filtros?.estado_id !== undefined) {
    query = query.eq("estado_id", filtros.estado_id);
  }

  const { data, error, count } = await query
    .order("fecha_creacion", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("❌ reporte.obtenerReportesAdmin:", error.message);
    return { success: false, error: error.message };
  }

  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return {
    success: true,
    data: {
      items: (data ?? []) as Reporte[],
      meta: { page, limit, total, totalPages },
    },
  };
};

/**
 * Actualiza el estado de un reporte y registra la respuesta del administrador.
 */
export const resolverReporteAdmin = async (
  adminId: UUID,
  reporteId: number,
  payload: ResolverReportePayload,
): Promise<Result<Reporte>> => {
  if (!(await esAdmin(adminId))) {
    return { success: false, error: "No autorizado. Se requiere rol admin." };
  }

  // Verificar que el estado_id exista en estado_reporte
  const { data: estadoExiste, error: estadoErr } = await supabaseAdmin
    .from("estado_reporte")
    .select("id")
    .eq("id", payload.estado_id)
    .single();

  if (estadoErr || !estadoExiste) {
    return { success: false, error: "El estado de reporte no es válido." };
  }

  const cambios: Record<string, unknown> = {
    estado_id: payload.estado_id,
    fecha_resolucion: new Date().toISOString() as Timestamp,
  };

  if (payload.respuesta_admin !== undefined) {
    cambios.respuesta_admin = payload.respuesta_admin;
  }

  const { data, error } = await supabaseAdmin
    .from("reporte")
    .update(cambios)
    .eq("id", reporteId)
    .select()
    .single();

  if (error || !data) {
    console.error("❌ reporte.resolverReporteAdmin:", error?.message);
    return {
      success: false,
      error: error?.message || "Reporte no encontrado.",
    };
  }

  return { success: true, data: data as Reporte };
};

/**
 * Elimina un reporte (solo administrador).
 */
export const eliminarReporteAdmin = async (
  adminId: UUID,
  reporteId: number,
): Promise<Result<null>> => {
  if (!(await esAdmin(adminId))) {
    return { success: false, error: "No autorizado. Se requiere rol admin." };
  }

  const { data, error } = await supabaseAdmin
    .from("reporte")
    .delete()
    .eq("id", reporteId)
    .select("id");

  if (error) {
    console.error("❌ reporte.eliminarReporteAdmin:", error.message);
    return { success: false, error: error.message };
  }

  if (!data || data.length === 0) {
    return { success: false, error: "Reporte no encontrado." };
  }

  return { success: true, data: null };
};
