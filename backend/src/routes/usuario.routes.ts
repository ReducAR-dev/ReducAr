// src/routes/usuario.routes.ts
import { Router } from "express";

import {
  getMiPerfilHandler,
  updateMiPerfilHandler,
  deleteMiCuentaHandler,
  getPerfilAdminHandler,
  bloquearUsuarioAdminHandler,
  eliminarUsuarioAdminHandler,
} from "../controllers/user.controller.js";

import { requireAuth, requireAdmin } from "../middlewares/auth.middleware.js";
import { validateBody } from "../middlewares/validation.middleware.js";
import { actualizarPerfilSchema } from "../schema/usuario.schema.js";

const router = Router();

// ============================================
// Rutas del propio usuario (requieren JWT)
// ============================================
//
// NOTA: la identidad del usuario SIEMPRE viene de req.user.id.
// Nunca del body ni de los params. Eso lo garantiza requireAuth.

router.get("/yo", requireAuth, getMiPerfilHandler);
router.patch(
  "/yo",
  requireAuth,
  validateBody(actualizarPerfilSchema),
  updateMiPerfilHandler,
);
router.delete("/yo", requireAuth, deleteMiCuentaHandler);

// ============================================
// Rutas administrativas (requieren JWT + rol admin)
// ============================================
//
// El orden importa:
//   1. requireAuth  → valida el token y rellena req.user
//   2. requireAdmin → comprueba que req.user.id tenga rolId = 1
//
// Si se invierte, requireAdmin recibe req.user = undefined.

router.get(
  "/admin/:id",
  requireAuth,
  requireAdmin,
  getPerfilAdminHandler,
);

router.patch(
  "/admin/:id/bloquear",
  requireAuth,
  requireAdmin,
  bloquearUsuarioAdminHandler,
);

router.delete(
  "/admin/:id",
  requireAuth,
  requireAdmin,
  eliminarUsuarioAdminHandler,
);

export default router;