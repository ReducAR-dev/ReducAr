// src/pages/usuario/MisFavoritosPage.tsx
import { useState } from "react";

interface CursoFavorito {
  id: number;
  titulo: string;
  categoria: string;
  institucion: string;
  duracion: string;
  valoracion: number;
  imagen: string;
}

const FAVORITOS_INICIALES: CursoFavorito[] = [
  {
    id: 1,
    titulo: "Desarrollo Web Full Stack con React y Node.js",
    categoria: "Tecnología",
    institucion: "UTN Tecnológica",
    duracion: "6 meses",
    valoracion: 4.8,
    imagen: "💻",
  },
  {
    id: 2,
    titulo: "Introducción a la Inteligencia Artificial y Machine Learning",
    categoria: "Innovación",
    institucion: "Codo a Codo",
    duracion: "4 meses",
    valoracion: 4.9,
    imagen: "🤖",
  },
  {
    id: 3,
    titulo: "Gestión de Proyectos Ágiles y Scrum",
    categoria: "Negocios",
    institucion: "Fundación Telefónica",
    duracion: "2 meses",
    valoracion: 4.7,
    imagen: "📊",
  },
  {
    id: 4,
    titulo: "Diseño UX/UI Avanzado para Productos Digitales",
    categoria: "Diseño",
    institucion: "Digital House",
    duracion: "3 meses",
    valoracion: 4.6,
    imagen: "🎨",
  },
];

export default function MisFavoritosPage() {
  const [favoritos, setFavoritos] = useState<CursoFavorito[]>(FAVORITOS_INICIALES);
  const [mensaje, setMensaje] = useState<string | null>(null);

  const eliminarFavorito = (id: number, titulo: string) => {
    setFavoritos(favoritos.filter((fav) => fav.id !== id));
    setMensaje(`Se eliminó "${titulo}" de tus favoritos.`);
    setTimeout(() => setMensaje(null), 3500);
  };

  return (
    <div className="min-h-screen bg-reducar-bg text-reducar-text px-6 py-10 md:px-16 transition-colors">
      <div className="mx-auto max-w-5xl">

        {/* ENCABEZADO */}
        <div className="mb-8 rounded-2xl border border-reducar-primary/40 bg-reducar-shell-surface p-6 md:p-8 shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <span className="rounded-full bg-reducar-primary/20 px-3 py-1 text-xs font-bold text-reducar-primary">
              SECCIÓN DE USUARIO (EJEMPLO)
            </span>
            <h1 className="mt-2 text-2xl md:text-3xl font-extrabold text-reducar-shell-text">
              Mis Cursos Favoritos
            </h1>
            <p className="text-reducar-shell-text-secondary text-sm mt-1">
              Guarda y accede rápidamente a los cursos e iniciativas educativas que más te interesan.
            </p>
          </div>

          <div className="bg-reducar-bg border border-reducar-shell-border px-5 py-3 rounded-xl text-center">
            <span className="block text-2xl font-bold text-reducar-primary">{favoritos.length}</span>
            <span className="text-xs text-reducar-shell-text-secondary">Guardados</span>
          </div>
        </div>

        {/* ALERTA / MENSAJE */}
        {mensaje && (
          <div className="mb-6 rounded-xl border border-amber-500/50 bg-amber-500/10 p-4 text-amber-700 dark:text-amber-300 text-sm flex items-center gap-3 shadow-md">
            <span>ℹ️</span>
            <span>{mensaje} (Vista estática interactiva)</span>
          </div>
        )}

        {/* LISTA DE FAVORITOS */}
        {favoritos.length === 0 ? (
          <div className="rounded-2xl border border-reducar-shell-border bg-reducar-shell-surface p-12 text-center">
            <div className="text-5xl mb-4">📂</div>
            <h3 className="text-lg font-bold text-reducar-shell-text">No tienes favoritos guardados</h3>
            <p className="text-sm text-reducar-shell-text-secondary mt-1">
              Explora el catálogo de cursos y añade tus favoritos haciendo clic en el icono de marcador.
            </p>
            <a
              href="/cursos"
              className="mt-6 inline-block rounded-xl bg-gradient-to-r from-reducar-primary to-reducar-turquoise px-6 py-2.5 text-sm font-bold text-white shadow-lg transition hover:scale-105"
            >
              Explorar Cursos
            </a>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {favoritos.map((curso) => (
              <div
                key={curso.id}
                className="group rounded-2xl border border-reducar-shell-border bg-reducar-shell-surface p-6 shadow-xl transition hover:border-reducar-primary/60 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="rounded-full bg-reducar-primary/10 px-3 py-1 text-xs font-semibold text-reducar-primary">
                      {curso.categoria}
                    </span>
                    <span className="text-sm font-bold text-amber-500 flex items-center gap-1">
                      ⭐ {curso.valoracion}
                    </span>
                  </div>

                  <div className="flex items-start gap-4 mb-4">
                    <div className="h-14 w-14 shrink-0 rounded-xl bg-reducar-bg border border-reducar-shell-border flex items-center justify-center text-3xl shadow-inner">
                      {curso.imagen}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-reducar-shell-text group-hover:text-reducar-primary transition-colors line-clamp-2">
                        {curso.titulo}
                      </h3>
                      <p className="text-xs text-reducar-shell-text-secondary mt-1">
                        🏛️ {curso.institucion} • ⏱️ {curso.duracion}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-reducar-shell-border">
                  <button
                    type="button"
                    onClick={() => alert(`Simulación: Redirigiendo al detalle del curso "${curso.titulo}"`)}
                    className="text-xs font-bold text-reducar-primary hover:underline"
                  >
                    Ver detalles →
                  </button>

                  <button
                    type="button"
                    onClick={() => eliminarFavorito(curso.id, curso.titulo)}
                    className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-500/20 transition"
                  >
                    🗑️ Quitar
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
