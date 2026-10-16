// src/pages/admin/AdminValoracionesPage.tsx
import { useEffect, useState } from "react";

type EstadoVal = "pending" | "approved" | "rejected";

interface ValoracionMock {
  id: number;
  autor: string;
  curso: string;
  puntuacion: number;
  comentario: string;
  fecha: string;
  ip: string;
  userAgent: string;
  estado: EstadoVal;
}

const valoracionesMock: ValoracionMock[] = [
  {
    id: 201,
    autor: "María López",
    curso: "Data Science con Python",
    puntuacion: 5,
    comentario:
      "Excelente curso, muy completo y con buenos ejemplos prácticos. Lo recomiendo totalmente.",
    fecha: "2026-10-15 12:30",
    ip: "190.15.22.87",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120",
    estado: "pending",
  },
  {
    id: 200,
    autor: "Carlos Ruiz",
    curso: "Introducción al Desarrollo Web",
    puntuacion: 4,
    comentario:
      "Muy buen material. Le falta un poco más de profundidad en JavaScript moderno.",
    fecha: "2026-10-14 20:15",
    ip: "181.44.10.5",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) Safari/17",
    estado: "pending",
  },
  {
    id: 199,
    autor: "Lucía Fernández",
    curso: "UX/UI Design Fundamental",
    puntuacion: 5,
    comentario:
      "El mejor curso de diseño que hice hasta ahora. Los profesores son increíbles.",
    fecha: "2026-10-12 09:45",
    ip: "200.55.128.10",
    userAgent: "Mozilla/5.0 (X11; Linux x86_64) Firefox/121",
    estado: "approved",
  },
  {
    id: 198,
    autor: "Anónimo",
    curso: "Ciberseguridad Esencial",
    puntuacion: 1,
    comentario: "Este curso es una porquería, no lo compren. Está mal.",
    fecha: "2026-10-10 03:20",
    ip: "45.12.88.201",
    userAgent: "curl/8.0",
    estado: "rejected",
  },
  {
    id: 197,
    autor: "Patricio Gómez",
    curso: "Introducción al Desarrollo Web",
    puntuacion: 4,
    comentario:
      "Buen contenido introductorio, ideal para quienes arrancan de cero.",
    fecha: "2026-10-08 17:00",
    ip: "190.15.22.90",
    userAgent: "Mozilla/5.0 (Windows NT 10.0) Edge/120",
    estado: "approved",
  },
];

const SECCIONES: {
  key: EstadoVal;
  label: string;
  color: string;
  dot: string;
}[] = [
  { key: "pending", label: "Pendientes de aprobación", color: "text-yellow-500", dot: "bg-yellow-500" },
  { key: "approved", label: "Aprobadas", color: "text-green-500", dot: "bg-green-500" },
  { key: "rejected", label: "Rechazadas", color: "text-red-500", dot: "bg-red-500" },
];

const Stars = ({ value }: { value: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((n) => (
      <svg
        key={n}
        className={`w-4 h-4 ${n <= value ? "text-yellow-500" : "text-reducar-border"}`}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="m12 3 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.8l6.5-.9L12 3Z" />
      </svg>
    ))}
  </div>
);

export default function AdminValoracionesPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-expandable-card]")) setExpandedId(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold">Valoraciones</h1>
        <p className="text-sm text-reducar-text-secondary mt-1">
          Moderación de reseñas. Solo las aprobadas son visibles al público.
        </p>
      </div>

      {SECCIONES.map((sec) => {
        const items = valoracionesMock.filter((v) => v.estado === sec.key);
        return (
          <section key={sec.key} className="space-y-3">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${sec.dot}`} />
              <h2 className={`text-lg font-extrabold ${sec.color}`}>
                {sec.label}
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-reducar-surface border border-reducar-border text-xs font-bold text-reducar-text-secondary">
                {items.length}
              </span>
            </div>

            {items.length === 0 ? (
              <p className="text-sm text-reducar-text-secondary italic pl-4">
                No hay valoraciones en esta sección.
              </p>
            ) : (
              <div className="space-y-2">
                {items.map((v) => {
                  const expanded = expandedId === v.id;
                  return (
                    <div
                      key={v.id}
                      data-expandable-card
                      className="bg-reducar-surface rounded-2xl border border-reducar-border shadow-sm overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedId(expanded ? null : v.id)}
                        className="w-full text-left p-4 flex items-center gap-4"
                      >
                        <div className="w-12 h-12 rounded-full bg-reducar-surface-soft grid place-items-center shrink-0">
                          <span className="text-2xl font-extrabold text-reducar-primary">
                            {v.puntuacion}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1 flex-wrap">
                            <span className="text-sm font-bold truncate">
                              {v.autor}
                            </span>
                            <Stars value={v.puntuacion} />
                          </div>
                          <p className="text-xs text-reducar-text-secondary truncate">
                            {v.curso} · {v.fecha}
                          </p>
                          <p className="text-sm text-reducar-text-secondary mt-1 line-clamp-1">
                            {v.comentario}
                          </p>
                        </div>

                        <svg
                          className={`w-5 h-5 text-reducar-text-secondary transition-transform duration-500 shrink-0 ${
                            expanded ? "rotate-180" : ""
                          }`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>

                      <div
                        className={`grid transition-all duration-700 ease-in-out ${
                          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="px-4 pb-5 pt-2 border-t border-reducar-border space-y-4">
                            <div>
                              <p className="text-[10px] uppercase font-bold tracking-wider text-reducar-text-secondary mb-1">
                                Comentario completo
                              </p>
                              <p className="text-sm leading-relaxed">{v.comentario}</p>
                            </div>

                            {/* Info técnica, solo admins */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-xl bg-reducar-surface-soft border border-reducar-border text-xs">
                              <div>
                                <p className="font-bold text-reducar-text-secondary">IP</p>
                                <p className="font-mono">{v.ip}</p>
                              </div>
                              <div className="min-w-0">
                                <p className="font-bold text-reducar-text-secondary">User-Agent</p>
                                <p className="font-mono truncate" title={v.userAgent}>
                                  {v.userAgent}
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2">
                              <button
                                type="button"
                                className="flex-1 h-10 rounded-xl bg-green-500 text-white text-sm font-bold hover:bg-green-600 transition-colors"
                              >
                                Aprobar
                              </button>
                              <button
                                type="button"
                                className="flex-1 h-10 rounded-xl border border-red-500/40 text-red-500 text-sm font-bold hover:bg-red-500/10 transition-colors"
                              >
                                Rechazar
                              </button>
                              <button
                                type="button"
                                className="flex-1 h-10 rounded-xl border border-gray-500/40 text-gray-500 text-sm font-bold hover:bg-gray-500/10 transition-colors"
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
            )}
          </section>
        );
      })}
    </div>
  );
}