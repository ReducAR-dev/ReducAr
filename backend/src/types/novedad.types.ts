/**
 * Tipos de contrato específicos del recurso "novedad".
 *
 * Los payloads de entrada (crear/actualizar) se derivan del schema Zod
 * en `schema/novedad.schema.ts`. Acá solo exponemos re-exports y tipos
 * auxiliares que otras capas del código necesitan importar.
 *
 * ¿Por qué re-exportar y no redefinir? Porque el schema Zod es la
 * fuente única de verdad para la validación, y `z.infer<>` genera
 * el tipo automáticamente. Redefinirlo a mano es garantía de drift.
 */

export type {
  CrearNovedadPayload,
  ActualizarNovedadPayload,
  ListarNovedadesQuery,
} from "../schema/novedad.schema.js";

import type { Novedad } from "../models/novedad.model.js";

/**
 * Novedad con el nombre de su modalidad "joinneado".
 * Útil para respuestas de la API que quieran mostrar "Remoto" en lugar
 * de `modalidad_id: 3`, sin forzar al front a hacer un segundo fetch.
 */
export interface NovedadConModalidad extends Novedad {
  modalidad_nombre: string | null;
}