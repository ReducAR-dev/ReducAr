import { useCallback } from "react";
import { useAuthStore } from "../stores/auth.store";
import { authService } from "../services/auth.service";
import { userService } from "../services/user.service";
import type {
  LoginPayload,
  SignupPayload,
  OAuthProvider,
  ForgotPasswordPayload,
} from "../types/auth.types";
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

  const loginConOAuth = useCallback(async (provider: OAuthProvider) => {
    const url = await authService.getOAuthUrl(provider);
    window.location.href = url;
  }, []);

  const completeOAuthLogin = useCallback(
    async (code: string) => {
      const session = await authService.exchangeOAuthCode(code);

      useAuthStore
        .getState()
        .setSession(session.access_token, session.refresh_token, null);

      try {
        const data = await userService.obtenerMiPerfil();
        setSession(session.access_token, session.refresh_token, data);
        return data;
      } catch (err) {
        clearSession();
        throw err;
      }
    },
    [setSession, clearSession],
  );

  // ⬇️ NUEVO: dispara el mail de recuperación. El back habla con Supabase.
  const forgotPassword = useCallback(
    async (payload: ForgotPasswordPayload) => {
      return authService.forgotPassword(payload);
    },
    [],
  );

  const uploadFoto = useCallback(
    async (file: File) => {
      const data = await userService.subirFotoPerfil(file);
      setPerfil(data);
      return data;
    },
    [setPerfil],
  );

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
    loginConOAuth,
    completeOAuthLogin,
    forgotPassword, // ⬅️ NUEVO
    register,
    logout,
    fetchPerfil,
    updatePerfil,
    uploadFoto,
  };
};