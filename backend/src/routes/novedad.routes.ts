// src/routes/novedad.routes.ts
import { Router } from "express";

import {
  getNovedadesPublicasHandler,
  getNovedadesAdminHandler,
  getNovedadPorIdHandler,
  postNovedadHandler,
  patchNovedadHandler,
  deleteNovedadHandler,
} from "../controllers/novedad.controller.js";

import { requireAuth, requireAdmin } from "../middlewares/auth.middleware.js";
import { validateBody } from "../middlewares/validation.middleware.js";
import {
  crearNovedadSchema,
  actualizarNovedadSchema,
} from "../schema/novedad.schema.js";

const router = Router();

// ============================================
// Público
// ============================================

router.get("/", getNovedadesPublicasHandler);

// ============================================
// Admin (antes de /:id para evitar colisión)
// ============================================
// El orden importa: si /:id viniera primero, /admin sería
// interpretado como un id="admin" y fallaría.

router.get("/admin", requireAuth, requireAdmin, getNovedadesAdminHandler);

// ============================================
// Crear / editar / eliminar (admin)
// ============================================

router.post(
  "/",
  requireAuth,
  requireAdmin,
  validateBody(crearNovedadSchema),
  postNovedadHandler,
);

router.patch(
  "/:id",
  requireAuth,
  requireAdmin,
  validateBody(actualizarNovedadSchema),
  patchNovedadHandler,
);

router.delete("/:id", requireAuth, requireAdmin, deleteNovedadHandler);

// ============================================
// Ver una específica (público)
// ============================================
// Va al final para no capturar "/admin" en el param :id.

router.get("/:id", getNovedadPorIdHandler);

export default router;