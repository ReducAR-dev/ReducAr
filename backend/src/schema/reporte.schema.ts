import { z } from 'zod';

export const reporteBaseSchema = z.object({
  id: z.number().int().positive(), // int4, PRIMARY, NON-NULLABLE
  usuario_id: z.string()
    .uuid("El ID de usuario debe ser un UUID válido")
    .nullish(), // uuid, FK, NULLABLE
  tipo_reporteid: z.number() // OJO: Supabase muestra camelCase aquí (tipo_reporteId)
    .int()
    .positive()
    .nullish(), // int4, FK, NULLABLE
    
  entidad_tipo: z.string()
    .min(1, "El tipo de entidad es requerido")
    .max(255, "El tipo de entidad es demasiado largo"), // varchar, NON-NULLABLE
  entidad_id: z.string()
    .max(255, "El ID de entidad es demasiado largo")
    .nullish(), // varchar, NULLABLE (Puede ser un UUID o un ID numérico en texto)
    
  mensaje: z.string()
    .min(1, "El mensaje del reporte no puede estar vacío"), // text, NON-NULLABLE
    
  estado_id: z.number()
    .int()
    .positive()
    .nullish(), // int4, FK, NULLABLE
    
  respuesta_admin: z.string().nullish(), // text, NULLABLE
  fecha_creacion: z.coerce.date().nullish(), // timestamp, NULLABLE
  fecha_resolucion: z.coerce.date().nullish(), // timestamp, NULLABLE
});

export type Reporte = z.infer<typeof reporteBaseSchema>;