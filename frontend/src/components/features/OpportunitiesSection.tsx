// src/components/features/OpportunitiesSection.tsx
import { Link } from "react-router-dom";
import RandomCoursesCarousel from "./RandomCoursesCarousel";

const categories = [
  { label: "Tecnología", query: "tecnología", icon: "💻" },
  { label: "Desarrollo web", query: "desarrollo web", icon: "🌐" },
  { label: "Programación", query: "programación", icon: "👩‍💻" },
  { label: "Inteligencia artificial", query: "inteligencia artificial", icon: "🤖" },
  { label: "Testing", query: "testing", icon: "🧪" },
  { label: "Competencias digitales", query: "competencias digitales", icon: "📱" },
  { label: "Empleabilidad", query: "empleabilidad", icon: "💼" },
  { label: "Formación inicial", query: "inicial", icon: "🚀" },
] as const;

function OpportunitiesSection() {
  return (
    <section className="relative py-20 bg-linear-to-b from-reducar-bg to-reducar-surface-soft border-t border-reducar-border overflow-hidden">
      
      {/* Fondo sutil de luces */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(123,108,246,0.05),transparent_50%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4">
        
        {/* CABECERA: Alineada a los extremos (Izquierda texto, derecha botón) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold tracking-widest text-reducar-primary uppercase mb-3">
              ✦ Encontrá tu próximo desafío
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-reducar-text tracking-tight">
              Explorá por <span className="bg-linear-to-r from-reducar-primary to-reducar-turquoise bg-clip-text text-transparent">categorías</span>
            </h2>
            <p className="mt-3 text-reducar-text-secondary text-base leading-relaxed">
              Elegí un área de interés y descubrí oportunidades de formación para seguir creciendo profesionalmente.
            </p>
          </div>
          
          <Link 
            to="/cursos" 
            className="hidden md:inline-flex items-center justify-center h-11 px-6 rounded-xl border border-reducar-border bg-reducar-surface text-reducar-text text-sm font-bold hover:bg-reducar-primary hover:text-white hover:border-reducar-primary transition-all shadow-sm shrink-0"
          >
            Ver todos los cursos →
          </Link>
        </div>

        {/* GRILLA DE CATEGORÍAS (4 columnas en PC, 2 en tablet, 1 en celular) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {categories.map((category) => (
            <Link
              key={category.label}
              to={`/cursos?q=${encodeURIComponent(category.query)}`}
              className="group flex items-center gap-4 p-4 bg-reducar-surface border border-reducar-border rounded-2xl 
                         hover:-translate-y-1 hover:border-reducar-primary/50 hover:shadow-[0_0_25px_rgba(123,108,246,0.15)] 
                         transition-all duration-300 ease-in-out"
            >
              <span className="w-14 h-14 shrink-0 grid place-items-center bg-reducar-primary-light rounded-xl text-2xl 
                               group-hover:bg-reducar-primary group-hover:text-white group-hover:scale-110 transition-all duration-300">
                {category.icon}
              </span>
              <div className="flex-1 min-w-0">
                <strong className="block text-[15px] font-bold text-reducar-text leading-tight group-hover:text-reducar-primary transition-colors">
                  {category.label}
                </strong>
                <span className="block text-xs text-reducar-text-secondary mt-1 opacity-0 group-hover:opacity-100 transition-opacity translate-y-1 group-hover:translate-y-0 duration-300">
                  Ver cursos →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* SEPARADOR Y CARRUSEL */}
        <div className="pt-10 border-t border-reducar-border/60">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-extrabold text-reducar-text">
              Cursos recomendados para vos
            </h3>
          </div>
          
          <RandomCoursesCarousel />
        </div>

        {/* Botón "Ver todos" para móviles (ya que el de arriba está oculto en sm) */}
        <div className="mt-10 flex justify-center md:hidden">
          <Link 
            to="/cursos" 
            className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-reducar-surface border border-reducar-border text-reducar-text text-sm font-bold hover:bg-reducar-primary hover:text-white transition-all shadow-sm"
          >
            Ver todos los cursos →
          </Link>
        </div>

      </div>
    </section>
  );
}

export default OpportunitiesSection;