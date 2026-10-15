import { z } from 'zod';

export const valoracionBaseSchema = z.object({
  id: z.number().int().positive(), // int4, PRIMARY, NON-NULLABLE
  usuario_id: z.string()
    .uuid("El ID de usuario debe ser un UUID válido"), // uuid, FK, NON-NULLABLE
  curso_id: z.number()
    .int()
    .positive(), // int4, FK, NON-NULLABLE
  
  // Asumiendo que la puntuación es de 1 a 5 estrellas. Si es de 1 a 10, ajusta el .max()
  puntuacion: z.number()
    .int()
    .min(1, "La puntuación mínima es 1")
    .max(5, "La puntuación máxima es 5"), // int4, NON-NULLABLE
  
  comentario: z.string()
    .max(2000, "El comentario es demasiado largo")
    .nullish(), // text, NULLABLE
    
  esta_activa: z.boolean().nullish(), // bool, NULLABLE
  esta_aprobada: z.boolean().nullish(), // bool, NULLABLE
  
  fecha_aprobacion: z.coerce.date().nullish(), // timestamp, NULLABLE
  
  // 45 caracteres es el estándar para direcciones IPv6
  ip_address: z.string()
    .max(45, "Dirección IP inválida")
    .nullish(), // varchar, NULLABLE
    
  user_agent: z.string().nullish(), // text, NULLABLE
  fecha: z.coerce.date().nullish(), // timestamp, NULLABLE
});

export type Valoracion = z.infer<typeof valoracionBaseSchema>;