import { z } from 'zod';

export const auditoriaBaseSchema = z.object({
  id: z.number().int().positive(), // int4, PRIMARY, NON-NULLABLE
  usuario_id: z.string()
    .uuid("El ID de usuario debe ser un UUID válido")
    .nullish(), // uuid, FK, NULLABLE
  tipo_accion_id: z.number()
    .int()
    .positive()
    .nullish(), // int4, FK, NULLABLE
    
  entidad_tipo: z.string()
    .min(1, "El tipo de entidad es requerido")
    .max(255, "El tipo de entidad es demasiado largo"), // varchar, NON-NULLABLE
  entidad_id: z.string()
    .max(255, "El ID de entidad es demasiado largo")
    .nullish(), // varchar, NULLABLE
    
  // Estos campos suelen guardar objetos JSON "stringificados". 
  // Si planeas parsearlos a objetos, aquí podrías usar z.string().transform(...)
  valores_anteriores: z.string().nullish(), // text, NULLABLE
  valores_nuevos: z.string().nullish(), // text, NULLABLE
  
  ip_address: z.string()
    .max(45, "Dirección IP inválida")
    .nullish(), // varchar, NULLABLE
  user_agent: z.string().nullish(), // text, NULLABLE
  request_id: z.string()
    .max(255, "El request ID es demasiado largo")
    .nullish(), // varchar, NULLABLE
    
  exito: z.boolean().nullish(), // bool, NULLABLE
  fecha: z.coerce.date().nullish(), // timestamp, NULLABLE
});

export type Auditoria = z.infer<typeof auditoriaBaseSchema>;