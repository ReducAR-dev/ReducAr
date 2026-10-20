// src/components/common/Header.tsx
import { useEffect, useLayoutEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
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

const menuItems = [
  { label: "Explorar cursos", shortLabel: "Cursos", path: "/cursos" },
  { label: "Rutas de aprendizaje", shortLabel: "Rutas", path: "/rutas" },
  { label: "Test vocacional", shortLabel: "Test", path: "/test" },
  { label: "Instituciones", path: "/instituciones" },
  { label: "Novedades", path: "/novedades" },
];

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
  const [isMobileUserMenuOpen, setIsMobileUserMenuOpen] = useState(false);
  const [isLoggingOutMobile, setIsLoggingOutMobile] = useState(false);
  
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const queryClient = useQueryClient();

  const accessToken = useAuthStore((s) => s.accessToken);
  const perfil = useAuthStore((s) => s.perfil);
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

  // Cerrar menús al cambiar de ruta
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileUserMenuOpen(false);
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
    try {
      setIsLoggingOutMobile(true);
      await authService.logout();
      logout();
      queryClient.clear();
      closeMobileMenu();
      navigate("/");
    } catch (error) {
      logout();
      queryClient.clear();
      closeMobileMenu();
      navigate("/");
    } finally {
      setIsLoggingOutMobile(false);
    }
  };

  const inicial = perfil?.email?.[0]?.toUpperCase() ?? "?";
  const nombreMostrado = perfil?.nombre
    ? `${perfil.nombre}${perfil.apellido ? " " + perfil.apellido : ""}`
    : (perfil?.email ?? "Usuario");

  return (
    <header className="bg-reducar-shell-bg/95 backdrop-blur-md border-b border-reducar-shell-border sticky top-0 z-50 text-reducar-shell-text shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4 h-13.5 lg:h-15">

        {/* LOGO */}
        <div className="flex-1 flex justify-start">
          <Link to="/" className="flex items-center gap-2 shrink-0 rounded-xl" aria-label="Ir al inicio de ReducAr">
            <img src={logoReducar} alt="" className="h-8 sm:h-10 lg:h-11 w-auto" aria-hidden="true" />
            <span className="hidden min-[360px]:inline text-lg sm:text-xl lg:text-2xl font-extrabold text-white whitespace-nowrap tracking-tight">
              Reduc<span className="text-reducar-turquoise">Ar</span>
            </span>
          </Link>
        </div>

        {/* NAVBAR DESKTOP */}
        <div className="hidden lg:flex flex-none">
          <Navbar items={menuItems} dropdownItems={dropdownItems} />
        </div>

        {/* ACCIONES DERECHA */}
        <div className="flex-1 flex justify-end items-center gap-2.5 sm:gap-2">
          
          <button
            className="w-10 h-10 shrink-0 aspect-square grid place-items-center rounded-xl bg-reducar-shell-surface border border-reducar-shell-border text-reducar-shell-text hover:bg-reducar-shell-hover hover:border-reducar-primary transition-colors"
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Activar modo claro" : "Activar modo oscuro"}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>

          {estaLogueado && (
            <button
              className="hidden lg:grid w-11 h-11 place-items-center rounded-xl bg-reducar-shell-surface border border-reducar-shell-border text-reducar-shell-text hover:bg-reducar-shell-hover hover:border-reducar-primary transition-colors relative"
              type="button"
              onClick={() => navigate("/carrito")}
              aria-label="Ver carrito de compras"
            >
              <ShoppingCartIcon />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-reducar-primary text-[10px] font-bold text-white flex items-center justify-center">
                2
              </span>
            </button>
          )}

          {/* DESKTOP: Menú de usuario clásico */}
          {estaLogueado ? (
            <div className="hidden lg:block ml-1">
              <UserMenu />
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-2">
              <button
                className="inline-flex items-center justify-center h-10 px-6 rounded-xl border border-reducar-primary text-reducar-primary text-[13px] font-bold hover:bg-reducar-primary/10 transition-colors whitespace-nowrap"
                type="button"
                onClick={() => navigate("/login")}
              >
                Iniciar sesión
              </button>
              <button
                className="inline-flex items-center justify-center h-10 px-6 rounded-xl bg-linear-to-r from-reducar-primary to-reducar-turquoise-dark text-white text-[13px] font-bold hover:shadow-lg transition-shadow whitespace-nowrap"
                type="button"
                onClick={() => navigate("/registro")}
              >
                Registrarme
              </button>
            </div>
          )}

          {/* BOTÓN HAMBURGUESA (Móvil/Tablet) */}
          <button
            type="button"
            className="lg:hidden w-10 h-10 grid place-items-center rounded-xl bg-reducar-shell-surface border border-reducar-shell-border text-reducar-shell-text hover:bg-reducar-shell-hover transition-colors"
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

      {/* ===== MENÚ MÓVIL FLOTANTE ===== */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-4 right-4 mt-2 bg-reducar-shell-bg border border-reducar-shell-border rounded-2xl shadow-2xl overflow-hidden animate-[slideDown_0.2s_ease-out] z-50 flex flex-col max-h-[calc(100dvh-80px)]">
          <div className="overflow-y-auto overscroll-contain p-4">
            
            {/* SECCIÓN DE USUARIO (Solo si está logueado) */}
            {estaLogueado && (
              <div className="mb-4">
                <button
                  onClick={() => setIsMobileUserMenuOpen(!isMobileUserMenuOpen)}
                  className="w-full flex items-center justify-between p-3 rounded-2xl bg-reducar-shell-surface border border-reducar-shell-border hover:border-reducar-primary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {perfil?.foto_perfil ? (
                      <img src={perfil.foto_perfil} alt={nombreMostrado} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-reducar-primary to-reducar-turquoise-dark grid place-items-center text-white font-extrabold">
                        {inicial}
                      </div>
                    )}
                    <div className="text-left">
                      <p className="text-sm font-bold text-white">{nombreMostrado}</p>
                      <p className="text-xs text-reducar-shell-text-secondary">{perfil?.email}</p>
                    </div>
                  </div>
                  <svg className={`w-5 h-5 text-reducar-shell-text-secondary transition-transform ${isMobileUserMenuOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown interno de usuario */}
                {isMobileUserMenuOpen && (
                  <div className="mt-2 p-2 rounded-2xl bg-reducar-shell-surface border border-reducar-shell-border space-y-1 animate-[fadeIn_0.2s_ease-out]">
                    <button onClick={() => handleNavigate("/mi-cuenta")} className="w-full text-left px-3 py-2.5 rounded-xl text-sm text-reducar-shell-text hover:bg-reducar-shell-hover transition-colors">Mi cuenta</button>
                    <button onClick={() => handleNavigate("/perfil")} className="w-full text-left px-3 py-2.5 rounded-xl text-sm text-reducar-shell-text hover:bg-reducar-shell-hover transition-colors">Mis datos</button>
                    <button onClick={() => handleNavigate("/mi-cuenta/favoritos")} className="w-full text-left px-3 py-2.5 rounded-xl text-sm text-reducar-shell-text hover:bg-reducar-shell-hover transition-colors">Mis favoritos</button>
                    <button onClick={() => handleNavigate("/mi-cuenta/cursos")} className="w-full text-left px-3 py-2.5 rounded-xl text-sm text-reducar-shell-text hover:bg-reducar-shell-hover transition-colors">Mis cursos</button>
                    <button onClick={() => handleNavigate("/mi-cuenta/reportes")} className="w-full text-left px-3 py-2.5 rounded-xl text-sm text-reducar-shell-text hover:bg-reducar-shell-hover transition-colors">Mis reportes</button>
                    
                    {esAdmin && (
                      <>
                        <div className="my-1 h-px bg-reducar-shell-border" />
                        <button onClick={() => handleNavigate("/admin")} className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold text-reducar-primary hover:bg-reducar-primary/10 transition-colors">Panel admin</button>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* NAVEGACIÓN (Cursos, Rutas, etc.) */}
            <div className="border-t border-reducar-shell-border pt-4">
              <Navbar items={menuItems} dropdownItems={dropdownItems} isMobile onItemClick={closeMobileMenu} />
            </div>

            {/* ACCIONES INFERIORES (Login o Logout) */}
            <div className="mt-4 pt-4 border-t border-reducar-shell-border">
              {estaLogueado ? (
                <button
                  type="button"
                  onClick={handleLogoutMobile}
                  disabled={isLoggingOutMobile}
                  className="w-full flex items-center justify-center gap-2 h-11 rounded-xl bg-red-500/10 text-red-400 font-bold hover:bg-red-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoggingOutMobile ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Cerrando sesión...
                    </>
                  ) : (
                    "Cerrar sesión"
                  )}
                </button>
              ) : (
                <div className="flex flex-col gap-2">
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
              )}
            </div>

          </div>
        </div>
      )}
    </header>
  );
};

export default Header;