// src/pages/NovedadesPage.tsx
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PromoBar from "../components/features/PromoBar";
import NovedadCard from "../components/ui/NovedadCard";
import { novedadService } from "../services/novedad.service";

function NovedadesPage() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["novedades-publicas", page],
    queryFn: () => novedadService.listarPublicas(page, limit),
    placeholderData: (previousData) => previousData, // Mantiene la data vieja mientras carga la nueva
  });

  const novedades = data?.data ?? [];
  const meta = data?.meta;

  return (
    <div className="min-h-screen w-full bg-reducar-bg text-reducar-text">
      <PromoBar />

      <main>
        {/* Cabecera */}
        <section className="pt-14 pb-8">
          <div className="max-w-5xl mx-auto px-4 flex flex-col items-center text-center">
            <span className="inline-flex items-center justify-center mb-4 px-4 py-2 text-xs font-extrabold text-reducar-primary bg-reducar-primary-light border border-reducar-primary/30 rounded-full">
              ✦ Novedades
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-reducar-text tracking-tight max-w-3xl leading-tight">
              Enterate de los próximos
              <span className="bg-gradient-to-r from-reducar-gradient-start via-reducar-gradient-middle to-reducar-gradient-end bg-clip-text text-transparent"> eventos</span>
            </h1>
            <p className="max-w-2xl mt-4 text-sm text-reducar-text-secondary leading-relaxed">
              Descubrí eventos, encuentros y conferencias de tecnología para aprender, conectar con la comunidad y seguir creciendo.
            </p>

            {/* Stats dinámicos (si hay data) */}
            {meta && meta.total > 0 && (
              <div className="w-full max-w-3xl mt-8 py-5 grid grid-cols-2 md:grid-cols-3 border-y border-reducar-border/50">
                <div className="flex flex-col items-center">
                  <strong className="text-2xl font-extrabold text-reducar-text">{meta.total}</strong>
                  <span className="mt-1 text-[10px] font-extrabold tracking-widest text-reducar-text-secondary">EVENTOS</span>
                </div>
                <div className="flex flex-col items-center">
                  <strong className="text-2xl font-extrabold text-reducar-text">Agenda</strong>
                  <span className="mt-1 text-[10px] font-extrabold tracking-widest text-reducar-text-secondary">PRÓXIMOS</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Listado */}
        <section id="eventos" className="py-6 pb-20">
          <div className="max-w-4xl mx-auto px-4">
            
            {/* Estado: Cargando inicial */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-20 text-reducar-text-secondary space-y-4">
                <div className="w-8 h-8 rounded-full border-4 border-reducar-primary/30 border-t-reducar-primary animate-spin" />
                <p className="text-sm">Cargando novedades...</p>
              </div>
            )}

            {/* Estado: Error */}
            {isError && (
              <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-center space-y-2">
                <p className="text-red-500 font-bold">No pudimos cargar las novedades.</p>
                <p className="text-sm text-red-500/80">
                  {error instanceof Error ? error.message : "Error de conexión."}
                </p>
              </div>
            )}

            {/* Estado: Vacío */}
            {!isLoading && !isError && novedades.length === 0 && (
              <div className="text-center py-20 bg-reducar-surface rounded-3xl border border-reducar-border border-dashed">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-reducar-surface-soft grid place-items-center text-reducar-text-secondary">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-extrabold text-reducar-text mb-1">
                  No hay novedades por ahora
                </h3>
                <p className="text-sm text-reducar-text-secondary max-w-sm mx-auto">
                  Pronto publicaremos nuevos eventos y capacitaciones. ¡Volvé a revisar más tarde!
                </p>
              </div>
            )}

            {/* Estado: Lista con datos */}
            {!isLoading && !isError && novedades.length > 0 && (
              <div className="space-y-4">
                {novedades.map((novedad) => (
                  <NovedadCard key={novedad.id} novedad={novedad} />
                ))}

                {/* Paginación */}
                {meta && meta.page < meta.totalPages && (
                  <div className="pt-6 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setPage((prev) => prev + 1)}
                      disabled={isFetching}
                      className="h-11 px-8 rounded-xl border border-reducar-border text-reducar-text font-bold hover:bg-reducar-surface-soft transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                      {isFetching ? (
                        <>
                          <div className="w-4 h-4 rounded-full border-2 border-reducar-primary/30 border-t-reducar-primary animate-spin" />
                          Cargando...
                        </>
                      ) : (
                        <>
                          Cargar más novedades
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>
        </section>

        {/* Se eliminó el "CTA" final porque era irrelevante */}
      </main>
    </div>
  );
}

export default NovedadesPage;