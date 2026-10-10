// src/components/common/UserMenu.tsx
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/auth.store";
import { authService } from "../../services/auth.service";

export const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
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

  // Inicial SIEMPRE del email (como pediste).
  const inicial = perfil?.email?.[0]?.toUpperCase() ?? "?";

  // Nombre a mostrar: si hay nombre, lo uso; si no, el email.
  const nombreMostrado = perfil?.nombre
    ? `${perfil.nombre}${perfil.apellido ? " " + perfil.apellido : ""}`
    : (perfil?.email ?? "Usuario");

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
        {perfil?.fotoPerfil ? (
          <img
            src={perfil.fotoPerfil}
            alt={nombreMostrado}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="w-full h-full grid place-items-center bg-linear-to-br from-reducar-primary to-reducar-turquoise-dark text-white font-extrabold text-base">
            {inicial}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 p-2 bg-reducar-shell-surface border border-reducar-shell-border rounded-xl shadow-2xl z-50 animate-[dropdownIn_0.15s_ease-out]">
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

          <button
            type="button"
            onClick={() => handleNavigate("/novedades")}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-reducar-shell-text-secondary hover:bg-reducar-shell-hover hover:text-reducar-primary transition-colors"
          >
            Ver perfil
          </button>

          <button
            type="button"
            onClick={() => handleNavigate("/cursos")}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-reducar-shell-text-secondary hover:bg-reducar-shell-hover hover:text-reducar-primary transition-colors"
          >
            Configuración
          </button>

          <div className="my-1 h-px bg-reducar-shell-border" />

          <button
            type="button"
            onClick={handleLogout}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;