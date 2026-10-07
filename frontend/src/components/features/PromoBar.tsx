// src/components/features/PromoBar.tsx
import { useState } from "react";
import { CloseIcon, GraduationIcon } from "./Icons";

function PromoBar() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="min-h-11 bg-linear-to-r from-reducar-primary via-reducar-gradient-middle to-reducar-turquoise-dark flex items-center">
      <div className="w-full max-w-7xl mx-auto pl-4 pr-12 py-2.5 flex items-center justify-center gap-2 relative">

        {/* Desktop: mensaje completo */}
        <div className="hidden md:flex items-center gap-2 text-white text-sm">
          <GraduationIcon className="w-5 h-5 shrink-0" />
          <strong className="whitespace-nowrap">Oportunidad destacada:</strong>
          <span className="truncate">
            Desarrollo Web Full Stack gratuito. Cupos limitados.
          </span>
          <a
            href="#"
            className="ml-3 font-bold flex items-center gap-1 hover:opacity-80 whitespace-nowrap shrink-0"
          >
            Ver oportunidad <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* Mobile: versión compacta */}
        <div className="flex md:hidden items-center gap-2 text-white text-xs">
          <GraduationIcon className="w-4 h-4 shrink-0" />
          <strong className="whitespace-nowrap">Oportunidad destacada:</strong>
          <a
            href="#"
            className="font-bold flex items-center gap-1 hover:opacity-80 whitespace-nowrap"
          >
            Ver oportunidad <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* Cerrar */}
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-white/80 hover:text-white rounded-lg transition-colors"
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