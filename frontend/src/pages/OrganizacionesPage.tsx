import "../styles/organizaciones.css";

import logoPescar from "../assets/fundacion-pescar.png.png";
import logoEmpujar from "../assets/fundacion-empujar.png.png";
import logoChicas from "../assets/chicas-tecnologia.jpg.jpg";
import logoForge from "../assets/fundacion-forge.webp.webp";

const organizaciones = [
  {
    nombre: "Fundación Pescar",
    logo: logoPescar,
    descripcion:
      "Forma a personas en situación de vulnerabilidad socioeconómica para favorecer su inserción laboral y la construcción de un proyecto de vida sostenible.",
  },
  {
    nombre: "Fundación Empujar",
    logo: logoEmpujar,
    descripcion:
      "Trabaja para mejorar la empleabilidad de jóvenes de 18 a 24 años y acompañarlos en el acceso a su primer empleo formal.",
  },
  {
    nombre: "Chicas en Tecnología",
    logo: logoChicas,
    descripcion:
      "Impulsa a jóvenes y mujeres a desarrollarse en tecnología y trabaja para reducir la brecha de género en el sector.",
  },
  {
    nombre: "Fundación Forge",
    logo: logoForge,
    descripcion:
      "Acompaña a jóvenes en su acceso al mundo laboral mediante formación gratuita y herramientas para mejorar sus oportunidades de empleo.",
  },
];

function OrganizacionesPage() {
  return (
    <div className="organizaciones-page">
      <main className="organizaciones-container">

        <div className="organizaciones-breadcrumb">
          <span>Inicio</span>
          <span>›</span>
          <span>Organizaciones</span>
        </div>

        <div className="organizaciones-header">
          <h1>Organizaciones afiliadas</h1>

          <p>
            Organizaciones que impulsan la educación, la tecnología y el
            desarrollo profesional.
          </p>
        </div>

        <section className="organizaciones-grid">
          {organizaciones.map((organizacion) => (
            <article
              className="organizacion-card"
              key={organizacion.nombre}
            >
              <div className="organizacion-card-top">
                <div className="organizacion-logo-container">
                  <img
                    src={organizacion.logo}
                    alt={`Logo de ${organizacion.nombre}`}
                    className="organizacion-logo"
                  />
                </div>

                <div className="organizacion-info">
                  <h2>{organizacion.nombre}</h2>

                  <p>{organizacion.descripcion}</p>
                </div>
              </div>

              <button
                type="button"
                className="organizacion-button"
              >
                Ver cursos
              </button>
            </article>
          ))}
        </section>

      </main>
    </div>
  );
}

export default OrganizacionesPage;
