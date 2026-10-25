import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cursoUsuarioService, type MisCursosResponse } from "../../services/cursoUsuario.service";

// Diccionario para asignar un emoji según la categoría
const CATEGORY_EMOJIS: Record<string, string> = {
  "Tecnología": "💻",
  "Desarrollo Web": "🌐",
  "Ciberseguridad": "🛡️",
  "Data Science & IA": "🤖",
  "Diseño UX/UI": "🎨",
  "Cloud & DevOps": "☁️",
  "Desarrollo Móvil": "📱",
  "Blockchain": "⛓️",
  "Testing & QA": "🧪",
  "Gestión de Proyectos IT": "📊",
  "Bases de Datos": "🗄️",
};

// ============================================
// COMPONENTE: Esqueleto de carga (Skeleton)
// ============================================
function CursoSkeleton() {
  return (
    <div className="flex flex-col bg-reducar-surface rounded-2xl border border-reducar-border overflow-hidden animate-pulse">
      <div className="h-32 bg-reducar-surface-soft" />
      <div className="p-5 flex-1 flex flex-col">
        <div className="h-5 bg-reducar-surface-soft rounded-md w-3/4 mb-2" />
        <div className="h-3 bg-reducar-surface-soft rounded-md w-1/2 mb-4" />
        <div className="h-6 bg-reducar-surface-soft rounded-md w-1/3 mb-6" />
        <div className="mt-auto flex gap-2">
          <div className="h-9 bg-reducar-surface-soft rounded-lg flex-1" />
          <div className="w-9 h-9 bg-reducar-surface-soft rounded-lg" />
        </div>
      </div>
    </div>
  );
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
export default function MisCursosPage() {
  const [filtro, setFiltro] = useState<"todos" | "gratuitos" | "pagados">("todos");
  const [page, setPage] = useState(1);
  
  // Estado local para manejar la animación de borrado
  const [deletingState, setDeletingState] = useState<Record<number, "idle" | "loading" | "success">>({});
  
  const queryClient = useQueryClient();

  // 1. Consultar cursos (con paginación)
  const { data: response, isLoading, isError, isFetching } = useQuery({
    queryKey: ["mis-cursos", page],
    queryFn: () => cursoUsuarioService.obtenerMisCursos(page, 30),
    placeholderData: (prev) => prev,
  });

  // 2. Mutación para eliminar con animación controlada
  const removeMutation = useMutation({
    mutationFn: (cursoId: number) => cursoUsuarioService.eliminarCurso(cursoId),
    onMutate: (cursoId) => {
      // Paso 1: El botón pasa a estado "cargando"
      setDeletingState((prev) => ({ ...prev, [cursoId]: "loading" }));
    },
    onSuccess: (_, cursoId) => {
      // Paso 2: Éxito, mostramos el ticket verde
      setDeletingState((prev) => ({ ...prev, [cursoId]: "success" }));
      
      // Paso 3: Esperamos 800ms para que el usuario vea el check, y luego quitamos la tarjeta
      setTimeout(() => {
        // Actualizamos la caché manualmente para evitar el bug del skeleton
        queryClient.setQueryData(["mis-cursos", page], (oldData: MisCursosResponse | undefined) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: oldData.data.filter((item) => item.curso_id !== cursoId),
            meta: {
              ...oldData.meta,
              total: Math.max(0, oldData.meta.total - 1),
            }
          };
        });

        // Limpiamos el estado de borrado para esta tarjeta
        setDeletingState((prev) => {
          const newState = { ...prev };
          delete newState[cursoId];
          return newState;
        });
        
        // Refrescamos en segundo plano (sin mostrar skeleton)
        queryClient.invalidateQueries({ queryKey: ["mis-cursos"] });
      }, 800);
    },
    onError: (_, cursoId) => {
      // Si falla, volvemos al estado normal y avisamos
      setDeletingState((prev) => ({ ...prev, [cursoId]: "idle" }));
      alert("No se pudo eliminar el curso. Intentá de nuevo.");
    },
  });

  if (isError) {
    return (
      <div className="min-h-screen bg-reducar-bg flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-red-500 mb-2">Error al cargar tus cursos</h1>
        <p className="text-sm text-reducar-text-secondary">Intentá recargar la página.</p>
      </div>
    );
  }

  const cursos = response?.data || [];
  const meta = response?.meta;
  
  // 3. Filtrado
  const cursosFiltrados = cursos.filter((item) => {
    if (filtro === "todos") return true;
    if (filtro === "gratuitos") return item.curso.precio === 0;
    if (filtro === "pagados") return item.curso.precio > 0;
    return true;
  });

  const totalGratuitos = cursos.filter((c) => c.curso.precio === 0).length;
  const totalPagados = cursos.filter((c) => c.curso.precio > 0).length;

  return (
    <div className="min-h-screen bg-reducar-bg text-reducar-text px-4 py-10 md:px-8">
      <div className="mx-auto max-w-6xl">

        {/* ENCABEZADO */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-reducar-border pb-6">
          <div>
            <h1 className="text-3xl font-extrabold">Mis Cursos</h1>
            <p className="text-reducar-text-secondary text-sm mt-1">
              Tu lista de cursos adquiridos. Continúa aprendiendo o revisa los detalles.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="bg-reducar-surface border border-reducar-border px-4 py-2 rounded-xl shadow-sm text-center">
              <span className="block text-xl font-bold text-reducar-primary">{totalGratuitos}</span>
              <span className="text-[10px] uppercase font-bold text-reducar-text-secondary">Gratuitos</span>
            </div>
            <div className="bg-reducar-surface border border-reducar-border px-4 py-2 rounded-xl shadow-sm text-center">
              <span className="block text-xl font-bold text-reducar-turquoise">{totalPagados}</span>
              <span className="text-[10px] uppercase font-bold text-reducar-text-secondary">Pagados</span>
            </div>
          </div>
        </div>

        {/* FILTROS */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-reducar-text-secondary mr-2">Filtrar por:</span>
          <button
            onClick={() => setFiltro("todos")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${filtro === "todos" ? "bg-reducar-primary text-white shadow" : "bg-reducar-surface border border-reducar-border text-reducar-text hover:bg-reducar-surface-soft"}`}
          >
            Todos ({cursos.length})
          </button>
          <button
            onClick={() => setFiltro("gratuitos")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${filtro === "gratuitos" ? "bg-reducar-primary text-white shadow" : "bg-reducar-surface border border-reducar-border text-reducar-text hover:bg-reducar-surface-soft"}`}
          >
            Gratuitos ({totalGratuitos})
          </button>
          <button
            onClick={() => setFiltro("pagados")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${filtro === "pagados" ? "bg-reducar-primary text-white shadow" : "bg-reducar-surface border border-reducar-border text-reducar-text hover:bg-reducar-surface-soft"}`}
          >
            Pagados ({totalPagados})
          </button>
        </div>

        {/* CONTENIDO DINÁMICO */}
        {/* FIX: Solo mostramos el skeleton en la carga inicial. Si data es undefined o vacío, mostramos el estado vacío */}
        {isLoading && !response ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <CursoSkeleton />
            <CursoSkeleton />
          </div>
        ) : cursosFiltrados.length === 0 ? (
          <div className="rounded-3xl border border-reducar-border border-dashed bg-reducar-surface p-12 text-center shadow-sm">
            <div className="text-6xl mb-4 opacity-50">📚</div>
            <h3 className="text-xl font-bold text-reducar-text">No tenés cursos en esta categoría</h3>
            <p className="text-sm text-reducar-text-secondary mt-2 max-w-md mx-auto">
              Explorá el catálogo y adquirí cursos gratuitos para empezar a aprender.
            </p>
            <Link
              to="/cursos"
              className="mt-6 inline-flex h-11 px-6 items-center justify-center rounded-xl bg-reducar-primary text-white font-bold text-sm hover:bg-reducar-primary-dark transition-colors shadow-lg"
            >
              Explorar cursos
            </Link>
          </div>
        ) : (
          <>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {cursosFiltrados.map((item) => {
                const esGratis = item.curso.precio === 0;
                const emoji = CATEGORY_EMOJIS[item.curso.categoria] || "📚";
                const fecha = new Date(item.fecha_adquisicion).toLocaleDateString("es-AR", {
                  day: "numeric", month: "short", year: "numeric"
                });
                
                const currentDeleteState = deletingState[item.curso_id] || "idle";

                return (
                  <div
                    key={item.id}
                    // Animación de salida cuando el estado es "success"
                    className={`group flex flex-col bg-reducar-surface rounded-2xl border border-reducar-border shadow-sm transition-all duration-500 overflow-hidden ${
                      currentDeleteState === "success"
                        ? "opacity-0 scale-95 pointer-events-none translate-y-4"
                        : "hover:shadow-[0_0_20px_rgba(123,108,246,0.15)] hover:border-reducar-primary/40 hover:-translate-y-1"
                    }`}
                  >
                    {/* Imagen y Emoji */}
                    <div className="relative h-32 bg-reducar-primary-light overflow-hidden">
                      {item.curso.imagen_url ? (
                        <img 
                          src={item.curso.imagen_url} 
                          alt={item.curso.titulo} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80";
                            e.currentTarget.onerror = null;
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl opacity-50">🖼️</div>
                      )}
                      
                      <div className="absolute top-3 left-3 flex gap-2">
                        <div className="bg-reducar-surface/90 backdrop-blur-md px-2.5 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5 text-xs font-bold">
                          <span>{emoji}</span>
                          <span className="text-reducar-text truncate max-w-25">{item.curso.categoria}</span>
                        </div>
                        <div className={`px-2.5 py-1.5 rounded-lg shadow-sm text-xs font-bold ${esGratis ? "bg-reducar-turquoise/90 text-white" : "bg-reducar-primary/90 text-white"}`}>
                          {esGratis ? "Gratuito" : `$${item.curso.precio}`}
                        </div>
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-base font-bold leading-snug line-clamp-2 mb-1 group-hover:text-reducar-primary transition-colors">
                        {item.curso.titulo}
                      </h3>
                      <p className="text-xs text-reducar-text-secondary font-semibold mb-3">
                        {item.curso.institucion}
                      </p>
                      
                      <div className="flex items-center gap-2 text-[10px] text-reducar-text-secondary bg-reducar-surface-soft w-fit px-2 py-1 rounded-md mb-4">
                        <span>Adquirido el {fecha}</span>
                      </div>

                      <div className="mt-auto flex items-center gap-2 pt-3 border-t border-reducar-border">
                        {esGratis ? (
                          <>
                            <Link
                              to={`/cursos/${item.curso_id}`}
                              className="flex-1 h-9 inline-flex items-center justify-center rounded-lg bg-reducar-primary/10 text-reducar-primary text-xs font-bold hover:bg-reducar-primary/20 transition-colors"
                            >
                              Ver curso
                            </Link>
                            
                            {/* BOTÓN DE ELIMINAR CON 3 ESTADOS */}
                            <button
                              onClick={() => removeMutation.mutate(item.curso_id)}
                              disabled={currentDeleteState !== "idle"}
                              className={`w-9 h-9 inline-flex items-center justify-center rounded-lg transition-all duration-300 ${
                                currentDeleteState === "loading"
                                  ? "border border-reducar-border bg-reducar-surface-soft"
                                  : currentDeleteState === "success"
                                  ? "bg-green-500 border border-green-500 text-white"
                                  : "border border-red-500/30 text-red-500 hover:bg-red-500/10"
                              }`}
                              title="Quitar de mi lista"
                            >
                              {currentDeleteState === "loading" ? (
                                <div className="w-4 h-4 rounded-full border-2 border-reducar-primary/30 border-t-reducar-primary animate-spin" />
                              ) : currentDeleteState === "success" ? (
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              )}
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => alert("Simulación: Pasarela de pagos en desarrollo 💳")}
                            className="w-full h-9 inline-flex items-center justify-center rounded-lg bg-reducar-surface-soft border border-reducar-border text-reducar-text text-xs font-bold hover:bg-reducar-primary/10 hover:text-reducar-primary hover:border-reducar-primary/30 transition-colors"
                          >
                            Revisar compra
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* PAGINACIÓN */}
            {meta && meta.totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-3">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1 || isFetching}
                  className="px-4 py-2 rounded-xl border border-reducar-border text-reducar-text font-bold text-sm disabled:opacity-50 hover:bg-reducar-surface-soft transition-colors"
                >
                  Anterior
                </button>
                <span className="text-sm font-semibold text-reducar-text-secondary">
                  Página {page} de {meta.totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
                  disabled={page === meta.totalPages || isFetching}
                  className="px-4 py-2 rounded-xl border border-reducar-border text-reducar-text font-bold text-sm disabled:opacity-50 hover:bg-reducar-surface-soft transition-colors"
                >
                  Siguiente
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}