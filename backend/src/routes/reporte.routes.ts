// src/routes/reporte.routes.ts
import { Router } from "express";
import {
  postReporteHandler,
  getMisReportesHandler,
  getReportesAdminHandler,
  patchResolverReporteHandler,
  deleteReporteHandler,
} from "../controllers/reporte.controller.js";
import { requireAuth, requireAdmin } from "../middlewares/auth.middleware.js";
import { validateBody } from "../middlewares/validation.middleware.js";
import {
  crearReporteSchema,
  resolverReporteSchema,
} from "../schema/reporte.schema.js";

const router = Router();

// ============================================
// RUTAS DE USUARIO (Requieren JWT)
// ============================================

// Consultar los reportes enviados por el propio usuario
router.get("/mios", requireAuth, getMisReportesHandler);

// Crear un nuevo reporte (validado con Zod)
router.post(
  "/",
  requireAuth,
  validateBody(crearReporteSchema),
  postReporteHandler,
);

// ============================================
// RUTAS DE ADMINISTRADOR (Requieren JWT + Admin)
// ============================================

// Listar todos los reportes (con paginación y filtro por estado_id)
router.get("/admin", requireAuth, requireAdmin, getReportesAdminHandler);

// Resolver o cambiar estado de un reporte
router.patch(
  "/:id",
  requireAuth,
  requireAdmin,
  validateBody(resolverReporteSchema),
  patchResolverReporteHandler,
);

// Eliminar un reporte
router.delete("/:id", requireAuth, requireAdmin, deleteReporteHandler);

export default router;
