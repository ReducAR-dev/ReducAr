// src/controllers/favorito.controller.ts
import type { Request, Response } from "express";
import {
  obtenerFavoritosUsuario,
  agregarFavorito,
  eliminarFavorito,
} from "../services/favorito.service.js";
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
// GET /api/favoritos — Requiere JWT
// ============================================

export const getMisFavoritosHandler = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  const usuarioId = requireUser(req, res);
  if (!usuarioId) return;

  const resultado = await obtenerFavoritosUsuario(usuarioId);

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
// POST /api/favoritos — Requiere JWT
// ============================================

export const postFavoritoHandler = async (
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

  const resultado = await agregarFavorito(usuarioId, cursoId);

  if (!resultado.success) {
    const status = resultado.error.includes("no existe") ? 404 : 400;
    res.status(status).json({ success: false, error: resultado.error });
    return;
  }

  res.status(201).json({
    success: true,
    message: "Curso añadido a favoritos.",
    data: resultado.data,
  });
};

// ============================================
// DELETE /api/favoritos/:id — Requiere JWT
// ============================================

export const deleteFavoritoHandler = async (
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

  const resultado = await eliminarFavorito(usuarioId, cursoId);

  if (!resultado.success) {
    res.status(404).json({ success: false, error: resultado.error });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Curso eliminado de favoritos.",
  });
};
