// src/components/common/Header.tsx
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoReducar from "../../assets/logo-reducar.png";
import Navbar from "./Navbar";

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

const menuItems = [
  { label: "Inicio", path: "/" },
  { label: "Explorar cursos", shortLabel: "Cursos", path: "/cursos" },
  { label: "Rutas de aprendizaje", shortLabel: "Rutas", path: "/rutas" },
  { label: "Test vocacional", shortLabel: "Test", path: "/test" },
  { label: "Instituciones", path: "/instituciones" },
  { label: "Novedades", path: "/novedades" },
];

const dropdownItems = [
  { label: "Nosotros", path: "/nosotros" },
  { label: "Ayuda", path: "/ayuda" },
  { label: "Contacto", path: "/contacto" },
  { label: "Preguntas frecuentes", path: "/preguntas-frecuentes" },
  { label: "Políticas de privacidad", path: "/politicas-privacidad" },
  { label: "Términos y condiciones", path: "/terminos-condiciones" },
];

export const Header = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

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

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const handleNavigate = (path: string) => {
    navigate(path);
    closeMobileMenu();
  };

  return (
    <header className="bg-reducar-shell-bg/95 backdrop-blur-md border-b border-reducar-shell-border sticky top-0 z-50 text-reducar-shell-text">
      <div className="w-full max-w-7xl mx-auto px-4 flex items-center gap-6 h-21">
        <a href="/" className="flex items-center gap-2 shrink-0" aria-label="Ir al inicio de ReducAR">
          <img src={logoReducar} alt="" className="h-12 w-auto" aria-hidden="true" />
          <span className="text-2xl font-extrabold text-white whitespace-nowrap">
            Reduc<span className="text-reducar-turquoise">AR</span>
          </span>
        </a>

        <Navbar items={menuItems} dropdownItems={dropdownItems} className="hidden lg:flex flex-1" />

        <div className="flex items-center gap-2 ml-auto">
          <button
            className="p-2.5 rounded-xl bg-reducar-shell-surface border border-reducar-shell-border text-reducar-shell-text hover:bg-reducar-shell-hover hover:border-reducar-primary transition-colors"
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Activar modo claro" : "Activar modo oscuro"}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            className="hidden lg:inline-flex items-center justify-center h-11 px-5 rounded-xl border border-reducar-primary text-reducar-primary font-bold hover:bg-reducar-primary/10 transition-colors whitespace-nowrap"
            type="button"
            onClick={() => navigate("/login")}
          >
            Iniciar sesión
          </button>

          <button
            className="hidden lg:inline-flex items-center justify-center h-11 px-5 rounded-xl bg-linear-to-r from-reducar-primary to-reducar-turquoise-dark text-white font-bold hover:shadow-lg transition-shadow whitespace-nowrap"
            type="button"
            onClick={() => navigate("/registro")}
          >
            Registrarme
          </button>

          <button
            type="button"
            className="lg:hidden p-2.5 rounded-xl bg-reducar-shell-surface border border-reducar-shell-border text-reducar-shell-text hover:bg-reducar-shell-hover transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M6 6L18 18M18 6L6 18" strokeLinecap="round" />
              </svg>
            ) : (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-reducar-shell-border bg-reducar-shell-bg animate-[slideDown_0.2s_ease-out]">
          <div className="max-w-7xl mx-auto px-4 py-4 max-h-[calc(100vh-84px)] overflow-y-auto">
            <Navbar items={menuItems} dropdownItems={dropdownItems} isMobile onItemClick={closeMobileMenu} />

            <div className="mt-4 pt-4 border-t border-reducar-shell-border flex flex-col gap-2">
              <button
                type="button"
                onClick={() => handleNavigate("/login")}
                className="w-full h-11 inline-flex items-center justify-center rounded-xl border border-reducar-primary text-reducar-primary font-bold hover:bg-reducar-primary/10 transition-colors"
              >
                Iniciar sesión
              </button>
              <button
                type="button"
                onClick={() => handleNavigate("/registro")}
                className="w-full h-11 inline-flex items-center justify-center rounded-xl bg-linear-to-r from-reducar-primary to-reducar-turquoise-dark text-white font-bold hover:shadow-lg transition-shadow"
              >
                Registrarme
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;