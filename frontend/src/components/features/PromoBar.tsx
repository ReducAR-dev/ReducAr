// src/components/features/PromoBar.tsx
import { useState } from "react";
import { CloseIcon, GraduationIcon, SparklesIcon } from "./Icons";

function PromoBar() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="relative overflow-hidden bg-linear-to-r from-reducar-primary via-reducar-primary-dark to-reducar-turquoise-dark flex items-center shadow-sm z-40">
      {/* Efecto de brillo sutil */}
      <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>

      <div className="relative w-full max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-center gap-3">
        
        {/* Desktop */}
        <div className="hidden md:flex items-center gap-2.5 text-white text-[13px]">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/20 font-bold backdrop-blur-sm">
            <SparklesIcon className="w-3.5 h-3.5" />
            <span>Novedad</span>
          </div>
          <span className="font-semibold tracking-wide">
            Desarrollo Web Full Stack 100% gratuito. Cupos limitados.
          </span>
          <a
            href="/oportunidad-curso"
            className="ml-2 px-3 py-1 bg-white text-reducar-primary text-xs font-extrabold rounded-lg hover:bg-reducar-bg transition-colors flex items-center gap-1 shadow-sm"
          >
            Ver oportunidad <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-2 text-white text-[11px]">
          <GraduationIcon className="w-4 h-4 shrink-0" />
          <strong className="whitespace-nowrap">Explora cursos destacados: </strong>
          <a
            href="/oportunidad-curso"
            className="font-bold underline decoration-white/30 underline-offset-2 hover:opacity-80 whitespace-nowrap"
          >
          Ver más
          </a>
        </div>

        {/* Botón Cerrar (Más visible y táctil) */}
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/10 hover:bg-black/20 text-white rounded-full transition-colors backdrop-blur-sm"
          aria-label="Cerrar promoción"
          onClick={() => setVisible(false)}
        >
          <CloseIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default PromoBar;