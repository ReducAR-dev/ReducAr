import { useState } from "react";
import PromoBar from "../components/features/PromoBar";
import TestQuestion from "../components/test/TestQuestion";
import { testMock, preguntasMock, opcionesMock, categoriasMock } from "../mocks/test";
import TestResult from "../components/test/TestResult";
import { Link } from "react-router-dom";

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
      <main className="min-h-screen bg-reducar-bg text-reducar-text">

        {/* Cabecera */}
        <section className="pt-7 pb-10 border-b border-reducar-border">
          <div className="max-w-5xl mx-auto px-4">

            {/* Breadcrumb */}
            <div className="max-w-3xl mx-auto mb-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-reducar-text-secondary">
                <Link to="/" className="hover:text-reducar-primary transition-colors">Inicio</Link>
                <span>›</span>
                <strong className="text-reducar-primary">Test de orientación</strong>
              </div>
            </div>

            {/* Título del Test */}
            <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
              <span className="inline-flex items-center justify-center mb-4 px-4 py-2 text-[10px] font-extrabold text-reducar-primary bg-reducar-primary-light border border-reducar-primary/35 rounded-full">
                ✦ Descubrí tu perfil
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-reducar-text tracking-tight mb-4">
                {testMock.nombre}
              </h1>
              <p className="text-sm text-reducar-text-secondary leading-relaxed max-w-xl">
                {testMock.descripcion}
              </p>
            </div>
          </div>
        </section>

        {/* Contenedor del Test */}
        <section className="py-10 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="w-fit mx-auto mb-8 px-4 py-2 text-xs font-bold tracking-wider text-reducar-primary bg-reducar-primary-light border border-reducar-primary/20 rounded-full">
              PREGUNTA {preguntaActual + 1} DE {preguntasMock.length}
            </div>

            <TestQuestion
              pregunta={pregunta}
              opciones={opciones}
              respuestaSeleccionada={respuestaSeleccionada}
              onSeleccionar={seleccionarOpcion}
            />
          </div>
        </section>
      </main>
    </>
  );
}

export default TestPage;