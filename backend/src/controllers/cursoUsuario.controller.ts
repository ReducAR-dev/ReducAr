// src/controllers/cursoUsuario.controller.ts
import type { Request, Response } from "express";
import {
  obtenerCursosUsuario,
  adquirirCursoUsuario,
  eliminarCursoUsuario,
} from "../services/cursoUsuario.service.js";
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
// GET /api/curso-usuario — Requiere JWT
// ============================================

export const getMisCursosHandler = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  const usuarioId = requireUser(req, res);
  if (!usuarioId) return;

  const resultado = await obtenerCursosUsuario(usuarioId);

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
// POST /api/curso-usuario — Requiere JWT
// ============================================

export const postCursoUsuarioHandler = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  const usuarioId = requireUser(req, res);
  if (!usuarioId) return;

  const cursoId = Number(req.body?.curso_id);
  if (!Number.isInteger(cursoId) || cursoId <= 0) {
    res.status(400).json({ success: false, error: "ID de curso inválido." });
    return;
  }

  const resultado = await adquirirCursoUsuario(usuarioId, cursoId);

  if (!resultado.success) {
    const status = resultado.error.includes("no existe") ? 404 : 400;
    res.status(status).json({ success: false, error: resultado.error });
    return;
  }

  res.status(201).json({
    success: true,
    message: "Curso adquirido exitosamente.",
    data: resultado.data,
  });
};

// ============================================
// DELETE /api/curso-usuario/:id — Requiere JWT
// ============================================

export const deleteCursoUsuarioHandler = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  const usuarioId = requireUser(req, res);
  if (!usuarioId) return;

  const cursoId = getIdParam(req);
  if (!cursoId) {
    res.status(400).json({ success: false, error: "ID de curso inválido." });
    return;
  }

  const resultado = await eliminarCursoUsuario(usuarioId, cursoId);

  if (!resultado.success) {
    res.status(404).json({ success: false, error: resultado.error });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Curso eliminado de tu lista.",
  });
};
