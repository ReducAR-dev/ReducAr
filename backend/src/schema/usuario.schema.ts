// src/schemas/usuario.schema.ts
import { z } from "zod";

/**
 * Esquema para actualizar el propio perfil.
 *
 * ⚠️ `rolId` y `esta_activo` NO están aquí.
 *    Aunque el cliente los envíe, Zod los descarta.
 */
export const actualizarPerfilSchema = z.object({
  nombre: z.string().min(2).optional(),
  apellido: z.string().nullable().optional(),
  fecha_nacimiento: z.string().nullable().optional(),
  fotoPerfil: z.string().nullable().optional(),
  biografia: z.string().nullable().optional(),
  ubicacion: z.string().nullable().optional(),
  user_preferencia: z.string().nullable().optional(),
});

/**
 * Esquema para operaciones admin sobre un usuario objetivo.
 * El `id` va en los params, así que solo validamos el body si aplica.
 */
export const adminBloquearSchema = z.object({
  motivo: z.string().max(500).optional(),
});