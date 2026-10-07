// src/components/test/TestQuestion.tsx
type Opcion = { id: number; pregunta_id: number; texto: string; puntaje: number; categoria_resultado_id: number; orden: number; };
type Pregunta = { id: number; test_id: number; pregunta: string; orden: number; };

type TestQuestionProps = {
  pregunta: Pregunta;
  opciones: Opcion[];
  respuestaSeleccionada: number | null;
  onSeleccionar: (opcion: Opcion) => void;
};

function TestQuestion({ pregunta, opciones, respuestaSeleccionada, onSeleccionar }: TestQuestionProps) {
  return (
    <section className="relative overflow-hidden p-8 md:p-11 bg-reducar-surface border border-reducar-border rounded-3xl shadow-2xl">
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-reducar-primary via-reducar-gradient-middle to-reducar-turquoise opacity-85" aria-hidden="true" />

      <h2 className="max-w-3xl mx-auto mb-8 text-2xl font-bold text-reducar-text text-center leading-snug tracking-tight">
        {pregunta.pregunta}
      </h2>

      <div className="grid grid-cols-1 gap-3.5">
        {opciones.map((opcion, index) => {
          const selected = respuestaSeleccionada === opcion.id;
          return (
            <button
              key={opcion.id}
              type="button"
              onClick={() => onSeleccionar(opcion)}
              aria-pressed={selected}
              className={`relative flex items-center gap-4 w-full min-h-19 p-4 rounded-2xl border-[1.5px] text-left transition-all ${
                selected
                  ? "border-reducar-primary/50 bg-linear-to-r from-reducar-primary/10 to-reducar-turquoise/10 shadow-lg"
                  : "border-reducar-border bg-reducar-surface hover:border-reducar-primary/40 hover:-translate-y-0.5 hover:shadow-xl"
              }`}
            >
              <span className={`shrink-0 w-10 h-10 grid place-items-center rounded-xl text-sm font-extrabold transition-all ${
                selected
                  ? "bg-linear-to-r from-reducar-primary to-reducar-turquoise-dark text-white"
                  : "bg-reducar-primary-light text-reducar-primary"
              }`}>
                {String.fromCharCode(65 + index)}
              </span>
              <span className={`flex-1 text-base ${selected ? "text-reducar-text font-semibold" : "text-reducar-text"}`}>
                {opcion.texto}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default TestQuestion;