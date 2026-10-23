import { z } from "zod";

export const crearFavoritoSchema = z.object({
  curso_id: z
    .number({ message: "El ID del curso es obligatorio y debe ser numérico." })
    .int("El ID del curso debe ser un número entero.")
    .positive("El ID del curso debe ser mayor a cero."),
});

export type CrearFavoritoPayload = z.infer<typeof crearFavoritoSchema>;