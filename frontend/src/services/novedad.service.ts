// src/services/novedad.service.ts
import { apiRequest } from "./api";
import type { Novedad, PaginatedMeta } from "../types/novedad.types";

interface NovedadesResponse {
  success: true;
  data: Novedad[];
  meta: PaginatedMeta;
}

export const novedadService = {
  /**
   * Listado público de novedades activas y con fecha futura/hoy.
   * Soporta paginación vía query params.
   */
  async listarPublicas(page = 1, limit = 30): Promise<NovedadesResponse> {
    // apiRequest ya arma la URL con VITE_API_URL
    return apiRequest<NovedadesResponse>(
      `/api/novedades?page=${page}&limit=${limit}`,
    );
  },

  /**
   * Obtiene una novedad por ID (útil para la vista de detalle futura).
   */
  async obtenerPorId(id: number): Promise<Novedad> {
    const res = await apiRequest<{ success: true; data: Novedad }>(
      `/api/novedades/${id}`,
    );
    return res.data;
  },
};