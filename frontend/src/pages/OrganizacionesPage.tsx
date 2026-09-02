import Header from "../components/common/Header";
import PromoBar from "../components/features/PromoBar";

import "../styles/organizaciones.css";

import logoPescar from "../assets/fundacion-pescar.png.png";
import logoEmpujar from "../assets/fundacion-empujar.png.png";
import logoChicas from "../assets/chicas-tecnologia.jpg.jpg";
import logoForge from "../assets/fundacion-forge.webp.webp";

type Organizacion = {
  nombre: string;
  logo: string;
  descripcion: string;
  categoria: string;
  cursos: number;
  destacada?: boolean;
  link: string;
};

const organizaciones: Organizacion[] = [
  {
    nombre: "Fundación Pescar",
    logo: logoPescar,
    descripcion:
      "Forma a personas en situación de vulnerabilidad socioeconómica para favorecer su inserción laboral y la construcción de un proyecto de vida sostenible.",
    categoria: "Educación y empleabilidad",
    cursos: 1,
    destacada: true,
    link: "https://www.pescar.org.ar/",
  },
  {
    nombre: "Fundación Empujar",
    logo: logoEmpujar,
    descripcion:
      "Trabaja para mejorar la empleabilidad de jóvenes de 18 a 24 años y acompañarlos en el acceso a su primer empleo formal.",
    categoria: "Empleabilidad",
    cursos: 1,
    link: "https://fundacionempujar.org/",
  },
  {
    nombre: "Chicas en Tecnología",
    logo: logoChicas,
    descripcion:
      "Impulsa a jóvenes y mujeres a desarrollarse en tecnología y trabaja para reducir la brecha de género en el sector.",
    categoria: "Tecnología",
    cursos: 1,
    link: "https://chicasentecnologia.org/es_ar/",
  },
  {
    nombre: "Fundación Forge",
    logo: logoForge,
    descripcion:
      "Acompaña a jóvenes en su acceso al mundo laboral mediante formación gratuita y herramientas para mejorar sus oportunidades de empleo.",
    categoria: "Formación profesional",
    cursos: 1,
    link: "https://fforge.org/",
  },
];

function OrganizacionesPage() {
  return (
    <div className="organizaciones-page">
      <Header />
      <PromoBar />

      <main>
        <section className="instituciones-hero">
          <div className="organizaciones-container">
            <div className="organizaciones-breadcrumb">
              <span>Inicio</span>
              <span>›</span>
              <strong>Instituciones</strong>
            </div>

            <div className="organizaciones-header">
              <span className="instituciones-eyebrow">
                ✦ Nuestra comunidad
              </span>

              <h1>
                Instituciones que impulsan
                <span> tu futuro</span>
              </h1>

              <p>
                Conocé organizaciones que ofrecen oportunidades de formación,
                tecnología y desarrollo profesional para acompañarte en tu
                crecimiento.
              </p>
            </div>
          </div>
        </section>

        <section className="instituciones-content">
          <div className="organizaciones-container">
            <div className="organizaciones-grid">
              {organizaciones.map((organizacion) => (
                <a
                  href={organizacion.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="organizacion-card"
                  key={organizacion.nombre}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    cursor: "pointer",
                  }}
                >
                  <div className="organizacion-card-top">
                    <div className="organizacion-logo-container">
                      <img
                        src={organizacion.logo}
                        alt={`Logo de ${organizacion.nombre}`}
                        className="organizacion-logo"
                      />
                    </div>

                    {organizacion.destacada && (
                      <span className="institucion-destacada">
                        Destacada
                      </span>
                    )}
                  </div>

                  <div className="organizacion-info">
                    <span className="institucion-categoria">
                      {organizacion.categoria}
                    </span>

                    <h2>{organizacion.nombre}</h2>

                    <p>{organizacion.descripcion}</p>
                  </div>

                  <div className="organizacion-card-footer">
                    <div className="institucion-cursos">
                      <span className="institucion-cursos-icon">
                        ▣
                      </span>

                      <div>
                        <strong>{organizacion.cursos}</strong>

                        <span>
                          {organizacion.cursos === 1
                            ? " curso disponible"
                            : " cursos disponibles"}
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="instituciones-cta-section">
          <div className="organizaciones-container">
            <div className="instituciones-cta">
              <div className="instituciones-cta-icon">
                ✦
              </div>

              <div className="instituciones-cta-text">
                <span>¿SOS PARTE DE UNA INSTITUCIÓN?</span>

                <h2>Sumate a la comunidad ReducAR</h2>

                <p>
                  Compartí tus oportunidades de formación y conectá con
                  personas que buscan seguir aprendiendo.
                </p>
              </div>

              <button type="button">
                Conocer más
                <span>→</span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default OrganizacionesPage;