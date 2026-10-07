// src/pages/TestPage.tsx
import { useState } from "react";
import PromoBar from "../components/features/PromoBar";
import TestQuestion from "../components/test/TestQuestion";
import { testMock, preguntasMock, opcionesMock, categoriasMock } from "../mocks/test";
import TestResult from "../components/test/TestResult";

function TestPage() {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState<number | null>(null);
  const [respuestas, setRespuestas] = useState<{ preguntaId: number; opcionId: number; categoriaId: number; puntaje: number }[]>([]);
  const [resultado, setResultado] = useState<{ categoria: string; puntaje: number } | null>(null);

  const pregunta = preguntasMock[preguntaActual];
  const opciones = opcionesMock.filter((opcion) => opcion.pregunta_id === pregunta.id);

  const seleccionarOpcion = (opcion: (typeof opcionesMock)[number]) => {
    setRespuestaSeleccionada(opcion.id);
    setRespuestas((prev) => {
      const existente = prev.find((r) => r.preguntaId === pregunta.id);
      if (existente) {
        return prev.map((r) => r.preguntaId === pregunta.id ? { preguntaId: pregunta.id, opcionId: opcion.id, categoriaId: opcion.categoria_resultado_id, puntaje: opcion.puntaje } : r);
      }
      return [...prev, { preguntaId: pregunta.id, opcionId: opcion.id, categoriaId: opcion.categoria_resultado_id, puntaje: opcion.puntaje }];
    });
  };

  const calcularResultado = () => {
    const puntajesPorCategoria: Record<number, number> = {};
    respuestas.forEach((r) => {
      puntajesPorCategoria[r.categoriaId] = (puntajesPorCategoria[r.categoriaId] || 0) + r.puntaje;
    });
    const ganadora = Object.entries(puntajesPorCategoria).sort((a, b) => b[1] - a[1])[0];
    if (!ganadora) return;
    const categoria = categoriasMock.find((c) => c.id === Number(ganadora[0]));
    if (!categoria) return;
    setResultado({ categoria: categoria.nombre, puntaje: Number(ganadora[1]) });
  };

  const siguientePregunta = () => {
    if (respuestaSeleccionada === null) return;
    if (preguntaActual < preguntasMock.length - 1) {
      setPreguntaActual((a) => a + 1);
      setRespuestaSeleccionada(null);
      return;
    }
    calcularResultado();
  };

  if (resultado) {
    return (
      <>
        <PromoBar />
        <main className="min-h-screen bg-reducar-bg text-reducar-text py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <TestResult categoria={resultado.categoria} puntaje={resultado.puntaje} />
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <PromoBar />
      <main className="min-h-screen bg-reducar-bg text-reducar-text py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-reducar-text text-center tracking-tight mb-4">
            {testMock.nombre}
          </h1>
          <p className="text-center text-sm text-reducar-text-secondary mb-8">{testMock.descripcion}</p>

          <div className="w-fit mx-auto mb-8 px-4 py-2 text-sm font-semibold text-reducar-text-secondary bg-reducar-primary-light border border-reducar-primary/20 rounded-full">
            Pregunta {preguntaActual + 1} de {preguntasMock.length}
          </div>

          <TestQuestion
            pregunta={pregunta}
            opciones={opciones}
            respuestaSeleccionada={respuestaSeleccionada}
            onSeleccionar={seleccionarOpcion}
          />

          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={siguientePregunta}
              disabled={respuestaSeleccionada === null}
              className="min-w-37.5 min-h-13 px-6 rounded-2xl bg-linear-to-r from-reducar-primary to-reducar-turquoise-dark text-white text-base font-bold hover:-translate-y-0.5 hover:shadow-2xl disabled:opacity-45 disabled:cursor-not-allowed disabled:shadow-none transition-all"
            >
              {preguntaActual === preguntasMock.length - 1 ? "Finalizar test" : "Siguiente →"}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default TestPage;