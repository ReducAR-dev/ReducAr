// src/components/features/PromotedCoursesCarousel.tsx
import { useEffect, useState } from "react";
import { promotedCoursesMock, type PromotedCourse } from "../../mocks/promotedCoursesMock";

const AUTOPLAY_DELAY = 5000;

function ArrowLeftIcon() {
  return <svg className="w-5 h-5 stroke-current stroke-2 fill-none" viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>;
}
function ArrowRightIcon() {
  return <svg className="w-5 h-5 stroke-current stroke-2 fill-none" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>;
}
function ArrowUpRightIcon() {
  return <svg className="w-4 h-4 stroke-current stroke-2 fill-none" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" /></svg>;
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);
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
    if (isPaused || prefersReducedMotion) return undefined;
    const timeoutId = window.setTimeout(() => {
      setCurrentIndex((index) => (index + 1) % promotedCoursesMock.length);
    }, AUTOPLAY_DELAY);
    return () => window.clearTimeout(timeoutId);
  }, [autoplayCycle, currentIndex, isPaused, prefersReducedMotion]);

  const selectSlide = (index: number) => {
    const normalizedIndex = (index + promotedCoursesMock.length) % promotedCoursesMock.length;
    setCurrentIndex(normalizedIndex);
    setAutoplayCycle((cycle) => cycle + 1);
  };

  const handleFocusLeave = (event: React.FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
  };

  return (
    <section
      className="relative w-full h-full min-h-full overflow-hidden text-white bg-reducar-surface border border-reducar-primary/25 rounded-[34px] shadow-2xl"
      aria-label="Cursos y oportunidades destacadas"
      aria-roledescription="carrusel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={handleFocusLeave}
    >
      <article
        key={currentCourse.id}
        className="absolute inset-0 flex items-end overflow-hidden animate-[fadeIn_0.65s_ease-out]"
        aria-live="polite"
        aria-label={`Oportunidad ${currentIndex + 1} de ${promotedCoursesMock.length}`}
      >
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src={currentCourse.image}
          alt={currentCourse.imageAlt}
        />

        <div className="absolute inset-0 bg-linear-to-t from-[#111733] via-[#0d122c]/60 to-[#0d122c]/20" aria-hidden="true" />

        <div className="relative z-10 w-full max-w-117.5 p-12 pb-20">
          <span className="inline-flex items-center px-3 py-2 mb-4 text-[10px] font-extrabold tracking-widest text-[#f8f8ff] bg-linear-to-r from-[rgba(114,89,244,0.94)] to-[rgba(24,191,174,0.88)] border border-white/30 rounded-full">
            {currentCourse.badge}
          </span>

          <span className="block mb-2 text-sm font-semibold text-white/80">
            {currentCourse.institution}
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-[1.06]">
            {currentCourse.title}
          </h2>

          <ul className="flex flex-wrap gap-2 mt-5 mb-6 list-none" aria-label="Información del curso">
            <li className="px-2.5 py-1.5 text-xs font-semibold text-white/90 bg-white/10 border border-white/15 rounded-full">{currentCourse.modality}</li>
            <li className="px-2.5 py-1.5 text-xs font-semibold text-white/90 bg-white/10 border border-white/15 rounded-full">{currentCourse.duration}</li>
            <li className="px-2.5 py-1.5 text-xs font-semibold text-white/90 bg-white/10 border border-white/15 rounded-full">{currentCourse.benefit}</li>
          </ul>

          <button
            className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-2xl bg-linear-to-r from-reducar-primary to-reducar-turquoise-dark text-white text-sm font-extrabold hover:-translate-y-0.5 hover:shadow-2xl transition-all"
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
        className="absolute top-1/2 left-4 -translate-y-1/2 z-20 w-11 h-11 grid place-items-center rounded-full bg-[rgba(13,18,44,0.5)] border border-white/25 text-white backdrop-blur-md opacity-85 hover:opacity-100 hover:scale-105 transition-all"
        type="button"
        onClick={() => selectSlide(currentIndex - 1)}
        aria-label="Oportunidad anterior"
      >
        <ArrowLeftIcon />
      </button>

      <button
        className="absolute top-1/2 right-4 -translate-y-1/2 z-20 w-11 h-11 grid place-items-center rounded-full bg-[rgba(13,18,44,0.5)] border border-white/25 text-white backdrop-blur-md opacity-85 hover:opacity-100 hover:scale-105 transition-all"
        type="button"
        onClick={() => selectSlide(currentIndex + 1)}
        aria-label="Siguiente oportunidad"
      >
        <ArrowRightIcon />
      </button>

      <div className="absolute left-12 right-7 bottom-7 z-30 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto" aria-label="Elegir oportunidad">
          {promotedCoursesMock.map((course, index) => (
            <button
              key={course.id}
              className={`h-2.5 rounded-full transition-all ${
                index === currentIndex
                  ? "w-8 bg-linear-to-r from-[#9b8aff] to-[#41dac8]"
                  : "w-2.5 bg-white/45 hover:bg-white/80"
              }`}
              type="button"
              onClick={() => selectSlide(index)}
              aria-label={`Ir a ${course.title}`}
              aria-current={index === currentIndex ? "true" : undefined}
            />
          ))}
        </div>

        <span className="text-[10px] font-bold tracking-widest text-white/60" aria-hidden="true">
          {String(currentIndex + 1).padStart(2, "0")} / {String(promotedCoursesMock.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}

export default PromotedCoursesCarousel;