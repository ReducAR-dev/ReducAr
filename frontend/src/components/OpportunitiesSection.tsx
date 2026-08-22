import OpportunityCarousel from "./OpportunityCarousel";
import "../styles/opportunities.css";

function OpportunitiesSection() {
  return (
    <section className="opportunities-section">
      <div className="opportunities-container">
        <div className="opportunities-heading">
          <span className="opportunities-eyebrow">
            SELECCIÓN REDUCAR
          </span>

          <h2 className="opportunities-title">
            Oportunidades que no te podés perder
          </h2>

          <p className="opportunities-subtitle">
            Cursos, becas y capacitaciones con inscripciones abiertas o cupos
            limitados.
          </p>
        </div>

        <OpportunityCarousel />
      </div>
    </section>
  );
}

export default OpportunitiesSection;
