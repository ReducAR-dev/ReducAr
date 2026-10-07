// src/components/test/TestResult.tsx
type TestResultProps = { categoria: string; puntaje: number };

function TestResult({ categoria, puntaje }: TestResultProps) {
  return (
    <section className="relative overflow-hidden p-12 md:p-14 text-center bg-reducar-surface border border-reducar-border rounded-3xl shadow-2xl">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-reducar-primary via-reducar-gradient-middle to-reducar-turquoise" aria-hidden="true" />

      <p className="inline-flex items-center justify-center px-4 py-2 mb-4 text-xs font-bold tracking-wider uppercase text-reducar-turquoise bg-reducar-turquoise/10 rounded-full">
        Test completado
      </p>

      <h2 className="text-3xl md:text-4xl font-extrabold text-reducar-text tracking-tight">
        Tu área recomendada
      </h2>

      <p className="inline-block mt-4 mb-8 text-4xl md:text-5xl font-extrabold bg-linear-to-r from-reducar-gradient-start via-reducar-gradient-middle to-reducar-gradient-end bg-clip-text text-transparent tracking-tight">
        {categoria}
      </p>
      <br />

      <div className="inline-flex items-center gap-3 px-5 py-3 mb-8 border border-reducar-border rounded-2xl bg-reducar-bg text-reducar-text-secondary text-sm font-semibold">
        <span>Puntaje obtenido</span>
        <strong className="text-reducar-primary text-xl font-extrabold">{puntaje}</strong>
      </div>

      <p className="max-w-2xl mx-auto text-base text-reducar-text-secondary leading-relaxed">
        Según tus respuestas, esta área puede ser un buen punto de partida para tu aprendizaje en tecnología.
      </p>
    </section>
  );
}

export default TestResult;