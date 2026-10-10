// src/models/auditoria.model.ts
import type { Timestamp } from "./common.types.js";

export interface Auditoria {
  id: number;
  usuarioId: number | null;
  tipoAccionId: number | null;
  entidadTipo: string;
  entidadId: string | null;
  valoresAnteriores: string | null;
  valoresNuevos: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  requestId: string | null;
  exito: boolean | null;
  fecha: Timestamp | null;
}