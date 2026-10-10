// src/models/curso.model.ts
import type { ISODateOnly, Timestamp } from "./common.types.js";

export interface Curso {
  id: number;
  nombre_propietario: string | null;
  categoriaId: number | null;
  titulo: string;
  descripcionCorta: string | null;
  descripcionLarga: string | null;
  modalidadId: number | null;
  nivelId: number | null;
  tipoCertificadoId: number | null;
  duracionDias: number | null;
  precio: number | null;
  fechaInicio: ISODateOnly | null;
  fechaTermino: ISODateOnly | null;
  fechaMaxInscripcion: ISODateOnly | null;
  fechaPubliacion: Timestamp | null;
  enlaceInscricpcion: string | null;
  cuposDisponibles: number | null;
  estaActivo: boolean | null;
}