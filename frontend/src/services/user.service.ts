// src/services/user.service.ts
import { apiRequest } from "./api";
import { useAuthStore } from "../stores/auth.store";
import type { ApiSuccess } from "../types/auth.types";
import type {
  PerfilUsuario,
  ActualizarPerfilPayload,
} from "../types/user.types";

export const userService = {
  async obtenerMiPerfil(): Promise<PerfilUsuario> {
    const res = await apiRequest<ApiSuccess<PerfilUsuario>>("/api/usuarios/yo");
    return res.data;
  },

  async actualizarMiPerfil(
    payload: ActualizarPerfilPayload,
  ): Promise<PerfilUsuario> {
    const res = await apiRequest<ApiSuccess<PerfilUsuario>>(
      "/api/usuarios/yo",
      {
        method: "PATCH",
        body: JSON.stringify(payload),
      },
    );
    return res.data;
  },

  /**
   * Sube un archivo de imagen al backend.
   *
   * ⚠️ NO usa `apiRequest` porque este fuerza `Content-Type: application/json`.
   * Para archivos, el navegador debe poner `multipart/form-data` con boundary,
   * por eso usamos `fetch` directo.
   */
  async subirFotoPerfil(file: File): Promise<PerfilUsuario> {
    const formData = new FormData();
    formData.append("avatar", file); // ← mismo nombre que multer.single()

    const token = useAuthStore.getState().accessToken;

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/usuarios/yo/foto`,
      {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        // ⚠️ NO agregar "Content-Type". El navegador lo arma solo.
        body: formData,
      },
    );

    if (!response.ok) {
      let message = `Error ${response.status}`;
      try {
        const body = await response.json();
        message = body?.error ?? body?.details?.map((d: any) => d.message).join(" · ") ?? message;
      } catch {}
      if (response.status === 401) {
        useAuthStore.getState().logout();
      }
      throw new Error(message);
    }

    const body = (await response.json()) as ApiSuccess<PerfilUsuario>;
    return body.data;
  },
};