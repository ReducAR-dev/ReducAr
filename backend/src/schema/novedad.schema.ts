// src/schema/novedad.schema.ts
import { z } from "zod";

/**
 * Validación de fecha ISO "YYYY-MM-DD".
 * El `<input type="date">` del front ya devuelve este formato.
 */
const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/u, "Formato esperado: YYYY-MM-DD")
  .refine((v) => !Number.isNaN(Date.parse(v)), "Fecha inválida");

/**
 * Crear novedad. Todos los campos de negocio son validados.
 * `esta_activa` se puede omitir y queda en true por defecto (BD).
 */
export const crearNovedadSchema = z.object({
  titulo: z
    .string({ message: "El título es obligatorio." })
    .trim()
    .min(3, "El título debe tener al menos 3 caracteres.")
    .max(150, "El título no puede superar los 150 caracteres."),
  descripcion_corta: z
    .string()
    .trim()
    .max(300, "Máximo 300 caracteres.")
    .nullable()
    .optional(),
  descripcion_larga: z
    .string()
    .trim()
    .max(5000, "Máximo 5000 caracteres.")
    .nullable()
    .optional(),
  fecha_evento: isoDate,
  modalidad_id: z
    .number({ message: "modalidad_id debe ser numérico." })
    .int("modalidad_id debe ser entero.")
    .positive("modalidad_id debe ser positivo.")
    .nullable()
    .optional(),
  ubicacion: z
    .string()
    .trim()
    .max(150, "Máximo 150 caracteres.")
    .nullable()
    .optional(),
  imagen_url: z
    .string()
    .trim()
    .url("imagen_url debe ser una URL válida.")
    .nullable()
    .optional(),
  enlace: z
    .string()
    .trim()
    .url("enlace debe ser una URL válida.")
    .nullable()
    .optional(),
  esta_activa: z.boolean().optional(),
});

/**
 * Actualizar novedad. Todos los campos opcionales,
 * pero si vienen, se validan igual que en crear.
 */
export const actualizarNovedadSchema = crearNovedadSchema.partial();

/**
 * Query de listado paginado.
 * `z.coerce.number()` convierte strings de la URL a número.
 */
export const listarNovedadesQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(30),
});

export type CrearNovedadPayload = z.infer<typeof crearNovedadSchema>;
export type ActualizarNovedadPayload = z.infer<typeof actualizarNovedadSchema>;
export type ListarNovedadesQuery = z.infer<typeof listarNovedadesQuerySchema>;