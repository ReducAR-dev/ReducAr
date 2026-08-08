import { useState } from "react";

import {
  CloseIcon,
  GraduationIcon,
} from "./Icons";

function PromoBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return null;
  }

  return (
    <div className="home-promo-bar">
      <div className="home-promo-container">
        <div className="home-promo-message">
          <GraduationIcon />

          <strong>Oportunidad destacada:</strong>

          <span>
            Desarrollo Web Full Stack gratuito. Cupos limitados.
          </span>

          <a href="#">
            Ver oportunidad
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <button
          type="button"
          className="home-promo-close"
          aria-label="Cerrar promoción"
          onClick={() => setVisible(false)}
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}

export default PromoBar;