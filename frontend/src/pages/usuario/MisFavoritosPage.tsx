// src/pages/usuario/MisFavoritosPage.tsx
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { favoritoService, type FavoritoItem } from "../../services/favorito.service";

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

function FavoritoSkeleton() {
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

export default function MisFavoritosPage() {
  const queryClient = useQueryClient();

  // 1. Consultar favoritos
  const { data: favoritosRaw, isLoading, isError } = useQuery({
    queryKey: ["favoritos"],
    queryFn: favoritoService.obtenerFavoritos,
    // Mantenemos la data anterior mientras recarga para evitar parpadeos
    placeholderData: (prev) => prev,
  });

  // 2. Mutación para eliminar
  const removeMutation = useMutation({
    mutationFn: (cursoId: number) => favoritoService.eliminarFavorito(cursoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favoritos"] });
    },
  });

  // 3. Normalizar y blindar los datos (El fix crucial)
  // Si Supabase devuelve el curso como array (error común en joins), lo extraemos.
  const favoritos: FavoritoItem[] = (favoritosRaw || []).map((item: any) => {
    const cursoData = Array.isArray(item.curso) ? item.curso[0] : item.curso;
    return {
      id: item.id,
      curso_id: item.curso_id,
      fecha: item.fecha,
      curso: {
        titulo: cursoData?.titulo || "Curso no disponible",
        imagen_url: cursoData?.imagen_url || null,
        precio: cursoData?.precio || 0,
        categoria: cursoData?.categoria || "General",
        modalidad: cursoData?.modalidad || "Virtual",
        institucion: cursoData?.institucion || "ReducAR",
      }
    };
  });

  return (
    <div className="min-h-screen bg-reducar-bg text-reducar-text px-4 py-10 md:px-8">
      <div className="mx-auto max-w-6xl">

        {/* ENCABEZADO (Siempre visible) */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-reducar-border pb-6">
          <div>
            <h1 className="text-3xl font-extrabold">Mis Favoritos</h1>
            <p className="text-reducar-text-secondary text-sm mt-1">
              Tu lista personal de cursos guardados para revisar más tarde.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-reducar-surface border border-reducar-border px-4 py-2 rounded-xl shadow-sm w-fit">
            <span className="text-2xl">📁</span>
            <div>
              <span className="block text-xl font-bold leading-none">
                {isLoading ? "-" : favoritos.length}
              </span>
              <span className="text-[10px] uppercase font-bold text-reducar-text-secondary">Guardados</span>
            </div>
          </div>
        </div>

        {/* CONTENIDO DINÁMICO */}
        {isLoading ? (
          // ESTADO 1: CARGANDO (Skeleton Grid)
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <FavoritoSkeleton key={i} />
            ))}
          </div>
        ) : isError ? (
          // ESTADO 2: ERROR
          <div className="rounded-3xl border border-red-500/30 bg-red-500/5 p-12 text-center shadow-sm">
            <div className="text-6xl mb-4 opacity-50">⚠️</div>
            <h3 className="text-xl font-bold text-red-500">Hubo un problema al cargar tus favoritos</h3>
            <p className="text-sm text-reducar-text-secondary mt-2 mb-6">
              No pudimos conectar con el servidor. Por favor, intentá de nuevo más tarde.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex h-11 px-6 items-center justify-center rounded-xl bg-reducar-surface border border-reducar-border font-bold text-sm hover:bg-reducar-surface-soft transition-colors"
            >
              Recargar página
            </button>
          </div>
        ) : favoritos.length === 0 ? (
          // ESTADO 3: VACÍO
          <div className="rounded-3xl border border-reducar-border border-dashed bg-reducar-surface p-12 text-center shadow-sm">
            <div className="text-6xl mb-4 opacity-50">🤍</div>
            <h3 className="text-xl font-bold text-reducar-text">Todavía no tenés favoritos</h3>
            <p className="text-sm text-reducar-text-secondary mt-2 max-w-md mx-auto">
              Explorá el catálogo y hacé clic en el corazón de los cursos que te interesen para guardarlos acá.
            </p>
            <Link
              to="/cursos"
              className="mt-6 inline-flex h-11 px-6 items-center justify-center rounded-xl bg-reducar-primary text-white font-bold text-sm hover:bg-reducar-primary-dark transition-colors shadow-lg"
            >
              Explorar cursos
            </Link>
          </div>
        ) : (
          // ESTADO 4: CON DATOS
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {favoritos.map((item) => {
              const emoji = CATEGORY_EMOJIS[item.curso.categoria] || "📚";
              const fecha = new Date(item.fecha).toLocaleDateString("es-AR", {
                day: "numeric", month: "short", year: "numeric"
              });

              return (
                <div
                  key={item.id}
                  className="group flex flex-col bg-reducar-surface rounded-2xl border border-reducar-border shadow-sm hover:shadow-[0_0_20px_rgba(123,108,246,0.15)] hover:border-reducar-primary/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
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
                    <div className="absolute top-3 left-3 bg-reducar-surface/90 backdrop-blur-md px-2.5 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5 text-xs font-bold">
                      <span>{emoji}</span>
                      <span className="text-reducar-text truncate max-w-30">{item.curso.categoria}</span>
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
                      <span>Guardado el {fecha}</span>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-3 border-t border-reducar-border gap-2">
                      <Link
                        to={`/cursos/${item.curso_id}`}
                        className="flex-1 h-9 inline-flex items-center justify-center rounded-lg bg-reducar-primary/10 text-reducar-primary text-xs font-bold hover:bg-reducar-primary/20 transition-colors"
                      >
                        Ver curso
                      </Link>
                      <button
                        onClick={() => removeMutation.mutate(item.curso_id)}
                        disabled={removeMutation.isPending}
                        className="w-9 h-9 inline-flex items-center justify-center rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                        title="Quitar de favoritos"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}