// src/services/user.service.ts
import { apiRequest } from "./api";
import type { ApiSuccess } from "../types/auth.types";
import type { PerfilUsuario, ActualizarPerfilPayload } from "../types/user.types";

export const userService = {
  /** GET /api/usuarios/yo — trae el perfil completo del usuario logueado. */
  async obtenerMiPerfil(): Promise<PerfilUsuario> {
    const res = await apiRequest<ApiSuccess<PerfilUsuario>>(
      "/api/usuarios/yo",
    );
    return res.data;
  },

  /** PATCH /api/usuarios/yo — actualiza los campos whitelisted. */
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
};