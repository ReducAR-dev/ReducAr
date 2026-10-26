// src/routes/colaboracion.routes.ts
import { Router } from "express";
import { postColaboracionHandler } from "../controllers/colaboracion.controller.js";
import { validateBody } from "../middlewares/validation.middleware.js";
import { crearColaboracionSchema } from "../schema/colaboracion.schema.js";

const router = Router();

// ============================================
// RUTAS DE COLABORACIONES / APORTES (Pública)
// ============================================

// Crear preferencia de pago en Mercado Pago (valida el monto con Zod)
router.post(
  "/",
  validateBody(crearColaboracionSchema),
  postColaboracionHandler,
);

export default router;
