// src/models/promocion.model.ts
import type { ISODateOnly } from "./common.types.js";

export interface Promocion {
  id: number;
  cursoId: number | null;
  titulo: string;
  descuentoPorcentaje: number;
  motivo: string | null;
  etiquetaUrl: string | null;
  fechaInicio: ISODateOnly;
  fechaFinalizacion: ISODateOnly;
  orden: number | null;
  estaActiva: boolean | null;
}