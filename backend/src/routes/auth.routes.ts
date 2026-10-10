// src/routes/auth.routes.ts
import { Router } from "express";

import {
  signUpHandler,
  signInHandler,
  signOutHandler,
  meHandler,
} from "../controllers/auth.controller.js";

import { requireAuth } from "../middlewares/auth.middleware.js";
import { validateBody } from "../middlewares/validation.middleware.js";
import { signUpSchema, signInSchema } from "../schema/auth.schema.js";

const router = Router();

// ============================================
// Rutas públicas (no requieren JWT)
// ============================================

router.post("/signup", validateBody(signUpSchema), signUpHandler);
router.post("/login", validateBody(signInSchema), signInHandler);

// ============================================
// Rutas protegidas (requieren JWT)
// ============================================

router.post("/logout", requireAuth, signOutHandler);
router.get("/me", requireAuth, meHandler);

// ============================================
// Métodos no permitidos
// ============================================

router.all("/signup", (_req, res) => {
  res.status(405).json({
    success: false,
    error: "Método no permitido para este endpoint.",
  });
});

router.all("/login", (_req, res) => {
  res.status(405).json({
    success: false,
    error: "Método no permitido para este endpoint.",
  });
});

export default router;