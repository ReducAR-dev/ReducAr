// src/stores/auth.store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PerfilUsuario } from "../types/user.types";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  perfil: PerfilUsuario | null;
  isLoading: boolean;

  setSession: (
    accessToken: string,
    refreshToken: string,
    perfil: PerfilUsuario | null,
  ) => void;
  setPerfil: (perfil: PerfilUsuario) => void;
  setLoading: (isLoading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      perfil: null,
      isLoading: false,

      setSession: (accessToken, refreshToken, perfil) =>
        set({ accessToken, refreshToken, perfil }),

      setPerfil: (perfil) => set({ perfil }),

      setLoading: (isLoading) => set({ isLoading }),

      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          perfil: null,
          isLoading: false,
        }),
    }),
    {
      name: "reducar-auth",
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        perfil: state.perfil,
      }),
    },
  ),
);