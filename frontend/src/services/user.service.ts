// src/services/user.service.ts
import { apiRequest } from "./api";
import type { ApiSuccess } from "../types/auth.types";
import type { PerfilUsuario } from "../types/user.types";

export const userService = {
  async obtenerMiPerfil(): Promise<PerfilUsuario> {
    const res = await apiRequest<ApiSuccess<PerfilUsuario>>("/api/usuarios/yo");
    return res.data;
  },
};