// src/components/AuthBootstrap.tsx
import { useEffect, useRef } from "react";
import { useAuthStore } from "../stores/auth.store";
import { useAuth } from "../hooks/useAuth";

export const AuthBootstrap = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const didInit = useRef(false);
  const { fetchPerfil } = useAuth();

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;

    const { accessToken, perfil } = useAuthStore.getState();

    // Si hay sesión pero no tenemos perfil, lo intentamos recuperar.
    // Si falla (401), api.ts ya dispara logout automático.
    if (accessToken && !perfil) {
      fetchPerfil().catch(() => {
        // silencio: el apiRequest ya hizo logout si fue 401
      });
    }
  }, [fetchPerfil]);

  return <>{children}</>;
};