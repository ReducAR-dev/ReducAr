// src/services/curso.service.ts
import { supabase } from "../config/supabase.js";
import { supabaseAdmin } from "../config/supabase-admin.js";
import type { Curso } from "../models/curso.model.js";
import type { UUID, Timestamp } from "../models/common.types.js";
import type {
  Result,
  PaginacionParams,
  PaginatedResult,
} from "../types/common.types.js";
import type {
  CrearCursoPayload,
  ActualizarCursoPayload,
} from "../schema/curso.schema.js";
import type { CursoResumen, CursoDetalle } from "../types/curso.types.js";

const ROL_ADMIN = 1;

// ============================================
// HELPERS
// ============================================

/**
 * Verifica si un usuario es admin.
 * Usa supabaseAdmin para saltar RLS y leer el rol real.
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
 * Normaliza los parámetros de paginación.
 */
const normalizarPaginacion = (
  params?: Partial<PaginacionParams>,
): PaginacionParams => {
  const page = params?.page && params.page > 0 ? params.page : 1;
  const rawLimit = params?.limit && params.limit > 0 ? params.limit : 30;
  const limit = Math.min(rawLimit, 100); // Máximo 100
  return { page, limit };
};

/**
 * Escapa caracteres especiales para búsquedas con ILIKE.
 * Evita que el usuario inyecte '%' o '_' que rompan la búsqueda.
 */
const escapeIlike = (str: string) => str.replace(/[%_\\]/g, "\\$&");

/**
 * Transforma la respuesta plana de Supabase (con joins) al formato esperado.
 */
const mapearCurso = (dbCurso: any): CursoResumen => {
  return {
    id: dbCurso.id,
    titulo: dbCurso.titulo,
    institucion: dbCurso.nombre_propietario || "ReducAR",
    categoria: dbCurso.categoria?.nombre || "Sin categoría",
    descripcion_corta: dbCurso.descripcion_corta || "",
    modalidad: dbCurso.modalidad?.nombre || "No definida",
    precio: dbCurso.precio || 0,
    imagen_url: dbCurso.imagen_url || null,
  };
};

// ============================================
// LISTADO PÚBLICO (Paginado y con Filtros)
// ============================================

export interface FiltrosCurso {
  categoria_id?: number;
  modalidad_id?: number;
  nivel_id?: number;
  busqueda?: string;
  solo_activos?: boolean;
  page?: number;
  limit?: number;
}

export const obtenerCursosPublicos = async (
  filtros: FiltrosCurso,
): Promise<Result<PaginatedResult<CursoResumen>>> => {
  const { page, limit } = normalizarPaginacion(filtros);
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  // El join trae los nombres de las tablas auxiliares automáticamente.
  let query = supabase
    .from("curso")
    .select(
      "id, titulo, nombre_propietario, descripcion_corta, precio, categoria(nombre), modalidad(nombre)",
      { count: "exact" },
    )
    .eq("esta_activo", true);

  // Aplicar filtros dinámicos
  if (filtros.categoria_id) query = query.eq("categoria_id", filtros.categoria_id);
  if (filtros.modalidad_id) query = query.eq("modalidad_id", filtros.modalidad_id);
  if (filtros.nivel_id) query = query.eq("nivel_id", filtros.nivel_id);

  // Búsqueda por texto (Título)
  if (filtros.busqueda && filtros.busqueda.trim() !== "") {
    const safeSearch = escapeIlike(filtros.busqueda.trim());
    query = query.ilike("titulo", `%${safeSearch}%`);
  }

  // Ordenar y paginar
  const { data, error, count } = await query
    .order("fecha_publicacion", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("❌ curso.obtenerCursosPublicos:", error.message);
    return { success: false, error: error.message };
  }

  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return {
    success: true,
    data: {
      items: (data || []).map(mapearCurso),
      meta: { page, limit, total, totalPages },
    },
  };
};

// ============================================
// DETALLE PÚBLICO
// ============================================

export const obtenerCursoPorId = async (
  id: number,
): Promise<Result<CursoDetalle>> => {
  const { data, error } = await supabase
    .from("curso")
    .select(
      "*, categoria(nombre), modalidad(nombre), nivel(nombre), tipo_certificado(nombre)",
    )
    .eq("id", id)
    .eq("esta_activo", true)
    .single();

  // Si no existe o está inactivo, el controlador enviará el 404 al front.
  if (error || !data) {
    return { success: false, error: "Curso no encontrado o no disponible." };
  }

  // Mapeo manual al formato de detalle
  const detalle: CursoDetalle = {
    id: data.id,
    institucion: data.nombre_propietario || "ReducAR",
    categoria: data.categoria?.nombre || "Sin categoría",
    titulo: data.titulo,
    descripcion_larga: data.descripcion_larga || "",
    modalidad: data.modalidad?.nombre || "No definida",
    nivel: data.nivel?.nombre || "No definido",
    tipo_certificado: data.tipo_certificado?.nombre || "No definido",
    duracion_dias: data.duracion_dias || 0,
    precio: data.precio || 0,
    fecha_inicio: data.fecha_inicio || "",
    fecha_termino: data.fecha_termino || "",
    fecha_max_inscripcion: data.fecha_max_inscripcion || "",
    enlace_inscripcion: data.enlace_inscripcion || "",
    cupos_disponibles: data.cupos_disponibles || 0,
  };

  return { success: true, data: detalle };
};

// ============================================
// MÉTODOS ADMIN
// ============================================

export const obtenerCursosAdmin = async (
  adminId: UUID,
  filtros: FiltrosCurso, // Recibe la misma interfaz que el público
): Promise<Result<PaginatedResult<Curso>>> => {
  if (!(await esAdmin(adminId))) {
    return { success: false, error: "No autorizado. Se requiere rol admin." };
  }

  const { page, limit } = normalizarPaginacion(filtros);
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  // El admin ve TODO (no forzamos esta_activo = true como en el público)
  let query = supabaseAdmin
    .from("curso")
    .select("*", { count: "exact" });

  // Aplicar filtros dinámicos
  if (filtros.categoria_id) query = query.eq("categoria_id", filtros.categoria_id);
  if (filtros.modalidad_id) query = query.eq("modalidad_id", filtros.modalidad_id);
  if (filtros.nivel_id) query = query.eq("nivel_id", filtros.nivel_id);

  // Búsqueda por texto (Título)
  if (filtros.busqueda && filtros.busqueda.trim() !== "") {
    const safeSearch = escapeIlike(filtros.busqueda.trim());
    query = query.ilike("titulo", `%${safeSearch}%`);
  }

  // Opcional: Si en el front (admin) agregan un switch para ver solo activos,
  // Zod mandará solo_activos=true (por defecto). Si quieren ver todos, mandan false.
  if (filtros.solo_activos) {
    query = query.eq("esta_activo", true);
  }

  // Ordenar y paginar
  const { data, error, count } = await query
    .order("fecha_publicacion", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("❌ curso.obtenerCursosAdmin:", error.message);
    return { success: false, error: error.message };
  }

  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return {
    success: true,
    data: {
      items: (data || []) as Curso[],
      meta: { page, limit, total, totalPages },
    },
  };
};

export const crearCurso = async (
  adminId: UUID,
  payload: CrearCursoPayload,
): Promise<Result<Curso>> => {
  if (!(await esAdmin(adminId))) {
    return { success: false, error: "No autorizado. Se requiere rol admin." };
  }

  // 🛡️ VULNERABILIDADES Y REGLAS DE NEGOCIO
  if (payload.precio && payload.precio > 0 && !payload.enlace_inscripcion) {
    return { success: false, error: "Un curso pago requiere un enlace de inscripción." };
  }

  if (payload.fecha_inicio && payload.fecha_termino) {
    if (new Date(payload.fecha_termino) <= new Date(payload.fecha_inicio)) {
      return { success: false, error: "La fecha de término debe ser posterior a la de inicio." };
    }
  }

  const { data, error } = await supabaseAdmin
    .from("curso")
    .insert({
      ...payload,
      nombre_propietario: payload.nombre_propietario || "ReducAR", // Fallback
    })
    .select()
    .single();

  if (error) {
    console.error("❌ curso.crearCurso:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data: data as Curso };
};

export const actualizarCurso = async (
  adminId: UUID,
  id: number,
  payload: ActualizarCursoPayload,
): Promise<Result<Curso>> => {
  if (!(await esAdmin(adminId))) {
    return { success: false, error: "No autorizado. Se requiere rol admin." };
  }

  // Validación de precios/enlaces en actualización
  if (payload.precio && payload.precio > 0 && payload.enlace_inscripcion === null) {
    return { success: false, error: "No se puede quitar el enlace a un curso pago." };
  }

  const cambios: Record<string, unknown> = {
    fecha_actualizacion: new Date().toISOString() as Timestamp,
  };

  // Copia condicional de campos
  const camposPermitidos = [
    "titulo", "descripcion_corta", "descripcion_larga", "categoria_id",
    "modalidad_id", "nivel_id", "tipo_certificado_id", "duracion_dias",
    "precio", "fecha_inicio", "fecha_termino", "fecha_max_inscripcion",
    "enlace_inscripcion", "cupos_disponibles", "esta_activo", "imagen_url"
  ];

  for (const campo of camposPermitidos) {
    if (payload[campo as keyof ActualizarCursoPayload] !== undefined) {
      cambios[campo] = payload[campo as keyof ActualizarCursoPayload];
    }
  }

  const { data, error } = await supabaseAdmin
    .from("curso")
    .update(cambios)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("❌ curso.actualizarCurso:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data: data as Curso };
};

export const desactivarCurso = async (
  adminId: UUID,
  id: number,
): Promise<Result<null>> => {
  if (!(await esAdmin(adminId))) {
    return { success: false, error: "No autorizado. Se requiere rol admin." };
  }

  // Solo cambiamos el estado. El controlador se encarga de la regla de "alumnos".
  const { error } = await supabaseAdmin
    .from("curso")
    .update({
      esta_activo: false,
      fecha_actualizacion: new Date().toISOString() as Timestamp,
    })
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: null };
};

export const activarCurso = async (
  adminId: UUID,
  id: number,
): Promise<Result<null>> => {
  if (!(await esAdmin(adminId))) {
    return { success: false, error: "No autorizado. Se requiere rol admin." };
  }

  const { error } = await supabaseAdmin
    .from("curso")
    .update({
      esta_activo: true,
      fecha_actualizacion: new Date().toISOString() as Timestamp,
    })
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: null };
};