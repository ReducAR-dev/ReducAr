// src/models/categoria.model.ts

export interface Categoria {
  id: number;
  nombre: string;
  descripcion: string | null;
  iconoUrl: string | null;
}