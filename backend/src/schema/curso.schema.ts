// src/schema/curso.schema.ts
import { z } from "zod";

// ============================================
// Base
// ============================================
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
  fecha_inicio: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato YYYY-MM-DD").nullish(),
  fecha_termino: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato YYYY-MM-DD").nullish(),
  fecha_max_inscripcion: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato YYYY-MM-DD").nullish(),
  enlace_inscripcion: z.string().url("URL inválida.").nullish().or(z.literal("")),
  cupos_disponibles: z.number().int().nonnegative().nullish(),
  esta_activo: z.boolean().optional(),
  imagen_url: z.string().url("URL inválida.").nullish().or(z.literal("")),
};

// ============================================
// Reglas de validación cruzada (Zod)
// ============================================
const validarReglasDeNegocio = (data: any, ctx: z.RefinementCtx) => {
  // 1. Si el precio es mayor a 0, exigir enlace de inscripción
  if (data.precio && data.precio > 0) {
    if (!data.enlace_inscripcion || data.enlace_inscripcion.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["enlace_inscripcion"],
        message: "Un curso pago debe tener un enlace de inscripción.",
      });
    }
  }

  // 2. Validar que la fecha de término sea posterior a la de inicio
  if (data.fecha_inicio && data.fecha_termino) {
    const inicio = new Date(data.fecha_inicio).getTime();
    const termino = new Date(data.fecha_termino).getTime();
    if (termino <= inicio) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["fecha_termino"],
        message: "La fecha de término debe ser posterior a la fecha de inicio.",
      });
    }
  }

  // 3. Validar que el cierre de inscripciones no sea posterior al inicio del curso
  if (data.fecha_inicio && data.fecha_max_inscripcion) {
    const inicio = new Date(data.fecha_inicio).getTime();
    const inscripcion = new Date(data.fecha_max_inscripcion).getTime();
    if (inscripcion > inicio) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["fecha_max_inscripcion"],
        message: "La fecha máxima de inscripción no puede ser posterior al inicio.",
      });
    }
  }
};

// ============================================
// Esquemas exportados
// ============================================

export const crearCursoSchema = z.object(cursoBaseCampos).superRefine(validarReglasDeNegocio);

export const actualizarCursoSchema = z.object(cursoBaseCampos).partial().superRefine(validarReglasDeNegocio);

// Query de listado (con filtros y paginación)
export const listarCursosQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(30),
  categoria_id: z.coerce.number().int().positive().optional(),
  modalidad_id: z.coerce.number().int().positive().optional(),
  nivel_id: z.coerce.number().int().positive().optional(),
  busqueda: z.string().trim().optional(),
  solo_activos: z.coerce.boolean().optional().default(true),
});

// ============================================
// Tipos inferidos
// ============================================
export type CrearCursoPayload = z.infer<typeof crearCursoSchema>;
export type ActualizarCursoPayload = z.infer<typeof actualizarCursoSchema>;
export type ListarCursosQuery = z.infer<typeof listarCursosQuerySchema>;