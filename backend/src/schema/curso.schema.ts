// src/schema/curso.schema.ts
import { z } from "zod";

// ============================================
// Base
// ============================================
// Los campos comunes a crear y actualizar. NO incluimos `id` porque
// la BD lo autoincrementa y el cliente nunca lo manda.

const cursoBaseCampos = {
  nombre_propietario: z.string().trim().max(150).nullish(),
  categoria_id: z.number().int().positive().nullish(),
  titulo: z
    .string({ message: "El título es obligatorio." })
    .trim()
    .min(3, "Mínimo 3 caracteres.")
    .max(200, "Máximo 200 caracteres."),
  descripcion_corta: z.string().trim().max(300).nullish(),
  descripcion_larga: z.string().trim().max(5000).nullish(),
  modalidad_id: z.number().int().positive().nullish(),
  nivel_id: z.number().int().positive().nullish(),
  tipo_certificado_id: z.number().int().positive().nullish(),
  duracion_dias: z.number().int().nonnegative().nullish(),
  precio: z.number().nonnegative().nullish(),
  fecha_inicio: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullish(),
  fecha_termino: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullish(),
  fecha_max_inscripcion: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullish(),
  enlace_inscripcion: z.string().url("URL inválida.").nullish().or(z.literal("")),
  cupos_disponibles: z.number().int().nonnegative().nullish(),
  esta_activo: z.boolean().optional(),
  imagen_url: z.string().url("URL inválida.").nullish().or(z.literal("")),
};

// ============================================
// Crear
// ============================================
export const crearCursoSchema = z.object(cursoBaseCampos);

// ============================================
// Actualizar (todos opcionales)
// ============================================
export const actualizarCursoSchema = crearCursoSchema.partial();

// ============================================
// Query de listado
// ============================================
export const listarCursosQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(30),
  categoria_id: z.coerce.number().int().positive().optional(),
  modalidad_id: z.coerce.number().int().positive().optional(),
  nivel_id: z.coerce.number().int().positive().optional(),
  solo_activos: z.coerce.boolean().optional().default(true),
});

// ============================================
// Tipos inferidos
// ============================================
export type CrearCursoPayload = z.infer<typeof crearCursoSchema>;
export type ActualizarCursoPayload = z.infer<typeof actualizarCursoSchema>;
export type ListarCursosQuery = z.infer<typeof listarCursosQuerySchema>;