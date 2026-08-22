import { useEffect, useLayoutEffect, useState } from "react";
import logoReducar from "../assets/logo-reducar.png";
import { SearchIcon } from "./Icons";

type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "theme";

function getInitialTheme(): Theme {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

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
  "Inicio",
  "Explorar cursos",
  "Rutas de aprendizaje",
  "Test vocacional",
  "Novedades",
  "Instituciones",
];

function Header() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    if (localStorage.getItem(THEME_STORAGE_KEY)) {
      return;
    }

    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      setTheme(event.matches ? "dark" : "light");
    };

    systemTheme.addEventListener("change", handleSystemThemeChange);

    return () => {
      systemTheme.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    setTheme(nextTheme);
  };

  return (
    <header className="home-header">
      <div className="home-header-container">
        <a href="#" className="home-logo" aria-label="Ir al inicio">
          <img src={logoReducar} alt="Logo de ReducAR" />
        </a>

        <nav className="home-nav">
          {menuItems.map((item, index) => (
            <a
              key={item}
              href="#"
              className={`home-nav-link ${
                index === 0 ? "home-nav-link-active" : ""
              }`}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="home-header-actions">
          <button
            className="home-icon-button"
            type="button"
            aria-label="Buscar"
          >
            <SearchIcon />
          </button>

          <button
            className="home-theme-button"
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "Activar modo claro" : "Activar modo oscuro"
            }
            title={
              theme === "dark" ? "Activar modo claro" : "Activar modo oscuro"
            }
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>

          <button className="home-login-button" type="button">
            Iniciar sesión
          </button>

          <button className="home-register-button" type="button">
            Registrarme
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
