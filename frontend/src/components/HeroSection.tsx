import heroImage from "../assets/hero.png";

import {
  BookIcon,
  CertificateIcon,
  ChartIcon,
  CheckCircleIcon,
  CompassIcon,
  HeartIcon,
  SearchIcon,
  SparklesIcon,
} from "./Icons";

function ProgressCard() {
  return (
    <div className="hero-floating-card hero-progress-card">
      <div className="hero-floating-icon hero-purple-icon">
        <ChartIcon />
      </div>

      <div>
        <span>Tu progreso</span>
        <strong>4 cursos en camino</strong>
      </div>
    </div>
  );
}

function OpportunityCard() {
  return (
    <div className="hero-floating-card hero-opportunity-card">
      <div className="hero-floating-icon hero-green-icon">
        <CheckCircleIcon />
      </div>

      <div>
        <span>Nueva oportunidad</span>
        <strong>Beca disponible</strong>
      </div>
    </div>
  );
}

function StatsCard() {
  return (
    <div className="hero-stats-card">
      <div className="hero-stat">
        <strong>+12</strong>
        <span>áreas para explorar</span>
      </div>

      <div className="hero-stat">
        <strong>100%</strong>
        <span>en español</span>
      </div>
    </div>
  );
}

function HeroSection() {
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
            onSubmit={(event) => event.preventDefault()}
          >
            <SearchIcon />

            <input
              type="search"
              placeholder="¿Qué querés aprender hoy?"
              aria-label="Buscar oportunidades"
            />

            <button type="submit">
              Buscar
            </button>
          </form>

          <div className="home-hero-links">
            <a href="#">
              <CompassIcon />
              Hacer test vocacional
            </a>

            <a href="#">
              <BookIcon />
              Ver rutas de aprendizaje
            </a>
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
          <div className="hero-image-background">
            <div className="hero-image-container">
              <img
                src={heroImage}
                alt="Personas aprendiendo y trabajando juntas"
                className="hero-main-image"
              />
            </div>
          </div>

          <ProgressCard />
          <OpportunityCard />
          <StatsCard />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
