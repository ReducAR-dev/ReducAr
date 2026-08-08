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

function ArrowLeftIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="M12 5l7 7-7 7" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M12 21s6-5.33 6-11a6 6 0 1 0-12 0c0 5.67 6 11 6 11Z" />
      <circle cx="12" cy="10" r="2" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
    </svg>
  );
}

function OpportunityCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentOpportunity = opportunities[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((previousIndex) =>
      previousIndex === 0
        ? opportunities.length - 1
        : previousIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((previousIndex) =>
      previousIndex === opportunities.length - 1
        ? 0
        : previousIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="opportunity-carousel">
      <article
        className="opportunity-slide"
        style={{
          backgroundImage: `
            linear-gradient(
              90deg,
              rgba(14, 19, 40, 0.92) 0%,
              rgba(14, 19, 40, 0.76) 35%,
              rgba(14, 19, 40, 0.32) 70%,
              rgba(14, 19, 40, 0.18) 100%
            ),
            url("${currentOpportunity.image}")
          `,
        }}
      >
        <div className="opportunity-slide-content">
          <span className="opportunity-status">
            {currentOpportunity.status}
          </span>

          <span className="opportunity-institution">
            {currentOpportunity.institution}
          </span>

          <h3 className="opportunity-name">
            {currentOpportunity.title}
          </h3>

          <div className="opportunity-meta">
            <span>
              <LocationIcon />
              {currentOpportunity.modality}
            </span>

            <span>
              <ClockIcon />
              {currentOpportunity.duration}
            </span>

            <span>
              <CalendarIcon />
              {currentOpportunity.deadline}
            </span>
          </div>

          <div className="opportunity-actions">
            <button
              type="button"
              className="opportunity-primary-button"
            >
              Ver oportunidad
            </button>

            <button
              type="button"
              className="opportunity-secondary-button"
            >
              <HeartIcon />
              Guardar
            </button>
          </div>
        </div>

        <div className="opportunity-carousel-controls">
          <button
            type="button"
            className="opportunity-arrow-button"
            onClick={goToPrevious}
            aria-label="Oportunidad anterior"
          >
            <ArrowLeftIcon />
          </button>

          <span className="opportunity-counter">
            {currentIndex + 1} / {opportunities.length}
          </span>

          <button
            type="button"
            className="opportunity-arrow-button"
            onClick={goToNext}
            aria-label="Siguiente oportunidad"
          >
            <ArrowRightIcon />
          </button>
        </div>
      </article>

      <div className="opportunity-indicators">
        {opportunities.map((opportunity, index) => (
          <button
            key={opportunity.id}
            type="button"
            className={`opportunity-indicator ${
              index === currentIndex
                ? "opportunity-indicator-active"
                : ""
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Ir a la oportunidad ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default OpportunityCarousel;