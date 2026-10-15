import { z } from 'zod';

export const promocionBaseSchema = z.object({
  id: z.number().int().positive(), // int4, PRIMARY, NON-NULLABLE
  curso_id: z.number()
    .int()
    .positive()
    .nullish(), // int4, FK, NULLABLE
    
  titulo: z.string()
    .min(1, "El título de la promoción es requerido")
    .max(255, "El título no debe superar los 255 caracteres"), // varchar, NON-NULLABLE
    
  // Asumiendo que el descuento es un porcentaje (0 al 100)
  descuento_porcentaje: z.number()
    .int()
    .min(0, "El descuento no puede ser negativo")
    .max(100, "El descuento no puede ser mayor al 100%"), // int4, NON-NULLABLE
    
  motivo: z.string()
    .max(255, "El motivo no debe superar los 255 caracteres")
    .nullish(), // varchar, NULLABLE
    
  etiqueta_url: z.string()
    .url("Debe ser una URL válida")
    .nullish()
    .or(z.literal('')), // text, NULLABLE
    
  fecha_inicio: z.coerce.date(), // date, NON-NULLABLE
  fecha_finalizacion: z.coerce.date(), // date, NON-NULLABLE
  
  orden: z.number().int().nullish(), // int4, NULLABLE
  esta_activa: z.boolean().nullish(), // bool, NULLABLE
});

export type Promocion = z.infer<typeof promocionBaseSchema>;