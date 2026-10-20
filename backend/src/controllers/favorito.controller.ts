// src/controllers/favorito.controller.ts
import type { Request, Response } from "express";
import {
  obtenerFavoritosUsuario,
  agregarFavorito,
  eliminarFavorito,
} from "../services/favorito.service.js";
import type { AuthenticatedRequest } from "../types/auth.types.js";

// ============================================
// HELPERS DE SEGURIDAD Y VALIDACIÓN
// ============================================

/**
 * Extrae `req.user.id` o corta con 401.
 * Garantiza que la consulta siempre se filtre por el usuario autenticado.
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
 * Parsea y valida un entero positivo (para ID de curso en body o params).
 */
const parsePositiveInt = (val: unknown): number | null => {
  if (typeof val === "number") {
    return Number.isInteger(val) && val > 0 ? val : null;
  }
  if (typeof val === "string" && val.trim() !== "") {
    const n = Number.parseInt(val, 10);
    return Number.isInteger(n) && n > 0 ? n : null;
  }
  return null;
};

/**
 * Extrae el `:cursoId` (o `:id`) de los parámetros de la URL.
 */
const getCursoIdParam = (req: Request): number | null => {
  const raw = req.params.cursoId ?? req.params.id;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return parsePositiveInt(value);
};

// ============================================
// GET /api/favoritos — Requiere JWT
// ============================================

/**
 * Obtiene la lista de cursos favoritos del propio usuario autenticado.
 */
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

/**
 * Añade un curso existente a la lista de favoritos del usuario.
 * Espera `{ curso_id: number }` en el body.
 */
export const postFavoritoHandler = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  const usuarioId = requireUser(req, res);
  if (!usuarioId) return;

  const body = req.body ?? {};
  const cursoId = parsePositiveInt(body.curso_id ?? body.cursoId);

  if (!cursoId) {
    res.status(400).json({
      success: false,
      error: "Se requiere un 'curso_id' válido (entero positivo).",
    });
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
// DELETE /api/favoritos/:cursoId — Requiere JWT
// ============================================

/**
 * Quita un curso de la lista de favoritos del usuario autenticado.
 */
export const deleteFavoritoHandler = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  const usuarioId = requireUser(req, res);
  if (!usuarioId) return;

  const cursoId = getCursoIdParam(req);
  if (!cursoId) {
    res.status(400).json({
      success: false,
      error: "ID de curso inválido.",
    });
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
