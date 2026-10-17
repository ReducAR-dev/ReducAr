// src/schema/reporte.schema.ts
import { z } from "zod";

// ============================================
// Crear reporte (usuario logueado)
// ============================================
// Un reporte se crea contra una entidad (curso, usuario, valoración).
// El estado inicial siempre es "pending" (id=1), y eso lo fuerza el
// backend, no el cliente.

export const crearReporteSchema = z.object({
  tipo_reporte_id: z
    .number({ message: "El tipo de reporte es obligatorio." })
    .int()
    .positive(),
  entidad_tipo: z
    .enum(["curso", "usuario", "valoracion"], {
      message: "entidad_tipo debe ser 'curso', 'usuario' o 'valoracion'.",
    }),
  entidad_id: z.string().trim().min(1, "La entidad es obligatoria."),
  mensaje: z
    .string({ message: "El mensaje es obligatorio." })
    .trim()
    .min(10, "Contá un poco más (mínimo 10 caracteres).")
    .max(1000, "Máximo 1000 caracteres."),
});

// ============================================
// Resolver reporte (solo admin)
// ============================================
export const resolverReporteSchema = z.object({
  estado_id: z.number().int().positive(),
  respuesta_admin: z.string().trim().max(1000).optional(),
});

// ============================================
// Query de listado (admin)
// ============================================
export const listarReportesQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(30),
  estado_id: z.coerce.number().int().positive().optional(),
});

export type CrearReportePayload = z.infer<typeof crearReporteSchema>;
export type ResolverReportePayload = z.infer<typeof resolverReporteSchema>;
export type ListarReportesQuery = z.infer<typeof listarReportesQuerySchema>;