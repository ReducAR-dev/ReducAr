// src/pages/usuario/MisCursosPage.tsx
import { useState } from "react";

interface CursoAdquirido {
  id: number;
  titulo: string;
  tipo: "Gratuito" | "Comprado";
  institucion: string;
  progreso: number; // 0 - 100
  estado: "En curso" | "Completado";
  imagen: string;
}

const CURSOS_INICIALES: CursoAdquirido[] = [
  {
    id: 1,
    titulo: "Desarrollo Web Full Stack con React y Node.js",
    tipo: "Comprado",
    institucion: "UTN Tecnológica",
    progreso: 65,
    estado: "En curso",
    imagen: "💻",
  },
  {
    id: 2,
    titulo: "Introducción a la Inteligencia Artificial y Machine Learning",
    tipo: "Gratuito",
    institucion: "Codo a Codo",
    progreso: 100,
    estado: "Completado",
    imagen: "🤖",
  },
  {
    id: 3,
    titulo: "Gestión de Proyectos Ágiles y Scrum",
    tipo: "Comprado",
    institucion: "Fundación Telefónica",
    progreso: 20,
    estado: "En curso",
    imagen: "📊",
  },
];

export default function MisCursosPage() {
  const [cursos] = useState<CursoAdquirido[]>(CURSOS_INICIALES);
  const [filtro, setFiltro] = useState<"todos" | "Gratuito" | "Comprado">("todos");

  const cursosFiltrados = cursos.filter((c) => {
    if (filtro === "todos") return true;
    return c.tipo === filtro;
  });

  return (
    <div className="min-h-screen bg-reducar-bg text-reducar-text px-6 py-10 md:px-16 transition-colors">
      <div className="mx-auto max-w-5xl">

        {/* ENCABEZADO */}
        <div className="mb-8 rounded-2xl border border-reducar-primary/40 bg-reducar-shell-surface p-6 md:p-8 shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <span className="rounded-full bg-reducar-primary/20 px-3 py-1 text-xs font-bold text-reducar-primary">
              APRENDIZAJE (EJEMPLO)
            </span>
            <h1 className="mt-2 text-2xl md:text-3xl font-extrabold text-reducar-shell-text">
              Mis Cursos
            </h1>
            <p className="text-reducar-shell-text-secondary text-sm mt-1">
              Visualiza tus cursos adquiridos de forma gratuita o comprada, revisa tu progreso y continúa aprendiendo.
            </p>
          </div>

          <div className="flex gap-3">
            <div className="bg-reducar-bg border border-reducar-shell-border px-4 py-3 rounded-xl text-center">
              <span className="block text-xl font-bold text-reducar-primary">
                {cursos.filter((c) => c.estado === "Completado").length}
              </span>
              <span className="text-xs text-reducar-shell-text-secondary">Completados</span>
            </div>
            <div className="bg-reducar-bg border border-reducar-shell-border px-4 py-3 rounded-xl text-center">
              <span className="block text-xl font-bold text-reducar-turquoise">
                {cursos.filter((c) => c.estado === "En curso").length}
              </span>
              <span className="text-xs text-reducar-shell-text-secondary">En curso</span>
            </div>
          </div>
        </div>

        {/* FILTROS DE TIPO */}
        <div className="mb-6 flex items-center gap-2">
          <span className="text-sm font-semibold text-reducar-shell-text-secondary mr-2">Filtrar por:</span>
          <button
            type="button"
            onClick={() => setFiltro("todos")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              filtro === "todos"
                ? "bg-reducar-primary text-white shadow"
                : "bg-reducar-shell-surface border border-reducar-shell-border text-reducar-shell-text hover:bg-reducar-shell-hover"
            }`}
          >
            Todos ({cursos.length})
          </button>
          <button
            type="button"
            onClick={() => setFiltro("Gratuito")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              filtro === "Gratuito"
                ? "bg-reducar-primary text-white shadow"
                : "bg-reducar-shell-surface border border-reducar-shell-border text-reducar-shell-text hover:bg-reducar-shell-hover"
            }`}
          >
            Gratuitos ({cursos.filter((c) => c.tipo === "Gratuito").length})
          </button>
          <button
            type="button"
            onClick={() => setFiltro("Comprado")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              filtro === "Comprado"
                ? "bg-reducar-primary text-white shadow"
                : "bg-reducar-shell-surface border border-reducar-shell-border text-reducar-shell-text hover:bg-reducar-shell-hover"
            }`}
          >
            Comprados ({cursos.filter((c) => c.tipo === "Comprado").length})
          </button>
        </div>

        {/* LISTADO DE CURSOS */}
        {cursosFiltrados.length === 0 ? (
          <div className="rounded-2xl border border-reducar-shell-border bg-reducar-shell-surface p-12 text-center">
            <div className="text-5xl mb-4">📚</div>
            <h3 className="text-lg font-bold text-reducar-shell-text">No hay cursos en esta categoría</h3>
            <p className="text-sm text-reducar-shell-text-secondary mt-1">
              Prueba seleccionando otro filtro o adquiere nuevos cursos desde el catálogo.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cursosFiltrados.map((curso) => (
              <div
                key={curso.id}
                className="group rounded-2xl border border-reducar-shell-border bg-reducar-shell-surface p-6 shadow-xl transition hover:border-reducar-primary/60 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                      curso.tipo === "Gratuito"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30"
                        : "bg-violet-500/10 text-violet-600 dark:text-violet-300 border border-violet-500/30"
                    }`}>
                      {curso.tipo}
                    </span>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      curso.estado === "Completado"
                        ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-300"
                        : "bg-cyan-500/20 text-cyan-600 dark:text-cyan-300"
                    }`}>
                      {curso.estado}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 shrink-0 rounded-xl bg-reducar-bg border border-reducar-shell-border flex items-center justify-center text-2xl shadow-inner">
                      {curso.imagen}
                    </div>
                    <h3 className="text-base font-bold text-reducar-shell-text group-hover:text-reducar-primary transition-colors line-clamp-2">
                      {curso.titulo}
                    </h3>
                  </div>

                  <p className="text-xs text-reducar-shell-text-secondary mb-4">
                    🏛️ Institución: <span className="font-semibold">{curso.institucion}</span>
                  </p>

                  {/* BARRA DE PROGRESO */}
                  <div className="space-y-1.5 mb-5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-reducar-shell-text-secondary">Progreso</span>
                      <span className="text-reducar-primary">{curso.progreso}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-reducar-bg border border-reducar-shell-border overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-reducar-primary to-reducar-turquoise transition-all duration-500"
                        style={{ width: `${curso.progreso}%` }}
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => alert(`Simulación: Abriendo el reproductor del curso "${curso.titulo}"`)}
                  className="w-full rounded-xl bg-gradient-to-r from-reducar-primary to-reducar-turquoise px-4 py-2.5 text-xs font-bold text-white shadow transition hover:scale-[1.02]"
                >
                  {curso.estado === "Completado" ? "Ver certificado / Repasar" : "Continuar aprendiendo →"}
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
