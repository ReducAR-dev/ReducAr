// src/services/auth.service.ts
import { apiRequest } from "./api";
import { useAuthStore } from "../stores/auth.store";
import type {
  ApiSuccess,
  SignupPayload,
  SignupResult,
  LoginPayload,
  LoginResult,
} from "../types/auth.types";
import type { PerfilUsuario } from "../types/user.types";

export const authService = {
  async signup(payload: SignupPayload): Promise<SignupResult> {
    const res = await apiRequest<ApiSuccess<SignupResult>>("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return res.data;
  },

  async login(payload: LoginPayload): Promise<LoginResult> {
    const res = await apiRequest<ApiSuccess<LoginResult>>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return res.data;
  },

  /**
   * Login + fetch del perfil completo.
   * Devuelve ambos para que el caller los guarde en el store.
   */
  async loginConPerfil(
    payload: LoginPayload,
  ): Promise<{ session: LoginResult; perfil: PerfilUsuario }> {
    const session = await this.login(payload);

    // Guardamos el token temporalmente para que el siguiente fetch lo use.
    useAuthStore
      .getState()
      .setSession(session.access_token, session.refresh_token, null);

    const perfilRes = await apiRequest<ApiSuccess<PerfilUsuario>>(
      "/api/usuarios/yo",
    );

    return { session, perfil: perfilRes.data };
  },

  async logout(): Promise<void> {
    try {
      await apiRequest<ApiSuccess<null>>("/api/auth/logout", { method: "POST" });
    } catch {
      // Aunque el back falle, el front cierra sesión igual.
    }
  },
};