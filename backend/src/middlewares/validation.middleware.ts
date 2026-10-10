// src/middlewares/validation.middleware.ts
import type { Request, Response, NextFunction } from "express";
import { ZodError, type ZodType } from "zod";

/**
 * Fábrica de middlewares de validación.
 * Recibe un esquema de Zod y devuelve un middleware que valida `req.body`.
 *
 * Si la validación pasa, reemplaza `req.body` por el resultado tipado.
 * Si falla, responde 400 con el detalle de los errores.
 */
export const validateBody = <T>(schema: ZodType<T>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const resultado = schema.safeParse(req.body);

    if (!resultado.success) {
      const error = resultado.error;

      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          error: "Datos de entrada inválidos.",
          details: error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        });
        return;
      }

      res.status(400).json({
        success: false,
        error: "Error de validación.",
      });
      return;
    }

    req.body = resultado.data;
    next();
  };
};