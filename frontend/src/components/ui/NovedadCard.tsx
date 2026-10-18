// src/components/ui/NovedadCard.tsx
import { useState } from "react";
import type { Novedad } from "../../types/novedad.types";

interface NovedadCardProps {
  novedad: Novedad;
  className?: string;
}

const MESES = [
  "ENE", "FEB", "MAR", "ABR", "MAY", "JUN",
  "JUL", "AGO", "SEP", "OCT", "NOV", "DIC",
];

export const NovedadCard = ({ novedad, className = "" }: NovedadCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // fecha_evento viene como "YYYY-MM-DD" y la separamos sin usar Date()
  // para evitar problemas de zona horaria.
  const [year, month, day] = novedad.fecha_evento.split("-");
  const mesTexto = MESES[parseInt(month, 10) - 1] || month;

  return (
    <article
      className={`bg-reducar-surface rounded-2xl border border-reducar-border shadow-sm overflow-hidden transition-all hover:border-reducar-primary/40 ${className}`}
    >
      {/* Cabecera clickeable */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-5 grid grid-cols-[70px_minmax(0,1fr)_30px] sm:grid-cols-[80px_minmax(0,1fr)_30px] items-center gap-4 sm:gap-6"
      >
        {/* Bloque de fecha */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 flex flex-col items-center justify-center rounded-2xl border border-reducar-primary/30 bg-linear-to-br from-reducar-primary/15 to-reducar-turquoise/10 shadow-sm shrink-0">
          <strong className="text-reducar-primary text-2xl sm:text-3xl font-extrabold leading-none">
            {day}
          </strong>
          <span className="mt-1 text-reducar-text text-[10px] sm:text-xs font-extrabold tracking-wider">
            {mesTexto}
          </span>
        </div>

        {/* Info principal */}
        <div className="min-w-0 flex flex-col items-start text-left">
          <h3 className="mb-1 text-base sm:text-lg font-extrabold text-reducar-text leading-snug line-clamp-2">
            {novedad.titulo}
          </h3>
          <p className="m-0 text-xs sm:text-sm text-reducar-text-secondary line-clamp-1">
            {novedad.descripcion_corta || "Sin descripción breve."}
          </p>
        </div>

        {/* Chevron indicador */}
        <div className="shrink-0 flex items-center justify-center text-reducar-text-secondary">
          <svg
            className={`w-6 h-6 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Contenido expandible */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-6 pt-2 border-t border-reducar-border/50">
            <div className="pl-[86px] sm:pl-[104px]">
              <p className="text-sm text-reducar-text-secondary leading-relaxed whitespace-pre-line mb-4">
                {novedad.descripcion_larga || "No hay una descripción extendida para este evento."}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Detalles extra */}
                <div className="flex flex-col gap-1 text-xs text-reducar-text-secondary">
                  {novedad.ubicacion && (
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {novedad.ubicacion}
                    </span>
                  )}
                </div>

                {/* Link de inscripción/evento */}
                {novedad.enlace && (
                  <a
                    href={novedad.enlace}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center justify-center gap-2 h-10 px-5 rounded-xl bg-reducar-primary text-white text-sm font-bold hover:bg-reducar-primary-dark transition-colors"
                  >
                    Ir al evento
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default NovedadCard;