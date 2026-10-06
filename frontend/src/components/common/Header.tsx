import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoReducar from "../../assets/logo-reducar.png";
import { SearchIcon } from "../features/Icons";
import Navbar from "./Navbar";

type Theme = "light" | "dark";
const THEME_STORAGE_KEY = "theme";

function getInitialTheme(): Theme {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const menuItems = [
  { label: "Inicio", path: "/" },
  { label: "Explorar cursos", path: "/cursos" },
  { label: "Rutas de aprendizaje", path: "/rutas" },
  { label: "Test vocacional", path: "/test" },
  { label: "Instituciones", path: "/instituciones" },
  { label: "Novedades", path: "/novedades" },
];

export const Header = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const navigate = useNavigate();

  // Aplicar el tema al HTML
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  // Escuchar cambios del sistema
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

  return (
    <header className="h-21 bg-reducar-surface/80 backdrop-blur-md border-b border-reducar-border flex items-center sticky top-0 z-50">
      <div className="w-full max-w-7xl mx-auto px-4 flex items-center gap-8">
        {/* Logo + Nombre */}
        <a href="/" className="flex items-center gap-2 shrink-0" aria-label="Ir al inicio de ReducAR">
          <img
            src={logoReducar}
            alt=""
            className="h-12 w-auto"
            aria-hidden="true"
          />
          <span className="text-2xl font-extrabold text-white">
            Reduc<span className="text-reducar-turquoise">AR</span>
          </span>
        </a>

        {/* Navbar de escritorio */}
        <Navbar items={menuItems} className="hidden lg:flex flex-1" />

        {/* Acciones del header */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            className="p-2.5 rounded-xl bg-reducar-surface border border-reducar-border text-reducar-text hover:bg-reducar-primary-light hover:border-reducar-primary transition-colors"
            type="button"
            aria-label="Buscar"
            onClick={() => navigate("/cursos")}
          >
            <SearchIcon className="w-5 h-5" />
          </button>

          <button
            className="p-2.5 rounded-xl bg-reducar-surface border border-reducar-border text-reducar-text hover:bg-reducar-primary-light hover:border-reducar-primary transition-colors"
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Activar modo claro" : "Activar modo oscuro"}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            className="hidden lg:inline-flex items-center justify-center h-11 px-5 rounded-xl border border-reducar-primary text-reducar-primary font-bold hover:bg-reducar-primary-light transition-colors"
            type="button"
            onClick={() => navigate("/login")}
          >
            Iniciar sesión
          </button>

          <button
            className="hidden lg:inline-flex items-center justify-center h-11 px-5 rounded-xl bg-linear-to-r from-reducar-primary to-reducar-turquoise-dark text-white font-bold hover:shadow-lg transition-shadow"
            type="button"
            onClick={() => navigate("/registro")}
          >
            Registrarme
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;