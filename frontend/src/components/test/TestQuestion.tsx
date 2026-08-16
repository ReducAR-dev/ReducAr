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
    <section>
      <h2>{pregunta.pregunta}</h2>

      <div>
        {opciones.map((opcion) => (
          <button
            key={opcion.id}
            type="button"
            onClick={() => onSeleccionar(opcion)}
            aria-pressed={respuestaSeleccionada === opcion.id}
          >
            {opcion.texto}
          </button>
        ))}
      </div>
    </section>
  );
}

export default TestQuestion;