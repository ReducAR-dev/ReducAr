// src/pages/CursoDetallePage.tsx
import { useState } from "react";
import PromoBar from "../components/features/PromoBar";
import type { Curso } from "./Cursospage";

type CursoDetalleProps = {
  curso: Curso;
  onVolver: () => void;
};

type TabDetalle = "descripcion" | "contenido" | "requisitos" | "institucion";

function CursoDetallePage({ curso, onVolver }: CursoDetalleProps) {
  const [tabActiva, setTabActiva] = useState<TabDetalle>("descripcion");

  return (
    <div className="min-h-screen bg-reducar-bg text-reducar-text relative overflow-hidden">
      {/* Fondo con gradientes radiales */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_18%,rgba(112,72,255,0.16),transparent_25%),radial-gradient(circle_at_8%_50%,rgba(36,204,205,0.08),transparent_22%)] pointer-events-none" aria-hidden="true" />

      <div className="relative">
        <PromoBar />

        <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 pb-20">
          {/* BREADCRUMB */}
          <div className="flex items-center flex-wrap gap-2 mb-7 text-xs text-reducar-text-secondary">
            <button
              type="button"
              onClick={onVolver}
              className="text-reducar-text-secondary hover:text-reducar-primary transition-colors"
            >
              Inicio
            </button>
            <span>›</span>
            <button
              type="button"
              onClick={onVolver}
              className="text-reducar-text-secondary hover:text-reducar-primary transition-colors"
            >
              Explorar cursos
            </button>
            <span>›</span>
            <strong className="text-reducar-primary font-bold">{curso.titulo}</strong>
          </div>

          {/* SECCIÓN PRINCIPAL */}
          <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] gap-10 lg:gap-11 items-start">
            {/* IMAGEN */}
            <div>
              <div className="relative overflow-hidden bg-reducar-surface border border-reducar-border rounded-3xl shadow-2xl">
                <img
                  src={curso.imagen}
                  alt={curso.titulo}
                  className="w-full h-98.75 object-cover"
                />

                <div className="absolute top-4 left-4 flex gap-2">
                  {curso.etiqueta && (
                    <span className="px-3 py-2 rounded-full text-white text-[10px] font-extrabold backdrop-blur-md bg-reducar-primary">
                      {curso.etiqueta}
                    </span>
                  )}
                  {curso.gratuito && (
                    <span className="px-3 py-2 rounded-full text-white text-[10px] font-extrabold backdrop-blur-md bg-reducar-turquoise-dark">
                      Gratuito
                    </span>
                  )}
                </div>
              </div>

              {/* MINIATURAS */}
              <div className="mt-3 grid grid-cols-4 gap-2.5">
                {[
                  curso.imagen,
                  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80",
                  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80",
                  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80",
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`${curso.titulo} - miniatura ${i + 1}`}
                    className="w-full h-18.75 object-cover rounded-xl border border-reducar-border opacity-70 cursor-pointer hover:opacity-100 hover:-translate-y-0.5 hover:border-reducar-primary transition-all"
                  />
                ))}
              </div>
            </div>

            {/* INFORMACIÓN */}
            <div className="py-1">
              <span className="inline-flex px-2.5 py-1.5 rounded-full bg-reducar-primary-light text-reducar-primary text-[10px] font-extrabold tracking-wide">
                {curso.categoria}
              </span>

              <h1 className="mt-4 mb-2 text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.05] max-w-xl">
                {curso.titulo}
              </h1>

              <p className="m-0 text-sm font-bold text-reducar-primary underline">
                {curso.organizacion}
              </p>

              <div className="mt-4 flex items-center flex-wrap gap-2.5 text-[10px]">
                <span className="text-reducar-turquoise-dark font-bold">
                  ✓ Institución verificada
                </span>
                <span className="text-[#f6b73c] tracking-widest">★★★★★</span>
                <span className="text-reducar-text-secondary">4.8</span>
              </div>

              <p className="max-w-xl my-5 text-sm text-reducar-text-secondary leading-relaxed">
                {curso.descripcion}
              </p>

              {/* TAGS */}
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-2 text-[10px] font-bold text-reducar-text-secondary bg-reducar-surface border border-reducar-border rounded-lg">
                  ◉ {curso.modalidad}
                </span>
                <span className="px-2.5 py-2 text-[10px] font-bold text-reducar-text-secondary bg-reducar-surface border border-reducar-border rounded-lg">
                  ◷ {curso.duracion}
                </span>
                <span className="px-2.5 py-2 text-[10px] font-bold text-reducar-text-secondary bg-reducar-surface border border-reducar-border rounded-lg">
                  ◎ {curso.nivel}
                </span>
              </div>

              {/* BENEFICIOS */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {curso.gratuito && (
                  <div className="p-3 flex items-center gap-2.5 bg-reducar-surface border border-reducar-border rounded-xl">
                    <span className="w-6 h-6 shrink-0 grid place-items-center rounded-full bg-reducar-turquoise/15 text-reducar-turquoise-dark text-xs font-black">
                      ✓
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <strong className="text-[11px] font-bold text-white">Formación gratuita</strong>
                      <small className="text-[9px] text-reducar-text-secondary">Sin costo de inscripción</small>
                    </div>
                  </div>
                )}
                {curso.certificado && (
                  <div className="p-3 flex items-center gap-2.5 bg-reducar-surface border border-reducar-border rounded-xl">
                    <span className="w-6 h-6 shrink-0 grid place-items-center rounded-full bg-reducar-turquoise/15 text-reducar-turquoise-dark text-xs font-black">
                      ✓
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <strong className="text-[11px] font-bold text-white">Certificado incluido</strong>
                      <small className="text-[9px] text-reducar-text-secondary">Al completar la formación</small>
                    </div>
                  </div>
                )}
              </div>

              {/* PRECIO */}
              {curso.gratuito && (
                <div className="mt-6 flex items-center justify-between gap-5">
                  <span className="text-xs text-reducar-text-secondary">Valor del curso</span>
                  <strong className="text-2xl font-extrabold bg-linear-to-r from-reducar-primary to-reducar-turquoise bg-clip-text text-transparent">
                    Gratuito
                  </strong>
                </div>
              )}

              {/* ACCIONES */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2.5">
                <a
                  href={curso.link}
                  target="_blank"
                  rel="noreferrer"
                  className="min-h-13 px-5 inline-flex items-center justify-center gap-2.5 rounded-xl bg-linear-to-r from-reducar-primary to-reducar-turquoise-dark text-white text-sm font-extrabold shadow-lg hover:-translate-y-0.5 hover:shadow-2xl transition-all"
                >
                  Inscribirme ahora <span>↗</span>
                </a>

                <button
                  type="button"
                  className="min-h-13 px-4 inline-flex items-center justify-center gap-2 rounded-xl border border-reducar-border bg-reducar-surface text-reducar-primary text-xs font-bold hover:bg-reducar-primary-light hover:border-reducar-primary transition-colors"
                >
                  ♡ <span>Guardar en favoritos</span>
                </button>
              </div>
            </div>
          </section>

          {/* SECCIÓN INFERIOR */}
          <section className="mt-12 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-6 items-start">
            {/* DESCRIPCIÓN CON TABS */}
            <div className="overflow-hidden bg-reducar-surface border border-reducar-border rounded-2xl">
              {/* TABS */}
              <div className="flex gap-1.5 px-5 border-b border-reducar-border overflow-x-auto">
                {(
                  [
                    { key: "descripcion", label: "Descripción" },
                    { key: "contenido", label: "Contenido" },
                    { key: "requisitos", label: "Requisitos" },
                    { key: "institucion", label: "Institución" },
                  ] as { key: TabDetalle; label: string }[]
                ).map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setTabActiva(tab.key)}
                    className={`relative px-3 py-4 text-[10px] font-bold whitespace-nowrap transition-colors ${
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

              {/* CONTENIDO TAB */}
              <div className="min-h-77.5 p-6 md:p-7">
                {tabActiva === "descripcion" && (
                  <>
                    <span className="text-[8px] font-black tracking-widest text-reducar-primary uppercase">
                      SOBRE EL CURSO
                    </span>
                    <h2 className="mt-2 mb-4 text-2xl font-bold text-white tracking-tight">
                      Conocé esta oportunidad
                    </h2>
                    <p className="m-0 text-sm text-reducar-text-secondary leading-loose">
                      {curso.descripcionCompleta}
                    </p>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <div className="p-4 flex flex-col gap-1 rounded-xl border border-reducar-border bg-linear-to-br from-reducar-primary-light/40 to-reducar-surface">
                        <strong className="text-xs font-bold text-reducar-primary">{curso.modalidad}</strong>
                        <span className="text-[10px] text-reducar-text-secondary">Modalidad</span>
                      </div>
                      <div className="p-4 flex flex-col gap-1 rounded-xl border border-reducar-border bg-linear-to-br from-reducar-primary-light/40 to-reducar-surface">
                        <strong className="text-xs font-bold text-reducar-primary">{curso.duracion}</strong>
                        <span className="text-[10px] text-reducar-text-secondary">Duración</span>
                      </div>
                      <div className="p-4 flex flex-col gap-1 rounded-xl border border-reducar-border bg-linear-to-br from-reducar-primary-light/40 to-reducar-surface">
                        <strong className="text-xs font-bold text-reducar-primary">{curso.nivel}</strong>
                        <span className="text-[10px] text-reducar-text-secondary">Nivel</span>
                      </div>
                    </div>
                  </>
                )}

                {tabActiva === "contenido" && (
                  <>
                    <span className="text-[8px] font-black tracking-widest text-reducar-primary uppercase">
                      CONTENIDO
                    </span>
                    <h2 className="mt-2 mb-4 text-2xl font-bold text-white tracking-tight">
                      ¿Qué vas a aprender?
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {curso.contenido.map((item, index) => (
                        <div
                          key={item}
                          className="p-3 flex items-center gap-3 border border-reducar-border rounded-xl"
                        >
                          <span className="text-[10px] font-black text-reducar-primary">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <p className="m-0 text-[11px] font-semibold text-white">{item}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {tabActiva === "requisitos" && (
                  <>
                    <span className="text-[8px] font-black tracking-widest text-reducar-primary uppercase">
                      REQUISITOS
                    </span>
                    <h2 className="mt-2 mb-4 text-2xl font-bold text-white tracking-tight">
                      ¿Qué necesitás?
                    </h2>
                    <div className="flex flex-col gap-2.5">
                      {curso.requisitos.map((requisito) => (
                        <div
                          key={requisito}
                          className="p-3 flex items-center gap-3 rounded-xl bg-reducar-primary-light/40"
                        >
                          <span className="w-5 h-5 shrink-0 grid place-items-center rounded-full bg-reducar-primary text-white text-[10px] font-bold">
                            ✓
                          </span>
                          <p className="m-0 text-[11px] text-white">{requisito}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {tabActiva === "institucion" && (
                  <>
                    <span className="text-[8px] font-black tracking-widest text-reducar-primary uppercase">
                      INSTITUCIÓN
                    </span>
                    <h2 className="mt-2 mb-4 text-2xl font-bold text-white tracking-tight">
                      Sobre {curso.organizacion}
                    </h2>
                    <p className="m-0 text-sm text-reducar-text-secondary leading-loose">
                      {curso.institucion}
                    </p>
                    <a
                      href={curso.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex mt-5 text-xs font-extrabold text-reducar-primary hover:underline"
                    >
                      Visitar sitio oficial ↗
                    </a>
                  </>
                )}
              </div>
            </div>

            {/* QUÉ INCLUYE */}
            <aside className="p-6 bg-reducar-surface border border-reducar-border rounded-2xl shadow-xl">
              <span className="text-[8px] font-black tracking-widest text-reducar-primary uppercase">
                BENEFICIOS
              </span>
              <h3 className="mt-2 mb-5 text-lg font-bold text-white">
                Este curso incluye
              </h3>

              <div className="flex flex-col gap-3">
                {curso.incluye.map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <span className="w-5 h-5 shrink-0 grid place-items-center rounded-full bg-reducar-turquoise/15 text-reducar-turquoise-dark text-[10px] font-black">
                      ✓
                    </span>
                    <p className="m-0 text-[11px] text-reducar-text-secondary">{item}</p>
                  </div>
                ))}
              </div>

              <div className="h-px my-5 bg-reducar-border" />

              <p className="m-0 mb-3 text-[10px] text-reducar-text-secondary">
                ¿Tenés dudas sobre esta formación?
              </p>
              <a
                href={curso.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex text-[11px] font-extrabold text-reducar-primary hover:underline"
              >
                Más información
              </a>
            </aside>
          </section>

          {/* VOLVER */}
          <button
            type="button"
            onClick={onVolver}
            className="mt-7 text-xs font-bold text-reducar-primary hover:text-reducar-turquoise transition-colors"
          >
            ← Volver a explorar cursos
          </button>
        </main>
      </div>
    </div>
  );
}

export default CursoDetallePage;