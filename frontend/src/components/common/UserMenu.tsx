// src/components/common/UserMenu.tsx
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query"; // <-- Importante
import { useAuthStore } from "../../stores/auth.store";
import { authService } from "../../services/auth.service";

export const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const queryClient = useQueryClient(); // <-- Hook de TanStack Query

  const perfil = useAuthStore((s) => s.perfil);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await authService.logout(); // Cierra sesión en el backend
      
      // 3. Purga de caché y estado global
      logout(); // Limpia Zustand (y el localStorage de reducar-auth automáticamente)
      queryClient.clear(); // Limpia TODA la caché de React Query (evita fugas de datos entre usuarios)
      
      setIsOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión", error);
      // Fallback: incluso si el backend falla, limpiamos el frontend por seguridad
      logout();
      queryClient.clear();
      setIsOpen(false);
      navigate("/");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const inicial = perfil?.email?.[0]?.toUpperCase() ?? "?";
  const nombreMostrado = perfil?.nombre
    ? `${perfil.nombre}${perfil.apellido ? " " + perfil.apellido : ""}`
    : (perfil?.email ?? "Usuario");

  const esAdmin = perfil?.rol_id === 1;
  const esContextoAdmin = pathname.startsWith("/admin");

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menú de usuario"
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="w-11 h-11 rounded-full overflow-hidden border-2 border-reducar-primary/60 hover:border-reducar-primary transition-colors shrink-0"
      >
        {perfil?.foto_perfil ? (
          <img
            src={perfil.foto_perfil}
            alt={nombreMostrado}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="w-full h-full grid place-items-center bg-linear-to-br from-reducar-primary to-reducar-turquoise-dark text-white font-extrabold text-base">
            {inicial}
          </span>
        )}
      </button>

      <div
        className={`absolute top-full right-0 mt-2 w-64 p-2 bg-reducar-shell-surface border border-reducar-shell-border rounded-xl shadow-2xl z-50 transition-all duration-150 ease-out origin-top-right ${
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto translate-y-0"
            : "opacity-0 scale-95 pointer-events-none -translate-y-1"
        }`}
      >
        <div className="px-3 py-2 border-b border-reducar-shell-border mb-1">
          <p className="text-sm font-bold text-reducar-shell-text truncate">
            {nombreMostrado}
          </p>
          {perfil?.email && (
            <p className="text-xs text-reducar-shell-text-secondary truncate">
              {perfil.email}
            </p>
          )}
        </div>

        {esContextoAdmin ? (
          <>
            <button
              type="button"
              onClick={() => handleNavigate("/")}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-reducar-shell-text hover:bg-reducar-shell-hover hover:text-reducar-primary transition-colors"
            >
              Volver al sitio
            </button>
            <button
              type="button"
              onClick={() => handleNavigate("/perfil")}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-reducar-shell-text-secondary hover:bg-reducar-shell-hover hover:text-reducar-primary transition-colors"
            >
              Mis datos
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => handleNavigate("/mi-cuenta")}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-reducar-shell-text hover:bg-reducar-shell-hover hover:text-reducar-primary transition-colors"
            >
              Mi cuenta
            </button>
            <button
              type="button"
              onClick={() => handleNavigate("/perfil")}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-reducar-shell-text-secondary hover:bg-reducar-shell-hover hover:text-reducar-primary transition-colors"
            >
              Mis datos
            </button>
            <button
              type="button"
              onClick={() => handleNavigate("/mi-cuenta/favoritos")}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-reducar-shell-text-secondary hover:bg-reducar-shell-hover hover:text-reducar-primary transition-colors"
            >
              Mis favoritos
            </button>
            <button
              type="button"
              onClick={() => handleNavigate("/mi-cuenta/cursos")}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-reducar-shell-text-secondary hover:bg-reducar-shell-hover hover:text-reducar-primary transition-colors"
            >
              Mis cursos
            </button>
            <button
              type="button"
              onClick={() => handleNavigate("/mi-cuenta/reportes")}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-reducar-shell-text-secondary hover:bg-reducar-shell-hover hover:text-reducar-primary transition-colors"
            >
              Mis reportes
            </button>

            {esAdmin && (
              <>
                <div className="my-1 h-px border-t border-reducar-shell-border" />
                <button
                  type="button"
                  onClick={() => handleNavigate("/admin")}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold text-reducar-primary hover:bg-reducar-primary/10 transition-colors"
                >
                  Panel admin
                </button>
              </>
            )}
          </>
        )}

        <div className="my-1 h-px border-t border-reducar-shell-border" />
        
        {/* Botón de Cerrar Sesión con Animación */}
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoggingOut ? (
            <>
              <svg className="animate-spin h-4 w-4 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Cerrando sesión...
            </>
          ) : (
            "Cerrar sesión"
          )}
        </button>
      </div>
    </div>
  );
};

export default UserMenu;