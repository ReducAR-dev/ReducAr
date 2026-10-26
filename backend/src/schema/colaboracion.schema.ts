// src/schema/colaboracion.schema.ts
import { z } from "zod";

export const crearColaboracionSchema = z.object({
  monto: z
    .number({ message: "El monto es obligatorio y debe ser numérico." })
    .int("El monto debe ser un número entero.")
    .min(100, "El aporte mínimo es de $100 ARS.")
    .max(10000, "El aporte máximo por operación es de $10.000 ARS."),
});

export type CrearColaboracionPayload = z.infer<typeof crearColaboracionSchema>;
