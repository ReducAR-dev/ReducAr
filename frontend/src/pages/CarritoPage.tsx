// src/pages/CarritoPage.tsx
import { useNavigate } from "react-router-dom";

export default function CarritoPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-reducar-bg text-reducar-text px-4 py-10 md:px-8">
      <div className="mx-auto max-w-3xl mt-10">
        
        {/* TARJETA DE ESTADO VACÍO */}
        <div className="rounded-3xl border border-reducar-border bg-reducar-surface p-8 md:p-14 text-center shadow-xl relative overflow-hidden">
          
          {/* Fondo decorativo sutil */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-reducar-primary/5 rounded-full blur-3xl pointer-events-none" />

          {/* Ícono animado / Ilustración */}
          <div className="relative mb-8 flex justify-center">
            <div className="w-28 h-28 bg-reducar-surface-soft rounded-full flex items-center justify-center border-4 border-reducar-bg shadow-inner relative">
              {/* Carrito de compras con un toque gracioso */}
              <span className="text-6xl animate-[bounce_2s_infinite]">🛒</span>
              
              {/* Arañita o destellito (opcional para el toque gracioso) */}
              <span className="absolute -top-2 -right-2 text-3xl animate-pulse">✨</span>
            </div>
          </div>

          {/* Textos */}
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">
            Tu carrito está <span className="bg-linear-to-r from-reducar-primary to-reducar-turquoise bg-clip-text text-transparent">más vacío que...</span>
          </h1>
          <p className="text-base text-reducar-text-secondary max-w-md mx-auto mb-8 leading-relaxed">
            Parece que todavía no agregaste nada. Estamos trabajando en la pasarela de pagos, pero mientras tanto, podés explorar nuestro catálogo y guardar cursos en tus favoritos o en tu lista de aprendizaje.
          </p>

          {/* Botón principal */}
          <button
            onClick={() => navigate("/cursos")}
            className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xl bg-linear-to-r from-reducar-primary to-reducar-turquoise-dark text-white font-bold text-base shadow-lg hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
          >
            Ver cursos disponibles
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>

          {/* Separador */}
          <div className="mt-12 mb-8 border-t border-reducar-border/60 w-2/3 mx-auto" />

          {/* Sugerencias o "Por qué comprar acá" */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="p-4 rounded-2xl bg-reducar-surface-soft border border-reducar-border">
              <span className="text-2xl mb-2 block">💸</span>
              <h3 className="font-bold text-sm mb-1">Precios accesibles</h3>
              <p className="text-xs text-reducar-text-secondary">Cursos gratuitos y opciones para todos los presupuestos.</p>
            </div>
            <div className="p-4 rounded-2xl bg-reducar-surface-soft border border-reducar-border">
              <span className="text-2xl mb-2 block">🎓</span>
              <h3 className="font-bold text-sm mb-1">Certificados</h3>
              <p className="text-xs text-reducar-text-secondary">Validá tus conocimientos con certificaciones oficiales.</p>
            </div>
            <div className="p-4 rounded-2xl bg-reducar-surface-soft border border-reducar-border">
              <span className="text-2xl mb-2 block">🏛️</span>
              <h3 className="font-bold text-sm mb-1">Instituciones Top</h3>
              <p className="text-xs text-reducar-text-secondary">Aprendé de la mano de organizaciones líderes.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}