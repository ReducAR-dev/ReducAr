// src/components/common/UserMenu.tsx
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../stores/auth.store";
import { authService } from "../../services/auth.service";

export const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
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
    await authService.logout();
    logout();
    setIsOpen(false);
    navigate("/");
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
        {/* Encabezado: nombre + email */}
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

        {/* ====== CONTEXTO ADMIN ====== */}
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
              Mi perfil
            </button>
          </>
        ) : (
          /* ====== CONTEXTO PÚBLICO ====== */
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
              Mi perfil
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

            {/* Panel admin: solo si rol_id === 1 */}
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

        {/* Cerrar sesión */}
        <div className="my-1 h-px border-t border-reducar-shell-border" />
        <button
          type="button"
          onClick={handleLogout}
          className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
