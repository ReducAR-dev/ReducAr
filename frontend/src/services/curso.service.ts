import { apiRequest } from "./api";
import type { PaginatedMeta } from "../types/novedad.types"; // Reutilizamos el tipo
import type { CursoDetalle } from "../types/curso.types";

export interface CursoResumen {
  id: number;
  titulo: string;
  institucion: string;
  categoria: string;
  descripcion_corta: string;
  modalidad: string;
  precio: number;
}

interface CursosResponse {
  success: true;
  data: CursoResumen[];
  meta: PaginatedMeta;
}

export interface CursoFiltros {
  page?: number;
  limit?: number;
  busqueda?: string;
  categoria_id?: number;
  modalidad_id?: number;
  nivel_id?: number;
}

export const cursoService = {
  async listarPublicos(filtros: CursoFiltros): Promise<CursosResponse> {
    const params = new URLSearchParams();
    if (filtros.page) params.append("page", String(filtros.page));
    if (filtros.limit) params.append("limit", String(filtros.limit));
    if (filtros.busqueda) params.append("busqueda", filtros.busqueda);
    if (filtros.categoria_id) params.append("categoria_id", String(filtros.categoria_id));
    if (filtros.modalidad_id) params.append("modalidad_id", String(filtros.modalidad_id));
    if (filtros.nivel_id) params.append("nivel_id", String(filtros.nivel_id));

    // El backend espera la ruta /api/cursos
    return apiRequest<CursosResponse>(`/api/cursos?${params.toString()}`);
  },
  async obtenerPorId(id: number): Promise<{ success: true; data: CursoDetalle }> {
    return apiRequest<{ success: true; data: CursoDetalle }>(`/api/cursos/${id}`);
  },
};