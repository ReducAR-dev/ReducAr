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
    <section className="py-20 bg-linear-to-b from-reducar-bg to-reducar-surface-soft border-t border-reducar-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-xs font-extrabold tracking-widest text-reducar-primary uppercase mb-3">
            Encontrá tu próximo desafío
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-reducar-text tracking-tight mb-4">
            Explorá por categorías
          </h2>
          <p className="text-reducar-text-secondary text-base leading-relaxed">
            Elegí un área de interés y descubrí cursos relacionados para seguir
            aprendiendo.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 overflow-x-auto pb-4">
          {categories.map((category) => (
            <Link
              key={category.label}
              to={`/cursos?q=${encodeURIComponent(category.query)}`}
              className="flex flex-col items-center justify-center gap-2.5 p-3.5 min-h-28 bg-reducar-surface border border-reducar-border rounded-2xl text-center hover:-translate-y-1 hover:border-reducar-primary/40 hover:shadow-xl transition-all duration-200"
            >
              <span className="w-11 h-11 grid place-items-center bg-reducar-primary-light rounded-xl text-2xl" aria-hidden="true">
                {category.icon}
              </span>
              <strong className="text-xs font-bold text-reducar-text leading-tight">{category.label}</strong>
            </Link>
          ))}
        </div>

        <RandomCoursesCarousel />
      </div>
    </section>
  );
}

export default OpportunitiesSection;