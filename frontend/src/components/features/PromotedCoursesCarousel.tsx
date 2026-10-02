import { useEffect, useState } from "react";

import {
  promotedCoursesMock,
  type PromotedCourse,
} from "../../mocks/promotedCoursesMock";
import "../../styles/promoted-courses-carousel.css";

const AUTOPLAY_DELAY = 5000;

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

function PromotedCoursesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [autoplayCycle, setAutoplayCycle] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  const currentCourse: PromotedCourse = promotedCoursesMock[currentIndex];

  useEffect(() => {
    if (isPaused || prefersReducedMotion) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setCurrentIndex((index) => (index + 1) % promotedCoursesMock.length);
    }, AUTOPLAY_DELAY);

    return () => window.clearTimeout(timeoutId);
  }, [autoplayCycle, currentIndex, isPaused, prefersReducedMotion]);

  const selectSlide = (index: number) => {
    const normalizedIndex =
      (index + promotedCoursesMock.length) % promotedCoursesMock.length;

    setCurrentIndex(normalizedIndex);
    setAutoplayCycle((cycle) => cycle + 1);
  };

  const handleFocusLeave = (event: React.FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsPaused(false);
    }
  };

  return (
    <section
      className="promoted-carousel"
      aria-label="Cursos y oportunidades destacadas"
      aria-roledescription="carrusel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={handleFocusLeave}
    >
      <article
        key={currentCourse.id}
        className="promoted-carousel-slide"
        aria-live="polite"
        aria-label={`Oportunidad ${currentIndex + 1} de ${promotedCoursesMock.length}`}
      >
        <img
          className="promoted-carousel-image"
          src={currentCourse.image}
          alt={currentCourse.imageAlt}
        />

        <div className="promoted-carousel-overlay" aria-hidden="true" />

        <div className="promoted-carousel-content">
          <span className="promoted-carousel-badge">
            {currentCourse.badge}
          </span>

          <span className="promoted-carousel-institution">
            {currentCourse.institution}
          </span>

          <h2 className="promoted-carousel-title">
            {currentCourse.title}
          </h2>

          <ul className="promoted-carousel-meta" aria-label="Información del curso">
            <li>{currentCourse.modality}</li>
            <li>{currentCourse.duration}</li>
            <li>{currentCourse.benefit}</li>
          </ul>

          <button
            className="promoted-carousel-cta"
            type="button"
            data-href={currentCourse.cta.href}
            data-slug={currentCourse.cta.slug}
            aria-label={`${currentCourse.cta.label}: ${currentCourse.title}`}
          >
            {currentCourse.cta.label}
            <ArrowUpRightIcon />
          </button>
        </div>
      </article>

      <button
        className="promoted-carousel-arrow promoted-carousel-arrow-left"
        type="button"
        onClick={() => selectSlide(currentIndex - 1)}
        aria-label="Oportunidad anterior"
      >
        <ArrowLeftIcon />
      </button>

      <button
        className="promoted-carousel-arrow promoted-carousel-arrow-right"
        type="button"
        onClick={() => selectSlide(currentIndex + 1)}
        aria-label="Siguiente oportunidad"
      >
        <ArrowRightIcon />
      </button>

      <div className="promoted-carousel-footer">
        <div className="promoted-carousel-indicators" aria-label="Elegir oportunidad">
          {promotedCoursesMock.map((course, index) => (
            <button
              key={course.id}
              className={`promoted-carousel-indicator ${
                index === currentIndex ? "promoted-carousel-indicator-active" : ""
              }`}
              type="button"
              onClick={() => selectSlide(index)}
              aria-label={`Ir a ${course.title}`}
              aria-current={index === currentIndex ? "true" : undefined}
            />
          ))}
        </div>

        <span className="promoted-carousel-count" aria-hidden="true">
          {String(currentIndex + 1).padStart(2, "0")} / {String(promotedCoursesMock.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}

export default PromotedCoursesCarousel;
