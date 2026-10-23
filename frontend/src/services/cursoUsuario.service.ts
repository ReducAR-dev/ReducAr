import { apiRequest } from "./api";

export interface CursoAdquiridoItem {
  id: number;
  curso_id: number;
  fecha_adquisicion: string;
  fecha_finalizacion: string | null;
  curso: {
    titulo: string;
    imagen_url: string | null;
    precio: number;
    categoria: string;
    modalidad: string;
    institucion: string;
  };
}

export interface MisCursosResponse {
  success: true;
  data: CursoAdquiridoItem[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const cursoUsuarioService = {
  async obtenerMisCursos(page = 1, limit = 30): Promise<MisCursosResponse> {
    return apiRequest<MisCursosResponse>(`/api/curso-usuario?page=${page}&limit=${limit}`);
  },

  async eliminarCurso(cursoId: number): Promise<void> {
    await apiRequest<{ success: true }>(`/api/curso-usuario/${cursoId}`, {
      method: "DELETE",
    });
  },

  async adquirirCurso(cursoId: number): Promise<void> {
    await apiRequest<{ success: true }>("/api/curso-usuario", {
      method: "POST",
      body: JSON.stringify({ curso_id: cursoId }),
    });
  },
};