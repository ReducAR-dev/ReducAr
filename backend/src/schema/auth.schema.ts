import { z } from "zod";

// --------------------------------------------
// Validación de fecha de nacimiento (15-120 años)
// --------------------------------------------
const fechaNacimientoSchema = z
  .string({ message: "La fecha de nacimiento es obligatoria." })
  .refine((val) => !Number.isNaN(Date.parse(val)), "Fecha inválida.")
  .refine((val) => {
    const fecha = new Date(val);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fecha.getFullYear();
    const m = hoy.getMonth() - fecha.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < fecha.getDate())) edad--;
    return edad >= 15;
  }, "Debés tener al menos 15 años.")
  .refine((val) => {
    const fecha = new Date(val);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fecha.getFullYear();
    const m = hoy.getMonth() - fecha.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < fecha.getDate())) edad--;
    return edad <= 120;
  }, "La fecha ingresada no es válida. Verificá el año.");

// --------------------------------------------
// Validación de contraseña (espejo del front)
// --------------------------------------------
const passwordSchema = z
  .string({ message: "La contraseña es obligatoria." })
  .min(8, "La contraseña debe tener al menos 8 caracteres.")
  .regex(/[A-Z]/, "Debe tener al menos una mayúscula.")
  .regex(/[a-z]/, "Debe tener al menos una minúscula.")
  .regex(/[0-9]/, "Debe tener al menos un número.")
  .regex(/[^A-Za-z0-9\s]/, "Debe tener al menos un caracter especial.");

// --------------------------------------------
// Schemas
// --------------------------------------------
export const signUpSchema = z.object({
  email: z
    .string({ message: "El email es obligatorio." })
    .email("Email inválido."),
  password: passwordSchema,
  nombre: z
    .string({ message: "El nombre es obligatorio." })
    .min(2, "El nombre debe tener al menos 2 caracteres.")
    .max(50, "El nombre no puede superar 50 caracteres."),
  apellido: z
    .string({ message: "El apellido es obligatorio." })
    .min(2, "El apellido debe tener al menos 2 caracteres.")
    .max(50, "El apellido no puede superar 50 caracteres."),
  fecha_nacimiento: fechaNacimientoSchema,
});

export const signInSchema = z.object({
  email: z
    .string({ message: "El email es obligatorio." })
    .email("Email inválido."),
  password: z
    .string({ message: "La contraseña es obligatoria." })
    .min(1, "La contraseña es obligatoria."),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string({ message: "El email es obligatorio." })
    .email("Email inválido."),
});

export const oauthExchangeSchema = z.object({
  code: z.string({ message: "El código es obligatorio." }).min(1),
});