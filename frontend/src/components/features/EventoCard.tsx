// src/components/features/EventoCard.tsx
interface EventoCardProps {
  dia: string;
  mes: string;
  modalidad: string;
  titulo: string;
  detalle: string;
  link: string;
  className?: string;
}

export const EventoCard = ({ dia, mes, modalidad, titulo, detalle, link, className = "" }: EventoCardProps) => {
  return (
    <article className={`w-full min-h-31.25 py-5 px-1 grid grid-cols-[90px_minmax(0,1fr)_125px] items-center gap-7 border-b border-white/10 hover:bg-reducar-primary/5 transition-colors ${className}`}>
      <div className="w-22.5 h-22.5 flex flex-col items-center justify-center rounded-2xl border border-reducar-primary/55 bg-linear-to-br from-[#6854c2e6] to-[#333569f5] shadow-lg">
        <strong className="text-white text-3xl font-extrabold leading-none">{dia}</strong>
        <span className="mt-2 text-white text-sm font-extrabold">{mes}</span>
      </div>

      <div className="min-w-0 flex flex-col items-start text-left">
        <span className="mb-2 text-[10px] font-black uppercase text-reducar-primary">{modalidad}</span>
        <h3 className="mb-2 text-lg font-extrabold text-white leading-snug">{titulo}</h3>
        <p className="m-0 text-sm text-reducar-text-secondary leading-normal">{detalle}</p>
      </div>

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="min-w-30 min-h-10 px-3.5 inline-flex items-center justify-center gap-2 border border-reducar-primary rounded-lg text-reducar-primary text-[10px] font-extrabold hover:bg-gradient-to-r hover:from-reducar-primary hover:to-reducar-turquoise-dark hover:text-white hover:translate-x-1 transition-all"
      >
        Ver evento <span>→</span>
      </a>
    </article>
  );
};

export default EventoCard;