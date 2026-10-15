import { z } from 'zod';

export const favoritoBaseSchema = z.object({
  id: z.number().int().positive(), // int4, PRIMARY, NON-NULLABLE
  usuario_id: z.string()
    .uuid("El ID de usuario debe ser un UUID válido")
    .nullish(), // uuid, FOREIGN KEY, NULLABLE
  curso_id: z.number()
    .int()
    .positive()
    .nullish(), // int4, FOREIGN KEY, NULLABLE
  fecha: z.coerce.date().nullish(), // timestamp, NULLABLE
});

export type Favorito = z.infer<typeof favoritoBaseSchema>;