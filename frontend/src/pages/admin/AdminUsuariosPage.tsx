// src/pages/admin/AdminUsuariosPage.tsx
import { useEffect, useState } from "react";

interface UsuarioMock {
  id: string;
  nombre: string;
  email: string;
  rol: "admin" | "user";
  activo: boolean;
  ultimaConexion: string;
  fechaRegistro: string;
  reportesRecibidos: number;
  reportesHechos: number;
  cursosComprados: number;
  valoraciones: number;
}

const usuariosMock: UsuarioMock[] = [
  {
    id: "a1b2c3d4",
    nombre: "Jonathan Aguilera",
    email: "jonathanaguileratapia@gmail.com",
    rol: "admin",
    activo: true,
    ultimaConexion: "hace 2 min",
    fechaRegistro: "2026-08-10",
    reportesRecibidos: 0,
    reportesHechos: 3,
    cursosComprados: 12,
    valoraciones: 8,
  },
  {
    id: "e5f6g7h8",
    nombre: "María López",
    email: "maria.lopez@example.com",
    rol: "user",
    activo: true,
    ultimaConexion: "hace 15 min",
    fechaRegistro: "2026-09-22",
    reportesRecibidos: 0,
    reportesHechos: 1,
    cursosComprados: 4,
    valoraciones: 3,
  },
  {
    id: "i9j0k1l2",
    nombre: "Carlos Ruiz",
    email: "carlos.ruiz@example.com",
    rol: "user",
    activo: true,
    ultimaConexion: "hace 1 h",
    fechaRegistro: "2026-07-04",
    reportesRecibidos: 2,
    reportesHechos: 0,
    cursosComprados: 8,
    valoraciones: 5,
  },
  {
    id: "m3n4o5p6",
    nombre: "Lucía Fernández",
    email: "lucia.fernandez@example.com",
    rol: "user",
    activo: false,
    ultimaConexion: "hace 3 días",
    fechaRegistro: "2026-06-15",
    reportesRecibidos: 5,
    reportesHechos: 2,
    cursosComprados: 1,
    valoraciones: 0,
  },
  {
    id: "q7r8s9t0",
    nombre: "Patricio Gómez",
    email: "patricio@example.com",
    rol: "admin",
    activo: true,
    ultimaConexion: "hace 30 min",
    fechaRegistro: "2026-08-01",
    reportesRecibidos: 0,
    reportesHechos: 0,
    cursosComprados: 6,
    valoraciones: 4,
  },
];

export default function AdminUsuariosPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filtro, setFiltro] = useState<"todos" | "admin" | "user" | "inactivos">("todos");

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-expandable-card]")) setExpandedId(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const usuariosFiltrados = usuariosMock.filter((u) => {
    if (filtro === "admin") return u.rol === "admin";
    if (filtro === "user") return u.rol === "user";
    if (filtro === "inactivos") return !u.activo;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold">Usuarios</h1>
        <p className="text-sm text-reducar-text-secondary mt-1">
          {usuariosMock.length} usuarios registrados ·{" "}
          {usuariosMock.filter((u) => u.activo).length} activos
        </p>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        {(["todos", "admin", "user", "inactivos"] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFiltro(f)}
            className={`px-4 h-9 rounded-full text-sm font-bold capitalize transition-colors ${
              filtro === f
                ? "bg-reducar-primary text-white"
                : "bg-reducar-surface border border-reducar-border text-reducar-text-secondary hover:text-reducar-primary"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Lista de cards */}
      <div className="space-y-3">
        {usuariosFiltrados.map((u) => {
          const expanded = expandedId === u.id;
          const inicial = u.nombre[0]?.toUpperCase() ?? "?";

          return (
            <div
              key={u.id}
              data-expandable-card
              className="bg-reducar-surface rounded-2xl border border-reducar-border shadow-sm overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setExpandedId(expanded ? null : u.id)}
                className="w-full text-left p-4 flex items-center gap-4"
              >
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-reducar-primary to-reducar-turquoise-dark grid place-items-center text-white font-extrabold shrink-0">
                  {inicial}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold truncate">{u.nombre}</h3>
                    {u.rol === "admin" && (
                      <span className="px-2 py-0.5 rounded-full bg-reducar-primary/15 text-reducar-primary text-[10px] font-bold">
                        ADMIN
                      </span>
                    )}
                    {!u.activo && (
                      <span className="px-2 py-0.5 rounded-full bg-red-500/15 text-red-500 text-[10px] font-bold">
                        INACTIVO
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-reducar-text-secondary truncate mt-0.5">
                    {u.email}
                  </p>
                </div>

                <div className="hidden sm:block text-right shrink-0">
                  <p className="text-xs text-reducar-text-secondary">Última conexión</p>
                  <p className="text-xs font-semibold">{u.ultimaConexion}</p>
                </div>

                <svg
                  className={`w-5 h-5 text-reducar-text-secondary transition-transform duration-300 shrink-0 ${
                    expanded ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {/* Detalle expandible */}
              <div
                className={`grid transition-all duration-500 ease-in-out ${
                  expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-4 pb-5 pt-2 border-t border-reducar-border">
                    {/* Métricas */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
                      <Metric label="Cursos" value={u.cursosComprados} />
                      <Metric label="Valoraciones" value={u.valoraciones} />
                      <Metric
                        label="Reportes recibidos"
                        value={u.reportesRecibidos}
                        alert={u.reportesRecibidos > 2}
                      />
                      <Metric label="Reportes hechos" value={u.reportesHechos} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-reducar-text-secondary mb-4">
                      <span>
                        <strong className="text-reducar-text">ID:</strong>{" "}
                        <span className="font-mono">{u.id}</span>
                      </span>
                      <span>
                        <strong className="text-reducar-text">Registro:</strong>{" "}
                        {u.fechaRegistro}
                      </span>
                    </div>

                    {/* Acciones */}
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        type="button"
                        className="flex-1 h-10 rounded-xl bg-reducar-primary text-white text-sm font-bold hover:bg-reducar-primary-dark transition-colors"
                      >
                        Ver perfil completo
                      </button>
                      <button
                        type="button"
                        className="flex-1 h-10 rounded-xl border border-yellow-500/40 text-yellow-500 text-sm font-bold hover:bg-yellow-500/10 transition-colors"
                      >
                        {u.activo ? "Bloquear" : "Reactivar"}
                      </button>
                      <button
                        type="button"
                        className="flex-1 h-10 rounded-xl border border-red-500/40 text-red-500 text-sm font-bold hover:bg-red-500/10 transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const Metric = ({
  label,
  value,
  alert,
}: {
  label: string;
  value: number;
  alert?: boolean;
}) => (
  <div
    className={`p-3 rounded-xl border ${
      alert
        ? "border-red-500/40 bg-red-500/5"
        : "border-reducar-border bg-reducar-surface-soft"
    }`}
  >
    <p className="text-[10px] uppercase font-bold tracking-wider text-reducar-text-secondary">
      {label}
    </p>
    <p
      className={`text-xl font-extrabold mt-1 ${
        alert ? "text-red-500" : "text-reducar-text"
      }`}
    >
      {value}
    </p>
  </div>
);