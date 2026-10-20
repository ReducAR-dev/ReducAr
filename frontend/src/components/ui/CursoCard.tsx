import { Link } from "react-router-dom";
import type { CursoResumen } from "../../types/curso.types";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80";

export const CursoCard = ({ curso }: { curso: CursoResumen }) => {
  return (
    <Link 
      to={`/cursos/${curso.id}`} 
      className="group flex flex-col overflow-hidden rounded-2xl bg-reducar-surface border border-reducar-border 
                 transition-all duration-300 ease-in-out
                 hover:-translate-y-1 hover:border-reducar-primary/50 
                 hover:shadow-[0_0_25px_rgba(123,108,246,0.25)]"
    >
      <div className="relative h-36.25 overflow-hidden bg-reducar-primary-light">
        <img
          src={curso.imagen_url || FALLBACK_IMAGE}
          onError={(e) => {
            e.currentTarget.src = FALLBACK_IMAGE;
            e.currentTarget.onerror = null;
          }}
          alt={curso.titulo}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2.5 left-2.5 right-2.5 flex justify-between gap-1.5">
          {curso.precio === 0 && (
            <span className="px-2 py-1.5 text-[10px] font-extrabold text-white bg-reducar-turquoise-dark rounded-full shadow-sm">
              Gratuito
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 p-4 flex flex-col">
        <span className="w-fit text-[10px] font-extrabold text-reducar-primary uppercase tracking-wider">
          {curso.categoria}
        </span>
        <h3 className="mt-1.5 mb-1 text-base font-bold text-reducar-text leading-snug line-clamp-2">
          {curso.titulo}
        </h3>
        <p className="m-0 text-xs font-semibold text-reducar-primary underline line-clamp-1">
          {curso.institucion}
        </p>
        <p className="mt-2 text-xs text-reducar-text-secondary line-clamp-2">
          {curso.descripcion_corta}
        </p>

        <div className="flex gap-2.5 mt-3 pb-3 text-[10px] font-semibold text-reducar-text-secondary">
          <span>◉ {curso.modalidad}</span>
        </div>

        <div className="mt-auto pt-2.5 flex items-center justify-between gap-2 border-t border-reducar-border">
          <div className="flex items-center flex-wrap gap-1.5">
            {curso.precio > 0 ? (
              <span className="px-2 py-1 text-[10px] font-bold bg-reducar-primary-light text-reducar-primary rounded-lg">
                ${curso.precio}
              </span>
            ) : (
              <span className="px-2 py-1 text-[10px] font-bold text-reducar-turquoise-dark bg-reducar-turquoise/10 rounded-lg">
                Gratuito
              </span>
            )}
            <div
              className="w-8 h-8 shrink-0 grid place-items-center rounded-full border border-reducar-primary text-reducar-primary 
                         group-hover:bg-reducar-primary group-hover:text-white transition-colors"
            >
              →
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};