// src/components/features/PromoBar.tsx
import { useState } from "react";
import { CloseIcon, GraduationIcon } from "./Icons";

function PromoBar() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="min-h-11 bg-linear-to-r from-reducar-primary via-[#8a7bf6] to-reducar-turquoise-dark">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center relative">
        <div className="flex items-center gap-2 text-white text-sm">
          <GraduationIcon className="w-5 h-5" />
          <strong>Oportunidad destacada:</strong>
          <span>Desarrollo Web Full Stack gratuito. Cupos limitados.</span>
          <a href="#" className="ml-3 font-bold flex items-center gap-1 hover:opacity-80">
            Ver oportunidad <span aria-hidden="true">→</span>
          </a>
        </div>
        <button
          type="button"
          className="absolute right-0 p-2 text-white/80 hover:text-white rounded-lg"
          aria-label="Cerrar promoción"
          onClick={() => setVisible(false)}
        >
          <CloseIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default PromoBar;