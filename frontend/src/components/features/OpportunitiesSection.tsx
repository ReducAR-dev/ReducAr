import { Link } from "react-router-dom";

import "../../styles/categories.css";
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
    <section className="categories-section">
      <div className="categories-container">
        <div className="categories-heading">
          <span>Encontrá tu próximo desafío</span>
          <h2>Explorá por categorías</h2>
          <p>
            Elegí un área de interés y descubrí cursos relacionados para seguir
            aprendiendo.
          </p>
        </div>

        <div className="categories-grid">
          {categories.map((category) => (
            <Link
              className="category-card"
              key={category.label}
              to={`/cursos?q=${encodeURIComponent(category.query)}`}
            >
              <span className="category-icon" aria-hidden="true">
                {category.icon}
              </span>
              <strong>{category.label}</strong>
              <span className="category-arrow" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>

        <RandomCoursesCarousel />
      </div>
    </section>
  );
}

export default OpportunitiesSection;
