import { z } from 'zod';

// 1. Esquema Base (Mapeo exacto de tu tabla en Supabase)
export const cursoBaseSchema = z.object({
  id: z.number().int().positive(), // int4, PRIMARY, NOT NULL
  
  // Al ser NULLABLE en Supabase, usamos .nullish()
  nombre_propietario: z.string().nullish(), // varchar, NULLABLE
  categoria_id: z.number().int().positive().nullish(), // int4, FK, NULLABLE
  
  titulo: z.string().min(1, "El título es requerido"), // varchar, NOT NULL
  
  // Agregamos límites de caracteres (ajusta los números según tu lógica de negocio)
  descripcion_corta: z.string().max(250, "La descripción corta no debe superar los 250 caracteres").nullish(), // text, NULLABLE
  descripcion_larga: z.string().max(5000, "La descripción larga es demasiado extensa").nullish(), // text, NULLABLE
  
  modalidad_id: z.number().int().positive().nullish(), // int4, FK, NULLABLE
  nivel_id: z.number().int().positive().nullish(), // int4, FK, NULLABLE
  tipo_certificado_id: z.number().int().positive().nullish(), // int4, FK, NULLABLE
  
  duracion_dias: z.number().int().nonnegative().nullish(), // int4, NULLABLE
  precio: z.number().nonnegative().nullish(), // numeric, NULLABLE
  
  // Fechas NULLABLE
  fecha_inicio: z.coerce.date().nullish(), // date, NULLABLE
  fecha_termino: z.coerce.date().nullish(), // date, NULLABLE
  fecha_max_inscripcion: z.coerce.date().nullish(), // date, NULLABLE
  fecha_publicacion: z.coerce.date().nullish(), // timestamp, NULLABLE
  
  // Al ser text y NULLABLE, permitimos null, undefined o string vacío
  enlace_inscripcion: z.string().url("Debe ser una URL válida").nullish().or(z.literal('')), // text, NULLABLE
  
  cupos_disponibles: z.number().int().nonnegative().nullish(), // int4, NULLABLE
  esta_activo: z.boolean().nullish(), // bool, NULLABLE
  
  // Lo mismo para la imagen, permitimos null, undefined o string vacío
  imagen_url: z.string().url("Debe ser una URL válida").nullish().or(z.literal('')), // text, NULLABLE
});

// Exportamos el tipo de TypeScript inferido de Zod para usarlo en tu código
export type Curso = z.infer<typeof cursoBaseSchema>;