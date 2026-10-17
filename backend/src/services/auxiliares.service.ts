// src/services/auxiliares.service.ts
import { supabase } from "../config/supabase.js";
import type { Result } from "../types/common.types.js";
import type {
  Rol,
  Modalidad,
  Nivel,
  TipoCertificado,
  TipoReporte,
  EstadoReporte,
  TipoAccion,
} from "../models/auxiliares.model.js";

// ============================================
// Tipos
// ============================================

/**
 * Nombres reales de las tablas auxiliares.
 * Sirve como whitelist: solo estas tablas se pueden consultar.
 */
const TABLAS_AUXILIARES = [
  "rol",
  "modalidad",
  "nivel",
  "tipo_certificado",
  "tipo_reporte",
  "estado_reporte",
  "tipo_accion",
] as const;

type TablaAuxiliar = (typeof TABLAS_AUXILIARES)[number];

// ============================================
// Factory
// ============================================

/**
 * Crea un par de funciones para una tabla auxiliar:
 *   - getTodos():   devuelve todos los registros
 *   - getPorId(id): devuelve uno o null
 *
 * Se reutiliza para todas las tablas auxiliares y garantiza
 * que cada una respete la misma forma (Result<T>) y el mismo
 * manejo de errores.
 */
const crearAuxiliar = <T extends { id: number; nombre: string }>(
  tabla: TablaAuxiliar,
) => ({
  async getTodos(): Promise<Result<T[]>> {
    const { data, error } = await supabase.from(tabla).select("*").order("id");

    if (error) {
      console.error(`❌ auxiliares.${tabla}.getTodos:`, error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data: (data ?? []) as T[] };
  },

  async getPorId(id: number): Promise<Result<T | null>> {
    const { data, error } = await supabase
      .from(tabla)
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error(`❌ auxiliares.${tabla}.getPorId:`, error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data: (data as T) ?? null };
  },
});

// ============================================
// Servicio exportado
// ============================================

export const auxiliaresService = {
  roles: crearAuxiliar<Rol>("rol"),
  modalidades: crearAuxiliar<Modalidad>("modalidad"),
  niveles: crearAuxiliar<Nivel>("nivel"),
  tiposCertificado: crearAuxiliar<TipoCertificado>("tipo_certificado"),
  tiposReporte: crearAuxiliar<TipoReporte>("tipo_reporte"),
  estadosReporte: crearAuxiliar<EstadoReporte>("estado_reporte"),
  tiposAccion: crearAuxiliar<TipoAccion>("tipo_accion"),
};