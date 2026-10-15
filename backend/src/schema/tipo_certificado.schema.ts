import { z } from 'zod';

export const tipoCertificadoBaseSchema = z.object({
  id: z.number().int().positive(), // int4, PRIMARY, NON-NULLABLE
  nombre: z.string()
    .min(1, "El nombre del tipo de certificado es requerido")
    .max(255, "El nombre no debe superar los 255 caracteres"), // varchar, UNIQUE, NON-NULLABLE
});

export type TipoCertificado = z.infer<typeof tipoCertificadoBaseSchema>;