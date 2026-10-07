// src/components/common/Navbar.tsx
import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavItem {
  label: string;
  shortLabel?: string;
  path: string;
}

interface NavbarProps {
  items: NavItem[];
  dropdownItems: NavItem[];
  className?: string;
  onItemClick?: () => void;
  isMobile?: boolean;
}

export const Navbar = ({
  items,
  dropdownItems,
  className = "",
  onItemClick,
  isMobile = false,
}: NavbarProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  // Devuelve true si la ruta actual coincide con el path del item.
  // Excluye "Inicio" ("/") para que nunca aparezca activo.
  // Soporta rutas anidadas: /cursos/123 activa "Cursos".
  const isActive = (path: string): boolean => {
    if (path === "/") return false;
    return pathname === path || pathname.startsWith(path + "/");
  };

  // ¿Algún item del dropdown está activo?
  const isDropdownActive = dropdownItems.some((item) => isActive(item.path));

  useEffect(() => {
    if (isMobile) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile]);

  // ============ MOBILE ============
  if (isMobile) {
    return (
      <nav className={`flex flex-col gap-1 ${className}`}>
        {items.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onItemClick}
              className={`px-4 py-3 rounded-xl text-base font-semibold transition-colors whitespace-nowrap ${
                active
                  ? "bg-reducar-primary/15 text-reducar-primary"
                  : "text-reducar-shell-text hover:bg-reducar-shell-hover hover:text-reducar-primary"
              }`}
            >
              {item.label}
            </Link>
          );
        })}

        <div className="my-2 h-px bg-reducar-shell-border" />

        <span className="px-4 pt-2 pb-1 text-[10px] font-extrabold tracking-widest text-reducar-shell-text-secondary uppercase">
          Más opciones
        </span>

        {dropdownItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onItemClick}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                active
                  ? "bg-reducar-primary/15 text-reducar-primary font-semibold"
                  : "text-reducar-shell-text-secondary hover:bg-reducar-shell-hover hover:text-reducar-primary"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    );
  }

  // ============ DESKTOP ============
  return (
    <nav className={`flex items-center gap-0.5 ${className}`}>
      {items.map((item) => {
        const active = isActive(item.path);
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={onItemClick}
            className={`px-3 xl:px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap ${
              active
                ? "bg-reducar-primary/15 text-reducar-primary"
                : "text-reducar-shell-text-secondary hover:bg-reducar-shell-hover hover:text-reducar-primary"
            }`}
          >
            {item.shortLabel ? (
              <>
                <span className="hidden xl:inline">{item.label}</span>
                <span className="xl:hidden">{item.shortLabel}</span>
              </>
            ) : (
              item.label
            )}
          </Link>
        );
      })}

      {/* Dropdown "Más" */}
      <div ref={dropdownRef} className="relative">
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`px-3 xl:px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
            isDropdownActive
              ? "bg-reducar-primary/15 text-reducar-primary"
              : "text-reducar-shell-text-secondary hover:bg-reducar-shell-hover hover:text-reducar-primary"
          }`}
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
        >
          Más
          <svg
            className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full right-0 mt-2 w-60 p-2 bg-reducar-shell-surface border border-reducar-shell-border rounded-xl shadow-2xl z-50 animate-[dropdownIn_0.15s_ease-out]">
            {dropdownItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => {
                    setIsDropdownOpen(false);
                    onItemClick?.();
                  }}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    active
                      ? "bg-reducar-primary/15 text-reducar-primary font-semibold"
                      : "text-reducar-shell-text-secondary hover:bg-reducar-shell-hover hover:text-reducar-primary"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;