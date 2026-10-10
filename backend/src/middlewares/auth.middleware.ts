// src/middlewares/auth.middleware.ts
import type { Response, NextFunction } from "express";
import { getUserFromToken } from "../services/auth.service.js";
import { supabaseAdmin } from "../config/supabase-admin.js";
import type { AuthenticatedRequest } from "../types/auth.types.js";

export const ROL_ADMIN = 1;

// ============================================
// requireAuth
// ============================================

/**
 * Valida el JWT, comprueba que la cuenta siga activa y adjunta
 * `req.user = { id, email }` a la petición.
 *
 * Si algo falla, corta la petición con el código adecuado.
 */
export const requireAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        error: "Token de acceso no proporcionado o con formato incorrecto.",
      });
      return;
    }

    const token = authHeader.slice("Bearer ".length).trim();
    if (!token) {
      res.status(401).json({
        success: false,
        error: "Token de acceso vacío.",
      });
      return;
    }

    const resultado = await getUserFromToken(token);
    if (!resultado.success) {
      res.status(401).json({
        success: false,
        error: "Token inválido o expirado.",
      });
      return;
    }

    // Verificar que la cuenta exista en nuestra tabla y siga activa.
    // Usamos supabaseAdmin para que RLS no oculte la fila por error.
    const { data: dbUser, error } = await supabaseAdmin
      .from("usuario")
      .select("esta_activo")
      .eq("id", resultado.data.id)
      .single();

    if (error || !dbUser) {
      res.status(403).json({
        success: false,
        error: "Usuario no registrado en el sistema.",
      });
      return;
    }

    if (!dbUser.esta_activo) {
      res.status(403).json({
        success: false,
        error: "La cuenta está desactivada. Contactá al equipo de ReducAR.",
      });
      return;
    }

    req.user = {
      id: resultado.data.id,
      email: resultado.data.email,
    };

    next();
  } catch (err) {
    const mensaje = err instanceof Error ? err.message : String(err);
    console.error("❌ requireAuth:", mensaje);
    res.status(500).json({
      success: false,
      error: "Error inesperado en la autenticación.",
    });
  }
};

// ============================================
// requireAdmin
// ============================================

/**
 * Exige que el usuario autenticado tenga rol admin (rolId === 1).
 *
 * ⚠️ DEBE usarse DESPUÉS de requireAuth. Si `req.user` no existe,
 *    algo está mal en el orden de los middlewares.
 */
export const requireAdmin = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ success: false, error: "No autenticado." });
    return;
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("usuario")
      .select("rolId")
      .eq("id", req.user.id)
      .single();

    if (error || !data || data.rolId !== ROL_ADMIN) {
      res.status(403).json({
        success: false,
        error: "Se requieren permisos de administrador.",
      });
      return;
    }

    next();
  } catch (err) {
    const mensaje = err instanceof Error ? err.message : String(err);
    console.error("❌ requireAdmin:", mensaje);
    res.status(500).json({
      success: false,
      error: "Error inesperado al verificar permisos.",
    });
  }
};