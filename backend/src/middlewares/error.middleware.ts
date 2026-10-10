// src/middlewares/error.middleware.ts
import type { Request, Response, NextFunction } from "express";

/**
 * Error HTTP con código de estado opcional.
 */
export interface HttpError extends Error {
  status?: number;
  code?: string;
}

/**
 * Handler global de errores.
 * Express lo reconoce por tener 4 argumentos.
 *
 * Cualquier `next(err)` de la app cae aquí.
 */
export const errorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  const status = err.status ?? 500;
  const message = err.message || "Error interno del servidor.";

  console.error(`❌ [${req.method} ${req.originalUrl}]`, {
    status,
    message,
    stack: process.env.NODE_ENV !== "production" ? err.stack : undefined,
  });

  res.status(status).json({
    success: false,
    error: message,
  });
};

/**
 * Handler 404 para rutas no registradas.
 * Se coloca DESPUÉS de todas las rutas y ANTES del errorHandler.
 */
export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    error: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
  });
};