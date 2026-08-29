import Header from "../components/common/Header";
import PromoBar from "../components/features/PromoBar";

import "../styles/novedades.css";

const eventosDestacados = [
  {
    modalidad: "Virtual",
    tipo: "Curso online",
    titulo: "Introducción a React.js",
    descripcion:
      "Aprendé los conceptos fundamentales de React y comenzá a crear tus propias aplicaciones.",
    fecha: "12 de noviembre",
    horario: "19:00 - 21:30 hs",
    imagen:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80",
  },
  {
    modalidad: "Presencial",
    tipo: "Taller presencial",
    titulo: "Python para principiantes",
    descripcion:
      "Aprendé Python desde cero y desarrollá tus primeros programas.",
    fecha: "18 de noviembre",
    horario: "10:00 - 13:00 hs",
    imagen:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80",
  },
];

const proximosEventos = [
  {
    dia: "05",
    mes: "NOV",
    modalidad: "Virtual",
    titulo: "Marketing Digital desde Cero",
    tipo: "Curso online",
  },
  {
    dia: "12",
    mes: "NOV",
    modalidad: "Presencial",
    titulo: "Excel Básico para el Trabajo",
    tipo: "Taller presencial",
  },
  {
    dia: "19",
    mes: "NOV",
    modalidad: "Virtual",
    titulo: "JavaScript Intermedio",
    tipo: "Curso online",
  },
  {
    dia: "26",
    mes: "NOV",
    modalidad: "Presencial",
    titulo: "Diseño UI/UX con Figma",
    tipo: "Taller presencial",
  },
  {
    dia: "03",
    mes: "DIC",
    modalidad: "Virtual",
    titulo: "Base de Datos con MySQL",
    tipo: "Curso online",
  },
  {
    dia: "10",
    mes: "DIC",
    modalidad: "Presencial",
    titulo: "Comunicación Efectiva",
    tipo: "Taller presencial",
  },
];

function NovedadesPage() {
  return (
    <div className="novedades-page">
      <Header />
      <PromoBar />

      <main className="novedades-main">
        <section className="novedades-hero">
          <div className="novedades-container">
            <span className="novedades-eyebrow">
              ✦ Novedades
            </span>

            <h1>
              Enterate de los próximos
              <span> eventos</span>
            </h1>

            <p>
              Sumate a cursos, talleres y charlas pensadas para vos.
              Aprendé, conectate y seguí creciendo.
            </p>

            <div className="novedades-filtros">
              <button className="activo">
                Todos
              </button>

              <button>
                Virtuales
              </button>

              <button>
                Presenciales
              </button>

              <button>
                Talleres
              </button>
            </div>
          </div>
        </section>

        <section className="novedades-contenido">
          <div className="novedades-container novedades-layout">
            <div className="novedades-destacados">
              {eventosDestacados.map((evento) => (
                <article
                  className="novedad-card"
                  key={evento.titulo}
                >
                  <div className="novedad-card-imagen">
                    <img
                      src={evento.imagen}
                      alt={evento.titulo}
                    />

                    <span className="novedad-modalidad">
                      {evento.modalidad}
                    </span>
                  </div>

                  <div className="novedad-card-body">
                    <div className="novedad-meta">
                      <span>
                        ◷ {evento.horario}
                      </span>

                      <span>
                        ♙ Cupos limitados
                      </span>
                    </div>

                    <span className="novedad-tipo">
                      {evento.tipo}
                    </span>

                    <h2>
                      {evento.titulo}
                    </h2>

                    <p>
                      {evento.descripcion}
                    </p>

                    <div className="novedad-card-footer">
                      <span>
                        ▣ Inicio: {evento.fecha}
                      </span>

                      <button type="button">
                        Ver más →
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="novedades-listado">
              {proximosEventos.map((evento) => (
                <article
                  className="novedad-item"
                  key={`${evento.dia}-${evento.titulo}`}
                >
                  <div className="novedad-fecha">
                    <strong>
                      {evento.dia}
                    </strong>

                    <span>
                      {evento.mes}
                    </span>
                  </div>

                  <div className="novedad-item-info">
                    <span>
                      {evento.modalidad}
                    </span>

                    <h3>
                      {evento.titulo}
                    </h3>

                    <p>
                      {evento.tipo}
                    </p>
                  </div>

                  <button type="button">
                    ›
                  </button>
                </article>
              ))}

              <button
                type="button"
                className="novedades-ver-todos"
              >
                Ver todos los eventos →
              </button>
            </aside>
          </div>
        </section>

        <section className="novedades-cta-section">
          <div className="novedades-container">
            <div className="novedades-cta">
              <div>
                <span>
                  ▣
                </span>

                <div>
                  <h3>
                    No te quedes afuera
                  </h3>

                  <p>
                    Los cupos son limitados. Reservá tu lugar y seguí
                    impulsando tu futuro.
                  </p>
                </div>
              </div>

              <button type="button">
                Ver todos los eventos →
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default NovedadesPage;