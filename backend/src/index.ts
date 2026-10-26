// src/index.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { verificarConexion } from "./config/supabase.js";

// ============================================
// MIDDLEWARES GLOBALES
// ============================================
import {
  loggingMiddleware,
  securityHeaders,
  globalRateLimit,
  errorHandler,
  notFoundHandler,
  chatErrorHandler,
} from "./middlewares/index.js";

// ============================================
// RUTAS (Barrel exports)
// ============================================
import {
  authRoutes,
  usuarioRoutes,
  chatRoutes,
  cursoRoutes,
  testRoutes,
  novedadRoutes,
  favoritoRoutes,
  cursoUsuarioRoutes,
  reporteRoutes,
  colaboracionRoutes,
} from "./routes/index.js";

// Cargar variables de entorno antes de inicializar la app
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// CONFIGURACIÓN DE CORS
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

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || isAllowedFrontendOrigin(origin)) {
        callback(null, true);
        return;
      }
      callback(null, false);
    },
    credentials: true, // Importante si en el futuro usan cookies
  }),
);

// ============================================
// MIDDLEWARES GLOBALES (El orden importa)
// ============================================

app.use(express.json({ limit: "1mb" })); // Parseo de JSON
app.use(securityHeaders);               // Headers de seguridad
app.use(loggingMiddleware);             // Logs en consola
app.use(globalRateLimit);               // Límite de peticiones global

// ============================================
// MONTAJE DE RUTAS
// ============================================

// --- Rutas Públicas ---
// (Aunque algunas tengan rutas internas protegidas, el router se monta aquí)
app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/cursos", cursoRoutes);   // <-- CORREGIDO: Se agregó /api
app.use("/api/novedades", novedadRoutes);
app.use("/api/favoritos", favoritoRoutes);
app.use("/api/curso-usuario", cursoUsuarioRoutes);
app.use("/api/reportes", reporteRoutes);
app.use("/api/colaboraciones", colaboracionRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api", testRoutes);           // Endpoints de test/healthcheck

// ============================================
// RUTA DE SALUD (Healthcheck)
// ============================================
app.get("/", (_req, res) => {
  res.send("🚀 Servidor Backend de ReducAR funcionando!");
});

// ============================================
// MANEJO DE ERRORES Y 404
// ============================================
// El orden ESTRICTO es:
// 1. Errores específicos (chat)
// 2. Rutas no encontradas (404)
// 3. Errores genéricos (500)

app.use(chatErrorHandler);
app.use(notFoundHandler);
app.use(errorHandler);

// ============================================
// ARRANQUE DEL SERVIDOR
// ============================================

app.listen(PORT, async () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);

  // Verificar conexión a Supabase solo en entorno de desarrollo local
  if (process.env.NODE_ENV !== "production") {
    await verificarConexion();
  }
});