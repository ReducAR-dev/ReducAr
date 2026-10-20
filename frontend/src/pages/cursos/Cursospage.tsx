// src/pages/Cursospage.tsx
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PromoBar from "../../components/features/PromoBar";
import { CursoCard } from "../../components/features/CursoCard";
import { cursoService } from "../../services/curso.service";

function Cursospage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const querySearch = searchParams.get("q") ?? "";

  // Estados de filtros (Mapeados a IDs de la BD)
  const [modalidad, setModalidad] = useState<number | undefined>(undefined);
  const [nivel, setNivel] = useState<number | undefined>(undefined);
  // Nota: Los filtros de "gratuito" y "certificado" requerirían que el backend 
  // acepte `precio_max` y `tipo_certificado_id`. Por ahora los dejamos visualmente.
  const [soloGratuitos, setSoloGratuitos] = useState(false);
  const [page, setPage] = useState(1);

  // Consulta a TanStack Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["cursos-publicos", page, querySearch, modalidad, nivel],
    queryFn: () => cursoService.listarPublicos({
      page,
      limit: 30,
      busqueda: querySearch || undefined,
      modalidad_id: modalidad,
      nivel_id: nivel,
    }),
    placeholderData: (prev) => prev, // Mantiene data vieja mientras carga nueva
  });

  const cursos = data?.data ?? [];
  const meta = data?.meta;

  const actualizarBusqueda = (value: string): void => {
    setSearchParams(value ? { q: value } : {}, { replace: true });
    setPage(1); // Reiniciar a la página 1 al buscar
  };

  const limpiarFiltros = () => {
    setSearchParams({});
    setModalidad(undefined);
    setNivel(undefined);
    setSoloGratuitos(false);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-reducar-bg text-reducar-text">
      <PromoBar />

      <main>
        {/* Header (Mantenido igual) */}
        <section className="relative overflow-hidden py-6 pb-12 border-b border-reducar-border">
          <div className="flex items-center gap-2 mb-5 text-xs font-semibold text-reducar-text-secondary">
            <span>Inicio</span><span>›</span>
            <strong className="text-reducar-primary">Test de orientación</strong>
          </div>
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col items-center max-w-2xl mx-auto text-center">
              <span className="inline-flex items-center px-3.5 py-2 mb-4 text-xs font-extrabold text-reducar-primary bg-reducar-primary-light border border-reducar-primary/20 rounded-full">
                ✦ Formación para tu futuro
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-reducar-text tracking-tight leading-tight max-w-2xl">
                Explorá cursos y encontrá
                <span className="bg-linear-to-r from-reducar-gradient-start via-reducar-gradient-middle to-reducar-gradient-end bg-clip-text text-transparent"> tu próxima oportunidad</span>
              </h1>
            </div>

            <form
              className="max-w-2xl mx-auto mt-7 flex items-center gap-2 p-1.5 pl-4 bg-reducar-surface border border-reducar-border rounded-2xl shadow-lg focus-within:border-reducar-primary focus-within:ring-2 focus-within:ring-reducar-primary/20 transition-all"
              onSubmit={(e) => { e.preventDefault(); }}
            >
              <span className="shrink-0 text-reducar-primary text-xl" aria-hidden="true">⌕</span>
              <input
                type="text"
                value={querySearch}
                onChange={(event) => actualizarBusqueda(event.target.value)}
                placeholder="Buscar cursos por título..."
                className="flex-1 min-w-0 bg-transparent border-none outline-none text-reducar-text text-sm py-3"
              />
            </form>
          </div>
        </section>

        <section className="py-10 pb-20">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-[245px_minmax(0,1fr)] gap-6 items-start">

            {/* Sidebar de Filtros */}
            <aside className="p-5 bg-reducar-surface border border-reducar-border rounded-2xl shadow-lg sticky top-24">
              <div className="pb-5 flex items-start justify-between gap-3 border-b border-reducar-border">
                <h2 className="text-base font-extrabold text-reducar-text">Filtrar búsqueda</h2>
                <button type="button" onClick={limpiarFiltros} className="text-xs font-bold text-reducar-primary hover:text-reducar-turquoise">Limpiar</button>
              </div>

              {/* Filtro Modalidad (IDs mapeados a tu BD) */}
              <div className="py-5 border-b border-reducar-border">
                <h3 className="mb-3.5 text-xs font-extrabold text-reducar-text">Modalidad</h3>
                {[{ id: 2, label: "Virtual" }, { id: 1, label: "Presencial" }, { id: 3, label: "Híbrida" }].map((opcion) => (
                  <label key={opcion.id} className="flex items-center gap-2.5 mt-3 text-xs text-reducar-text-secondary cursor-pointer">
                    <input
                      type="radio"
                      name="modalidad"
                      checked={modalidad === opcion.id}
                      onChange={() => { setModalidad(opcion.id); setPage(1); }}
                      className="w-4 h-4 accent-reducar-primary"
                    />
                    <span>{opcion.label}</span>
                  </label>
                ))}
              </div>

              {/* Filtro Nivel */}
              <div className="py-5 border-b border-reducar-border">
                <h3 className="mb-3.5 text-xs font-extrabold text-reducar-text">Nivel</h3>
                {[{ id: 1, label: "Inicial" }, { id: 2, label: "Intermedio" }, { id: 3, label: "Avanzado" }].map((opcion) => (
                  <label key={opcion.id} className="flex items-center gap-2.5 mt-3 text-xs text-reducar-text-secondary cursor-pointer">
                    <input
                      type="radio"
                      name="nivel"
                      checked={nivel === opcion.id}
                      onChange={() => { setNivel(opcion.id); setPage(1); }}
                      className="w-4 h-4 accent-reducar-primary"
                    />
                    <span>{opcion.label}</span>
                  </label>
                ))}
              </div>

              {/* Toggles visuales (Pendiente lógica backend) */}
              <div className="py-5 flex items-center justify-between gap-3 border-b border-reducar-border">
                <div>
                  <strong className="block text-xs text-reducar-text">Solo gratuitos</strong>
                </div>
                <label className="relative w-9 h-5 shrink-0">
                  <input type="checkbox" checked={soloGratuitos} onChange={(e) => setSoloGratuitos(e.target.checked)} className="w-0 h-0 opacity-0" />
                  <span className={`absolute inset-0 rounded-full cursor-pointer transition-colors ${soloGratuitos ? "bg-reducar-primary" : "bg-reducar-text-secondary/25"}`}>
                    <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${soloGratuitos ? "translate-x-4" : ""}`} />
                  </span>
                </label>
              </div>
            </aside>

            {/* Listado Principal */}
            <div className="min-w-0 p-5 bg-reducar-surface border border-reducar-border rounded-2xl">
              <div className="flex items-end justify-between gap-5 mb-5 flex-wrap">
                <div>
                  <h2 className="mb-1 text-2xl font-extrabold text-reducar-text tracking-tight">Encontrá tu curso ideal</h2>
                  <p className="text-xs text-reducar-text-secondary">
                    {isLoading ? "Buscando..." : `${meta?.total || 0} cursos encontrados`}
                  </p>
                </div>
              </div>

              {/* Estado de Carga */}
              {isLoading && (
                <div className="min-h-75 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border-4 border-reducar-primary/30 border-t-reducar-primary animate-spin" />
                </div>
              )}

              {/* Estado de Error */}
              {isError && (
                <div className="p-6 rounded-2xl bg-red-500/10 text-center text-red-500">
                  <p>Hubo un error al cargar los cursos. Intentá de nuevo.</p>
                </div>
              )}

              {/* Estado Vacío */}
              {!isLoading && !isError && cursos.length === 0 && (
                <div className="min-h-75 flex flex-col items-center justify-center text-center">
                  <div className="text-4xl text-reducar-primary" aria-hidden="true">⌕</div>
                  <h3 className="mt-3 mb-1 text-lg font-bold text-reducar-text">No encontramos cursos</h3>
                  <p className="max-w-sm text-xs text-reducar-text-secondary mb-4">Probá modificando tu búsqueda o eliminando filtros.</p>
                  <button type="button" onClick={limpiarFiltros} className="px-4 py-2.5 rounded-lg bg-reducar-primary text-white text-xs font-bold">Limpiar filtros</button>
                </div>
              )}

              {/* Grilla de Resultados */}
              {!isLoading && cursos.length > 0 && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {cursos.map((curso) => (
                      <CursoCard key={curso.id} curso={curso} />
                    ))}
                  </div>

                  {/* Paginación */}
                  {meta && meta.totalPages > 1 && (
                    <div className="mt-8 flex items-center justify-center gap-2">
                      <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-4 py-2 rounded-xl border border-reducar-border font-bold text-sm disabled:opacity-50 hover:bg-reducar-surface-soft"
                      >
                        Anterior
                      </button>
                      <span className="text-sm font-semibold text-reducar-text-secondary px-2">
                        Página {page} de {meta.totalPages}
                      </span>
                      <button
                        onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
                        disabled={page === meta.totalPages}
                        className="px-4 py-2 rounded-xl border border-reducar-border font-bold text-sm disabled:opacity-50 hover:bg-reducar-surface-soft"
                      >
                        Siguiente
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Cursospage;