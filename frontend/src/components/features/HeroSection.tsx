// src/components/features/HeroSection.tsx
import { useState, type FormEvent } from "react";
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

  const handleSearch = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const normalizedSearch = searchTerm.trim();
    navigate(
      normalizedSearch
        ? `/cursos?q=${encodeURIComponent(normalizedSearch)}`
        : "/cursos",
    );
  };

  return (
    <section className="relative min-h-177.5 overflow-hidden">
      {/* Fondo con gradientes radiales */}
      <div className="absolute inset-0 bg-reducar-bg" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_30%,rgba(123,108,246,0.25),transparent_30%),radial-gradient(circle_at_20%_80%,rgba(63,217,201,0.15),transparent_31%)]" />

      <div className="relative max-w-7xl mx-auto px-4 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-reducar-primary-light border border-reducar-primary/20 text-reducar-primary text-sm font-bold mb-6">
            <SparklesIcon className="w-4 h-4" />
            <span>Cursos, becas y oportunidades para crecer</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight text-white">
            Descubrí tu próxima
            <span className="block bg-linear-to-r from-reducar-primary via-[#8a7bf6] to-reducar-turquoise bg-clip-text text-transparent">
              oportunidad de<br />aprendizaje
            </span>
          </h1>

          <p className="mt-7 text-lg text-reducar-text-secondary leading-relaxed">
            Buscá, compará y elegí entre cursos, becas, talleres y
            capacitaciones. Encontrá oportunidades gratuitas o accesibles
            para impulsar tu formación y tu futuro profesional.
          </p>

          <form onSubmit={handleSearch} className="mt-8 flex items-center bg-reducar-surface border border-reducar-border rounded-2xl p-1.5 shadow-lg focus-within:border-reducar-primary focus-within:ring-2 focus-within:ring-reducar-primary/20 transition-all">
            <SearchIcon className="w-6 h-6 ml-4 text-reducar-primary shrink-0" />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="¿Qué querés aprender hoy?"
              aria-label="Buscar oportunidades"
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-reducar-text-secondary px-4 py-3 text-base"
            />
            <button
              type="submit"
              className="h-13 px-8 rounded-xl bg-linear-to-r from-reducar-primary to-reducar-turquoise-dark text-white font-bold hover:shadow-lg transition-shadow"
            >
              Buscar
            </button>
          </form>

          <div className="mt-6 flex flex-wrap gap-6">
            <Link to="/test" className="flex items-center gap-2 text-reducar-primary font-bold hover:text-reducar-turquoise transition-colors">
              <CompassIcon className="w-5 h-5" />
              Hacer test vocacional
            </Link>
            <Link to="/rutas" className="flex items-center gap-2 text-reducar-primary font-bold hover:text-reducar-turquoise transition-colors">
              <BookIcon className="w-5 h-5" />
              Ver rutas de aprendizaje
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-8">
            <div className="flex items-center gap-2 text-reducar-text-secondary text-sm font-semibold">
              <CheckCircleIcon className="w-5 h-5 text-reducar-turquoise" />
              <span>Opciones verificadas</span>
            </div>
            <div className="flex items-center gap-2 text-reducar-text-secondary text-sm font-semibold">
              <CertificateIcon className="w-5 h-5 text-reducar-turquoise" />
              <span>Certificados</span>
            </div>
            <div className="flex items-center gap-2 text-reducar-text-secondary text-sm font-semibold">
              <HeartIcon className="w-5 h-5 text-reducar-turquoise" />
              <span>Impacto social</span>
            </div>
          </div>
        </div>

        <div className="relative w-full max-w-135 h-130 justify-self-center">
          <PromotedCoursesCarousel />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;