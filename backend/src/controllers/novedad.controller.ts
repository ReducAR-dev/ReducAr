// src/controllers/novedad.controller.ts
import type { Response, Request } from "express";
import {
  obtenerNovedadesPublicas,
  obtenerNovedadesAdmin,
  obtenerNovedadPorId,
  crearNovedad,
  actualizarNovedad,
  eliminarNovedad,
} from "../services/novedad.service.js";
import { listarNovedadesQuerySchema } from "../schema/novedad.schema.js";
import type {
  CrearNovedadPayload,
  ActualizarNovedadPayload,
  ListarNovedadesQuery,
} from "../schema/novedad.schema.js";
import type { AuthenticatedRequest } from "../types/auth.types.js";

// ============================================
// HELPERS
// ============================================

/**
 * Extrae `req.user.id` o corta con 401.
 * Idéntico al helper de `usuario.controller.ts`.
 */
const requireUser = (
  req: AuthenticatedRequest,
  res: Response,
): string | null => {
  if (!req.user) {
    res.status(401).json({ success: false, error: "No autenticado." });
    return null;
  }
  return req.user.id;
};

/**
 * Parsea y valida el `:id` de la ruta.
 * Devuelve null si no es un entero positivo.
 */
const getIdParam = (req: Request): number | null => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  if (!raw) return null;
  const n = Number.parseInt(raw, 10);
  if (!Number.isInteger(n) || n <= 0) return null;
  return n;
};

/**
 * Normaliza los query params de paginación con el schema Zod.
 * Si fallan, cae a los defaults (page=1, limit=30).
 */
const parsePagination = (query: unknown): ListarNovedadesQuery => {
  const parsed = listarNovedadesQuerySchema.safeParse(query);
  return parsed.success ? parsed.data : { page: 1, limit: 30 };
};

// ============================================
// GET /api/novedades — Público
// ============================================

export const getNovedadesPublicasHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { page, limit } = parsePagination(req.query);

  const resultado = await obtenerNovedadesPublicas({ page, limit });

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

// ============================================
// GET /api/novedades/admin — Requiere JWT + admin
// ============================================

export const getNovedadesAdminHandler = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  const adminId = requireUser(req, res);
  if (!adminId) return;

  const { page, limit } = parsePagination(req.query);

  const resultado = await obtenerNovedadesAdmin(adminId, { page, limit });

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

// ============================================
// GET /api/novedades/:id — Público
// ============================================

export const getNovedadPorIdHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const id = getIdParam(req);
  if (!id) {
    res.status(400).json({ success: false, error: "ID inválido." });
    return;
  }

  const resultado = await obtenerNovedadPorId(id);

  if (!resultado.success) {
    res.status(404).json({ success: false, error: resultado.error });
    return;
  }

  res.status(200).json({ success: true, data: resultado.data });
};

// ============================================
// POST /api/novedades — Requiere JWT + admin
// ============================================

export const postNovedadHandler = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  const adminId = requireUser(req, res);
  if (!adminId) return;

  const payload = req.body as CrearNovedadPayload;
  const resultado = await crearNovedad(adminId, payload);

  if (!resultado.success) {
    const status = resultado.error.includes("No autorizado") ? 403 : 400;
    res.status(status).json({ success: false, error: resultado.error });
    return;
  }

  res.status(201).json({
    success: true,
    message: "Novedad creada.",
    data: resultado.data,
  });
};

// ============================================
// PATCH /api/novedades/:id — Requiere JWT + admin
// ============================================

export const patchNovedadHandler = async (
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

  const payload = req.body as ActualizarNovedadPayload;
  const resultado = await actualizarNovedad(adminId, id, payload);

  if (!resultado.success) {
    const status = resultado.error.includes("No autorizado") ? 403 : 400;
    res.status(status).json({ success: false, error: resultado.error });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Novedad actualizada.",
    data: resultado.data,
  });
};

// ============================================
// DELETE /api/novedades/:id — Requiere JWT + admin
// ============================================

export const deleteNovedadHandler = async (
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

  const resultado = await eliminarNovedad(adminId, id);

  if (!resultado.success) {
    const status = resultado.error.includes("No autorizado") ? 403 : 400;
    res.status(status).json({ success: false, error: resultado.error });
    return;
  }

  res.status(200).json({ success: true, message: "Novedad eliminada." });
};