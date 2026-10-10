// src/schemas/auth.schema.ts
import { z } from "zod";

export const signUpSchema = z.object({
  email: z
    .string({ message: "El email es obligatorio." })
    .email("Email inválido."),
  password: z
    .string({ message: "La contraseña es obligatoria." })
    .min(8, "La contraseña debe tener al menos 8 caracteres."),
  nombre: z
    .string({ message: "El nombre es obligatorio." })
    .min(2, "El nombre debe tener al menos 2 caracteres."),
  apellido: z.string().nullable().optional(),
  fecha_nacimiento: z.string().nullable().optional(),
});

export const signInSchema = z.object({
  email: z
    .string({ message: "El email es obligatorio." })
    .email("Email inválido."),
  password: z
    .string({ message: "La contraseña es obligatoria." })
    .min(1, "La contraseña es obligatoria."),
});