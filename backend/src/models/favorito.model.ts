// src/models/favorito.model.ts
import type { UUID, Timestamp } from "./common.types.js";

export interface Favorito {
  id: number;
  usuarioId: UUID | null;
  cursoId: number | null;
  fecha: Timestamp | null;
}