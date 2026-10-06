// src/components/features/RouteCard.tsx
import { Link } from "react-router-dom";

interface RouteCardProps {
  id: number;
  titulo: string;
  descripcion: string;
  numero: number;
  searchTerm: string;
  className?: string;
}

export const RouteCard = ({ titulo, descripcion, numero, searchTerm, className = "" }: RouteCardProps) => {
  return (
    <article className={`min-h-65 p-7 flex flex-col items-start bg-reducar-surface border border-reducar-border rounded-3xl shadow-2xl ${className}`}>
      <span className="mb-5 text-xs font-extrabold tracking-widest text-reducar-turquoise-dark uppercase">
        Ruta {String(numero).padStart(2, "0")}
      </span>
      <h2 className="mb-3 text-2xl font-bold text-white">{titulo}</h2>
      <p className="mb-6 text-reducar-text-secondary leading-relaxed text-sm">{descripcion}</p>
      <Link
        to={`/cursos?q=${encodeURIComponent(searchTerm)}`}
        className="mt-auto px-4 py-3 rounded-xl bg-reducar-primary text-white text-sm font-extrabold hover:bg-reducar-primary-dark transition-colors inline-flex items-center gap-2"
      >
        Explorar cursos <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
};

export default RouteCard;