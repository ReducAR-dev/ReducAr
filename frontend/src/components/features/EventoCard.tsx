// components/features/EventoCard.tsx
import React from "react";

interface EventoCardProps {
  /** Día del evento (ej: "02") */
  dia: string;
  /** Mes del evento (ej: "SEP") */
  mes: string;
  /** Modalidad (ej: "Presencial", "Híbrido") */
  modalidad: string;
  /** Título del evento */
  titulo: string;
  /** Detalle / ubicación del evento */
  detalle: string;
  /** Enlace externo al evento */
  link: string;
  /** Clases adicionales para personalización */
  className?: string;
}

export const EventoCard: React.FC<EventoCardProps> = ({
  dia,
  mes,
  modalidad,
  titulo,
  detalle,
  link,
  className = "",
}) => {
  return (
    <article className={`novedad-item ${className}`}>
      <div className="novedad-fecha">
        <strong>{dia}</strong>
        <span>{mes}</span>
      </div>

      <div className="novedad-item-info">
        <span>{modalidad}</span>
        <h3>{titulo}</h3>
        <p>{detalle}</p>
      </div>

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="novedad-ver-evento"
      >
        Ver evento
        <span>→</span>
      </a>
    </article>
  );
};

export default EventoCard;