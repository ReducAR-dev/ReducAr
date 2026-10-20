// src/components/features/HeroSection.tsx
import { useState, type SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BookIcon,
  CertificateIcon,
  CheckCircleIcon,
  CompassIcon,
  HeartIcon,
  SearchIcon,
  SparklesIcon,
} from "./Icons";
import PromotedCoursesCarousel from "./PromotedCoursesCarousel";

function HeroSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event: SyntheticEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const normalizedSearch = searchTerm.trim();
    navigate(
      normalizedSearch
        ? `/cursos?q=${encodeURIComponent(normalizedSearch)}`
        : "/cursos",
    );
  };

  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 bg-reducar-bg">
      {/* 1. Fondo modernizado: Gradientes + Patrón de Cuadrícula */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(123,108,246,0.15),transparent_35%),radial-gradient(circle_at_20%_80%,rgba(63,217,201,0.1),transparent_35%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="relative max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* COLUMNA IZQUIERDA: Texto y Acciones */}
        <div className="max-w-2xl animate-[fadeIn_0.5s_ease-out]">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-reducar-primary-light border border-reducar-primary/20 text-reducar-primary text-xs sm:text-sm font-bold mb-6">
            <SparklesIcon className="w-4 h-4" />
            <span>Impulsá tu futuro profesional</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] tracking-tight text-reducar-text">
            Descubrí tu próxima
            <span className="block mt-1 bg-linear-to-r from-reducar-primary via-reducar-gradient-middle to-reducar-turquoise bg-clip-text text-transparent">
              oportunidad de<br className="hidden sm:block" /> aprendizaje
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-reducar-text-secondary leading-relaxed max-w-xl">
            Encontrá cursos, becas y talleres gratuitos o accesibles en un solo lugar. 
            Tu próximo paso profesional empieza acá.
          </p>

          {/* BUSCADOR (El elemento estrella) */}
          <form 
            onSubmit={handleSearch} 
            className="mt-8 flex items-center bg-reducar-surface/80 backdrop-blur-md border border-reducar-border rounded-2xl p-2 shadow-xl shadow-reducar-primary/5 focus-within:border-reducar-primary focus-within:ring-4 focus-within:ring-reducar-primary/15 transition-all"
          >
            <SearchIcon className="w-6 h-6 ml-3 text-reducar-primary shrink-0" />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="¿Qué querés aprender hoy?"
              aria-label="Buscar oportunidades"
              // ✅ FIX CRÍTICO: Cambiado text-white por text-reducar-text
              className="flex-1 bg-transparent border-none outline-none text-reducar-text placeholder-reducar-text-secondary px-4 py-3 text-base"
            />
            <button
              type="submit"
              // ✅ FIX: h-13 cambiado a h-12 (estándar de Tailwind)
              className="h-12 px-6 sm:px-8 rounded-xl bg-linear-to-r from-reducar-primary to-reducar-turquoise-dark text-white font-bold text-sm sm:text-base hover:shadow-lg hover:-translate-y-0.5 transition-all shrink-0"
            >
              Buscar
            </button>
          </form>

          {/* ACCIONES SECUNDARIAS (Como píldoras) */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link 
              to="/test" 
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-reducar-surface border border-reducar-border text-reducar-text text-sm font-semibold hover:border-reducar-primary hover:text-reducar-primary transition-colors shadow-sm"
            >
              <CompassIcon className="w-4 h-4" />
              Test vocacional
            </Link>
            <Link 
              to="/rutas" 
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-reducar-surface border border-reducar-border text-reducar-text text-sm font-semibold hover:border-reducar-primary hover:text-reducar-primary transition-colors shadow-sm"
            >
              <BookIcon className="w-4 h-4" />
              Ver rutas
            </Link>
          </div>

          {/* BADGES DE CONFIANZA (Más sutiles, sin robar atención) */}
          <div className="mt-10 pt-6 border-t border-reducar-border/60 flex flex-wrap gap-x-6 gap-y-3">
            <div className="flex items-center gap-1.5 text-reducar-text-secondary text-xs font-semibold">
              <CheckCircleIcon className="w-4 h-4 text-reducar-turquoise" />
              <span>Opciones verificadas</span>
            </div>
            <div className="flex items-center gap-1.5 text-reducar-text-secondary text-xs font-semibold">
              <CertificateIcon className="w-4 h-4 text-reducar-turquoise" />
              <span>Certificados oficiales</span>
            </div>
            <div className="flex items-center gap-1.5 text-reducar-text-secondary text-xs font-semibold">
              <HeartIcon className="w-4 h-4 text-reducar-turquoise" />
              <span>Impacto social</span>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: Carrusel */}
        {/* ✅ FIX: Contenedor más flexible y responsivo */}
        <div className="relative w-full max-w-xl mx-auto lg:max-w-none h-100 sm:h-112.5 lg:h-137.5 justify-self-center animate-[fadeIn_0.7s_ease-out]">
          <PromotedCoursesCarousel />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;