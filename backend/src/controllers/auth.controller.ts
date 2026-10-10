// src/controllers/auth.controller.ts
import type { Request, Response } from "express";
import {
  signUp,
  signIn,
  signOut,
  getUserFromToken,
} from "../services/auth.service.js";
import type { AuthenticatedRequest } from "../types/auth.types.js";

// ============================================
// POST /auth/signup — Público
// ============================================

export const signUpHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { email, password, nombre, apellido, fecha_nacimiento } = req.body ?? {};

  // Validación básica de entrada
  if (typeof email !== "string" || !email.trim()) {
    res.status(400).json({ success: false, error: "El email es obligatorio." });
    return;
  }
  if (typeof password !== "string" || password.length < 6) {
    res.status(400).json({
      success: false,
      error: "La contraseña es obligatoria y debe tener al menos 6 caracteres.",
    });
    return;
  }
  if (typeof nombre !== "string" || !nombre.trim()) {
    res.status(400).json({ success: false, error: "El nombre es obligatorio." });
    return;
  }

  const resultado = await signUp({
    email: email.trim().toLowerCase(),
    password,
    metadata: {
      nombre: nombre.trim(),
      ...(apellido ? { apellido: String(apellido).trim() } : {}),
      ...(fecha_nacimiento ? { fecha_nacimiento: String(fecha_nacimiento) } : {}),
    },
  });

  if (!resultado.success) {
    res.status(400).json({ success: false, error: resultado.error });
    return;
  }

  res.status(201).json({
    success: true,
    message: "Usuario registrado exitosamente.",
    data: resultado.data,
  });
};

// ============================================
// POST /auth/login — Público
// ============================================

export const signInHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { email, password } = req.body ?? {};

  if (typeof email !== "string" || !email.trim()) {
    res.status(400).json({ success: false, error: "El email es obligatorio." });
    return;
  }
  if (typeof password !== "string" || !password) {
    res.status(400).json({ success: false, error: "La contraseña es obligatoria." });
    return;
  }

  const resultado = await signIn({
    email: email.trim().toLowerCase(),
    password,
  });

  if (!resultado.success) {
    // 401 porque el fallo es de credenciales, no de datos mal formados.
    res.status(401).json({ success: false, error: resultado.error });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Inicio de sesión exitoso.",
    data: resultado.data,
  });
};

// ============================================
// POST /auth/logout — Requiere JWT
// ============================================

export const signOutHandler = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  // El middleware ya validó el JWT y rellenó req.user
  if (!req.user) {
    res.status(401).json({ success: false, error: "No autenticado." });
    return;
  }

  const resultado = await signOut("");

  if (!resultado.success) {
    res.status(500).json({ success: false, error: resultado.error });
    return;
  }

  res.status(200).json({ success: true, message: "Sesión cerrada correctamente." });
};

// ============================================
// GET /auth/me — Requiere JWT
// ============================================

/**
 * Devuelve la identidad del usuario a partir del JWT.
 * Útil para que el frontend sepa si su token sigue siendo válido.
 */
export const meHandler = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ success: false, error: "No autenticado." });
    return;
  }

  res.status(200).json({
    success: true,
    data: req.user,
  });
};