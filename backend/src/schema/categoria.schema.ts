import { z } from 'zod';

export const categoriaBaseSchema = z.object({
  id: z.number().int().positive(), // int4, PRIMARY, NON-NULLABLE
  nombre: z.string()
    .min(1, "El nombre de la categoría es requerido")
    .max(255, "El nombre no debe superar los 255 caracteres"), // varchar, UNIQUE, NON-NULLABLE
  descripcion: z.string()
    .max(1000, "La descripción no debe superar los 1000 caracteres")
    .nullish(), // text, NULLABLE
  icono_url: z.string()
    .url("Debe ser una URL válida")
    .nullish()
    .or(z.literal('')), // text, NULLABLE (Permite null, undefined o string vacío)
});

export type Categoria = z.infer<typeof categoriaBaseSchema>;