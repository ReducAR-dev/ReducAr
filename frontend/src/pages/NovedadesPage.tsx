import Header from "../components/common/Header";
import PromoBar from "../components/features/PromoBar";

import "../styles/novedades.css";

const proximosEventos = [
  {
    dia: "02",
    mes: "SEP",
    modalidad: "Presencial",
    titulo: "Oracle Community Tour 2026 - Argentina",
    detalle: "Oracle Argentina · CABA",
    link: "https://www.eventbrite.com.ar/e/oracle-community-tour-2026-argentina-tickets-1996091167415",
  },
  {
    dia: "03",
    mes: "SEP",
    modalidad: "Presencial",
    titulo: "Data Saturday LATAM Argentina 2026",
    detalle: "UTN Facultad Regional Buenos Aires · CABA",
    link: "https://datasaturdaylatam.com/",
  },
  {
    dia: "10",
    mes: "SEP",
    modalidad: "Presencial",
    titulo: "La Plataforma para la Era Agéntica es OpenShift",
    detalle: "Red Hat User Group Argentina · Buenos Aires",
    link: "https://www.meetup.com/red-hat-user-argentina/",
  },
  {
    dia: "11",
    mes: "SEP",
    modalidad: "Presencial",
    titulo: "Más allá del código: comunidad y cultura Tech",
    detalle: "Oficinas de AWS · Buenos Aires",
    link: "https://www.meetup.com/aws-girls-argentina/",
  },
  {
    dia: "12",
    mes: "SEP",
    modalidad: "Presencial",
    titulo: "AWS Community Day Argentina 2026",
    detalle: "UAI Anexo Cisneros · CABA",
    link: "https://www.awsarg.org/",
  },
  {
    dia: "22",
    mes: "SEP",
    modalidad: "Híbrido",
    titulo: "Nerdearla Argentina 2026",
    detalle: "Ciudad Cultural Konex + streaming",
    link: "https://nerdearla.com/argentina/",
  },
  {
    dia: "01",
    mes: "OCT",
    modalidad: "Presencial",
    titulo: "AI IN LATAM Argentina 2026",
    detalle: "CEC · Buenos Aires",
    link: "https://www.aiinlatam.com/",
  },
  {
    dia: "07",
    mes: "OCT",
    modalidad: "Presencial",
    titulo: "Ekoparty Buenos Aires 2026",
    detalle: "CEC · Buenos Aires",
    link: "https://ekoparty.org/ekoparty-buenos-aires-2026/",
  },
  {
    dia: "19",
    mes: "OCT",
    modalidad: "Presencial",
    titulo: "Rosario TechWeek 2026",
    detalle: "Rosario · Santa Fe",
    link: "https://rosariotechweek.com/",
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
              Descubrí eventos, encuentros y conferencias de tecnología
              para aprender, conectar con la comunidad y seguir creciendo.
            </p>

            <div className="novedades-estadisticas">
              <div className="novedades-estadistica">
                <strong>9</strong>
                <span>EVENTOS</span>
              </div>

              <div className="novedades-estadistica">
                <strong>2</strong>
                <span>MODALIDADES</span>
              </div>

              <div className="novedades-estadistica">
                <strong>SEP — OCT</strong>
                <span>PRÓXIMOS MESES</span>
              </div>
            </div>
          </div>
        </section>

        <section
          className="novedades-contenido"
          id="eventos"
        >
          <div className="novedades-container">
            <div className="novedades-listado novedades-listado-completo">
              {proximosEventos.map((evento) => (
                <article
                  className="novedad-item"
                  key={`${evento.dia}-${evento.mes}-${evento.titulo}`}
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
                      {evento.detalle}
                    </p>
                  </div>

                  <a
                    href={evento.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="novedad-ver-evento"
                  >
                    Ver evento
                    <span>→</span>
                  </a>
                </article>
              ))}
            </div>
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
                    Seguí descubriendo oportunidades
                  </h3>

                  <p>
                    Participá de eventos de tecnología, conectá con
                    comunidades y conocé nuevas experiencias.
                  </p>
                </div>
              </div>

              <a
                href="#eventos"
                className="novedades-cta-link"
              >
                Ver agenda ↑
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default NovedadesPage;