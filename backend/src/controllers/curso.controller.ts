// src/controllers/curso.controller.ts
import type { Request, Response } from "express";
import {
  obtenerCursosPublicos,
  obtenerCursoPorId,
  obtenerCursosAdmin,
  crearCurso,
  actualizarCurso,
  desactivarCurso,
  activarCurso,
} from "../services/curso.service.js";
import { supabaseAdmin } from "../config/supabase-admin.js";
import { listarCursosQuerySchema } from "../schema/curso.schema.js";
import type { CrearCursoPayload, ActualizarCursoPayload } from "../schema/curso.schema.js";
import type { AuthenticatedRequest } from "../types/auth.types.js";

// ============================================
// HELPERS DE SEGURIDAD
// ============================================

/**
 * Extrae req.user.id o corta con 401.
 */
const requireUser = (req: AuthenticatedRequest, res: Response): string | null => {
  if (!req.user) {
    res.status(401).json({ success: false, error: "No autenticado." });
    return null;
  }
  return req.user.id;
};

/**
 * Parsea y valida el ID de la URL para evitar inyecciones o NaN.
 */
const getIdParam = (req: Request): number | null => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  if (!raw) return null;
  const n = Number.parseInt(raw, 10);
  if (!Number.isInteger(n) || n <= 0) return null;
  return n;
};

const toFiltrosCurso = (query: ReturnType<typeof listarCursosQuerySchema.parse>) => ({
  page: query.page,
  limit: query.limit,
  solo_activos: query.solo_activos,
  ...(query.categoria_id !== undefined ? { categoria_id: query.categoria_id } : {}),
  ...(query.modalidad_id !== undefined ? { modalidad_id: query.modalidad_id } : {}),
  ...(query.nivel_id !== undefined ? { nivel_id: query.nivel_id } : {}),
  ...(query.busqueda !== undefined ? { busqueda: query.busqueda } : {}),
});

// ============================================
// RUTAS PÚBLICAS
// ============================================

export const getCursosPublicosHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  // Validamos los query params con Zod para que no inyecten basura
  const parsedQuery = listarCursosQuerySchema.safeParse(req.query);
  
  if (!parsedQuery.success) {
    res.status(400).json({ 
      success: false, 
      error: "Parámetros de búsqueda inválidos.",
      details: parsedQuery.error.issues 
    });
    return;
  }

  const resultado = await obtenerCursosPublicos(toFiltrosCurso(parsedQuery.data));

  if (!resultado.success) {
    res.status(500).json({ success: false, error: resultado.error });
    return;
  }

  res.status(200).json({
    success: true,
    data: resultado.data.items,
    meta: resultado.data.meta,
  });
};

export const getCursoDetalleHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const id = getIdParam(req);
  if (!id) {
    res.status(400).json({ success: false, error: "ID de curso inválido." });
    return;
  }

  const resultado = await obtenerCursoPorId(id);

  if (!resultado.success) {
    // El servicio devuelve error si no existe o si está inactivo. 
    // El front maneja este 404.
    res.status(404).json({ success: false, error: resultado.error });
    return;
  }

  res.status(200).json({ success: true, data: resultado.data });
};

// ============================================
// RUTAS ADMIN (Protegidas por JWT + Admin)
// ============================================

export const getCursosAdminHandler = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  const adminId = requireUser(req, res);
  if (!adminId) return;

  const parsedQuery = listarCursosQuerySchema.safeParse(req.query);
  if (!parsedQuery.success) {
    res.status(400).json({ success: false, error: "Parámetros inválidos." });
    return;
  }

  const resultado = await obtenerCursosAdmin(adminId, toFiltrosCurso(parsedQuery.data));

  if (!resultado.success) {
    const status = resultado.error.includes("No autorizado") ? 403 : 500;
    res.status(status).json({ success: false, error: resultado.error });
    return;
  }

  res.status(200).json({
    success: true,
    data: resultado.data.items,
    meta: resultado.data.meta,
  });
};

export const postCursoHandler = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  const adminId = requireUser(req, res);
  if (!adminId) return;

  // req.body ya fue validado y limpiado por el middleware validateBody(crearCursoSchema)
  const payload = req.body as CrearCursoPayload;

  const resultado = await crearCurso(adminId, payload);

  if (!resultado.success) {
    const status = resultado.error.includes("No autorizado") ? 403 : 400;
    res.status(status).json({ success: false, error: resultado.error });
    return;
  }

  res.status(201).json({
    success: true,
    message: "Curso creado exitosamente.",
    data: resultado.data,
  });
};

export const patchCursoHandler = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  const adminId = requireUser(req, res);
  if (!adminId) return;

  const id = getIdParam(req);
  if (!id) {
    res.status(400).json({ success: false, error: "ID inválido." });
    return;
  }

  const payload = req.body as ActualizarCursoPayload;

  const resultado = await actualizarCurso(adminId, id, payload);

  if (!resultado.success) {
    const status = resultado.error.includes("No autorizado") ? 403 : 400;
    res.status(status).json({ success: false, error: resultado.error });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Curso actualizado.",
    data: resultado.data,
  });
};

/**
 * Desactivar un curso (Soft Delete).
 * Valida primero si hay alumnos anotados, como pediste.
 */
export const deleteCursoHandler = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  const adminId = requireUser(req, res);
  if (!adminId) return;

  const id = getIdParam(req);
  if (!id) {
    res.status(400).json({ success: false, error: "ID inválido." });
    return;
  }

  // 🛡️ PROTECCIÓN EXTRA (Regla de negocio solicitada)
  // Verificamos si hay usuarios anotados antes de desactivar
  const { count, error: countError } = await supabaseAdmin
    .from("curso_usuario")
    .select("*", { count: "exact", head: true })
    .eq("curso_id", id);

  if (countError) {
    res.status(500).json({ success: false, error: "Error verificando alumnos." });
    return;
  }

  if (count && count > 0) {
    res.status(400).json({ 
      success: false, 
      error: "No se puede dar de baja el curso porque tiene alumnos anotados." 
    });
    return;
  }

  // Si pasa el escudo, llamamos al servicio (que verifica el admin de nuevo)
  const resultado = await desactivarCurso(adminId, id);

  if (!resultado.success) {
    const status = resultado.error.includes("No autorizado") ? 403 : 500;
    res.status(status).json({ success: false, error: resultado.error });
    return;
  }

  res.status(200).json({ success: true, message: "Curso desactivado correctamente." });
};

export const activarCursoHandler = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  const adminId = requireUser(req, res);
  if (!adminId) return;

  const id = getIdParam(req);
  if (!id) {
    res.status(400).json({ success: false, error: "ID inválido." });
    return;
  }

  const resultado = await activarCurso(adminId, id);

  if (!resultado.success) {
    const status = resultado.error.includes("No autorizado") ? 403 : 500;
    res.status(status).json({ success: false, error: resultado.error });
    return;
  }

  res.status(200).json({ success: true, message: "Curso activado correctamente." });
};