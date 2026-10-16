// src/hooks/useAuth.ts
import { useCallback } from "react";
import { useAuthStore } from "../stores/auth.store";
import { authService } from "../services/auth.service";
import { userService } from "../services/user.service";
import type { LoginPayload, SignupPayload } from "../types/auth.types";
import type { ActualizarPerfilPayload } from "../types/user.types";

export const useAuth = () => {
  const accessToken = useAuthStore((s) => s.accessToken);
  const perfil = useAuthStore((s) => s.perfil);
  const isLoading = useAuthStore((s) => s.isLoading);
  const setSession = useAuthStore((s) => s.setSession);
  const setPerfil = useAuthStore((s) => s.setPerfil);
  const setLoading = useAuthStore((s) => s.setLoading);
  const clearSession = useAuthStore((s) => s.logout);

  const isAuthenticated = !!accessToken;

  /** Login regular: trae tokens + perfil completo en una sola pasada. */
  const login = useCallback(
    async (payload: LoginPayload) => {
      const result = await authService.loginConPerfil(payload);
      setSession(
        result.session.access_token,
        result.session.refresh_token,
        result.perfil,
      );
      return result;
    },
    [setSession],
  );

  /**
   * Registro + auto-login.
   * El perfil se completa automáticamente porque loginConPerfil
   * hace la segunda llamada a /api/usuarios/yo.
   */
  const register = useCallback(
    async (payload: SignupPayload) => {
      await authService.signup(payload);
      const result = await authService.loginConPerfil({
        email: payload.email,
        password: payload.password,
      });
      setSession(
        result.session.access_token,
        result.session.refresh_token,
        result.perfil,
      );
      return result;
    },
    [setSession],
  );

  const logout = useCallback(async () => {
    await authService.logout();
    clearSession();
  }, [clearSession]);

  /**
   * Fetches el perfil completo desde el backend.
   * Útil al recargar, después de un cambio, o para refrescar datos.
   */
  const fetchPerfil = useCallback(async () => {
    setLoading(true);
    try {
      const data = await userService.obtenerMiPerfil();
      setPerfil(data);
      return data;
    } finally {
      setLoading(false);
    }
  }, [setPerfil, setLoading]);

  /** PATCH del perfil. Actualiza el store con la respuesta del back. */
  const updatePerfil = useCallback(
    async (payload: ActualizarPerfilPayload) => {
      const data = await userService.actualizarMiPerfil(payload);
      setPerfil(data);
      return data;
    },
    [setPerfil],
  );

  return {
    user: perfil,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    fetchPerfil,
    updatePerfil,
  };
};