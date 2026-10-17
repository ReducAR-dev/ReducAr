// src/schema/valoracion.schema.ts
import { z } from "zod";

// ============================================
// Crear valoración (usuario logueado)
// ============================================
// El backend completa: usuario_id (del JWT), ip_address, user_agent,
// esta_activa (true), esta_aprobada (false), fecha_aprobacion (null).

export const crearValoracionSchema = z.object({
  curso_id: z
    .number({ message: "El curso es obligatorio." })
    .int()
    .positive(),
  puntuacion: z
    .number({ message: "La puntuación es obligatoria." })
    .int()
    .min(1, "Mínimo 1 estrella.")
    .max(5, "Máximo 5 estrellas."),
  comentario: z.string().trim().max(2000).nullable().optional(),
});

// ============================================
// Moderar valoración (solo admin)
// ============================================
export const moderarValoracionSchema = z.object({
  esta_aprobada: z.boolean(),
});

// ============================================
// Query de listado
// ============================================
export const listarValoracionesQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(30),
  curso_id: z.coerce.number().int().positive().optional(),
  solo_aprobadas: z.coerce.boolean().optional().default(true),
});

export type CrearValoracionPayload = z.infer<typeof crearValoracionSchema>;
export type ModerarValoracionPayload = z.infer<typeof moderarValoracionSchema>;
export type ListarValoracionesQuery = z.infer<typeof listarValoracionesQuerySchema>;