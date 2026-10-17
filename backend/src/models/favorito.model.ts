// src/models/favorito.model.ts
import type { UUID, Timestamp } from "./common.types.js";

export interface Favorito {
  id: number;
  usuario_id: UUID | null;
  curso_id: number | null;
  fecha: Timestamp | null;
}