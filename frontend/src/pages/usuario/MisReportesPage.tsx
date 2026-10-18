// src/pages/usuario/MisReportesPage.tsx
import { useState } from "react";

interface ReporteEjemplo {
  id: string;
  categoria: "Bug" | "Funcionalidad" | "Curso" | "Usuario" | "Otro";
  titulo: string;
  descripcion: string;
  fecha: string;
  estado: "Pendiente" | "En revisión" | "Resuelto" | "Cerrado";
}

const REPORTES_INICIALES: ReporteEjemplo[] = [
  {
    id: "REP-001",
    categoria: "Bug",
    titulo: "Error al reproducir video en lección 3",
    descripcion: "El reproductor se congela al intentar cambiar la calidad de video a 1080p en el curso de React.",
    fecha: "15 Oct 2026",
    estado: "En revisión",
  },
  {
    id: "REP-002",
    categoria: "Funcionalidad",
    titulo: "Solicitud de modo oscuro automático según sistema",
    descripcion: "Sería útil que la plataforma detectara automáticamente la preferencia del sistema operativo.",
    fecha: "10 Oct 2026",
    estado: "Resuelto",
  },
  {
    id: "REP-003",
    categoria: "Curso",
    titulo: "Enlace roto en recursos descargables del módulo 2",
    descripcion: "El archivo PDF de ejercicios prácticos da error 404 al intentar descargarlo.",
    fecha: "05 Oct 2026",
    estado: "Pendiente",
  },
  {
    id: "REP-004",
    categoria: "Usuario",
    titulo: "Comportamiento inadecuado en foro de debate",
    descripcion: "Reporte de usuario que comparte enlaces de spam en las discusiones del curso de Scrum.",
    fecha: "28 Sep 2026",
    estado: "Cerrado",
  },
];

export default function MisReportesPage() {
  const [reportes] = useState<ReporteEjemplo[]>(REPORTES_INICIALES);
  const [categoriaActiva, setCategoriaActiva] = useState<string>("Todas");

  const categorias = ["Todas", "Bug", "Funcionalidad", "Curso", "Usuario", "Otro"];

  const reportesFiltrados = categoriaActiva === "Todas"
    ? reportes
    : reportes.filter((r) => r.categoria === categoriaActiva);

  const getBadgeColor = (cat: string) => {
    switch (cat) {
      case "Bug":
        return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30";
      case "Funcionalidad":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30";
      case "Curso":
        return "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/30";
      case "Usuario":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30";
      default:
        return "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/30";
    }
  };

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Resuelto":
        return "bg-emerald-500/20 text-emerald-600 dark:text-emerald-300";
      case "En revisión":
        return "bg-cyan-500/20 text-cyan-600 dark:text-cyan-300";
      case "Pendiente":
        return "bg-amber-500/20 text-amber-600 dark:text-amber-300";
      default:
        return "bg-slate-500/20 text-slate-600 dark:text-slate-300";
    }
  };

  return (
    <div className="min-h-screen bg-reducar-bg text-reducar-text px-6 py-10 md:px-16 transition-colors">
      <div className="mx-auto max-w-5xl">

        {/* ENCABEZADO */}
        <div className="mb-8 rounded-2xl border border-reducar-primary/40 bg-reducar-shell-surface p-6 md:p-8 shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <span className="rounded-full bg-reducar-primary/20 px-3 py-1 text-xs font-bold text-reducar-primary">
              SOPORTE Y REPORTES (EJEMPLO)
            </span>
            <h1 className="mt-2 text-2xl md:text-3xl font-extrabold text-reducar-shell-text">
              Mis Reportes
            </h1>
            <p className="text-reducar-shell-text-secondary text-sm mt-1">
              Consulta el historial y estado de todos tus reportes enviados sobre bugs, funcionalidades, cursos o usuarios.
            </p>
          </div>

          <button
            type="button"
            onClick={() => alert("Simulación: Abriendo modal para crear nuevo reporte")}
            className="rounded-xl bg-gradient-to-r from-reducar-primary to-reducar-turquoise px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:scale-105 shrink-0"
          >
            + Nuevo Reporte
          </button>
        </div>

        {/* FILTROS POR CATEGORÍA */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-reducar-shell-text-secondary mr-2">Categorías:</span>
          {categorias.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoriaActiva(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                categoriaActiva === cat
                  ? "bg-reducar-primary text-white shadow"
                  : "bg-reducar-shell-surface border border-reducar-shell-border text-reducar-shell-text hover:bg-reducar-shell-hover"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* LISTADO DE REPORTES */}
        {reportesFiltrados.length === 0 ? (
          <div className="rounded-2xl border border-reducar-shell-border bg-reducar-shell-surface p-12 text-center">
            <div className="text-5xl mb-4">📭</div>
            <h3 className="text-lg font-bold text-reducar-shell-text">No hay reportes en esta categoría</h3>
            <p className="text-sm text-reducar-shell-text-secondary mt-1">
              Selecciona otra categoría o crea un nuevo reporte si necesitas asistencia.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {reportesFiltrados.map((rep) => (
              <div
                key={rep.id}
                className="rounded-2xl border border-reducar-shell-border bg-reducar-shell-surface p-6 shadow-xl transition hover:border-reducar-primary/60 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold text-reducar-shell-text-secondary">
                      {rep.id}
                    </span>
                    <span className={`rounded-full px-3 py-0.5 text-xs font-bold border ${getBadgeColor(rep.categoria)}`}>
                      {rep.categoria}
                    </span>
                    <span className={`rounded-full px-3 py-0.5 text-xs font-bold ${getEstadoBadge(rep.estado)}`}>
                      {rep.estado}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-reducar-shell-text">
                    {rep.titulo}
                  </h3>

                  <p className="text-sm text-reducar-shell-text-secondary">
                    {rep.descripcion}
                  </p>

                  <p className="text-xs text-reducar-shell-text-secondary">
                    📅 Enviado el: <span className="font-semibold">{rep.fecha}</span>
                  </p>
                </div>

                <div className="flex md:flex-col justify-end gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => alert(`Simulación: Viendo detalles y bitácora del reporte ${rep.id}`)}
                    className="rounded-xl border border-reducar-shell-border bg-reducar-bg px-4 py-2 text-xs font-semibold text-reducar-shell-text hover:bg-reducar-shell-hover transition"
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
