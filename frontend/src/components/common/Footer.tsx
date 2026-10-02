// components/common/Footer.tsx
import { Link } from "react-router-dom";
import logoReducar from "../../assets/logo-reducar.png";

import "../../styles/footer.css";

export const Footer = () => {
  return (
    <footer className="reducar-footer">
      {/* Decoración de red - lado izquierdo */}
      <svg
        className="reducar-footer-network reducar-footer-network-left"
        viewBox="0 0 300 400"
        aria-hidden="true"
        preserveAspectRatio="xMinYMid slice"
      >
        <line x1="40" y1="60" x2="140" y2="120" />
        <line x1="140" y1="120" x2="90" y2="220" />
        <line x1="90" y1="220" x2="180" y2="300" />
        <line x1="40" y1="60" x2="90" y2="220" />
        <line x1="140" y1="120" x2="220" y2="180" />
        <circle cx="40" cy="60" r="5" />
        <circle cx="140" cy="120" r="7" />
        <circle cx="90" cy="220" r="4" />
        <circle cx="180" cy="300" r="6" />
        <circle cx="220" cy="180" r="5" />
      </svg>

      {/* Decoración de red - lado derecho */}
      <svg
        className="reducar-footer-network reducar-footer-network-right"
        viewBox="0 0 300 400"
        aria-hidden="true"
        preserveAspectRatio="xMaxYMid slice"
      >
        <line x1="260" y1="80" x2="160" y2="140" />
        <line x1="160" y1="140" x2="210" y2="240" />
        <line x1="210" y1="240" x2="120" y2="320" />
        <line x1="260" y1="80" x2="210" y2="240" />
        <line x1="160" y1="140" x2="80" y2="200" />
        <circle cx="260" cy="80" r="5" />
        <circle cx="160" cy="140" r="7" />
        <circle cx="210" cy="240" r="4" />
        <circle cx="120" cy="320" r="6" />
        <circle cx="80" cy="200" r="5" />
      </svg>

      {/* Contenido principal */}
      <div className="reducar-footer-container">
        <div className="reducar-footer-grid">
          {/* Columna 1: Marca */}
          <div className="reducar-footer-brand">
            <Link to="/" className="reducar-footer-logo" aria-label="Ir al inicio">
              {/* Ícono de red */}

              <a href="/" className="home-logo" aria-label="Ir al inicio">
                <img src={logoReducar} alt="Logo de ReducAR" />
              </a>

              {/* Texto del logo */}
              <span className="reducar-footer-logo-text">
                Reduc<span>AR</span>
              </span>
            </Link>

            <p className="reducar-footer-tagline">
              Tu red de oportunidades
            </p>

            <p className="reducar-footer-description">
              Conectamos personas con organizaciones que ofrecen oportunidades
              de formación gratuita para impulsar el aprendizaje y el
              desarrollo profesional.
            </p>

            {/* Redes sociales */}
            <div className="reducar-footer-social">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </a>

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M14 8h1.5M14 8a2 2 0 0 0-2 2v9M10 12h5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Columna 2: Explorar */}
          <div className="reducar-footer-column">
            <h4>Explorar</h4>
            <ul>
              <li>
                <Link to="/cursos">Todas las oportunidades</Link>
              </li>
              <li>
                <Link to="/cursos">Categorías</Link>
              </li>
              <li>
                <Link to="/instituciones">Organizaciones</Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: ReducAR */}
          <div className="reducar-footer-column">
            <h4>ReducAR</h4>
            <ul>
              <li>
                <Link to="/">Quiénes somos</Link>
              </li>
              <li>
                <Link to="/novedades">Novedades</Link>
              </li>
              <li>
                <Link to="/">Ayuda</Link>
              </li>
              <li>
                <Link to="/">Contacto</Link>
              </li>
              <li>
                <Link to="/">Preguntas frecuentes</Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Legal */}
          <div className="reducar-footer-column">
            <h4>Legal</h4>
            <ul>
              <li>
                <Link to="/">Política de privacidad</Link>
              </li>
              <li>
                <Link to="/">Términos y condiciones</Link>
              </li>
            </ul>
          </div>

          {/* Columna 5: CTA */}
          <div className="reducar-footer-cta">
            <h4>¿Representás a una organización?</h4>
            <p>
              Sumate a ReducAR y hacé llegar tus oportunidades a más personas.
            </p>
            <Link to="/instituciones" className="reducar-footer-cta-button">
              Sumar mi organización
            </Link>
          </div>
        </div>

        {/* Línea divisoria + Copyright */}
        <div className="reducar-footer-bottom">
          <p>
            © {new Date().getFullYear()} ReducAR. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;