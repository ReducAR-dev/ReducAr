import { z } from "zod";

export const crearCursoUsuarioSchema = z.object({
  curso_id: z
    .number({ message: "El ID del curso es obligatorio y debe ser numérico." })
    .int("El ID del curso debe ser un número entero.")
    .positive("El ID del curso debe ser mayor a cero."),
});

export const listarCursosUsuarioQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(30),
});

export type CrearCursoUsuarioPayload = z.infer<typeof crearCursoUsuarioSchema>;