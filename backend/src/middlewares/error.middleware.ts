// src/middlewares/error.middleware.ts
import type { Request, Response, NextFunction } from "express";
import multer from "multer";

/**
 * Error HTTP con código de estado opcional.
 */
export interface HttpError extends Error {
  status?: number;
  code?: string;
}

/**
 * Traduce los códigos de error de multer a mensajes legibles en español.
 *
 * ⚠️ Debe ir antes del handler genérico, porque los MulterError
 *    no traen `status` y si no los capturamos antes, caen al
 *    fallback de 500 con un mensaje en inglés.
 */
const MULTER_ERROR_MESSAGES: Record<string, string> = {
  LIMIT_FILE_SIZE: "La imagen supera el tamaño máximo permitido (2 MB).",
  LIMIT_FILE_COUNT: "Solo se permite subir un archivo a la vez.",
  LIMIT_UNEXPECTED_FILE:
    "Campo de archivo inesperado. Se esperaba el campo 'avatar'.",
  LIMIT_PART_COUNT: "Se excedió la cantidad de partes permitidas.",
  LIMIT_FIELD_KEY: "El nombre del campo es demasiado largo.",
  LIMIT_FIELD_VALUE: "El valor del campo es demasiado largo.",
  LIMIT_FIELD_COUNT: "Se excedió la cantidad de campos permitidos.",
};

/**
 * Handler global de errores.
 * Express lo reconoce por tener 4 argumentos.
 *
 * Cualquier `next(err)` de la app cae aquí.
 */
export const errorHandler = (
  err: HttpError | multer.MulterError | Error,
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  // ============================================
  // 1. Errores de multer (subida de archivos)
  // ============================================
  if (err instanceof multer.MulterError) {
    const mensaje =
      MULTER_ERROR_MESSAGES[err.code] ?? "Error al procesar el archivo.";

    console.error(`❌ [${req.method} ${req.originalUrl}] Multer`, {
      code: err.code,
      field: err.field,
      message: err.message,
    });

    res.status(400).json({
      success: false,
      error: mensaje,
    });
    return;
  }

  // ============================================
  // 2. Errores lanzados por fileFilter (formato inválido)
  // ============================================
  // Nuestro `fileFilter` en upload.middleware.ts lanza un Error plano
  // con un mensaje que empieza con "Formato de imagen".
  if (
    err instanceof Error &&
    !(err as HttpError).status &&
    err.message.startsWith("Formato de imagen")
  ) {
    console.error(`❌ [${req.method} ${req.originalUrl}] fileFilter`, {
      message: err.message,
    });

    res.status(400).json({
      success: false,
      error: err.message,
    });
    return;
  }

  // ============================================
  // 3. Errores HTTP estándar (con status)
  // ============================================
  const httpErr = err as HttpError;
  const status = httpErr.status ?? 500;
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