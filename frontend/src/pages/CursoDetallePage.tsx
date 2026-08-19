
import "../styles/curso-detalle.css";

type CursoDetalleProps = {
  onVolver: () => void;
};

function CursoDetallePage({ onVolver }: CursoDetalleProps) {
  return (
    <div className="detalle-page">

      <main className="detalle-container">

        <div className="detalle-breadcrumb">
          <button onClick={onVolver}>Inicio</button>
          <span>›</span>
          <button onClick={onVolver}>Cursos</button>
          <span>›</span>
          <span>Desarrollo Web Full Stack</span>
        </div>

        <section className="detalle-principal">

          <div className="detalle-imagenes">

            <img
              className="detalle-imagen-principal"
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80"
              alt="Desarrollo Web Full Stack"
            />

            <div className="detalle-miniaturas">

              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80"
                alt="Programación"
              />

              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80"
                alt="Trabajo en equipo"
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

            <h1>Desarrollo Web Full Stack</h1>

            <p className="detalle-institucion">
              Fundación Pescar
            </p>

            <div className="detalle-valoracion">
              <span className="detalle-verificado">
                ✓ Fundación Pescar
              </span>

              <span className="detalle-estrellas">
                ★★★★★
              </span>

              <span>4.8</span>
            </div>

            <div className="detalle-tags">
              <span>Virtual</span>
              <span>6 meses</span>
              <span>Intermedio</span>
            </div>

            <p className="detalle-resumen">
              Formate en desarrollo web Full Stack y aprendé a crear
              aplicaciones web utilizando herramientas y tecnologías de
              Front-End y Back-End.
            </p>

            <div className="detalle-beneficios">
              <span>✓ Certificado incluido</span>
              <span>✓ Formación gratuita</span>
            </div>

            <h2 className="detalle-precio">
              Gratuito
            </h2>

            <a
              href="https://www.pescar.org.ar/"
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

              <p>
                El programa de Desarrollo Web Full Stack brinda herramientas
                técnicas y profesionales para iniciarse en el mundo del
                desarrollo web.
              </p>

              <p>
                Durante la formación se trabajan tecnologías de Front-End y
                Back-End y se desarrollan proyectos para aplicar los
                conocimientos adquiridos.
              </p>

              <h3>¿Qué vas a aprender?</h3>

              <ul>
                <li>HTML y estructura de páginas web.</li>
                <li>CSS y diseño de interfaces.</li>
                <li>JavaScript.</li>
                <li>Desarrollo Front-End.</li>
                <li>React.</li>
                <li>Conceptos de Back-End.</li>
                <li>Bases de datos.</li>
                <li>Git y GitHub.</li>
                <li>Trabajo mediante proyectos.</li>
              </ul>

            </div>
          </div>

          <aside className="detalle-incluye">

            <h3>Incluye</h3>

            <p>✓ Clases en vivo</p>
            <p>✓ Material de estudio</p>
            <p>✓ Acompañamiento</p>
            <p>✓ Actividades prácticas</p>
            <p>✓ Proyecto final</p>
            <p>✓ Certificado</p>

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