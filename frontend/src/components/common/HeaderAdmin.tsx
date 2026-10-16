// src/components/common/HeaderAdmin.tsx
import { useEffect, useLayoutEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import logoReducar from "../../assets/logo-reducar.png";
import { useAuthStore } from "../../stores/auth.store";
import { UserMenu } from "./UserMenu";

type Theme = "light" | "dark";
const THEME_STORAGE_KEY = "theme";

function getInitialTheme(): Theme {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="w-5 h-5">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="w-5 h-5">
      <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export const HeaderAdmin = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  const accessToken = useAuthStore((s) => s.accessToken);
  const rol_id = useAuthStore((s) => s.perfil?.rol_id);
  const estaLogueado = !!accessToken;
  const esAdmin = rol_id === 1;

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        setTheme(e.matches ? "dark" : "light");
      }
    };
    systemTheme.addEventListener("change", handleChange);
    return () => systemTheme.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_STORAGE_KEY, next);
    setTheme(next);
  };

  // Si hay sesión pero no es admin, expulsar al home.
  // No es un problema de seguridad (el back protege), pero evita que un user
  // común vea el layout del panel vacío si escribe /admin a mano.
  if (estaLogueado && !esAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <header className="bg-reducar-shell-bg/95 backdrop-blur-md border-b border-reducar-shell-border sticky top-0 z-50 text-reducar-shell-text">
      <div className="w-full max-w-7xl mx-auto px-4 flex items-center gap-6 h-21">
        <Link
          to="/admin"
          className="flex items-center gap-2 shrink-0"
          aria-label="Ir al panel de administración"
        >
          <img src={logoReducar} alt="" className="h-12 w-auto" aria-hidden="true" />
          <span className="text-2xl font-extrabold text-white whitespace-nowrap">
            Reduc<span className="text-reducar-turquoise">AR</span>
          </span>
          <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full bg-reducar-primary/20 text-reducar-primary text-[10px] font-extrabold tracking-wider uppercase ml-1">
            Admin
          </span>
        </Link>

        <div className="flex items-center gap-2 ml-auto">
          <button
            className="p-2.5 rounded-xl bg-reducar-shell-surface border border-reducar-shell-border text-reducar-shell-text hover:bg-reducar-shell-hover hover:border-reducar-primary transition-colors"
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Activar modo claro" : "Activar modo oscuro"}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>

          {estaLogueado && <UserMenu />}
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;