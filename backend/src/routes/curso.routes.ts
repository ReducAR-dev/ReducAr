// src/routes/curso.routes.ts
import { Router } from "express";

import {
  getCursosPublicosHandler,
  getCursoDetalleHandler,
  getCursosAdminHandler,
  postCursoHandler,
  patchCursoHandler,
  deleteCursoHandler,
  activarCursoHandler,
} from "../controllers/curso.controller.js";

import { requireAuth, requireAdmin } from "../middlewares/auth.middleware.js";
import { validateBody } from "../middlewares/validation.middleware.js";
import { crearCursoSchema, actualizarCursoSchema } from "../schema/curso.schema.js";

const router = Router();

// ============================================
// RUTAS PÚBLICAS (Cualquiera puede ver)
// ============================================

// Listado de cursos (con paginación y filtros en los query params)
router.get("/", getCursosPublicosHandler);

// ============================================
// RUTAS DE ADMINISTRADOR (Requieren JWT + Rol Admin)
// ============================================
// IMPORTANTE: Esta ruta debe ir ANTES de "/:id" para evitar que
// Express confunda "admin" con un ID de curso.

// Listado completo para el panel de admin (incluye inactivos)
router.get("/admin", requireAuth, requireAdmin, getCursosAdminHandler);

// Crear un nuevo curso
router.post(
  "/",
  requireAuth,
  requireAdmin,
  validateBody(crearCursoSchema),
  postCursoHandler
);

// Actualizar un curso existente
router.patch(
  "/:id",
  requireAuth,
  requireAdmin,
  validateBody(actualizarCursoSchema),
  patchCursoHandler
);

// Desactivar un curso (Soft Delete, valida que no haya alumnos)
router.delete("/:id", requireAuth, requireAdmin, deleteCursoHandler);

// Reactivar un curso desactivado
router.patch("/:id/activar", requireAuth, requireAdmin, activarCursoHandler);

// ============================================
// RUTA DE DETALLE PÚBLICO (Va al final)
// ============================================

// Ver el detalle de un curso específico por su ID
router.get("/:id", getCursoDetalleHandler);

export default router;