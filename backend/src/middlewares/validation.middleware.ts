import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

/**
 * Middleware genérico para validar el esquema de una solicitud (Zod)
 * Proporciona seguridad de tipos en tiempo de ejecución y previene datos basura
 */
export function validateSchema<T>(schema: z.ZodType<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const error = result.error;

      if (error instanceof ZodError) {
        return res.status(400).json({
          error: 'Error de validación de datos',
          details: error.issues.map((issue) => ({
            path: issue.path,
            message: issue.message
          }))
        });
      }

      return res.status(500).json({ error: 'Error interno de servidor en validación.' });
    }

    req.body = result.data;
    next();
  };
}

/**
 * Esquema de ejemplo para autenticación de usuario (SignUp)
 */
export const signUpSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  nombre: z.string().min(2, 'Nombre demasiado corto'),
  apellido: z.string().nullable().optional(),
  fechaNacimiento: z.string().nullable().optional(),
  rolId: z.number().int().default(2).optional()
});

/**
 * Esquema de ejemplo para inicio de sesión (SignIn)
 */
export const signInSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Contraseña requerida')
});
