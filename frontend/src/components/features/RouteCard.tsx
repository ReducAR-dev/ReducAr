import React from "react";
import { Link } from "react-router-dom";

interface RouteCardProps {
  id: number;
  titulo: string;
  descripcion: string;
  numero: number; // para mostrar "Ruta 01"
  searchTerm: string; // término para el enlace a /cursos
  className?: string;
}

export const RouteCard: React.FC<RouteCardProps> = ({
  id,
  titulo,
  descripcion,
  numero,
  searchTerm,
  className = "",
}) => {
  return (
    <article className={`route-card ${className}`}>
      <span className="route-card-number">
        Ruta {String(numero).padStart(2, "0")}
      </span>
      <h2>{titulo}</h2>
      <p>{descripcion}</p>
      <Link
        to={`/cursos?q=${encodeURIComponent(searchTerm)}`}
      >
        Explorar cursos <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
};

export default RouteCard;