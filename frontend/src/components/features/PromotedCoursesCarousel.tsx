// src/components/features/PromotedCoursesCarousel.tsx
import { useEffect, useState } from "react";
import { promotedCoursesMock, type PromotedCourse } from "../../mocks/promotedCoursesMock";

const AUTOPLAY_DELAY = 5000;

function ArrowLeftIcon() { return <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function ArrowRightIcon() { return <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function ArrowUpRightIcon() { return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round"/></svg>; }

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false);
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
    const timeoutId = window.setTimeout(() => { setCurrentIndex((index) => (index + 1) % promotedCoursesMock.length); }, AUTOPLAY_DELAY);
    return () => window.clearTimeout(timeoutId);
  }, [autoplayCycle, currentIndex, isPaused, prefersReducedMotion]);

  const selectSlide = (index: number) => {
    const normalizedIndex = (index + promotedCoursesMock.length) % promotedCoursesMock.length;
    setCurrentIndex(normalizedIndex);
    setAutoplayCycle((cycle) => cycle + 1);
  };

  return (
    <section
      className="relative w-full h-full min-h-full overflow-hidden text-white bg-reducar-shell-surface border border-white/10 rounded-3xl shadow-2xl"
      aria-label="Cursos y oportunidades destacadas"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setIsPaused(false); }}
    >
      <article key={currentCourse.id} className="absolute inset-0 flex items-end animate-[fadeIn_0.5s_ease-out]">
        <img className="absolute inset-0 w-full h-full object-cover" src={currentCourse.image} alt={currentCourse.imageAlt} />
        
        {/* Gradiente más limpio y moderno */}
        <div className="absolute inset-0 bg-linear-to-t from-[#0d122c] via-[#0d122c]/80 to-transparent opacity-90" aria-hidden="true" />

        <div className="relative z-10 w-full p-8 sm:p-12 pb-20">
          <span className="inline-flex items-center px-3 py-1.5 mb-4 text-[10px] font-extrabold tracking-widest text-white bg-white/20 border border-white/20 rounded-full backdrop-blur-md shadow-sm">
            {currentCourse.badge}
          </span>
          <span className="block mb-2 text-sm font-semibold text-white/70">{currentCourse.institution}</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-[1.1] mb-4">
            {currentCourse.title}
          </h2>
          <ul className="flex flex-wrap gap-2 mb-6 list-none">
            <li className="px-3 py-1.5 text-xs font-bold text-white/90 bg-white/10 border border-white/10 rounded-lg backdrop-blur-sm">{currentCourse.modality}</li>
            <li className="px-3 py-1.5 text-xs font-bold text-white/90 bg-white/10 border border-white/10 rounded-lg backdrop-blur-sm">{currentCourse.duration}</li>
            <li className="px-3 py-1.5 text-xs font-bold text-white/90 bg-white/10 border border-white/10 rounded-lg backdrop-blur-sm">{currentCourse.benefit}</li>
          </ul>
          <button className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-white text-reducar-shell-bg text-sm font-extrabold hover:bg-gray-100 hover:scale-105 transition-all shadow-lg" type="button" data-href={currentCourse.cta.href}>
            {currentCourse.cta.label} <ArrowUpRightIcon />
          </button>
        </div>
      </article>

      {/* Controles: Flechas flotantes a la derecha */}
      <div className="absolute right-6 top-6 z-20 flex gap-2">
        <button className="w-10 h-10 grid place-items-center rounded-full bg-black/30 border border-white/20 text-white backdrop-blur-md hover:bg-black/50 transition-colors" onClick={() => selectSlide(currentIndex - 1)} aria-label="Anterior">
          <ArrowLeftIcon />
        </button>
        <button className="w-10 h-10 grid place-items-center rounded-full bg-black/30 border border-white/20 text-white backdrop-blur-md hover:bg-black/50 transition-colors" onClick={() => selectSlide(currentIndex + 1)} aria-label="Siguiente">
          <ArrowRightIcon />
        </button>
      </div>

      {/* Indicadores (Dots) */}
      <div className="absolute left-8 sm:left-12 bottom-8 z-30 flex items-center gap-2">
        {promotedCoursesMock.map((course, index) => (
          <button
            key={course.id}
            className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex ? "w-8 bg-white" : "w-2 bg-white/30 hover:bg-white/60"}`}
            type="button"
            onClick={() => selectSlide(index)}
            aria-label={`Ir a ${course.title}`}
          />
        ))}
      </div>
    </section>
  );
}

export default PromotedCoursesCarousel;