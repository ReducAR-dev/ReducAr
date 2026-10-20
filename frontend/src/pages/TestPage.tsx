import { useState, useEffect } from "react";
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

  // Sincronizar la respuesta seleccionada si el usuario navega hacia atrás
  useEffect(() => {
    const respuestaExistente = respuestas.find((r) => r.preguntaId === pregunta.id);
    setRespuestaSeleccionada(respuestaExistente ? respuestaExistente.opcionId : null);
  }, [preguntaActual, pregunta.id, respuestas]);

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

  const handleNext = () => {
    if (!respuestaSeleccionada) return; // No debería pasar gracias al botón deshabilitado
    if (preguntaActual < preguntasMock.length - 1) {
      setPreguntaActual((prev) => prev + 1);
    } else {
      calcularResultado();
    }
  };

  const handlePrev = () => {
    if (preguntaActual > 0) {
      setPreguntaActual((prev) => prev - 1);
    }
  };

  const reiniciarTest = () => {
    setPreguntaActual(0);
    setRespuestas([]);
    setResultado(null);
    setRespuestaSeleccionada(null);
  };

  if (resultado) {
    return (
      <>
        <PromoBar />
        <main className="min-h-screen bg-reducar-bg text-reducar-text py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <TestResult categoria={resultado.categoria} puntaje={resultado.puntaje} onReiniciar={reiniciarTest} />
          </div>
        </main>
      </>
    );
  }

  // Calcular progreso (de 0 a 100)
  const progreso = ((preguntaActual + 1) / preguntasMock.length) * 100;

  return (
    <>
      <PromoBar />
      <main className="min-h-screen bg-reducar-bg text-reducar-text">

        {/* Cabecera */}
        <section className="pt-7 pb-10 border-b border-reducar-border">
          <div className="max-w-5xl mx-auto px-4">
            
            <div className="max-w-3xl mx-auto mb-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-reducar-text-secondary">
                <Link to="/" className="hover:text-reducar-primary transition-colors">Inicio</Link>
                <span>›</span>
                <strong className="text-reducar-primary">Test de orientación</strong>
              </div>
            </div>

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
            
            {/* Indicador de Progreso */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2 text-xs font-bold text-reducar-text-secondary">
                <span>PREGUNTA {preguntaActual + 1} DE {preguntasMock.length}</span>
                <span>{Math.round(progreso)}%</span>
              </div>
              <div className="w-full h-2 bg-reducar-surface-soft rounded-full overflow-hidden">
                <div 
                  className="h-full bg-linear-to-r from-reducar-primary to-reducar-turquoise transition-all duration-500 ease-out"
                  style={{ width: `${progreso}%` }}
                />
              </div>
            </div>

            <TestQuestion
              pregunta={pregunta}
              opciones={opciones}
              respuestaSeleccionada={respuestaSeleccionada}
              onSeleccionar={seleccionarOpcion}
            />

            {/* Botones de Navegación (Los que faltaban) */}
            <div className="mt-8 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={handlePrev}
                disabled={preguntaActual === 0}
                className="px-6 h-12 rounded-xl border border-reducar-border text-reducar-text font-bold text-sm hover:bg-reducar-surface-soft transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={!respuestaSeleccionada}
                className={`px-8 h-12 rounded-xl text-white font-bold text-sm transition-all shadow-lg 
                  ${respuestaSeleccionada 
                    ? "bg-linear-to-r from-reducar-primary to-reducar-turquoise-dark hover:-translate-y-0.5 hover:shadow-xl" 
                    : "bg-gray-400 cursor-not-allowed opacity-70"}`}
              >
                {preguntaActual === preguntasMock.length - 1 ? "Finalizar Test" : "Siguiente pregunta"}
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default TestPage;