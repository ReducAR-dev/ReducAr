// pages/NovedadesPage.tsx
import PromoBar from "../components/features/PromoBar";
import EventoCard from "../components/features/EventoCard";
import { eventosMock } from "../mocks/eventos";
import "../styles/novedades.css";

function NovedadesPage() {
  return (
    <div className="novedades-page">
      <PromoBar />

      <main className="novedades-main">
        <section className="novedades-hero">
          <div className="novedades-container">
            <span className="novedades-eyebrow">✦ Novedades</span>
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

        <section className="novedades-contenido" id="eventos">
          <div className="novedades-container">
            <div className="novedades-listado novedades-listado-completo">
              {eventosMock.map((evento) => (
                <EventoCard
                  key={`${evento.dia}-${evento.mes}-${evento.titulo}`}
                  dia={evento.dia}
                  mes={evento.mes}
                  modalidad={evento.modalidad}
                  titulo={evento.titulo}
                  detalle={evento.detalle}
                  link={evento.link}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="novedades-cta-section">
          <div className="novedades-container">
            <div className="novedades-cta">
              <div>
                <span>▣</span>
                <div>
                  <h3>Seguí descubriendo oportunidades</h3>
                  <p>
                    Participá de eventos de tecnología, conectá con
                    comunidades y conocé nuevas experiencias.
                  </p>
                </div>
              </div>
              <a href="#eventos" className="novedades-cta-link">
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