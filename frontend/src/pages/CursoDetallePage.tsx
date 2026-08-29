import { useState } from "react";

import Header from "../components/common/Header";
import PromoBar from "../components/features/PromoBar";

import "../styles/curso-detalle.css";

import type { Curso } from "./Cursospage";

type CursoDetalleProps = {
  curso: Curso;
  onVolver: () => void;
};

type TabDetalle =
  | "descripcion"
  | "contenido"
  | "requisitos"
  | "institucion";

function CursoDetallePage({
  curso,
  onVolver,
}: CursoDetalleProps) {
  const [tabActiva, setTabActiva] =
    useState<TabDetalle>("descripcion");

  return (
    <div className="detalle-page">
      <Header />
      <PromoBar />

      <main className="detalle-container">
        {/* BREADCRUMB */}
        <div className="detalle-breadcrumb">
          <button type="button" onClick={onVolver}>
            Inicio
          </button>

          <span>›</span>

          <button type="button" onClick={onVolver}>
            Explorar cursos
          </button>

          <span>›</span>

          <strong>{curso.titulo}</strong>
        </div>

        {/* SECCIÓN PRINCIPAL */}
        <section className="detalle-principal">
          {/* IMAGEN */}
          <div className="detalle-imagenes">
            <div className="detalle-imagen-wrapper">
              <img
                className="detalle-imagen-principal"
                src={curso.imagen}
                alt={curso.titulo}
              />

              <div className="detalle-imagen-badges">
                {curso.etiqueta && (
                  <span className="detalle-badge destacado">
                    {curso.etiqueta}
                  </span>
                )}

                {curso.gratuito && (
                  <span className="detalle-badge gratuito">
                    Gratuito
                  </span>
                )}
              </div>
            </div>

            <div className="detalle-miniaturas">
              <img
                src={curso.imagen}
                alt={curso.titulo}
              />

              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80"
                alt="Formación"
              />

              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80"
                alt="Capacitación"
              />

              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80"
                alt="Tecnología"
              />
            </div>
          </div>

          {/* INFORMACIÓN */}
          <div className="detalle-info">
            <span className="detalle-categoria">
              {curso.categoria}
            </span>

            <h1>{curso.titulo}</h1>

            <p className="detalle-institucion">
              {curso.organizacion}
            </p>

            <div className="detalle-valoracion">
              <span className="detalle-verificado">
                ✓ Institución verificada
              </span>

              <span className="detalle-estrellas">
                ★★★★★
              </span>

              <span className="detalle-rating">
                4.8
              </span>
            </div>

            <p className="detalle-resumen">
              {curso.descripcion}
            </p>

            <div className="detalle-tags">
              <span>◉ {curso.modalidad}</span>

              <span>◷ {curso.duracion}</span>

              <span>◎ {curso.nivel}</span>
            </div>

            <div className="detalle-beneficios">
              {curso.gratuito && (
                <div>
                  <span>✓</span>

                  <p>
                    <strong>Formación gratuita</strong>
                    <small>
                      Sin costo de inscripción
                    </small>
                  </p>
                </div>
              )}

              {curso.certificado && (
                <div>
                  <span>✓</span>

                  <p>
                    <strong>
                      Certificado incluido
                    </strong>

                    <small>
                      Al completar la formación
                    </small>
                  </p>
                </div>
              )}
            </div>

            {curso.gratuito && (
              <div className="detalle-precio-box">
                <span>Valor del curso</span>

                <strong>Gratuito</strong>
              </div>
            )}

            <div className="detalle-acciones">
              <a
                href={curso.link}
                target="_blank"
                rel="noreferrer"
                className="detalle-inscribirme"
              >
                Inscribirme ahora
                <span>↗</span>
              </a>

              <button
                type="button"
                className="detalle-favorito"
              >
                ♡
                <span>
                  Guardar en favoritos
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* SECCIÓN INFERIOR */}
        <section className="detalle-inferior">
          <div className="detalle-descripcion">
            {/* TABS */}
            <div className="detalle-tabs">
              <button
                type="button"
                className={
                  tabActiva === "descripcion"
                    ? "tab-activo"
                    : ""
                }
                onClick={() =>
                  setTabActiva("descripcion")
                }
              >
                Descripción
              </button>

              <button
                type="button"
                className={
                  tabActiva === "contenido"
                    ? "tab-activo"
                    : ""
                }
                onClick={() =>
                  setTabActiva("contenido")
                }
              >
                Contenido
              </button>

              <button
                type="button"
                className={
                  tabActiva === "requisitos"
                    ? "tab-activo"
                    : ""
                }
                onClick={() =>
                  setTabActiva("requisitos")
                }
              >
                Requisitos
              </button>

              <button
                type="button"
                className={
                  tabActiva === "institucion"
                    ? "tab-activo"
                    : ""
                }
                onClick={() =>
                  setTabActiva("institucion")
                }
              >
                Institución
              </button>
            </div>

            {/* CONTENIDO TAB */}
            <div className="detalle-texto">
              {tabActiva === "descripcion" && (
                <>
                  <span className="detalle-section-label">
                    SOBRE EL CURSO
                  </span>

                  <h2>
                    Conocé esta oportunidad
                  </h2>

                  <p>
                    {curso.descripcionCompleta}
                  </p>

                  <div className="detalle-destacados">
                    <div>
                      <strong>
                        {curso.modalidad}
                      </strong>
                      <span>Modalidad</span>
                    </div>

                    <div>
                      <strong>
                        {curso.duracion}
                      </strong>
                      <span>Duración</span>
                    </div>

                    <div>
                      <strong>
                        {curso.nivel}
                      </strong>
                      <span>Nivel</span>
                    </div>
                  </div>
                </>
              )}

              {tabActiva === "contenido" && (
                <>
                  <span className="detalle-section-label">
                    CONTENIDO
                  </span>

                  <h2>
                    ¿Qué vas a aprender?
                  </h2>

                  <div className="detalle-lista">
                    {curso.contenido.map(
                      (item, index) => (
                        <div
                          className="detalle-lista-item"
                          key={item}
                        >
                          <span>
                            {String(index + 1).padStart(
                              2,
                              "0"
                            )}
                          </span>

                          <p>{item}</p>
                        </div>
                      )
                    )}
                  </div>
                </>
              )}

              {tabActiva === "requisitos" && (
                <>
                  <span className="detalle-section-label">
                    REQUISITOS
                  </span>

                  <h2>
                    ¿Qué necesitás?
                  </h2>

                  <div className="detalle-requisitos">
                    {curso.requisitos.map(
                      (requisito) => (
                        <div key={requisito}>
                          <span>✓</span>

                          <p>
                            {requisito}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </>
              )}

              {tabActiva === "institucion" && (
                <>
                  <span className="detalle-section-label">
                    INSTITUCIÓN
                  </span>

                  <h2>
                    Sobre {curso.organizacion}
                  </h2>

                  <p>
                    {curso.institucion}
                  </p>

                  <a
                    href={curso.link}
                    target="_blank"
                    rel="noreferrer"
                    className="detalle-institucion-link"
                  >
                    Visitar sitio oficial ↗
                  </a>
                </>
              )}
            </div>
          </div>

          {/* QUÉ INCLUYE */}
          <aside className="detalle-incluye">
            <span className="detalle-section-label">
              BENEFICIOS
            </span>

            <h3>
              Este curso incluye
            </h3>

            <div className="detalle-incluye-lista">
              {curso.incluye.map((item) => (
                <div key={item}>
                  <span>✓</span>

                  <p>{item}</p>
                </div>
              ))}
            </div>

            <div className="detalle-incluye-separador" />

            <p className="detalle-ayuda">
              ¿Tenés dudas sobre esta formación?
            </p>

            <a
              href={curso.link}
              target="_blank"
              rel="noreferrer"
              className="detalle-consultar"
            >
              Más información
            </a>
          </aside>
        </section>

        <button
          type="button"
          className="detalle-volver"
          onClick={onVolver}
        >
          ← Volver a explorar cursos
        </button>
      </main>
    </div>
  );
}

export default CursoDetallePage;