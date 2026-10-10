// src/controllers/usuarios.controller.ts
import type { Response } from "express";
import {
  obtenerPerfilPropio,
  actualizarPerfilPropio,
  bloquearCuentaPropia,
  obtenerPerfilAdmin,
  bloquearCuentaAdmin,
  eliminarCuentaAdmin,
} from "../services/user.service.js";
import type { AuthenticatedRequest } from "../types/auth.types.js";
import type { ActualizarPerfilPayload } from "../types/usuario.types.js";

// ============================================
// HELPERS
// ============================================

/**
 * Extrae y normaliza el `id` de los params.
 * Si viene un array (raro en Express), toma el primero.
 */
const getParamId = (req: AuthenticatedRequest): string | null => {
  const { id } = req.params;
  if (Array.isArray(id)) return id[0] ?? null;
  return id ?? null;
};

/**
 * Verifica que la petición tenga identidad.
 * El middleware ya lo hace, pero el controlador no debe asumirlo.
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

// ============================================
// GET /usuarios/yo — Requiere JWT
// ============================================

export const getMiPerfilHandler = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  const usuarioId = requireUser(req, res);
  if (!usuarioId) return;

  const resultado = await obtenerPerfilPropio(usuarioId);

  if (!resultado.success) {
    res.status(404).json({ success: false, error: resultado.error });
    return;
  }

  res.status(200).json({ success: true, data: resultado.data });
};

// ============================================
// PATCH /usuarios/yo — Requiere JWT
// ============================================

/**
 * Actualiza el perfil del usuario autenticado.
 *
 * REGLA: solo se aceptan los campos de `ActualizarPerfilPayload`.
 * Cualquier intento de enviar `rolId` o `esta_activo` se ignora
 * silenciosamente, porque el payload del servicio no los acepta.
 */
export const updateMiPerfilHandler = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  const usuarioId = requireUser(req, res);
  if (!usuarioId) return;

  const body = req.body ?? {};

  // Whitelist explícita: solo estos campos se pasan al servicio.
  // Aunque el cliente envíe `rolId`, `esta_activo` u otros, se descartan.
  const payload: ActualizarPerfilPayload = {};
  if (typeof body.nombre === "string") payload.nombre = body.nombre.trim();
  if (body.apellido !== undefined) payload.apellido = body.apellido;
  if (body.fecha_nacimiento !== undefined) payload.fecha_nacimiento = body.fecha_nacimiento;
  if (body.fotoPerfil !== undefined) payload.fotoPerfil = body.fotoPerfil;
  if (body.biografia !== undefined) payload.biografia = body.biografia;
  if (body.ubicacion !== undefined) payload.ubicacion = body.ubicacion;
  if (body.user_preferencia !== undefined) payload.user_preferencia = body.user_preferencia;

  if (Object.keys(payload).length === 0) {
    res.status(400).json({ success: false, error: "No hay campos válidos para actualizar." });
    return;
  }

  const resultado = await actualizarPerfilPropio(usuarioId, payload);

  if (!resultado.success) {
    res.status(400).json({ success: false, error: resultado.error });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Perfil actualizado.",
    data: resultado.data,
  });
};

// ============================================
// DELETE /usuarios/yo — Requiere JWT
// ============================================

/**
 * Soft delete: el propio usuario "elimina" su cuenta.
 * En realidad solo se marca `esta_activo = false`.
 */
export const deleteMiCuentaHandler = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  const usuarioId = requireUser(req, res);
  if (!usuarioId) return;

  const resultado = await bloquearCuentaPropia(usuarioId);

  if (!resultado.success) {
    res.status(500).json({ success: false, error: resultado.error });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Tu cuenta fue desactivada. Contactá al equipo si querés reactivarla.",
  });
};

// ============================================
// GET /admin/usuarios/:id — Requiere JWT + admin
// ============================================

/**
 * Consulta el perfil de CUALQUIER usuario.
 * Doble verificación: el servicio comprueba que req.user.id sea admin.
 */
export const getPerfilAdminHandler = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  const adminId = requireUser(req, res);
  if (!adminId) return;

  const objetivoId = getParamId(req);
  if (!objetivoId) {
    res.status(400).json({ success: false, error: "El ID del usuario es obligatorio." });
    return;
  }

  const resultado = await obtenerPerfilAdmin(adminId, objetivoId);

  if (!resultado.success) {
    // 403 si fue rechazado por no ser admin, 404 si no existe.
    const status = resultado.error.includes("No autorizado") ? 403 : 404;
    res.status(status).json({ success: false, error: resultado.error });
    return;
  }

  res.status(200).json({ success: true, data: resultado.data });
};

// ============================================
// PATCH /admin/usuarios/:id/bloquear — Requiere JWT + admin
// ============================================

export const bloquearUsuarioAdminHandler = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  const adminId = requireUser(req, res);
  if (!adminId) return;

  const objetivoId = getParamId(req);
  if (!objetivoId) {
    res.status(400).json({ success: false, error: "El ID del usuario es obligatorio." });
    return;
  }

  const resultado = await bloquearCuentaAdmin(adminId, objetivoId);

  if (!resultado.success) {
    const status = resultado.error.includes("No autorizado") ? 403 : 400;
    res.status(status).json({ success: false, error: resultado.error });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Usuario desactivado.",
  });
};

// ============================================
// DELETE /admin/usuarios/:id — Requiere JWT + admin
// ============================================

/**
 * Hard delete: elimina definitivamente al usuario de Auth
 * y, en cascada, de `public.usuario`.
 */
export const eliminarUsuarioAdminHandler = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  const adminId = requireUser(req, res);
  if (!adminId) return;

  const objetivoId = getParamId(req);
  if (!objetivoId) {
    res.status(400).json({ success: false, error: "El ID del usuario es obligatorio." });
    return;
  }

  const resultado = await eliminarCuentaAdmin(adminId, objetivoId);

  if (!resultado.success) {
    const status = resultado.error.includes("No autorizado") ? 403 : 400;
    res.status(status).json({ success: false, error: resultado.error });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Usuario eliminado definitivamente.",
  });
};