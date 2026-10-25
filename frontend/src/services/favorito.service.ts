import { apiRequest } from "./api";

export interface FavoritoItem {
  id: number;
  curso_id: number;
  fecha: string;
  curso: {
    titulo: string;
    imagen_url: string | null;
    precio: number;
    categoria: string;
    modalidad: string;
    institucion: string;
  };
}

export const favoritoService = {
  async obtenerFavoritos(): Promise<FavoritoItem[]> {
    const res = await apiRequest<{ success: true; data: FavoritoItem[] }>("/api/favoritos");
    return res.data;
  },

  async agregarFavorito(cursoId: number): Promise<FavoritoItem> {
    const res = await apiRequest<{ success: true; data: FavoritoItem }>("/api/favoritos", {
      method: "POST",
      body: JSON.stringify({ curso_id: cursoId }),
    });
    return res.data;
  },

  async eliminarFavorito(cursoId: number): Promise<void> {
    await apiRequest<{ success: true }>(`/api/favoritos/${cursoId}`, {
      method: "DELETE",
    });
  },
};