// src/pages/NotFoundPage.tsx
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-[80vh] w-full bg-reducar-bg text-reducar-text flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <span className="inline-flex items-center justify-center px-4 py-2 text-xs font-extrabold text-reducar-primary bg-reducar-primary-light border border-reducar-primary/30 rounded-full">
          ✦ Error 404
        </span>

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-reducar-text">
          Página no encontrada
        </h1>

        <p className="text-sm md:text-base text-reducar-text-secondary leading-relaxed">
          ¡Ups! Parece que te perdiste en el camino del aprendizaje. La página que buscás no existe o fue movida a otra dimensión tecnológica.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-reducar-primary text-white font-extrabold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-reducar-primary/20"
          >
            Volver al inicio 🏠
          </Link>
          <Link
            to="/cursos"
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-reducar-border text-reducar-text font-extrabold text-sm hover:bg-reducar-surface transition-colors"
          >
            Explorar cursos 📚
          </Link>
        </div>
      </div>
    </div>
  );
}
