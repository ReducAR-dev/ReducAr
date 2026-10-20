// src/routes/favorito.routes.ts
import { Router } from "express";
import {
  getMisFavoritosHandler,
  postFavoritoHandler,
  deleteFavoritoHandler,
} from "../controllers/favorito.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

// ============================================
// RUTAS DE FAVORITOS (Requieren JWT)
// ============================================

// Consultar todos los favoritos del usuario autenticado
router.get("/", requireAuth, getMisFavoritosHandler);

// Añadir un curso a favoritos (recibe { curso_id } en el body)
router.post("/", requireAuth, postFavoritoHandler);

// Quitar un curso de favoritos por el ID del curso
router.delete("/:id", requireAuth, deleteFavoritoHandler);

export default router;
