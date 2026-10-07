// src/components/features/RandomCoursesCarousel.tsx
import { useRef } from "react";
import { Link } from "react-router-dom";

const courses = [
  { title: "Desarrollo Web Full Stack", organization: "Fundación Pescar", category: "Tecnología", modality: "Virtual", duration: "6 meses", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=700&q=80" },
  { title: "Testing Master", organization: "Fundación Empujar", category: "Tecnología", modality: "Virtual", duration: "5 meses", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=80" },
  { title: "Programación asistida con IA", organization: "Chicas en Tecnología", category: "Tecnología", modality: "Híbrida", duration: "8 semanas", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=700&q=80" },
  { title: "Introducción a la programación con Python", organization: "Santander Open Academy", category: "Tecnología", modality: "Virtual", duration: "8 horas", image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=700&q=80" },
  { title: "Tu Futuro + Tecnología", organization: "Fundación Forge", category: "Empleabilidad", modality: "Virtual", duration: "1 año", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=700&q=80" },
  { title: "Mujeres Programando Futuro", organization: "Fundación Media Pila", category: "Programación", modality: "Virtual", duration: "4 meses", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=700&q=80" },
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
    <div className="mt-16">
      <div className="flex items-end justify-between gap-6 mb-6">
        <div>
          <span className="text-xs font-extrabold tracking-widest text-reducar-primary uppercase">
            Una selección para vos
          </span>
          <h3 className="text-3xl font-extrabold Cursos para descubrir tracking-tight mt-2">
            Cursos para descubrir
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/cursos"
            className="mr-2 text-reducar-primary text-sm font-extrabold hover:text-reducar-turquoise transition-colors"
          >
            Ver todos
          </Link>
          <button
            type="button"
            onClick={() => moveCarousel(-1)}
            aria-label="Ver cursos anteriores"
            className="w-10 h-10 grid place-items-center rounded-xl bg-reducar-surface border border-reducar-border text-reducar-primary text-lg hover:bg-reducar-primary hover:text-white transition-colors"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => moveCarousel(1)}
            aria-label="Ver más cursos"
            className="w-10 h-10 grid place-items-center rounded-xl bg-reducar-surface border border-reducar-border text-reducar-primary text-lg hover:bg-reducar-primary hover:text-white transition-colors"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="grid grid-flow-col auto-cols-[minmax(260px,1fr)] lg:auto-cols-[calc((100%-42px)/4)] gap-4 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory scrollbar-none [&::-webkit-scrollbar]:hidden"
      >
        {featuredCourses.map((course) => (
          <article
            key={course.title}
            className="overflow-hidden bg-reducar-surface border border-reducar-border rounded-2xl snap-start"
          >
            <img src={course.image} alt="" className="w-full h-29.5 object-cover" />
            <div className="p-4">
              <span className="text-xs font-extrabold tracking-widest text-reducar-primary uppercase">
                {course.category}
              </span>
              <h4 className="text-base font-bold Cursos para descubrir mt-1.5 mb-1.5 min-h-10.75 leading-snug">
                {course.title}
              </h4>
              <p className="text-sm text-reducar-text-secondary truncate">
                {course.organization}
              </p>
              <div className="flex flex-wrap gap-1.5 my-3">
                <span className="px-2 py-1 text-[10px] font-bold text-reducar-text-secondary bg-reducar-surface-soft border border-reducar-border rounded-full">
                  {course.modality}
                </span>
                <span className="px-2 py-1 text-[10px] font-bold text-reducar-text-secondary bg-reducar-surface-soft border border-reducar-border rounded-full">
                  {course.duration}
                </span>
              </div>
              <Link
                to={`/cursos?q=${encodeURIComponent(course.title)}`}
                className="inline-flex items-center gap-1 text-reducar-primary text-xs font-extrabold hover:text-reducar-turquoise transition-colors"
              >
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