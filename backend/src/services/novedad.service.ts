// src/services/novedad.service.ts
import { supabase } from "../config/supabase.js";
import { supabaseAdmin } from "../config/supabase-admin.js";
import type { Novedad } from "../models/novedad.model.js";
import type { UUID, Timestamp } from "../models/common.types.js";
import type {
    Result,
    PaginatedResult,
    PaginacionParams,
} from "../types/common.types.js";
import type {
    CrearNovedadPayload,
    ActualizarNovedadPayload,
} from "../schema/novedad.schema.js";

const ROL_ADMIN = 1;
const DIAS_MINIMOS_PARA_ELIMINAR = 30;

// ============================================
// HELPERS
// ============================================

/**
 * Verifica si un usuario es admin.
 *
 * ⚠️ Se usa `supabaseAdmin` para leer sin que RLS interfiera.
 *
 * Nota: esta lógica se repite en `usuarios.service.ts`. Cuando se
 * pueda, conviene extraerla a `src/services/_shared/roles.service.ts`
 * y reutilizarla en ambos lugares. Queda como deuda técnica.
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
 * Cuenta los días transcurridos desde una fecha ISO hasta hoy.
 * Positivo si la fecha ya pasó, negativo si aún no llegó.
 */
const diasDesde = (fechaISO: string): number => {
    const MS_POR_DIA = 1000 * 60 * 60 * 24;
    const evento = new Date(fechaISO + "T00:00:00Z").getTime();
    const hoy = new Date().setUTCHours(0, 0, 0, 0);
    return Math.floor((hoy - evento) / MS_POR_DIA);
};

/**
 * Aplica defaults y límites a los parámetros de paginación.
 * Default: page=1, limit=30. Máximo: limit=100.
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
// LISTADO PÚBLICO
// ============================================

/**
 * Devuelve las novedades activas cuya `fecha_evento` sea hoy o futura.
 * Paginado (default 30 por página, máximo 100).
 */
export const obtenerNovedadesPublicas = async (
    params?: Partial<PaginacionParams>,
): Promise<Result<PaginatedResult<Novedad>>> => {
    const { page, limit } = normalizarPaginacion(params);
    const hoy = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabase
        .from("novedad")
        .select("*", { count: "exact" })
        .eq("esta_activa", true)
        .gte("fecha_evento", hoy)
        .order("fecha_evento", { ascending: true })
        .range(from, to);

    if (error) {
        console.error("❌ novedad.obtenerNovedadesPublicas:", error.message);
        return { success: false, error: error.message };
    }

    const total = count ?? 0;
    const totalPages = Math.max(1, Math.ceil(total / limit));

    return {
        success: true,
        data: {
            items: (data ?? []) as Novedad[],
            meta: { page, limit, total, totalPages },
        },
    };
};

// ============================================
// LISTADO ADMIN
// ============================================

/**
 * Listado completo para admins (incluye inactivas y pasadas).
 * También paginado.
 */
export const obtenerNovedadesAdmin = async (
    adminId: UUID,
    params?: Partial<PaginacionParams>,
): Promise<Result<PaginatedResult<Novedad>>> => {
    if (!(await esAdmin(adminId))) {
        return { success: false, error: "No autorizado. Se requiere rol admin." };
    }

    const { page, limit } = normalizarPaginacion(params);
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabaseAdmin
        .from("novedad")
        .select("*", { count: "exact" })
        .order("fecha_evento", { ascending: false })
        .range(from, to);

    if (error) {
        console.error("❌ novedad.obtenerNovedadesAdmin:", error.message);
        return { success: false, error: error.message };
    }

    const total = count ?? 0;
    const totalPages = Math.max(1, Math.ceil(total / limit));

    return {
        success: true,
        data: {
            items: (data ?? []) as Novedad[],
            meta: { page, limit, total, totalPages },
        },
    };
};

// ============================================
// OBTENER UNA POR ID
// ============================================

export const obtenerNovedadPorId = async (
    id: number,
): Promise<Result<Novedad>> => {
    const { data, error } = await supabase
        .from("novedad")
        .select("*")
        .eq("id", id)
        .single();

    if (error || !data) {
        return { success: false, error: "Novedad no encontrada." };
    }
    return { success: true, data: data as Novedad };
};

// ============================================
// CREAR (admin)
// ============================================

export const crearNovedad = async (
    adminId: UUID,
    payload: CrearNovedadPayload,
): Promise<Result<Novedad>> => {
    if (!(await esAdmin(adminId))) {
        return { success: false, error: "No autorizado. Se requiere rol admin." };
    }

    const { data, error } = await supabaseAdmin
        .from("novedad")
        .insert({
            titulo: payload.titulo,
            descripcion_corta: payload.descripcion_corta ?? null,
            descripcion_larga: payload.descripcion_larga ?? null,
            fecha_evento: payload.fecha_evento,
            modalidad_id: payload.modalidad_id ?? null,
            ubicacion: payload.ubicacion ?? null,
            imagen_url: payload.imagen_url ?? null,
            enlace: payload.enlace ?? null,
            ...(payload.esta_activa !== undefined
                ? { esta_activa: payload.esta_activa }
                : {}),
        })
        .select()
        .single();

    if (error) {
        console.error("❌ novedad.crearNovedad:", error.message);
        return { success: false, error: error.message };
    }

    return { success: true, data: data as Novedad };
};

// ============================================
// ACTUALIZAR (admin)
// ============================================

export const actualizarNovedad = async (
    adminId: UUID,
    id: number,
    payload: ActualizarNovedadPayload,
): Promise<Result<Novedad>> => {
    if (!(await esAdmin(adminId))) {
        return { success: false, error: "No autorizado. Se requiere rol admin." };
    }

    // Armamos el update solo con los campos presentes.
    // Usamos spread condicional por `exactOptionalPropertyTypes`.
    const cambios: Record<string, unknown> = {
        fecha_actualizacion: new Date().toISOString() as Timestamp,
    };
    if (payload.titulo !== undefined) cambios.titulo = payload.titulo;
    if (payload.descripcion_corta !== undefined)
        cambios.descripcion_corta = payload.descripcion_corta;
    if (payload.descripcion_larga !== undefined)
        cambios.descripcion_larga = payload.descripcion_larga;
    if (payload.fecha_evento !== undefined)
        cambios.fecha_evento = payload.fecha_evento;
    if (payload.modalidad_id !== undefined)
        cambios.modalidad_id = payload.modalidad_id;
    if (payload.ubicacion !== undefined) cambios.ubicacion = payload.ubicacion;
    if (payload.imagen_url !== undefined) cambios.imagen_url = payload.imagen_url;
    if (payload.enlace !== undefined) cambios.enlace = payload.enlace;
    if (payload.esta_activa !== undefined)
        cambios.esta_activa = payload.esta_activa;

    const { data, error } = await supabaseAdmin
        .from("novedad")
        .update(cambios)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        console.error("❌ novedad.actualizarNovedad:", error.message);
        return { success: false, error: error.message };
    }

    return { success: true, data: data as Novedad };
};

// ============================================
// ELIMINAR (admin, con regla de 30 días)
// ============================================

/**
 * Elimina una novedad SOLO si su `fecha_evento` es de al menos 31 días atrás.
 * Regla: sólo desde el día 31 posterior al evento se puede borrar.
 *
 * Flujo:
 *   1. Verificar que quien llama sea admin.
 *   2. Obtener la novedad.
 *   3. Calcular `diasDesde(fecha_evento)`.
 *      - Si <= 30 → error (aún no se puede borrar).
 *      - Si > 30  → borrar.
 */
export const eliminarNovedad = async (
    adminId: UUID,
    id: number,
): Promise<Result<null>> => {
    if (!(await esAdmin(adminId))) {
        return { success: false, error: "No autorizado. Se requiere rol admin." };
    }

    const { data: novedad, error: fetchError } = await supabaseAdmin
        .from("novedad")
        .select("id, fecha_evento")
        .eq("id", id)
        .single();

    if (fetchError || !novedad) {
        return { success: false, error: "Novedad no encontrada." };
    }

    const dias = diasDesde(novedad.fecha_evento as string);

    if (dias <= DIAS_MINIMOS_PARA_ELIMINAR) {
        return {
            success: false,
            error:
                `No se puede eliminar: la novedad debe tener más de ${DIAS_MINIMOS_PARA_ELIMINAR} días ` +
                `desde su fecha de evento. Hoy lleva ${dias} día(s).`,
        };
    }

    const { error } = await supabaseAdmin.from("novedad").delete().eq("id", id);

    if (error) {
        console.error("❌ novedad.eliminarNovedad:", error.message);
        return { success: false, error: error.message };
    }

    return { success: true, data: null };
};