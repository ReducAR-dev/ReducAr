import { apiRequest } from "./api";
import { useAuthStore } from "../stores/auth.store";
import type { ApiSuccess } from "../types/api.types";
import type {
  SignupPayload,
  SignupResult,
  LoginPayload,
  LoginResult,
  OAuthProvider,
  OAuthUrlResult,
  ForgotPasswordPayload,
  ForgotPasswordResult,
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
    useAuthStore
      .getState()
      .setSession(session.access_token, session.refresh_token, null);
    const perfilRes = await apiRequest<ApiSuccess<PerfilUsuario>>(
      "/api/usuarios/yo",
    );
    return { session, perfil: perfilRes.data };
  },

  /**
   * Pide al backend la URL de autorización de Supabase para un proveedor OAuth.
   * El backend arma la URL con su propia sesión de Supabase (PKCE), y el front
   * solo se encarga de redirigir al navegador. El front nunca ve credenciales
   * de Supabase.
   */
  async getOAuthUrl(provider: OAuthProvider): Promise<string> {
    const res = await apiRequest<ApiSuccess<OAuthUrlResult>>(
      `/api/auth/oauth/${provider}`,
    );
    return res.data.url;
  },

  /**
   * Canjea el "code" de un solo uso que el backend entrega en el callback
   * por una sesión real (access_token + refresh_token + user).
   */
  async exchangeOAuthCode(code: string): Promise<LoginResult> {
    const res = await apiRequest<ApiSuccess<LoginResult>>(
      "/api/auth/oauth/exchange",
      {
        method: "POST",
        body: JSON.stringify({ code }),
      },
    );
    return res.data;
  },

  async logout(): Promise<void> {
    try {
      await apiRequest<ApiSuccess<null>>("/api/auth/logout", { method: "POST" });
    } catch {
      // Aunque el back falle, el front cierra sesión igual.
    }
  },

  /**
   * Pide al backend que envíe el mail de recuperación.
   * El backend es quien llama a Supabase; el front nunca ve la anon key.
   */
  async forgotPassword(
    payload: ForgotPasswordPayload,
  ): Promise<ForgotPasswordResult> {
    const res = await apiRequest<ApiSuccess<ForgotPasswordResult>>(
      "/api/auth/forgot-password",
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
    );
    return res.data;
  },
};