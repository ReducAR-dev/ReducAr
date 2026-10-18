import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PromoBar from "../../components/features/PromoBar";
import { cursoService } from "../../services/curso.service";

type TabDetalle = "descripcion" | "fechas" | "institucion";

function CursoDetallePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tabActiva, setTabActiva] = useState<TabDetalle>("descripcion");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["curso-detalle", id],
    queryFn: () => cursoService.obtenerPorId(Number(id)),
    enabled: !!id, // Solo ejecuta si hay ID en la URL
  });

  // ============================================
  // ESTADOS DE CARGA Y ERROR
  // ============================================
  if (isLoading) {
    return (
      <div className="min-h-screen bg-reducar-bg text-reducar-text grid place-items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-4 border-reducar-primary/30 border-t-reducar-primary animate-spin" />
          <p className="text-sm text-reducar-text-secondary">Cargando curso...</p>
        </div>
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="min-h-screen bg-reducar-bg text-reducar-text flex flex-col items-center justify-center px-4">
        <div className="text-5xl text-reducar-primary mb-4" aria-hidden="true">⌕</div>
        <h1 className="text-2xl font-bold mb-2">Curso no encontrado</h1>
        <p className="text-sm text-reducar-text-secondary mb-6 text-center">
          El curso que buscás no existe o fue dado de baja.
        </p>
        <button 
          onClick={() => navigate("/cursos")} 
          className="px-5 py-2.5 rounded-xl bg-reducar-primary text-white font-bold hover:bg-reducar-primary-dark transition-colors"
        >
          Volver al catálogo
        </button>
      </div>
    );
  }

  // ============================================
  // DATOS DEL CURSO
  // ============================================
  const curso = data.data;
  const esGratis = curso.precio === 0;
  
  // Imagen de respaldo por si el curso no tiene una asignada
  const imagenSrc = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80";

  return (
    <div className="min-h-screen bg-reducar-bg text-reducar-text relative overflow-hidden">
      {/* Fondo con gradientes */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_18%,rgba(112,72,255,0.16),transparent_25%),radial-gradient(circle_at_8%_50%,rgba(36,204,205,0.08),transparent_22%)] pointer-events-none" aria-hidden="true" />

      <div className="relative">
        <PromoBar />

        <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 pb-20">
          {/* BREADCRUMB */}
          <div className="flex items-center flex-wrap gap-2 mb-7 text-xs text-reducar-text-secondary">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="hover:text-reducar-primary transition-colors"
            >
              Inicio
            </button>
            <span>›</span>
            <button
              type="button"
              onClick={() => navigate("/cursos")}
              className="hover:text-reducar-primary transition-colors"
            >
              Explorar cursos
            </button>
            <span>›</span>
            <strong className="text-reducar-primary font-bold line-clamp-1">{curso.titulo}</strong>
          </div>

          {/* SECCIÓN PRINCIPAL */}
          <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] gap-10 lg:gap-11 items-start">
            
            {/* IMAGEN */}
            <div>
              <div className="relative overflow-hidden bg-reducar-surface border border-reducar-border rounded-3xl shadow-2xl">
                <img
                  src={imagenSrc}
                  alt={curso.titulo}
                  className="w-full h-100 object-cover"
                />

                <div className="absolute top-4 left-4 flex gap-2">
                  {esGratis && (
                    <span className="px-3 py-2 rounded-full text-white text-[10px] font-extrabold backdrop-blur-md bg-reducar-turquoise-dark">
                      Gratuito
                    </span>
                  )}
                  {curso.tipo_certificado && (
                    <span className="px-3 py-2 rounded-full text-white text-[10px] font-extrabold backdrop-blur-md bg-reducar-primary">
                      Certificación Oficial
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

              <div className="mt-4 flex items-center flex-wrap gap-2.5 text-[10px]">
                <span className="text-reducar-turquoise-dark font-bold">✓ Institución verificada</span>
                <span className="text-[#f6b73c] tracking-widest">★★★★★</span>
                <span className="text-reducar-text-secondary">4.8 (24 reseñas)</span>
              </div>

              <p className="max-w-xl my-5 text-sm text-reducar-text-secondary leading-relaxed">
                {curso.descripcion_larga?.split("\n")[0] || "Sin descripción corta."}
              </p>

              {/* TAGS */}
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
                  <a
                    href={curso.enlace_inscripcion || "#"}
                    target={curso.enlace_inscripcion ? "_blank" : "_self"}
                    rel="noreferrer"
                    className={`min-h-13 px-5 inline-flex items-center justify-center gap-2.5 rounded-xl text-white text-sm font-extrabold transition-all ${
                      curso.enlace_inscripcion 
                        ? "bg-linear-to-r from-reducar-primary to-reducar-turquoise-dark shadow-lg hover:-translate-y-0.5 hover:shadow-2xl" 
                        : "bg-gray-400 cursor-not-allowed opacity-70"
                    }`}
                  >
                    {curso.enlace_inscripcion ? "Inscribirme ahora ↗" : "Inscripción no disponible"}
                  </a>
                  <button
                    type="button"
                    className="min-h-13 px-5 inline-flex items-center justify-center gap-2 rounded-xl border border-reducar-border text-reducar-primary text-xs font-bold hover:bg-reducar-primary-light transition-colors"
                  >
                    ♡ Guardar
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* SECCIÓN INFERIOR */}
          <section className="mt-12 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-6 items-start">
            
            {/* TABS */}
            <div className="overflow-hidden bg-reducar-surface border border-reducar-border rounded-2xl">
              <div className="flex gap-1.5 px-5 border-b border-reducar-border overflow-x-auto">
                {(
                  [
                    { key: "descripcion", label: "Descripción" },
                    { key: "fechas", label: "Fechas y Cupos" },
                    { key: "institucion", label: "Institución" },
                  ] as { key: TabDetalle; label: string }[]
                ).map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setTabActiva(tab.key)}
                    className={`relative px-3 py-4 text-[11px] font-bold whitespace-nowrap transition-colors ${
                      tabActiva === tab.key
                        ? "text-reducar-primary"
                        : "text-reducar-text-secondary hover:text-reducar-primary"
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

            {/* SIDEBAR LATERAL */}
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

          {/* VOLVER */}
          <button
            type="button"
            onClick={() => navigate("/cursos")}
            className="mt-8 text-xs font-bold text-reducar-primary hover:text-reducar-turquoise transition-colors"
          >
            ← Volver a explorar cursos
          </button>
        </main>
      </div>
    </div>
  );
}

export default CursoDetallePage;