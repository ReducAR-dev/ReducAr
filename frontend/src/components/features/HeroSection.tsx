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
    <section className="home-hero">
      <div className="home-hero-container">
        <div className="home-hero-content">
          <div className="home-hero-badge">
            <SparklesIcon />

            <span>
              Cursos, becas y oportunidades para crecer
            </span>
          </div>

          <h1 className="home-hero-title">
            Descubrí tu próxima

            <span className="home-gradient-text">
              oportunidad de
              <br />
              aprendizaje
            </span>
          </h1>

          <p className="home-hero-description">
            Buscá, compará y elegí entre cursos, becas, talleres y
            capacitaciones. Encontrá oportunidades gratuitas o accesibles
            para impulsar tu formación y tu futuro profesional.
          </p>

          <form
            className="home-hero-search"
            onSubmit={handleSearch}
          >
            <SearchIcon />

            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="¿Qué querés aprender hoy?"
              aria-label="Buscar oportunidades"
            />

            <button type="submit">
              Buscar
            </button>
          </form>

          <div className="home-hero-links">
            <Link to="/test">
              <CompassIcon />
              Hacer test vocacional
            </Link>

            <Link to="/rutas">
              <BookIcon />
              Ver rutas de aprendizaje
            </Link>
          </div>

          <div className="home-hero-benefits">
            <div className="home-benefit">
              <CheckCircleIcon />
              <span>Opciones verificadas</span>
            </div>

            <div className="home-benefit">
              <CertificateIcon />
              <span>Certificados</span>
            </div>

            <div className="home-benefit">
              <HeartIcon />
              <span>Impacto social</span>
            </div>
          </div>
        </div>

        <div className="home-hero-visual">
          <PromotedCoursesCarousel />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
