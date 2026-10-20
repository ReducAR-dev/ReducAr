import { useState } from "react";

type Opportunity = {
  id: number;
  status: string;
  institution: string;
  title: string;
  modality: string;
  duration: string;
  deadline: string;
  image: string;
};

const opportunities: Opportunity[] = [
  {
    id: 1,
    status: "Inscripciones abiertas",
    institution: "Fundación Pescar",
    title: "Desarrollo Web Full Stack",
    modality: "Virtual",
    duration: "16 semanas",
    deadline: "Cierra 22 ago 2026",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: 2,
    status: "Cupos limitados",
    institution: "Chicas en Tecnología",
    title: "Introducción al Análisis de Datos",
    modality: "Virtual",
    duration: "8 semanas",
    deadline: "Cierra 28 ago 2026",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: 3,
    status: "Inscripciones abiertas",
    institution: "Talento Tech",
    title: "Automatización QA",
    modality: "Virtual",
    duration: "12 semanas",
    deadline: "Cierra 30 ago 2026",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: 4,
    status: "Últimos cupos",
    institution: "EducaciónIT",
    title: "Python para principiantes",
    modality: "Online",
    duration: "6 semanas",
    deadline: "Cierra 2 sep 2026",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1600&q=85",
  },
];

type IconProps = {
  className?: string;
};

function ArrowLeftIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden="true"
    >
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </svg>
  );
}

function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="M12 5l7 7-7 7" />
    </svg>
  );
}

function LocationIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 21s6-5.33 6-11a6 6 0 1 0-12 0c0 5.67 6 11 6 11Z" />
      <circle cx="12" cy="10" r="2" />
    </svg>
  );
}

function ClockIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function CalendarIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </svg>
  );
}

function HeartIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
    </svg>
  );
}

function OpportunityCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentOpportunity = opportunities[currentIndex];

  const goToPrevious = () => setCurrentIndex((p) => p === 0 ? opportunities.length - 1 : p - 1);
  const goToNext = () => setCurrentIndex((p) => p === opportunities.length - 1 ? 0 : p + 1);
  const goToSlide = (index: number) => setCurrentIndex(index);

  return (
    <div className="relative w-full h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-reducar-border group">
      {/* Imagen de fondo */}
      <img
        src={currentOpportunity.image}
        alt={currentOpportunity.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* Capa oscura para legibilidad */}
      <div className="absolute inset-0 bg-linear-to-t from-[#0d122c] via-[#0d122c]/60 to-transparent" />

      {/* Contenido (Glassmorphism) */}
      <div className="absolute inset-x-4 bottom-4 sm:inset-x-8 sm:bottom-8 p-6 sm:p-8 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl text-white">
        <span className="inline-block px-3 py-1 mb-3 text-[10px] font-extrabold tracking-widest uppercase bg-reducar-turquoise text-reducar-shell-bg rounded-md">
          {currentOpportunity.status}
        </span>
        <span className="block text-sm font-semibold text-white/70 mb-1">{currentOpportunity.institution}</span>
        <h3 className="text-2xl sm:text-3xl font-extrabold mb-4 leading-tight">{currentOpportunity.title}</h3>

        <div className="flex flex-wrap gap-4 text-xs font-semibold text-white/80 mb-6">
          <span className="flex items-center gap-1.5"><LocationIcon className="w-4 h-4" /> {currentOpportunity.modality}</span>
          <span className="flex items-center gap-1.5"><ClockIcon className="w-4 h-4" /> {currentOpportunity.duration}</span>
          <span className="flex items-center gap-1.5"><CalendarIcon className="w-4 h-4" /> {currentOpportunity.deadline}</span>
        </div>

        <div className="flex gap-3">
          <button type="button" className="h-11 px-6 rounded-xl bg-reducar-primary text-white text-sm font-bold hover:bg-reducar-primary-dark transition-colors">
            Ver oportunidad
          </button>
          <button type="button" className="h-11 px-5 rounded-xl bg-white/10 border border-white/20 text-white text-sm font-bold hover:bg-white/20 transition-colors flex items-center gap-2">
            <HeartIcon className="w-4 h-4" /> Guardar
          </button>
        </div>
      </div>

      {/* Controles flotantes */}
      <div className="absolute top-6 right-6 flex items-center gap-2 bg-black/30 backdrop-blur-md p-1.5 rounded-full border border-white/10">
        <button type="button" onClick={goToPrevious} className="p-2 text-white hover:bg-white/20 rounded-full transition-colors" aria-label="Anterior"><ArrowLeftIcon className="w-4 h-4" /></button>
        <span className="text-xs font-bold text-white px-1">{currentIndex + 1} / {opportunities.length}</span>
        <button type="button" onClick={goToNext} className="p-2 text-white hover:bg-white/20 rounded-full transition-colors" aria-label="Siguiente"><ArrowRightIcon className="w-4 h-4" /></button>
      </div>
    </div>
  );
}

export default OpportunityCarousel;
