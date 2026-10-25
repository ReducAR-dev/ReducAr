// src/controllers/reporte.controller.ts
import type { Request, Response } from "express";
import {
  crearReporte,
  obtenerMisReportes,
  obtenerReportesAdmin,
  resolverReporteAdmin,
  eliminarReporteAdmin,
} from "../services/reporte.service.js";
import { listarReportesQuerySchema } from "../schema/reporte.schema.js";
import type {
  CrearReportePayload,
  ResolverReportePayload,
} from "../schema/reporte.schema.js";
import type { AuthenticatedRequest } from "../types/auth.types.js";

// ============================================
// HELPERS
// ============================================

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

const getIdParam = (req: Request): number | null => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  if (!raw) return null;
  const n = Number.parseInt(raw, 10);
  if (!Number.isInteger(n) || n <= 0) return null;
  return n;
};

// ============================================
// RUTAS DE USUARIO (Requieren JWT)
// ============================================

export const postReporteHandler = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  const usuarioId = requireUser(req, res);
  if (!usuarioId) return;

  const payload = req.body as CrearReportePayload;
  const resultado = await crearReporte(usuarioId, payload);

  if (!resultado.success) {
    const status = resultado.error.includes("no existe") ? 404 : 400;
    res.status(status).json({ success: false, error: resultado.error });
    return;
  }

  res.status(201).json({
    success: true,
    message: "Reporte enviado correctamente.",
    data: resultado.data,
  });
};

export const getMisReportesHandler = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  const usuarioId = requireUser(req, res);
  if (!usuarioId) return;

  const resultado = await obtenerMisReportes(usuarioId);

  if (!resultado.success) {
    res.status(500).json({ success: false, error: resultado.error });
    return;
  }

  res.status(200).json({
    success: true,
    data: resultado.data,
  });
};

// ============================================
// RUTAS DE ADMINISTRADOR (Requieren JWT + Admin)
// ============================================

export const getReportesAdminHandler = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  const adminId = requireUser(req, res);
  if (!adminId) return;

  const parsedQuery = listarReportesQuerySchema.safeParse(req.query);
  if (!parsedQuery.success) {
    res.status(400).json({
      success: false,
      error: "Parámetros de consulta inválidos.",
    });
    return;
  }

  const { page, limit, estado_id } = parsedQuery.data;
  const resultado = await obtenerReportesAdmin(adminId, {
    page,
    limit,
    ...(estado_id !== undefined ? { estado_id } : {}),
  });

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

export const patchResolverReporteHandler = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  const adminId = requireUser(req, res);
  if (!adminId) return;

  const id = getIdParam(req);
  if (!id) {
    res.status(400).json({ success: false, error: "ID de reporte inválido." });
    return;
  }

  const payload = req.body as ResolverReportePayload;
  const resultado = await resolverReporteAdmin(adminId, id, payload);

  if (!resultado.success) {
    const status = resultado.error.includes("No autorizado") ? 403 : 400;
    res.status(status).json({ success: false, error: resultado.error });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Reporte actualizado correctamente.",
    data: resultado.data,
  });
};

export const deleteReporteHandler = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  const adminId = requireUser(req, res);
  if (!adminId) return;

  const id = getIdParam(req);
  if (!id) {
    res.status(400).json({ success: false, error: "ID de reporte inválido." });
    return;
  }

  const resultado = await eliminarReporteAdmin(adminId, id);

  if (!resultado.success) {
    const status = resultado.error.includes("No autorizado") ? 403 : 404;
    res.status(status).json({ success: false, error: resultado.error });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Reporte eliminado correctamente.",
  });
};
