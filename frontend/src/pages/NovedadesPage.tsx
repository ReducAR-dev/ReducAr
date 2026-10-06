// src/pages/NovedadesPage.tsx
import PromoBar from "../components/features/PromoBar";
import EventoCard from "../components/features/EventoCard";
import { eventosMock } from "../mocks/eventos";

function NovedadesPage() {
  return (
    <div className="min-h-screen w-full bg-reducar-bg text-reducar-text">
      <PromoBar />

      <main>
        <section className="pt-14 pb-8">
          <div className="max-w-5xl mx-auto px-4 flex flex-col items-center text-center">
            <span className="inline-flex items-center justify-center mb-4 px-4 py-2 text-xs font-extrabold text-reducar-primary bg-reducar-primary-light border border-reducar-primary/30 rounded-full">
              ✦ Novedades
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight max-w-3xl leading-tight">
              Enterate de los próximos
              <span className="bg-gradient-to-r from-reducar-gradient-start via-reducar-gradient-middle to-reducar-gradient-end bg-clip-text text-transparent"> eventos</span>
            </h1>
            <p className="max-w-2xl mt-4 text-sm text-reducar-text-secondary leading-relaxed">
              Descubrí eventos, encuentros y conferencias de tecnología para aprender, conectar con la comunidad y seguir creciendo.
            </p>

            <div className="w-full max-w-3xl mt-8 py-5 grid grid-cols-3 border-y border-white/10">
              <div className="flex flex-col items-center">
                <strong className="text-2xl font-extrabold text-white">9</strong>
                <span className="mt-2 text-[8px] font-extrabold tracking-widest text-reducar-text-secondary">EVENTOS</span>
              </div>
              <div className="flex flex-col items-center">
                <strong className="text-2xl font-extrabold text-white">2</strong>
                <span className="mt-2 text-[8px] font-extrabold tracking-widest text-reducar-text-secondary">MODALIDADES</span>
              </div>
              <div className="flex flex-col items-center">
                <strong className="text-2xl font-extrabold text-white">SEP — OCT</strong>
                <span className="mt-2 text-[8px] font-extrabold tracking-widest text-reducar-text-secondary">PRÓXIMOS MESES</span>
              </div>
            </div>
          </div>
        </section>

        <section id="eventos" className="py-6 pb-20">
          <div className="max-w-5xl mx-auto px-4">
            <div className="max-w-4xl mx-auto border-t border-white/10">
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

        <section className="pb-16">
          <div className="max-w-5xl mx-auto px-4">
            <div className="max-w-4xl mx-auto p-6 md:p-7 flex flex-wrap items-center justify-between gap-6 border border-reducar-primary/30 rounded-2xl bg-gradient-to-r from-reducar-primary/10 to-reducar-turquoise/5">
              <div className="flex items-center gap-4">
                <span className="w-11 h-11 shrink-0 grid place-items-center rounded-xl bg-reducar-primary-light text-reducar-primary text-lg">▣</span>
                <div>
                  <h3 className="text-lg font-extrabold text-white">Seguí descubriendo oportunidades</h3>
                  <p className="mt-1 max-w-2xl text-xs text-reducar-text-secondary leading-relaxed">
                    Participá de eventos de tecnología, conectá con comunidades y conocé nuevas experiencias.
                  </p>
                </div>
              </div>
              <a href="#eventos" className="min-w-[110px] h-10 px-4 inline-flex items-center justify-center border border-reducar-primary rounded-lg text-reducar-primary text-xs font-extrabold hover:bg-reducar-primary hover:text-white transition-colors">
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