// src/services/colaboracion.service.ts
import { apiRequest } from "./api";

export interface PreferenciaColaboracionResponse {
  success: true;
  message: string;
  data: {
    id: string;
    init_point: string;
    sandbox_init_point: string | null;
  };
}

export const colaboracionService = {
  async crearPreferencia(monto: number): Promise<PreferenciaColaboracionResponse> {
    return apiRequest<PreferenciaColaboracionResponse>("/api/colaboraciones", {
      method: "POST",
      body: JSON.stringify({ monto }),
    });
  },
};
