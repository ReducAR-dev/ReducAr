import PromoBar from "../components/features/PromoBar";
import OrganizacionCard from "../components/features/OrganizacionCard";
import { organizacionesMock } from "../mocks/organizaciones";

import "../styles/organizaciones.css";


function OrganizacionesPage() {
  return (
    <div className="organizaciones-page">
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
              {organizacionesMock.map((org) => (
                <OrganizacionCard
                  key={org.nombre}
                  nombre={org.nombre}
                  logo={org.logo}
                  descripcion={org.descripcion}
                  categoria={org.categoria}
                  cursos={org.cursos}
                  link={org.link}
                  destacada={org.destacada}
                />
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