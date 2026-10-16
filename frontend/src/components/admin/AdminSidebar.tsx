// src/components/admin/AdminSidebar.tsx
import { Link, useLocation } from "react-router-dom";

interface AdminNavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const adminItems: AdminNavItem[] = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="3" y="3" width="7" height="9" rx="1.5" />
        <rect x="14" y="3" width="7" height="5" rx="1.5" />
        <rect x="14" y="12" width="7" height="9" rx="1.5" />
        <rect x="3" y="16" width="7" height="5" rx="1.5" />
      </svg>
    ),
  },
  {
    label: "Cursos",
    path: "/admin/cursos",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M4 19V6a2 2 0 0 1 2-2h9l5 5v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
        <path d="M14 4v5h5" />
        <path d="M8 13h8M8 17h6" />
      </svg>
    ),
  },
  {
    label: "Usuarios",
    path: "/admin/usuarios",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="9" cy="8" r="4" />
        <path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6" />
        <path d="M16 4a4 4 0 0 1 0 8" />
        <path d="M22 20c0-3-2-5.5-5-6" />
      </svg>
    ),
  },
  {
    label: "Reportes",
    path: "/admin/reportes",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 9v4M12 17h.01" />
        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      </svg>
    ),
  },
  {
    label: "Valoraciones",
    path: "/admin/valoraciones",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="m12 3 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.8l6.5-.9L12 3Z" />
      </svg>
    ),
  },
];

interface AdminSidebarProps {
  /** Cuando es true, renderiza la versión mobile (barra horizontal). */
  mobile?: boolean;
}

export const AdminSidebar = ({ mobile = false }: AdminSidebarProps) => {
  const { pathname } = useLocation();

  const isActive = (path: string): boolean => {
    if (path === "/admin") return pathname === "/admin";
    return pathname === path || pathname.startsWith(path + "/");
  };

  // ============ MOBILE: barra horizontal scrolleable ============
  if (mobile) {
    return (
      <div className="lg:hidden border-b border-reducar-border bg-reducar-surface">
        <nav className="max-w-7xl mx-auto px-2 py-2 flex gap-1 overflow-x-auto">
          {adminItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`shrink-0 inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
                  active
                    ? "bg-reducar-primary/15 text-reducar-primary"
                    : "text-reducar-text-secondary hover:bg-reducar-surface-soft hover:text-reducar-primary"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    );
  }

  // ============ DESKTOP: sidebar lateral sticky ============
  return (
    <aside className="hidden lg:flex w-64 shrink-0 border-r border-reducar-border bg-reducar-surface">
      <div className="w-full sticky top-21 self-start max-h-[calc(100vh-84px)] overflow-y-auto p-4 flex flex-col">
        <p className="px-3 mb-2 text-[10px] font-extrabold tracking-widest text-reducar-text-secondary uppercase">
          Administración
        </p>

        <nav className="space-y-1">
          {adminItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  active
                    ? "bg-reducar-primary/15 text-reducar-primary"
                    : "text-reducar-text-secondary hover:bg-reducar-surface-soft hover:text-reducar-primary"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Separador + volver al sitio */}
        <div className="mt-auto pt-6">
          <div className="h-px bg-reducar-border mb-3" />
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-reducar-text-secondary hover:bg-reducar-surface-soft hover:text-reducar-primary transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Volver al sitio
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;