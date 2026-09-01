type Opcion = {
  id: number;
  pregunta_id: number;
  texto: string;
  puntaje: number;
  categoria_resultado_id: number;
  orden: number;
};

type Pregunta = {
  id: number;
  test_id: number;
  pregunta: string;
  orden: number;
};

type TestQuestionProps = {
  pregunta: Pregunta;
  opciones: Opcion[];
  respuestaSeleccionada: number | null;
  onSeleccionar: (opcion: Opcion) => void;
};

function TestQuestion({
  pregunta,
  opciones,
  respuestaSeleccionada,
  onSeleccionar,
}: TestQuestionProps) {
  return (
    <section className="test-question">
      <h2 className="question-title">{pregunta.pregunta}</h2>

      <div className="test-options">
        {opciones.map((opcion, index) => (
          <button
            key={opcion.id}
            type="button"
            className={`test-option ${
              respuestaSeleccionada === opcion.id ? "selected" : ""
            }`}
            onClick={() => onSeleccionar(opcion)}
            aria-pressed={respuestaSeleccionada === opcion.id}
          >
            <span className="option-letter">
              {String.fromCharCode(65 + index)}
            </span>

            <span className="option-text">{opcion.texto}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default TestQuestion;