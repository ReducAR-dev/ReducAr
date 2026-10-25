import type { Request, Response } from "express";
import {
  obtenerCursosUsuario,
  adquirirCursoUsuario,
  eliminarCursoUsuario,
} from "../services/cursoUsuario.service.js";
import { listarCursosUsuarioQuerySchema } from "../schema/cursoUsuario.schema.js";
import type { AuthenticatedRequest } from "../types/auth.types.js";

const requireUser = (req: AuthenticatedRequest, res: Response): { id: string, token: string } | null => {
  if (!req.user || !req.accessToken) {
    res.status(401).json({ success: false, error: "No autenticado." });
    return null;
  }
  return { id: req.user.id, token: req.accessToken };
};

const getIdParam = (req: Request): number | null => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  if (!raw) return null;
  const n = Number.parseInt(raw, 10);
  if (!Number.isInteger(n) || n <= 0) return null;
  return n;
};

// ============================================
// GET /api/curso-usuario
// ============================================
export const getMisCursosHandler = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  const auth = requireUser(req, res);
  if (!auth) return;

  const parsedQuery = listarCursosUsuarioQuerySchema.safeParse(req.query);
  if (!parsedQuery.success) {
    res.status(400).json({ success: false, error: "Parámetros de paginación inválidos." });
    return;
  }

  // ✅ Pasamos el token de autenticación
  const resultado = await obtenerCursosUsuario(auth.id, auth.token, parsedQuery.data);

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
// POST /api/curso-usuario
// ============================================
export const postCursoUsuarioHandler = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  const auth = requireUser(req, res);
  if (!auth) return;

  const cursoId = req.body.curso_id; // Ya validado por Zod

  // ✅ Pasamos el token de autenticación
  const resultado = await adquirirCursoUsuario(auth.id, cursoId, auth.token);

  if (!resultado.success) {
    const status = resultado.error.includes("pago") ? 403 : 400;
    res.status(status).json({ success: false, error: resultado.error });
    return;
  }

  res.status(201).json({
    success: true,
    message: "Curso agregado a tu lista.",
    data: resultado.data,
  });
};

// ============================================
// DELETE /api/curso-usuario/:id
// ============================================
export const deleteCursoUsuarioHandler = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  const auth = requireUser(req, res);
  if (!auth) return;

  const cursoId = getIdParam(req);
  if (!cursoId) {
    res.status(400).json({ success: false, error: "ID de curso inválido." });
    return;
  }

  const resultado = await eliminarCursoUsuario(auth.id, cursoId, auth.token);

  if (!resultado.success) {
    // Si el error menciona "pago", es un 403. Si es "no está en tu lista", es 404.
    const status = resultado.error.includes("pago") ? 403 : 404;
    res.status(status).json({ success: false, error: resultado.error });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Curso eliminado de tu lista.",
  });
};