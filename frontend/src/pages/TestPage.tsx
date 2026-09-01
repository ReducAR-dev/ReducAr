import { useState } from "react";
import TestQuestion from "../components/test/TestQuestion";
import {
  testMock,
  preguntasMock,
  opcionesMock,
  categoriasMock,
} from "../mocks/testMock";
import TestResult from "../components/test/TestResult";
import "../styles/testPage.css";

function TestPage() {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState<
    number | null
  >(null);

  const [respuestas, setRespuestas] = useState<
    {
      preguntaId: number;
      opcionId: number;
      categoriaId: number;
      puntaje: number;
    }[]
  >([]);

  const [resultado, setResultado] = useState<{
    categoria: string;
    puntaje: number;
  } | null>(null);

  const pregunta = preguntasMock[preguntaActual];

  const opciones = opcionesMock.filter(
    (opcion) => opcion.pregunta_id === pregunta.id
  );

  const seleccionarOpcion = (opcion: (typeof opcionesMock)[number]) => {
    setRespuestaSeleccionada(opcion.id);

    setRespuestas((respuestasAnteriores) => {
      const respuestaExistente = respuestasAnteriores.find(
        (respuesta) => respuesta.preguntaId === pregunta.id
      );

      if (respuestaExistente) {
        return respuestasAnteriores.map((respuesta) =>
          respuesta.preguntaId === pregunta.id
            ? {
                preguntaId: pregunta.id,
                opcionId: opcion.id,
                categoriaId: opcion.categoria_resultado_id,
                puntaje: opcion.puntaje,
              }
            : respuesta
        );
      }

      return [
        ...respuestasAnteriores,
        {
          preguntaId: pregunta.id,
          opcionId: opcion.id,
          categoriaId: opcion.categoria_resultado_id,
          puntaje: opcion.puntaje,
        },
      ];
    });
  };

  const calcularResultado = () => {
    const puntajesPorCategoria: Record<number, number> = {};

    respuestas.forEach((respuesta) => {
      puntajesPorCategoria[respuesta.categoriaId] =
        (puntajesPorCategoria[respuesta.categoriaId] || 0) +
        respuesta.puntaje;
    });

    const categoriaGanadora = Object.entries(puntajesPorCategoria).sort(
      (a, b) => b[1] - a[1]
    )[0];

    if (!categoriaGanadora) {
      return;
    }

    const categoria = categoriasMock.find(
      (categoria) => categoria.id === Number(categoriaGanadora[0])
    );

    if (!categoria) {
      return;
    }

    setResultado({
      categoria: categoria.nombre,
      puntaje: Number(categoriaGanadora[1]),
    });
  };

  const siguientePregunta = () => {
    if (respuestaSeleccionada === null) {
      return;
    }

    if (preguntaActual < preguntasMock.length - 1) {
      setPreguntaActual((actual) => actual + 1);
      setRespuestaSeleccionada(null);
      return;
    }

    calcularResultado();
  };

  if (resultado) {
    return (
      <main className="test-page">
        <div className="test-container">
          <TestResult
            categoria={resultado.categoria}
            puntaje={resultado.puntaje}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="test-page">
      <div className="test-container">
        <h1 className="test-title">{testMock.nombre}</h1>

        <div className="test-progress">
          Pregunta {preguntaActual + 1} de {preguntasMock.length}
        </div>

        <TestQuestion
          pregunta={pregunta}
          opciones={opciones}
          respuestaSeleccionada={respuestaSeleccionada}
          onSeleccionar={seleccionarOpcion}
        />

        <div className="test-navigation">
          <button
            type="button"
            className="test-next-button"
            onClick={siguientePregunta}
            disabled={respuestaSeleccionada === null}
          >
            {preguntaActual === preguntasMock.length - 1
              ? "Finalizar test"
              : "Siguiente"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default TestPage;