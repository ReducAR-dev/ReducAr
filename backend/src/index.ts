// src/index.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { verificarConexion } from "./config/supabase.js";

// Middlewares globales
import {
  loggingMiddleware,
  securityHeaders,
  globalRateLimit,
  errorHandler,
  notFoundHandler,
  chatErrorHandler,
} from "./middlewares/index.js";

// Rutas (barrel)
import {
  authRoutes,
  usuarioRoutes,
  chatRoutes,
  cursoRoutes,
  testRoutes,
} from "./routes/index.js";

// Cargar variables de entorno ANTES que cualquier otra cosa
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// CORS
// ============================================

const FRONTEND_ORIGINS = new Set(
  (process.env.FRONTEND_ORIGIN || "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
);

const LOCAL_DEVELOPMENT_ORIGIN =
  /^http:\/\/(?:localhost|127\.0\.0\.1):\d{2,5}$/u;

const isAllowedFrontendOrigin = (origin: string): boolean =>
  FRONTEND_ORIGINS.has(origin) ||
  (process.env.NODE_ENV !== "production" &&
    LOCAL_DEVELOPMENT_ORIGIN.test(origin));

// ============================================
// Middlewares globales (orden importa)
// ============================================

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || isAllowedFrontendOrigin(origin)) {
        callback(null, true);
        return;
      }
      callback(null, false);
    },
  }),
);

app.use(express.json({ limit: "1mb" }));
app.use(securityHeaders);
app.use(loggingMiddleware);
app.use(globalRateLimit);

// ============================================
// Rutas
// ============================================

app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/chat", chatRoutes);
app.use("/cursos", cursoRoutes);
app.use("/api", testRoutes);

// Ruta de salud
app.get("/", (_req, res) => {
  res.send("🚀 Servidor Backend de ReducAR funcionando!");
});

// ============================================
// Manejo de errores y 404
// ============================================
//
// Orden:
//   1. chatErrorHandler  → maneja errores específicos de /api/chat
//   2. notFoundHandler   → cualquier ruta no registrada
//   3. errorHandler      → cualquier otro error que llegue con next(err)

app.use(chatErrorHandler);
app.use(notFoundHandler);
app.use(errorHandler);

// ============================================
// Arranque
// ============================================

app.listen(PORT, async () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);

  // Verificar conexión a Supabase solo en desarrollo
  if (process.env.NODE_ENV !== "production") {
    await verificarConexion();
  }
});