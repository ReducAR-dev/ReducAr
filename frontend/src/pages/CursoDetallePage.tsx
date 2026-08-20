import "../styles/curso-detalle.css";
import type { Curso } from "./Cursospage";

type CursoDetalleProps = {
  curso: Curso;
  onVolver: () => void;
};

function CursoDetallePage({
  curso,
  onVolver,
}: CursoDetalleProps) {
  return (
    <div className="detalle-page">
      <main className="detalle-container">

        <div className="detalle-breadcrumb">
          <button onClick={onVolver}>Inicio</button>
          <span>›</span>

          <button onClick={onVolver}>Cursos</button>
          <span>›</span>

          <span>{curso.titulo}</span>
        </div>

        <section className="detalle-principal">

          <div className="detalle-imagenes">
            <img
              className="detalle-imagen-principal"
              src={curso.imagen}
              alt={curso.titulo}
            />

            <div className="detalle-miniaturas">
              <img src={curso.imagen} alt={curso.titulo} />

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

          <div className="detalle-info">

            <h1>{curso.titulo}</h1>

            <p className="detalle-institucion">
              {curso.organizacion}
            </p>

            <div className="detalle-valoracion">
              <span className="detalle-verificado">
                ✓ {curso.organizacion}
              </span>

              <span className="detalle-estrellas">
                ★★★★★
              </span>

              <span>4.8</span>
            </div>

            <div className="detalle-tags">
              <span>{curso.modalidad}</span>
              <span>{curso.duracion}</span>
              <span>{curso.nivel}</span>
            </div>

            <p className="detalle-resumen">
              {curso.descripcion}
            </p>

            <div className="detalle-beneficios">
              {curso.certificado && (
                <span>✓ Certificado incluido</span>
              )}

              {curso.gratuito && (
                <span>✓ Formación gratuita</span>
              )}
            </div>

            {curso.gratuito && (
              <h2 className="detalle-precio">
                Gratuito
              </h2>
            )}

            <a
              href={curso.link}
              target="_blank"
              rel="noreferrer"
              className="detalle-inscribirme"
            >
              Inscribirme
            </a>

            <button
              type="button"
              className="detalle-favorito"
            >
              ♡ Guardar en favoritos
            </button>

          </div>
        </section>

        <section className="detalle-inferior">

          <div className="detalle-descripcion">

            <div className="detalle-tabs">
              <button className="tab-activo">
                Descripción
              </button>

              <button>
                Contenido
              </button>

              <button>
                Requisitos
              </button>

              <button>
                Institución
              </button>
            </div>

            <div className="detalle-texto">

              <p>{curso.descripcionCompleta}</p>

              <h3>¿Qué vas a aprender?</h3>

              <ul>
                {curso.contenido.map((item) => (
                  <li key={item}>
                    {item}
                  </li>
                ))}
              </ul>

              <h3>Requisitos</h3>

              <ul>
                {curso.requisitos.map((requisito) => (
                  <li key={requisito}>
                    {requisito}
                  </li>
                ))}
              </ul>

              <h3>Sobre la institución</h3>

              <p>{curso.institucion}</p>

            </div>
          </div>

          <aside className="detalle-incluye">
            <h3>Incluye</h3>

            {curso.incluye.map((item) => (
              <p key={item}>
                ✓ {item}
              </p>
            ))}
          </aside>

        </section>

        <button
          type="button"
          className="detalle-volver"
          onClick={onVolver}
        >
          ← Volver a cursos
        </button>

      </main>
    </div>
  );
}

export default CursoDetallePage;