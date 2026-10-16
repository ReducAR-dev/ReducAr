// src/pages/admin/AdminReportesPage.tsx
import { useEffect, useState } from "react";

type EstadoReporte = "pending" | "inReview" | "resolved" | "ignored";

interface ReporteMock {
  id: number;
  tipo: string;
  entidadTipo: "course" | "user" | "review";
  entidadLabel: string;
  mensaje: string;
  usuario: string;
  fecha: string;
  estado: EstadoReporte;
}

const reportesMock: ReporteMock[] = [
  {
    id: 501,
    tipo: "courseRelated",
    entidadTipo: "course",
    entidadLabel: "Data Science con Python",
    mensaje: "El enlace de inscripción está roto, devuelve 404.",
    usuario: "María López",
    fecha: "2026-10-15 14:23",
    estado: "pending",
  },
  {
    id: 500,
    tipo: "bug",
    entidadTipo: "course",
    entidadLabel: "UX/UI Design Fundamental",
    mensaje: "Al hacer click en 'Inscribirme' no pasa nada.",
    usuario: "Carlos Ruiz",
    fecha: "2026-10-15 10:05",
    estado: "pending",
  },
  {
    id: 499,
    tipo: "suggestion",
    entidadTipo: "course",
    entidadLabel: "Introducción al Desarrollo Web",
    mensaje: "Estaría bueno agregar más ejemplos prácticos.",
    usuario: "Lucía Fernández",
    fecha: "2026-10-14 18:40",
    estado: "inReview",
  },
  {
    id: 498,
    tipo: "technical",
    entidadTipo: "user",
    entidadLabel: "carlos.ruiz@example.com",
    mensaje: "Este usuario está dejando comentarios ofensivos.",
    usuario: "Anónimo",
    fecha: "2026-10-13 22:12",
    estado: "resolved",
  },
  {
    id: 497,
    tipo: "courseRelated",
    entidadTipo: "course",
    entidadLabel: "Ciberseguridad Esencial",
    mensaje: "El nivel indicado no coincide con el contenido.",
    usuario: "Patricio Gómez",
    fecha: "2026-10-12 16:30",
    estado: "resolved",
  },
  {
    id: 496,
    tipo: "suggestion",
    entidadTipo: "course",
    entidadLabel: "Curso de Excel básico",
    mensaje: "Podrían hacer una versión más avanzada.",
    usuario: "Anónimo",
    fecha: "2026-10-11 09:15",
    estado: "ignored",
  },
];

const SECCIONES: {
  key: EstadoReporte;
  label: string;
  color: string;
  dot: string;
}[] = [
  { key: "pending", label: "Pendientes", color: "text-yellow-500", dot: "bg-yellow-500" },
  { key: "inReview", label: "En revisión", color: "text-blue-500", dot: "bg-blue-500" },
  { key: "resolved", label: "Resueltos", color: "text-green-500", dot: "bg-green-500" },
  { key: "ignored", label: "Ignorados", color: "text-gray-500", dot: "bg-gray-500" },
];

const TIPO_BADGES: Record<string, string> = {
  technical: "bg-red-500/15 text-red-500",
  courseRelated: "bg-blue-500/15 text-blue-500",
  suggestion: "bg-purple-500/15 text-purple-500",
  bug: "bg-orange-500/15 text-orange-500",
};

export default function AdminReportesPage() {
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
        <h1 className="text-2xl sm:text-3xl font-extrabold">Reportes</h1>
        <p className="text-sm text-reducar-text-secondary mt-1">
          {reportesMock.length} reportes en total. Gestioná por estado.
        </p>
      </div>

      {SECCIONES.map((sec) => {
        const items = reportesMock.filter((r) => r.estado === sec.key);
        return (
          <section key={sec.key} className="space-y-3">
            {/* Header de la sección */}
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
                No hay reportes en esta sección.
              </p>
            ) : (
              <div className="space-y-2">
                {items.map((r) => {
                  const expanded = expandedId === r.id;
                  return (
                    <div
                      key={r.id}
                      data-expandable-card
                      className="bg-reducar-surface rounded-2xl border border-reducar-border shadow-sm overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedId(expanded ? null : r.id)}
                        className="w-full text-left p-4 flex items-center gap-4"
                      >
                        <span
                          className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase shrink-0 ${
                            TIPO_BADGES[r.tipo] ?? "bg-gray-500/15 text-gray-500"
                          }`}
                        >
                          {r.tipo}
                        </span>

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold truncate">
                            {r.mensaje}
                          </p>
                          <p className="text-xs text-reducar-text-secondary mt-0.5">
                            #{r.id} · {r.usuario} · {r.fecha}
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
                                Apunta a
                              </p>
                              <p className="text-sm font-semibold">
                                {r.entidadTipo} · {r.entidadLabel}
                              </p>
                            </div>

                            <div>
                              <p className="text-[10px] uppercase font-bold tracking-wider text-reducar-text-secondary mb-1">
                                Mensaje completo
                              </p>
                              <p className="text-sm text-reducar-text-secondary leading-relaxed">
                                {r.mensaje}
                              </p>
                            </div>

                            <div>
                              <label className="block mb-1.5 text-[10px] uppercase font-bold tracking-wider text-reducar-text-secondary">
                                Respuesta al usuario
                              </label>
                              <textarea
                                rows={3}
                                placeholder="Escribí una respuesta..."
                                className="w-full px-3 py-2 rounded-xl bg-reducar-surface-soft border-[1.5px] border-reducar-border text-sm outline-none focus:border-reducar-primary transition-all resize-none"
                              />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2">
                              <button
                                type="button"
                                className="flex-1 h-10 rounded-xl bg-reducar-primary text-white text-sm font-bold hover:bg-reducar-primary-dark transition-colors"
                              >
                                Marcar como resuelto
                              </button>
                              <button
                                type="button"
                                className="flex-1 h-10 rounded-xl border border-blue-500/40 text-blue-500 text-sm font-bold hover:bg-blue-500/10 transition-colors"
                              >
                                En revisión
                              </button>
                              <button
                                type="button"
                                className="flex-1 h-10 rounded-xl border border-gray-500/40 text-gray-500 text-sm font-bold hover:bg-gray-500/10 transition-colors"
                              >
                                Ignorar
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