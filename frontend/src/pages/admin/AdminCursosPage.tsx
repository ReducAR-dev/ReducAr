// src/pages/admin/AdminCursosPage.tsx
import { useEffect, useState } from "react";

type Tab = "list" | "create";

interface CursoMock {
  id: number;
  titulo: string;
  categoria: string;
  institucion: string;
  modalidad: string;
  nivel: string;
  precio: number;
  activo: boolean;
  cupos: number | null;
  duracion: number;
  fechaInicio: string;
  descripcion: string;
}

const cursosMock: CursoMock[] = [
  {
    id: 1,
    titulo: "Introducción al Desarrollo Web",
    categoria: "Web",
    institucion: "Fundación Pescar",
    modalidad: "Remoto",
    nivel: "Principiante",
    precio: 0,
    activo: true,
    cupos: 50,
    duracion: 60,
    fechaInicio: "2026-11-15",
    descripcion:
      "Curso introductorio de HTML, CSS y JavaScript para quienes arrancan en el mundo del desarrollo.",
  },
  {
    id: 2,
    titulo: "Data Science con Python",
    categoria: "Data",
    institucion: "Educación IT",
    modalidad: "Híbrido",
    nivel: "Intermedio",
    precio: 89,
    activo: true,
    cupos: 30,
    duracion: 120,
    fechaInicio: "2026-12-01",
    descripcion:
      "Análisis de datos, machine learning y visualización con Python, pandas y scikit-learn.",
  },
  {
    id: 3,
    titulo: "UX/UI Design Fundamental",
    categoria: "Diseño",
    institucion: "Platzi",
    modalidad: "Asincrónico",
    nivel: "Principiante",
    precio: 45,
    activo: false,
    cupos: null,
    duracion: 90,
    fechaInicio: "2026-10-20",
    descripcion:
      "Principios de diseño centrado en el usuario, wireframing y prototipado.",
  },
  {
    id: 4,
    titulo: "Ciberseguridad Esencial",
    categoria: "Ciberseguridad",
    institucion: "Fundación Sadosky",
    modalidad: "Remoto",
    nivel: "Avanzado",
    precio: 120,
    activo: true,
    cupos: 15,
    duracion: 180,
    fechaInicio: "2027-01-10",
    descripcion:
      "Fundamentos de seguridad informática, criptografía, redes y pentesting.",
  },
];

export default function AdminCursosPage() {
  const [tab, setTab] = useState<Tab>("list");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Cerrar la card expandida al hacer click fuera
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-expandable-card]")) {
        setExpandedId(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="space-y-6">
      {/* ===== Header + Tabs ===== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">Cursos</h1>
          <p className="text-sm text-reducar-text-secondary mt-1">
            Gestioná los cursos publicados en la plataforma.
          </p>
        </div>

        <div className="inline-flex p-1 rounded-2xl bg-reducar-surface border border-reducar-border">
          <button
            type="button"
            onClick={() => setTab("list")}
            className={`px-4 h-10 rounded-xl text-sm font-bold transition-colors ${
              tab === "list"
                ? "bg-reducar-primary text-white"
                : "text-reducar-text-secondary hover:text-reducar-primary"
            }`}
          >
            Listar cursos
          </button>
          <button
            type="button"
            onClick={() => setTab("create")}
            className={`px-4 h-10 rounded-xl text-sm font-bold transition-colors ${
              tab === "create"
                ? "bg-reducar-primary text-white"
                : "text-reducar-text-secondary hover:text-reducar-primary"
            }`}
          >
            + Crear curso
          </button>
        </div>
      </div>

      {/* ===== Lista ===== */}
      {tab === "list" && (
        <div className="space-y-3">
          {cursosMock.map((c) => {
            const expanded = expandedId === c.id;
            return (
              <div
                key={c.id}
                data-expandable-card
                className="bg-reducar-surface rounded-2xl border border-reducar-border shadow-sm overflow-hidden transition-shadow hover:shadow-md"
              >
                {/* Cabecera clickeable */}
                <button
                  type="button"
                  onClick={() => setExpandedId(expanded ? null : c.id)}
                  className="w-full text-left p-5 flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-reducar-primary-light grid place-items-center shrink-0">
                    <svg
                      className="w-6 h-6 text-reducar-primary"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 19V6a2 2 0 0 1 2-2h9l5 5v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
                      <path d="M14 4v5h5" />
                    </svg>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold truncate">
                        {c.titulo}
                      </h3>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          c.activo
                            ? "bg-green-500/15 text-green-500"
                            : "bg-red-500/15 text-red-500"
                        }`}
                      >
                        {c.activo ? "Activo" : "Inactivo"}
                      </span>
                    </div>
                    <p className="text-xs text-reducar-text-secondary mt-1 truncate">
                      {c.categoria} · {c.institucion} · {c.modalidad}
                    </p>
                  </div>

                  <div className="hidden sm:flex flex-col items-end gap-1 shrink-0">
                    <span className="text-sm font-bold">
                      {c.precio === 0 ? "Gratis" : `$${c.precio}`}
                    </span>
                    <span className="text-xs text-reducar-text-secondary">
                      {c.duracion} días
                    </span>
                  </div>

                  <svg
                    className={`w-5 h-5 text-reducar-text-secondary transition-transform duration-300 ${
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
                    <div className="px-5 pb-5 pt-1 border-t border-reducar-border">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-4 text-sm">
                        <div>
                          <p className="text-[10px] uppercase font-bold tracking-wider text-reducar-text-secondary">
                            Nivel
                          </p>
                          <p className="font-semibold">{c.nivel}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold tracking-wider text-reducar-text-secondary">
                            Cupos
                          </p>
                          <p className="font-semibold">
                            {c.cupos === null ? "Ilimitados" : c.cupos}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold tracking-wider text-reducar-text-secondary">
                            Inicio
                          </p>
                          <p className="font-semibold">{c.fechaInicio}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold tracking-wider text-reducar-text-secondary">
                            ID
                          </p>
                          <p className="font-semibold">#{c.id}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-[10px] uppercase font-bold tracking-wider text-reducar-text-secondary mb-1">
                          Descripción
                        </p>
                        <p className="text-sm text-reducar-text-secondary leading-relaxed">
                          {c.descripcion}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 pt-2">
                        <button
                          type="button"
                          className="flex-1 h-10 rounded-xl bg-reducar-primary text-white text-sm font-bold hover:bg-reducar-primary-dark transition-colors"
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="flex-1 h-10 rounded-xl border border-yellow-500/40 text-yellow-500 text-sm font-bold hover:bg-yellow-500/10 transition-colors"
                        >
                          {c.activo ? "Desactivar" : "Activar"}
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
      )}

      {/* ===== Formulario de creación ===== */}
      {tab === "create" && (
        <form
          onSubmit={(e) => e.preventDefault()}
          className="bg-reducar-surface p-6 sm:p-8 rounded-2xl border border-reducar-border shadow-sm space-y-5 max-w-3xl"
        >
          <div>
            <h2 className="text-lg font-extrabold">Nuevo curso</h2>
            <p className="text-xs text-reducar-text-secondary mt-0.5">
              Todos los campos son editables. El curso se publica como inactivo
              hasta que lo actives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Título" id="c-titulo" placeholder="Ej: Introducción a Python" />
            <Input label="Categoría" id="c-categoria" placeholder="Web, Data, Diseño..." />
            <Input label="Institución" id="c-institucion" placeholder="Fundación Pescar" />
            <Input label="Modalidad" id="c-modalidad" placeholder="Remoto / Híbrido / Async" />
            <Input label="Nivel" id="c-nivel" placeholder="Principiante / Intermedio / Avanzado" />
            <Input label="Duración (días)" id="c-duracion" type="number" placeholder="60" />
            <Input label="Precio" id="c-precio" type="number" placeholder="0" />
            <Input label="Cupos" id="c-cupos" type="number" placeholder="50" />
            <Input label="Fecha de inicio" id="c-fecha" type="date" />
            <Input label="Enlace de inscripción" id="c-enlace" type="url" placeholder="https://..." />
          </div>

          <div>
            <label
              htmlFor="c-desc"
              className="block mb-1.5 text-sm font-bold text-reducar-text"
            >
              Descripción larga
            </label>
            <textarea
              id="c-desc"
              rows={5}
              placeholder="Contá de qué se trata el curso..."
              className="w-full px-4 py-3 rounded-xl bg-reducar-surface-soft border-[1.5px] border-reducar-border text-reducar-text placeholder-reducar-placeholder outline-none focus:border-reducar-primary focus:ring-2 focus:ring-reducar-primary/20 transition-all resize-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 h-11 rounded-xl bg-reducar-primary text-white font-bold hover:bg-reducar-primary-dark transition-colors"
            >
              Crear curso
            </button>
            <button
              type="button"
              onClick={() => setTab("list")}
              className="flex-1 h-11 rounded-xl border border-reducar-border text-reducar-text font-bold hover:bg-reducar-surface-soft transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

// ===== Helper =====
interface InputProps extends React.ComponentProps<"input"> {
  label: string;
  id: string;
}

const Input = ({ label, id, ...rest }: InputProps) => (
  <div>
    <label
      htmlFor={id}
      className="block mb-1.5 text-sm font-bold text-reducar-text"
    >
      {label}
    </label>
    <input
      id={id}
      {...rest}
      className="w-full px-4 py-3 rounded-xl bg-reducar-surface-soft border-[1.5px] border-reducar-border text-reducar-text placeholder-reducar-placeholder outline-none focus:border-reducar-primary focus:ring-2 focus:ring-reducar-primary/20 transition-all"
    />
  </div>
);