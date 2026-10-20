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
const featuredCourses = [...courses.slice(dailyOffset), ...courses.slice(0, dailyOffset)];

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
          <span className="text-[11px] font-extrabold tracking-widest text-reducar-primary uppercase bg-reducar-primary-light px-2.5 py-1 rounded-md">
            Selección diaria
          </span>
          <h3 className="text-3xl font-extrabold text-reducar-text tracking-tight mt-3">
            Cursos para descubrir hoy
          </h3>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <button
            type="button"
            onClick={() => moveCarousel(-1)}
            aria-label="Ver cursos anteriores"
            className="w-10 h-10 grid place-items-center rounded-full bg-reducar-surface border border-reducar-border text-reducar-text hover:border-reducar-primary hover:text-reducar-primary transition-all shadow-sm"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => moveCarousel(1)}
            aria-label="Ver más cursos"
            className="w-10 h-10 grid place-items-center rounded-full bg-reducar-surface border border-reducar-border text-reducar-text hover:border-reducar-primary hover:text-reducar-primary transition-all shadow-sm"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="grid grid-flow-col auto-cols-[minmax(280px,1fr)] lg:auto-cols-[calc((100%-48px)/4)] gap-4 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scrollbar-none [&::-webkit-scrollbar]:hidden"
      >
        {featuredCourses.map((course) => (
          <Link
            key={course.title}
            to={`/cursos?q=${encodeURIComponent(course.title)}`}
            className="group flex flex-col overflow-hidden bg-reducar-surface border border-reducar-border rounded-2xl snap-start 
                       transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-reducar-primary/50 hover:shadow-[0_0_20px_rgba(123,108,246,0.15)]"
          >
            <div className="relative h-32 overflow-hidden bg-reducar-primary-light">
              <img src={course.image} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="p-4 flex flex-col flex-1">
              <span className="text-[10px] font-extrabold tracking-widest text-reducar-primary uppercase">
                {course.category}
              </span>
              <h4 className="text-base font-bold text-reducar-text mt-1.5 mb-1 leading-snug line-clamp-2 group-hover:text-reducar-primary transition-colors">
                {course.title}
              </h4>
              <p className="text-xs font-semibold text-reducar-text-secondary truncate mb-3">
                {course.organization}
              </p>
              <div className="mt-auto flex flex-wrap gap-1.5">
                <span className="px-2 py-1 text-[10px] font-bold text-reducar-text-secondary bg-reducar-surface-soft rounded-md">
                  ◉ {course.modality}
                </span>
                <span className="px-2 py-1 text-[10px] font-bold text-reducar-text-secondary bg-reducar-surface-soft rounded-md">
                  ◷ {course.duration}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RandomCoursesCarousel;