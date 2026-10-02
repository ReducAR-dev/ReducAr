// components/features/OrganizacionCard.tsx
import React from "react";

interface OrganizacionCardProps {
  /** Nombre de la organización */
  nombre: string;
  /** URL o ruta de la imagen del logo */
  logo: string;
  /** Texto descriptivo breve */
  descripcion: string;
  /** Categoría (ej: "Tecnología", "Empleabilidad") - se muestra oculta por defecto en el CSS actual */
  categoria?: string;
  /** Número de cursos disponibles (para mostrar contador) */
  cursos: number;
  /** URL de enlace externo (opcional, si no se pasa, no se envuelve en <a>) */
  link?: string;
  /** Si es destacada, muestra el badge */
  destacada?: boolean;
  /** Clases adicionales para personalización */
  className?: string;
}

export const OrganizacionCard: React.FC<OrganizacionCardProps> = ({
  nombre,
  logo,
  descripcion,
  categoria,
  cursos,
  link,
  destacada = false,
  className = "",
}) => {
  // Contenido interno de la tarjeta (sin el <a>)
  const cardContent = (
    <>
      {/* Parte superior: contenedor del logo + badge */}
      <div className="organizacion-card-top">
        <div className="organizacion-logo-container">
          <img
            src={logo}
            alt={`Logo de ${nombre}`}
            className="organizacion-logo"
            loading="lazy"
          />
        </div>
        {destacada && (
          <span className="institucion-destacada">Destacada</span>
        )}
      </div>

      {/* Información principal */}
      <div className="organizacion-info">
        {categoria && (
          <span className="institucion-categoria">{categoria}</span>
        )}
        <h2>{nombre}</h2>
        <p>{descripcion}</p>
      </div>

      {/* Footer: contador de cursos */}
      <div className="organizacion-card-footer">
        <div className="institucion-cursos">
          <span className="institucion-cursos-icon">▣</span>
          <div>
            <strong>{cursos}</strong>
            <span>
              {cursos === 1
                ? " curso disponible"
                : " cursos disponibles"}
            </span>
          </div>
        </div>
      </div>
    </>
  );

  // Si hay link, envuelve en <a>; si no, solo el div con las mismas clases
  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`organizacion-card ${className}`}
        style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <div className={`organizacion-card ${className}`}>
      {cardContent}
    </div>
  );
};

export default OrganizacionCard;