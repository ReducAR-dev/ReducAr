import { z } from 'zod';

export const rolBaseSchema = z.object({
  id: z.number().int().positive(), // int4, PRIMARY, NON-NULLABLE
  nombre: z.string()
    .min(1, "El nombre del rol es requerido")
    .max(255, "El nombre no debe superar los 255 caracteres"), // varchar, UNIQUE, NON-NULLABLE
});

export type Rol = z.infer<typeof rolBaseSchema>;