// src/components/test/TestResult.tsx
import { Link } from "react-router-dom";

type TestResultProps = { 
  categoria: string; 
  puntaje: number; 
  onReiniciar: () => void; 
};

function TestResult({ categoria, puntaje, onReiniciar }: TestResultProps) {
  return (
    <section className="relative overflow-hidden p-8 md:p-14 text-center bg-reducar-surface border border-reducar-border rounded-3xl shadow-2xl">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-reducar-primary via-reducar-gradient-middle to-reducar-turquoise" aria-hidden="true" />

      <p className="inline-flex items-center justify-center px-4 py-2 mb-4 text-xs font-bold tracking-wider uppercase text-reducar-turquoise bg-reducar-turquoise/10 rounded-full">
        Test completado
      </p>

      <h2 className="text-3xl md:text-4xl font-extrabold text-reducar-text tracking-tight">
        Tu área recomendada
      </h2>

      <p className="inline-block mt-4 mb-8 text-4xl md:text-6xl font-extrabold bg-linear-to-r from-reducar-gradient-start via-reducar-gradient-middle to-reducar-gradient-end bg-clip-text text-transparent tracking-tight">
        {categoria}
      </p>
      
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center gap-3 px-5 py-3 border border-reducar-border rounded-2xl bg-reducar-bg text-reducar-text-secondary text-sm font-semibold">
          <span>Puntaje obtenido</span>
          <strong className="text-reducar-primary text-xl font-extrabold">{puntaje}</strong>
        </div>
      </div>

      <p className="max-w-2xl mx-auto text-base text-reducar-text-secondary leading-relaxed mb-10">
        Según tus respuestas, esta área puede ser un buen punto de partida para tu aprendizaje en tecnología.
        Te recomendamos explorar los cursos de esta categoría para comenzar.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          to={`/cursos?q=${encodeURIComponent(categoria)}`}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-linear-to-r from-reducar-primary to-reducar-turquoise-dark text-white font-bold text-sm shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all"
        >
          Ver cursos de {categoria}
        </Link>
        <button
          type="button"
          onClick={onReiniciar}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-reducar-border text-reducar-text font-bold text-sm hover:bg-reducar-surface-soft transition-colors"
        >
          Volver a hacer el test
        </button>
      </div>
    </section>
  );
}

export default TestResult;