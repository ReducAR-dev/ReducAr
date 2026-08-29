import { useRef } from "react";
import { Link } from "react-router-dom";

const courses = [
  {
    title: "Desarrollo Web Full Stack",
    organization: "Fundación Pescar",
    category: "Tecnología",
    modality: "Virtual",
    duration: "6 meses",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Testing Master",
    organization: "Fundación Empujar",
    category: "Tecnología",
    modality: "Virtual",
    duration: "5 meses",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Programación asistida con IA",
    organization: "Chicas en Tecnología",
    category: "Tecnología",
    modality: "Híbrida",
    duration: "8 semanas",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Introducción a la programación con Python",
    organization: "Santander Open Academy",
    category: "Tecnología",
    modality: "Virtual",
    duration: "8 horas",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Tu Futuro + Tecnología",
    organization: "Fundación Forge",
    category: "Empleabilidad",
    modality: "Virtual",
    duration: "1 año",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Mujeres Programando Futuro",
    organization: "Fundación Media Pila",
    category: "Programación",
    modality: "Virtual",
    duration: "4 meses",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=700&q=80",
  },
] as const;

const dailyOffset = new Date().getDate() % courses.length;
const featuredCourses = [
  ...courses.slice(dailyOffset),
  ...courses.slice(0, dailyOffset),
];

function RandomCoursesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  const moveCarousel = (direction: -1 | 1): void => {
    trackRef.current?.scrollBy({
      left: trackRef.current.clientWidth * 0.82 * direction,
      behavior: "smooth",
    });
  };

  return (
    <div className="random-courses">
      <div className="random-courses-heading">
        <div>
          <span>Una selección para vos</span>
          <h3>Cursos para descubrir</h3>
        </div>

        <div className="random-courses-actions">
          <Link to="/cursos">Ver todos</Link>
          <button
            type="button"
            onClick={() => moveCarousel(-1)}
            aria-label="Ver cursos anteriores"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => moveCarousel(1)}
            aria-label="Ver más cursos"
          >
            →
          </button>
        </div>
      </div>

      <div className="random-courses-track" ref={trackRef}>
        {featuredCourses.map((course) => (
          <article className="random-course-card" key={course.title}>
            <img src={course.image} alt="" />
            <div className="random-course-card-content">
              <span>{course.category}</span>
              <h4>{course.title}</h4>
              <p>{course.organization}</p>
              <div className="random-course-meta">
                <span>{course.modality}</span>
                <span>{course.duration}</span>
              </div>
              <Link to={`/cursos?q=${encodeURIComponent(course.title)}`}>
                Ver curso <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default RandomCoursesCarousel;
