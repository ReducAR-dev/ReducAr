import { Router } from "express";
import {
  getMisCursosHandler,
  postCursoUsuarioHandler,
  deleteCursoUsuarioHandler,
} from "../controllers/cursoUsuario.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { validateBody } from "../middlewares/validation.middleware.js";
import { crearCursoUsuarioSchema } from "../schema/cursoUsuario.schema.js";

const router = Router();

// ============================================
// RUTAS DE CURSOS DEL USUARIO (Requieren JWT)
// ============================================

// Consultar todos los cursos adquiridos por el usuario autenticado
router.get("/", requireAuth, getMisCursosHandler);

// Adquirir / comprar un curso (recibe { curso_id } en el body)
router.post("/", requireAuth, validateBody(crearCursoUsuarioSchema), postCursoUsuarioHandler);

// Quitar un curso de la lista por el ID del curso
router.delete("/:id", requireAuth, deleteCursoUsuarioHandler);

export default router;