// src/routes/auth.routes.ts
import { Router } from "express";

import {
  signUpHandler,
  signInHandler,
  signOutHandler,
  meHandler,
  forgotPasswordHandler,
  oauthStartHandler,
  oauthCallbackHandler,
  oauthExchangeHandler,
} from "../controllers/auth.controller.js";

import { requireAuth } from "../middlewares/auth.middleware.js";
import { validateBody } from "../middlewares/validation.middleware.js";
import {
  signUpSchema,
  signInSchema,
  forgotPasswordSchema,
  oauthExchangeSchema,
} from "../schema/auth.schema.js";

const router = Router();

// ============================================
// Rutas públicas
// ============================================

router.post("/signup", validateBody(signUpSchema), signUpHandler);
router.post("/login", validateBody(signInSchema), signInHandler);

// Recuperación de contraseña
router.post(
  "/forgot-password",
  validateBody(forgotPasswordSchema),
  forgotPasswordHandler,
);

// OAuth
router.get("/oauth/callback", oauthCallbackHandler);

router.post("/oauth/exchange", validateBody(oauthExchangeSchema), oauthExchangeHandler);

router.get("/oauth/:provider", oauthStartHandler);

// ============================================
// Rutas protegidas
// ============================================

router.post("/logout", requireAuth, signOutHandler);
router.get("/me", requireAuth, meHandler);

// ============================================
// Métodos no permitidos
// ============================================

router.all("/signup", (_req, res) => {
  res.status(405).json({ success: false, error: "Método no permitido." });
});
router.all("/login", (_req, res) => {
  res.status(405).json({ success: false, error: "Método no permitido." });
});

export default router;