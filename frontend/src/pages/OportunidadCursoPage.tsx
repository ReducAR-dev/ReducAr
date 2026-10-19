// src/pages/OportunidadCursoPage.tsx
import { useNavigate } from "react-router-dom";

interface CursoDescuento {
  id: number;
  titulo: string;
  institucion: string;
  precioOriginal: number;
  precioDescuento: number;
  descuento: number;
  imagen: string;
}

const CURSOS_DESCUENTO: CursoDescuento[] = [
  { id: 1, titulo: "Bootcamp Data Science", institucion: "DataAcademy", precioOriginal: 100000, precioDescuento: 50000, descuento: 50, imagen: "📊" },
  { id: 2, titulo: "Diseño Gráfico Profesional", institucion: "CreativeSchool", precioOriginal: 80000, precioDescuento: 60000, descuento: 25, imagen: "🎨" },
  { id: 3, titulo: "Inglés Técnico para IT", institucion: "LanguageCenter", precioOriginal: 40000, precioDescuento: 30000, descuento: 25, imagen: "🇬🇧" },
];

export default function OportunidadCursoPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-reducar-bg px-4 py-12 text-reducar-text transition-colors sm:px-6 md:px-16 md:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <span className="rounded-full bg-reducar-primary/20 px-4 py-1.5 text-sm font-bold text-reducar-primary">
            OFERTAS ESPECIALES
          </span>
          <h1 className="mt-4 text-4xl font-extrabold text-reducar-text md:text-5xl">
            Cursos en Descuento
          </h1>
          <p className="mt-3 text-base text-reducar-text-secondary sm:text-lg">
            Aprovechá estas oportunidades para potenciar tu futuro.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CURSOS_DESCUENTO.map((curso) => (
            <article key={curso.id} className="flex flex-col rounded-2xl border border-reducar-border bg-reducar-surface p-6 shadow-lg transition hover:-translate-y-1 hover:border-reducar-primary/40 hover:shadow-xl">
              <div className="text-5xl mb-4">{curso.imagen}</div>
              <h2 className="mb-2 text-xl font-extrabold text-reducar-text">{curso.titulo}</h2>
              <p className="mb-4 text-sm text-reducar-text-secondary">{curso.institucion}</p>

              <div className="mt-auto">
                <div className="text-2xl font-extrabold text-reducar-primary">
                  ${curso.precioDescuento.toLocaleString("es-AR")}
                </div>
                <div className="text-sm text-reducar-text-secondary line-through">
                  ${curso.precioOriginal.toLocaleString("es-AR")}
                </div>
                <div className="inline-block mt-2 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-300">
                  -{curso.descuento}% OFF
                </div>
                <button
                  type="button"
                  onClick={() => navigate(`/cursos?q=${encodeURIComponent(curso.titulo)}`)}
                  className="mt-4 min-h-11 w-full rounded-xl bg-reducar-primary px-4 py-2.5 text-sm font-extrabold text-white transition hover:bg-reducar-primary-dark"
                >
                  Ver oportunidad
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
