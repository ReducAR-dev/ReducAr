import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import PromoBar from "../../components/features/PromoBar";
import { cursoService } from "../../services/curso.service";
import { favoritoService } from "../../services/favorito.service";
import { cursoUsuarioService } from "../../services/cursoUsuario.service";
import { useAuthStore } from "../../stores/auth.store";

type TabDetalle = "descripcion" | "fechas" | "institucion";

// Iconos
const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg className={`w-5 h-5 transition-all ${filled ? "fill-red-500 text-red-500 scale-110" : "fill-none text-reducar-text"}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" strokeLinejoin="round" />
  </svg>
);
const CartIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const CheckIcon = () => (
  <svg className="w-5 h-5 text-reducar-turquoise-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

function CursoDetallePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [tabActiva, setTabActiva] = useState<TabDetalle>("descripcion");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { accessToken } = useAuthStore();

  const cursoId = Number(id);

  // 1. Obtener detalles del curso
  const { data: cursoData, isLoading } = useQuery({
    queryKey: ["curso-detalle", cursoId],
    queryFn: () => cursoService.obtenerPorId(cursoId),
    enabled: !!cursoId,
  });

  // 2. Obtener los favoritos del usuario
  const { data: favoritos } = useQuery({
    queryKey: ["favoritos"],
    queryFn: favoritoService.obtenerFavoritos,
    enabled: !!accessToken,
  });

  // 3. Obtener los cursos adquiridos por el usuario
  const { data: misCursos } = useQuery({
    queryKey: ["mis-cursos"],
    queryFn: () => cursoUsuarioService.obtenerMisCursos(),
    enabled: !!accessToken,
  });

  const curso = cursoData?.data;
  const esFavorito = favoritos?.some((f) => f.curso_id === curso?.id) ?? false;
  const yaLoTiene = misCursos?.data?.some((c) => c.curso_id === curso?.id) ?? false;

  // 4. Mutaciones
  const addFavMutation = useMutation({
    mutationFn: () => favoritoService.agregarFavorito(cursoId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["favoritos"] }),
  });

  const removeFavMutation = useMutation({
    mutationFn: () => favoritoService.eliminarFavorito(cursoId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["favoritos"] }),
  });

  const addCursoUsuarioMutation = useMutation({
    mutationFn: () => cursoUsuarioService.adquirirCurso(cursoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mis-cursos"] });
      // Si el curso tiene un enlace externo, redirigimos
      if (curso?.enlace_inscripcion) {
        window.open(curso.enlace_inscripcion, "_blank");
      }
      setIsModalOpen(false);
    },
    onError: (error) => {
      alert(error.message);
      setIsModalOpen(false);
    }
  });

  const toggleFavorito = () => {
    if (!accessToken) return navigate("/login");
    if (esFavorito) removeFavMutation.mutate();
    else addFavMutation.mutate();
  };

  const handleInscribirme = () => {
    if (!accessToken) return navigate("/login");
    
    if (yaLoTiene) {
      // Si ya lo tiene, simplemente lo mandamos al link (si existe)
      if (curso?.enlace_inscripcion) window.open(curso.enlace_inscripcion, "_blank");
      return;
    }

    if (curso?.enlace_inscripcion) {
      // Tiene link externo, abrimos el modal de confirmación
      setIsModalOpen(true);
    } else {
      // No tiene link, lo agregamos directo a la cuenta
      addCursoUsuarioMutation.mutate();
    }
  };

  if (isLoading || !curso) {
    return (
      <div className="min-h-screen bg-reducar-bg text-reducar-text grid place-items-center">
        <div className="w-10 h-10 rounded-full border-4 border-reducar-primary/30 border-t-reducar-primary animate-spin" />
      </div>
    );
  }

  const imagenSrc = curso.imagen_url || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80";
  const esGratis = curso.precio === 0;

  return (
    <div className="min-h-screen bg-reducar-bg text-reducar-text relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_18%,rgba(112,72,255,0.16),transparent_25%),radial-gradient(circle_at_8%_50%,rgba(36,204,205,0.08),transparent_22%)] pointer-events-none" />

      <div className="relative">
        <PromoBar />
        <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 pb-20">
          
          {/* BREADCRUMB */}
          <div className="flex items-center flex-wrap gap-2 mb-7 text-xs text-reducar-text-secondary">
            <button onClick={() => navigate("/")} className="hover:text-reducar-primary">Inicio</button>
            <span>›</span>
            <button onClick={() => navigate("/cursos")} className="hover:text-reducar-primary">Explorar cursos</button>
            <span>›</span>
            <strong className="text-reducar-primary font-bold line-clamp-1">{curso.titulo}</strong>
          </div>

          <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] gap-10 lg:gap-11 items-start">
            
            {/* IMAGEN */}
            <div>
              <div className="relative overflow-hidden bg-reducar-surface border border-reducar-border rounded-3xl shadow-2xl">
                <img src={imagenSrc} alt={curso.titulo} className="w-full h-100 object-cover" />
                <div className="absolute top-4 left-4 flex gap-2">
                  {esGratis && (
                    <span className="px-3 py-2 rounded-full text-white text-[10px] font-extrabold backdrop-blur-md bg-reducar-turquoise-dark">
                      Gratuito
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* INFORMACIÓN */}
            <div className="py-1">
              <span className="inline-flex px-2.5 py-1.5 rounded-full bg-reducar-primary-light text-reducar-primary text-[10px] font-extrabold tracking-wide uppercase">
                {curso.categoria}
              </span>

              <h1 className="mt-4 mb-2 text-4xl md:text-5xl font-extrabold text-reducar-text tracking-tight leading-[1.05]">
                {curso.titulo}
              </h1>

              <p className="m-0 text-sm font-bold text-reducar-primary underline">
                {curso.institucion}
              </p>

              <p className="max-w-xl my-5 text-sm text-reducar-text-secondary leading-relaxed">
                {curso.descripcion_larga?.split("\n")[0] || "Sin descripción corta."}
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-2 text-[10px] font-bold text-reducar-text-secondary bg-reducar-surface border border-reducar-border rounded-lg">
                  ◉ {curso.modalidad}
                </span>
                <span className="px-2.5 py-2 text-[10px] font-bold text-reducar-text-secondary bg-reducar-surface border border-reducar-border rounded-lg">
                  ◷ {curso.duracion_dias} días
                </span>
                <span className="px-2.5 py-2 text-[10px] font-bold text-reducar-text-secondary bg-reducar-surface border border-reducar-border rounded-lg">
                  ◎ {curso.nivel}
                </span>
              </div>

              {/* PRECIO Y ACCIONES */}
              <div className="mt-8 p-5 bg-reducar-surface border border-reducar-border rounded-2xl">
                <div className="flex items-center justify-between gap-5 mb-4">
                  <span className="text-xs text-reducar-text-secondary">Valor del curso</span>
                  <strong className="text-2xl font-extrabold bg-linear-to-r from-reducar-primary to-reducar-turquoise bg-clip-text text-transparent">
                    {esGratis ? "Gratuito" : `$${curso.precio}`}
                  </strong>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2.5">
                  {/* BOTÓN PRINCIPAL DINÁMICO */}
                  <button
                    onClick={handleInscribirme}
                    disabled={addCursoUsuarioMutation.isPending}
                    className={`h-13 px-5 inline-flex items-center justify-center gap-2.5 rounded-xl text-sm font-extrabold transition-all disabled:opacity-70 ${
                      yaLoTiene 
                        ? "bg-reducar-surface-soft text-reducar-text-secondary border border-reducar-border cursor-default"
                        : "bg-linear-to-r from-reducar-primary to-reducar-turquoise-dark text-white shadow-lg hover:-translate-y-0.5"
                    }`}
                  >
                    {yaLoTiene ? (
                      <><CheckIcon /> Ya tenés este curso</>
                    ) : addCursoUsuarioMutation.isPending ? (
                      "Procesando..."
                    ) : curso.enlace_inscripcion ? (
                      "Inscribirme ahora ↗"
                    ) : (
                      "Añadir a mis cursos"
                    )}
                  </button>

                  {/* BOTONES SECUNDARIOS */}
                  <div className="flex gap-2.5">
                    <button
                      onClick={toggleFavorito}
                      disabled={addFavMutation.isPending || removeFavMutation.isPending}
                      className={`flex-1 sm:flex-none h-13 px-4 inline-flex items-center justify-center gap-2 rounded-xl border transition-all disabled:opacity-50 ${
                        esFavorito
                          ? "bg-red-500/10 border-red-500/30 text-red-500 hover:bg-red-500/20"
                          : "border-reducar-border text-reducar-text hover:border-reducar-primary hover:bg-reducar-primary-light"
                      }`}
                    >
                      <HeartIcon filled={esFavorito} />
                      <span className="hidden sm:inline text-xs font-bold">
                        {esFavorito ? "Guardado" : "Guardar"}
                      </span>
                    </button>

                    <button
                      className="flex-1 sm:flex-none h-13 px-4 inline-flex items-center justify-center gap-2 rounded-xl border border-reducar-border text-reducar-text hover:border-reducar-primary hover:bg-reducar-primary-light transition-all opacity-50 cursor-not-allowed"
                      title="Próximamente"
                    >
                      <CartIcon />
                      <span className="hidden sm:inline text-xs font-bold">Al Carrito</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* TABS Y SIDEBAR (Se mantienen igual) */}
          <section className="mt-12 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-6 items-start">
            <div className="overflow-hidden bg-reducar-surface border border-reducar-border rounded-2xl">
              <div className="flex gap-1.5 px-5 border-b border-reducar-border overflow-x-auto">
                {[
                  { key: "descripcion", label: "Descripción" },
                  { key: "fechas", label: "Fechas y Cupos" },
                  { key: "institucion", label: "Institución" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setTabActiva(tab.key as TabDetalle)}
                    className={`relative px-3 py-4 text-[11px] font-bold whitespace-nowrap transition-colors ${
                      tabActiva === tab.key ? "text-reducar-primary" : "text-reducar-text-secondary hover:text-reducar-primary"
                    }`}
                  >
                    {tab.label}
                    {tabActiva === tab.key && (
                      <span className="absolute left-2.5 right-2.5 -bottom-px h-0.5 rounded-full bg-linear-to-r from-reducar-primary to-reducar-turquoise" />
                    )}
                  </button>
                ))}
              </div>

              <div className="min-h-75 p-6 md:p-7">
                {tabActiva === "descripcion" && (
                  <div className="animate-[fadeIn_0.3s_ease-out]">
                    <h2 className="text-2xl font-bold mb-4">Sobre el curso</h2>
                    <p className="text-sm text-reducar-text-secondary leading-loose whitespace-pre-line">
                      {curso.descripcion_larga || "No hay una descripción extendida disponible."}
                    </p>
                  </div>
                )}
                {tabActiva === "fechas" && (
                  <div className="animate-[fadeIn_0.3s_ease-out]">
                    <h2 className="text-2xl font-bold mb-4">Cronograma</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl border border-reducar-border bg-reducar-bg">
                        <p className="text-xs text-reducar-text-secondary mb-1">Inicio de clases</p>
                        <p className="font-bold">{curso.fecha_inicio || "A definir"}</p>
                      </div>
                      <div className="p-4 rounded-xl border border-reducar-border bg-reducar-bg">
                        <p className="text-xs text-reducar-text-secondary mb-1">Finalización</p>
                        <p className="font-bold">{curso.fecha_termino || "A definir"}</p>
                      </div>
                      <div className="p-4 rounded-xl border border-reducar-border bg-reducar-bg">
                        <p className="text-xs text-reducar-text-secondary mb-1">Cierre de inscripción</p>
                        <p className="font-bold">{curso.fecha_max_inscripcion || "Hasta agotar cupos"}</p>
                      </div>
                      <div className="p-4 rounded-xl border border-reducar-border bg-reducar-bg">
                        <p className="text-xs text-reducar-text-secondary mb-1">Cupos disponibles</p>
                        <p className="font-bold">{curso.cupos_disponibles ? `${curso.cupos_disponibles} lugares` : "Ilimitados"}</p>
                      </div>
                    </div>
                  </div>
                )}
                {tabActiva === "institucion" && (
                  <div className="animate-[fadeIn_0.3s_ease-out]">
                    <h2 className="text-2xl font-bold mb-4">Sobre {curso.institucion}</h2>
                    <p className="text-sm text-reducar-text-secondary leading-loose">
                      Este curso es ofrecido por <strong>{curso.institucion}</strong>.
                      Una organización dedicada a brindar oportunidades de formación tecnológica de calidad.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <aside className="p-6 bg-reducar-surface border border-reducar-border rounded-2xl">
              <h3 className="text-lg font-bold text-reducar-text mb-4">¿Qué incluye?</h3>
              <ul className="flex flex-col gap-3 text-sm text-reducar-text-secondary">
                <li className="flex items-center gap-2"><span className="text-reducar-turquoise-dark font-bold">✓</span> Modalidad {curso.modalidad}</li>
                <li className="flex items-center gap-2"><span className="text-reducar-turquoise-dark font-bold">✓</span> Nivel {curso.nivel}</li>
                {curso.tipo_certificado && (
                  <li className="flex items-center gap-2"><span className="text-reducar-turquoise-dark font-bold">✓</span> Certificado {curso.tipo_certificado}</li>
                )}
                <li className="flex items-center gap-2"><span className="text-reducar-turquoise-dark font-bold">✓</span> Duración de {curso.duracion_dias} días</li>
              </ul>
            </aside>
          </section>

          <button
            type="button"
            onClick={() => navigate("/cursos")}
            className="mt-8 text-xs font-bold text-reducar-primary hover:text-reducar-turquoise transition-colors"
          >
            ← Volver a explorar cursos
          </button>
        </main>
      </div>

      {/* ================= MODAL DE CONFIRMACIÓN ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 backdrop-blur-sm px-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="w-full max-w-md bg-reducar-surface rounded-3xl border border-reducar-border shadow-2xl p-6 sm:p-8 animate-[slideDown_0.2s_ease-out]">
            <div className="w-12 h-12 rounded-2xl bg-reducar-primary-light grid place-items-center mb-5 mx-auto">
              <CartIcon />
            </div>
            <h3 className="text-xl font-extrabold text-center mb-2">¿Querés guardar este curso?</h3>
            <p className="text-sm text-reducar-text-secondary text-center mb-6 leading-relaxed">
              Estás por ir al sitio de <strong>{curso.institucion}</strong>. Te recomendamos guardar el curso en tu cuenta para hacerle seguimiento y tenerlo a mano.
            </p>
            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => addCursoUsuarioMutation.mutate()}
                disabled={addCursoUsuarioMutation.isPending}
                className="w-full h-12 rounded-xl bg-linear-to-r from-reducar-primary to-reducar-turquoise-dark text-white font-bold text-sm shadow-lg hover:-translate-y-0.5 transition-all"
              >
                {addCursoUsuarioMutation.isPending ? "Guardando..." : "Sí, guardar e ir al sitio ↗"}
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  if (curso.enlace_inscripcion) window.open(curso.enlace_inscripcion, "_blank");
                }}
                className="w-full h-12 rounded-xl border border-reducar-border text-reducar-text font-bold text-sm hover:bg-reducar-surface-soft transition-colors"
              >
                No, solo ir al sitio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CursoDetallePage;