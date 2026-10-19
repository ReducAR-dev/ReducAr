// src/components/common/Header.tsx
import { useEffect, useLayoutEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoReducar from "../../assets/logo-reducar.png";
import Navbar from "./Navbar";
import { useAuthStore } from "../../stores/auth.store";
import { UserMenu } from "./UserMenu";
import { authService } from "../../services/auth.service";

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

function ShoppingCartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="w-5 h-5">
      <circle cx="9" cy="21" r="1" stroke="currentColor" strokeWidth="2" />
      <circle cx="20" cy="21" r="1" stroke="currentColor" strokeWidth="2" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Menú principal: 5 items, sin "Inicio".
// El logo (arriba a la izquierda) cumple la función de "ir al home".
const menuItems = [
  { label: "Explorar cursos", shortLabel: "Cursos", path: "/cursos" },
  { label: "Rutas de aprendizaje", shortLabel: "Rutas", path: "/rutas" },
  { label: "Test vocacional", shortLabel: "Test", path: "/test" },
  { label: "Instituciones", path: "/instituciones" },
  { label: "Novedades", path: "/novedades" },
];

// Dropdown "Más": confianza + soporte.
const dropdownItems = [
  { label: "Cómo funciona", path: "/como-funciona" },
  { label: "Nosotros", path: "/nosotros" },
  { label: "Testimonios", path: "/testimonios" },
  { label: "Ayuda", path: "/ayuda" },
  { label: "Contacto", path: "/contacto" },
];

export const Header = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const accessToken = useAuthStore((s) => s.accessToken);
  const rol_id = useAuthStore((s) => s.perfil?.rol_id);
  const logout = useAuthStore((s) => s.logout);
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

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

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

  const handleLogoutMobile = async () => {
    await authService.logout();
    logout();
    handleNavigate("/");
  };

  return (
    <header className="bg-reducar-shell-bg/95 backdrop-blur-md border-b border-reducar-shell-border sticky top-0 z-50 text-reducar-shell-text shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 flex items-center justify-between gap-2 lg:gap-6 h-18 lg:h-21">
        <Link to="/" className="flex items-center gap-1.5 sm:gap-2 shrink-0 lg:mr-6 rounded-xl" aria-label="Ir al inicio de ReducAr">
          <img src={logoReducar} alt="" className="h-9 sm:h-11 lg:h-12 w-auto" aria-hidden="true" />
          <span className="hidden min-[360px]:inline text-lg sm:text-xl lg:text-2xl font-extrabold text-white whitespace-nowrap tracking-tight">
            Reduc<span className="text-reducar-turquoise">Ar</span>
          </span>
        </Link>

        <Navbar items={menuItems} dropdownItems={dropdownItems} className="hidden lg:flex justify-center flex-1" />

        <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
          <button
            className="w-11 h-11 grid place-items-center rounded-xl bg-reducar-shell-surface border border-reducar-shell-border text-reducar-shell-text hover:bg-reducar-shell-hover hover:border-reducar-primary transition-colors"
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Activar modo claro" : "Activar modo oscuro"}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            className="w-11 h-11 grid place-items-center rounded-xl bg-reducar-shell-surface border border-reducar-shell-border text-reducar-shell-text hover:bg-reducar-shell-hover hover:border-reducar-primary transition-colors relative"
            type="button"
            onClick={() => navigate("/carrito")}
            aria-label="Ver carrito de compras"
          >
            <ShoppingCartIcon />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-reducar-primary text-[10px] font-bold text-white flex items-center justify-center">
              2
            </span>
          </button>

          {estaLogueado ? (
            <>
              <div className="ml-2">
                <UserMenu />
              </div>

              <button
                type="button"
                className="lg:hidden w-11 h-11 grid place-items-center rounded-xl bg-reducar-shell-surface border border-reducar-shell-border text-reducar-shell-text hover:bg-reducar-shell-hover transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation"
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
            </>
          ) : (
            <>
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
                className="lg:hidden w-11 h-11 grid place-items-center rounded-xl bg-reducar-shell-surface border border-reducar-shell-border text-reducar-shell-text hover:bg-reducar-shell-hover transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation"
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
            </>
          )}
        </div>
      </div>

      {isMobileMenuOpen && (
        <div id="mobile-navigation" className="lg:hidden border-t border-reducar-shell-border bg-reducar-shell-bg animate-[slideDown_0.2s_ease-out] shadow-2xl">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 max-h-[calc(100dvh-72px)] overflow-y-auto overscroll-contain">
            <Navbar items={menuItems} dropdownItems={dropdownItems} isMobile onItemClick={closeMobileMenu} />

            <div className="mt-4 pt-4 border-t border-reducar-shell-border flex flex-col gap-2">
              {estaLogueado ? (
                <>
                  <button
                    type="button"
                    onClick={() => handleNavigate("/mi-cuenta")}
                    className="w-full h-11 inline-flex items-center justify-center rounded-xl bg-reducar-primary text-white font-bold hover:bg-reducar-primary-dark transition-colors"
                  >
                    Mi cuenta
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavigate("/perfil")}
                    className="w-full h-11 inline-flex items-center justify-center rounded-xl border border-reducar-shell-border text-reducar-shell-text font-bold hover:bg-reducar-shell-hover transition-colors"
                  >
                    Mi perfil
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavigate("/mi-cuenta/favoritos")}
                    className="w-full h-11 inline-flex items-center justify-center rounded-xl border border-reducar-shell-border text-reducar-shell-text font-bold hover:bg-reducar-shell-hover transition-colors"
                  >
                    Mis favoritos
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavigate("/mi-cuenta/cursos")}
                    className="w-full h-11 inline-flex items-center justify-center rounded-xl border border-reducar-shell-border text-reducar-shell-text font-bold hover:bg-reducar-shell-hover transition-colors"
                  >
                    Mis cursos
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavigate("/mi-cuenta/reportes")}
                    className="w-full h-11 inline-flex items-center justify-center rounded-xl border border-reducar-shell-border text-reducar-shell-text font-bold hover:bg-reducar-shell-hover transition-colors"
                  >
                    Mis reportes
                  </button>

                  {esAdmin && (
                    <button
                      type="button"
                      onClick={() => handleNavigate("/admin")}
                      className="w-full h-11 inline-flex items-center justify-center rounded-xl border border-reducar-primary text-reducar-primary font-bold hover:bg-reducar-primary/10 transition-colors"
                    >
                      Panel admin
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleLogoutMobile}
                    className="w-full h-11 inline-flex items-center justify-center rounded-xl bg-red-500/10 text-red-400 font-bold hover:bg-red-500/20 transition-colors"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
